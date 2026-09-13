import { inngest } from "./client";
import { getInstallationOctokit } from "@/lib/github";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/index";
import { reviewJobs } from "@/db/schema/reviewJobs";
import { learnings } from "@/db/schema/learnings";
import { repositories } from "@/db/schema/repositories";
import { buildCodeReviewPrompt } from "@/lib/prompts/codeReview";
import { buildChatPrompt } from "@/lib/prompts/chat";
import { eq } from "drizzle-orm";

export const processPrReview = inngest.createFunction(
  { 
    id: "process-pr-review",
    triggers: [{ event: "github/pull_request.opened" }]
  },
  async ({ event, step }) => {
    const { pull_request, installationId, repositoryFullName, githubRepoId } = event.data;
    const [owner, repo] = repositoryFullName.split("/");

    if (!installationId) {
      throw new Error("Missing installationId in webhook event.");
    }

    // Step 0: Create the review job in the database
    const reviewJobId = await step.run("create-review-job", async () => {
      if (!githubRepoId) {
        console.warn("No githubRepoId in event data, skipping DB logging.");
        return null;
      }
      
      const repoRecords = await db
        .select()
        .from(repositories)
        .where(eq(repositories.githubRepoId, githubRepoId))
        .limit(1);
        
      if (repoRecords.length === 0) {
        console.warn(`Repository with githubRepoId ${githubRepoId} not found in DB.`);
        return null;
      }
      
      const repo = repoRecords[0];
      
      const result = await db.insert(reviewJobs).values({
        repoId: repo.id,
        pullRequestNumber: pull_request.number.toString(),
        status: 'in_progress',
        inngestJobId: event.id,
      }).returning({ id: reviewJobs.id });
      
      return result[0]?.id;
    });

    // Step 1: Fetch the PR Diff from GitHub
    const diff = await step.run("fetch-pr-diff", async () => {
      console.log(`Fetching diff for PR #${pull_request.number} in ${repositoryFullName}...`);
      const octokit = await getInstallationOctokit(installationId);
      
      const response = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}", {
        owner,
        repo,
        pull_number: pull_request.number,
        mediaType: {
          format: "diff",
        },
      });

      return response.data as unknown as string;
    });

    // If there is no diff (e.g., empty PR), we can stop early
    if (!diff || typeof diff !== 'string' || diff.trim().length === 0) {
      return { status: "skipped", message: "No code changes found in this PR." };
    }

    // Step 1.5: Post an initial "review is ongoing" comment
    const initialCommentId = await step.run("post-initial-comment", async () => {
      const octokit = await getInstallationOctokit(installationId);
      
      const response = await octokit.issues.createComment({
        owner,
        repo,
        issue_number: pull_request.number,
        body: "### 🤖 Code Guardian\n\nI am currently analyzing your code changes. A detailed review will be posted here shortly... ⏳",
      });

      return response.data.id;
    });

    // Step 2: Pass the Diff to Google Gemini AI
    const reviewResult = await step.run("generate-ai-review", async () => {
      console.log(`Generating AI review for PR #${pull_request.number}...`);
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing from environment variables.");
      }

      // Fetch custom learnings for this repo
      let customInstructions = "";
      if (githubRepoId) {
        const repoRecords = await db.select().from(repositories).where(eq(repositories.githubRepoId, githubRepoId)).limit(1);
        if (repoRecords.length > 0) {
          const repoId = repoRecords[0].id;
          const repoLearnings = await db.select().from(learnings).where(eq(learnings.repoId, repoId));
          if (repoLearnings.length > 0) {
            customInstructions = `\n\nCRITICAL TEAM INSTRUCTIONS:\nPlease strictly follow these custom rules provided by the team:\n` + repoLearnings.map(l => `- ${l.instruction}`).join("\n");
          }
        }
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const prompt = buildCodeReviewPrompt(diff, customInstructions);

      const candidateModels = ["gemini-3.6-flash", "gemini-3.7-flash", "gemini-3.5-flash"];
      let lastError: unknown;

      for (const modelName of candidateModels) {
        try {
          console.log(`Attempting review with ${modelName}...`);
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          if (text && text.trim().length > 0) {
            console.log(`Successfully generated review with ${modelName}`);
            return text;
          }
        } catch (err) {
          console.warn(`Model ${modelName} failed, trying fallback:`, err);
          lastError = err;
        }
      }

      throw new Error(`All Gemini AI models failed: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
    });

    // Step 3: Post the AI Review back to the GitHub PR
    await step.run("post-review-comment", async () => {
      console.log(`Posting AI review to PR #${pull_request.number}...`);
      const octokit = await getInstallationOctokit(installationId);

      const reviewBody = `### 🤖 Code Guardian AI Review\n\n${reviewResult}`;

      await octokit.issues.updateComment({
        owner,
        repo,
        comment_id: initialCommentId,
        body: reviewBody,
      });
    });

    // Step 4: Mark job as completed
    if (reviewJobId) {
      await step.run("mark-job-completed", async () => {
        await db.update(reviewJobs)
          .set({ status: 'completed', completedAt: new Date() })
          .where(eq(reviewJobs.id, reviewJobId));
      });
    }

    return { 
      status: "success", 
      message: `Successfully reviewed PR #${pull_request.number}` 
    };
  }
);

export const processChatComment = inngest.createFunction(
  {
    id: "process-chat-comment",
    triggers: [{ event: "github/issue_comment.created" }]
  },
  async ({ event, step }) => {
    const { comment, issue, installationId, repositoryFullName, githubRepoId } = event.data;
    const [owner, repo] = repositoryFullName.split("/");

    // 1. Validation
    if (comment.user.type === "Bot" || comment.user.login.includes("bot")) {
      return { status: "skipped", message: "Comment is from a bot." };
    }

    if (!comment.body.includes("@CodeGuardian")) {
      return { status: "skipped", message: "Bot was not mentioned." };
    }

    // 2.5 Post an initial "processing" comment to let the user know the bot is working
    const initialCommentId = await step.run("post-initial-chat-comment", async () => {
      const octokit = await getInstallationOctokit(installationId);
      const response = await octokit.issues.createComment({
        owner,
        repo,
        issue_number: issue.number,
        body: `> 🤖 **@CodeGuardian** is thinking...\n> \n> <sub>*Processing your request, please wait a moment.* ⏳</sub>`,
      });
      return response.data.id;
    });

    // 2. Fetch Diff
    const diff = await step.run("fetch-pr-diff", async () => {
      const octokit = await getInstallationOctokit(installationId);
      const response = await octokit.request("GET /repos/{owner}/{repo}/pulls/{pull_number}", {
        owner,
        repo,
        pull_number: issue.number,
        mediaType: { format: "diff" },
      });
      return response.data as unknown as string;
    });

    // 3. Run AI
    const reply = await step.run("generate-chat-reply", async () => {
      const apiKey = process.env.GEMINI_API_KEY?.trim();
      if (!apiKey) throw new Error("GEMINI_API_KEY is missing.");

      let customInstructions = "";
      if (githubRepoId) {
        const repoRecords = await db.select().from(repositories).where(eq(repositories.githubRepoId, githubRepoId)).limit(1);
        if (repoRecords.length > 0) {
          const repoId = repoRecords[0].id;
          const repoLearnings = await db.select().from(learnings).where(eq(learnings.repoId, repoId));
          if (repoLearnings.length > 0) {
            customInstructions = repoLearnings.map(l => "- " + l.instruction).join("\n");
          }
        }
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const prompt = buildChatPrompt(diff, comment.body, customInstructions);

      const candidateModels = ["gemini-3.6-flash", "gemini-3.7-flash", "gemini-3.5-flash"];
      for (const modelName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          if (text) return text;
        } catch (e) {
          console.warn("Model " + modelName + " failed, trying fallback:", e);
        }
      }
      throw new Error("All Gemini AI models failed.");
    });

    // 4. Update the initial comment with the final reply
    await step.run("update-chat-reply", async () => {
      const octokit = await getInstallationOctokit(installationId);
      await octokit.issues.updateComment({
        owner,
        repo,
        comment_id: initialCommentId,
        body: "### 🤖 Code Guardian\n\n" + reply,
      });
    });

    return { status: "success", message: "Replied to comment." };
  }
);
