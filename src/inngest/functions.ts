import { inngest } from "./client";
import { getInstallationOctokit } from "@/lib/github";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const processPrReview = inngest.createFunction(
  { id: "process-pr-review", event: "github/pull_request.opened" },
  async ({ event, step }) => {
    const { pull_request, installationId, repositoryFullName } = event.data;
    const [owner, repo] = repositoryFullName.split("/");

    if (!installationId) {
      throw new Error("Missing installationId in webhook event.");
    }

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

    // Step 2: Pass the Diff to Google Gemini AI
    const reviewResult = await step.run("generate-ai-review", async () => {
      console.log(`Generating AI review for PR #${pull_request.number}...`);
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing from environment variables.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are an expert senior software engineer and a strict code reviewer. 
Review the following Pull Request code diff.

Focus on:
1. Bugs, logic errors, or edge cases.
2. Security vulnerabilities.
3. Performance issues.
4. Clean code and best practices.

Do NOT nitpick minor formatting (like spacing or single vs double quotes).
If the code looks perfect, just say "Great job, the code looks solid!"

Here is the diff:
\`\`\`diff
${diff.slice(0, 50000)} // truncate to avoid token limits on massive PRs
\`\`\`

Format your response in Markdown, highlighting specific files or code blocks where necessary.
`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    });

    // Step 3: Post the AI Review back to the GitHub PR
    await step.run("post-review-comment", async () => {
      console.log(`Posting AI review to PR #${pull_request.number}...`);
      const octokit = await getInstallationOctokit(installationId);

      const reviewBody = `### 🤖 Code Guardian AI Review\n\n${reviewResult}`;

      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: pull_request.number, // PRs are treated as issues in the GitHub API
        body: reviewBody,
      });
    });

    return { 
      status: "success", 
      message: `Successfully reviewed PR #${pull_request.number}` 
    };
  }
);
