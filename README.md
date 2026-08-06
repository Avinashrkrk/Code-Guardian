# 🛡️ Code Guardian

**Code Guardian** is a modern, enterprise-grade AI Code Review SaaS platform. It automatically reviews Pull Requests on GitHub, detects bugs, identifies security vulnerabilities, and enforces team-specific coding standards using Google's latest Gemini AI models.

## ✨ Key Features
- **🤖 Automated AI Code Reviews:** Instantly reviews PR diffs and posts professional, constructive feedback directly as a comment on GitHub.
- **📖 Custom Learnings:** Teams can inject custom, repository-specific rules into the AI (e.g., "Always use Tailwind CSS", "Avoid using `.forEach`"). The AI adapts to your codebase's specific style.
- **⚡ Serverless Background Jobs:** Powered by Inngest, ensuring reliable processing of heavy AI tasks without serverless function timeouts. Built-in retry mechanisms handle API rate limits gracefully.
- **📊 Real-time Dashboard:** A beautiful UI to manage connected repositories, configure custom learnings, and view a history of all AI review jobs.
- **🔐 Secure Authentication:** Seamless login via GitHub OAuth, with automated GitHub App installation tracking.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** Neon Serverless Postgres
- **ORM:** Drizzle ORM
- **Background Jobs:** Inngest
- **AI Model:** Google Gemini API (`gemini-flash-latest`)
- **Authentication:** Auth.js (NextAuth)
- **Styling:** Tailwind CSS & Shadcn UI
- **Integration:** GitHub Apps API & Webhooks

## 🏗️ Architecture Flow
1. **Developer opens a PR** on a connected GitHub repository.
2. **GitHub Webhook** triggers our Next.js API route (`/api/webhooks/github`).
3. **API Route** delegates the heavy lifting to **Inngest** for background processing.
4. **Inngest Worker** fetches the PR diff from GitHub, queries the Neon database for any custom "Learnings", and constructs a prompt.
5. **Google Gemini API** analyzes the code and returns a markdown-formatted code review.
6. **Code Guardian** posts the review back to the GitHub PR as a comment.

## 🚀 Local Setup

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/code-guardian.git
cd code-guardian
npm install
\`\`\`

### 2. Environment Variables
Create a \`.env.local\` file in the root directory and add the following keys:

\`\`\`env
# Database (Neon)
DATABASE_URL=your_neon_postgres_url

# Authentication (Auth.js)
AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret

# AI Model
GEMINI_API_KEY=your_google_ai_studio_api_key

# Background Jobs (Inngest)
INNGEST_EVENT_KEY=local
INNGEST_SIGNING_KEY=local

# GitHub App Integration
GITHUB_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_GITHUB_APP_NAME=your_github_app_slug
GITHUB_APP_ID=your_app_id
GITHUB_APP_PRIVATE_KEY="your_private_key_string"
\`\`\`

### 3. Database Migration
Push the Drizzle schema to your Neon database:
\`\`\`bash
npm run db:push
# or
npx drizzle-kit push
\`\`\`

### 4. Run the Development Server
Start the Next.js server and the local Inngest dev server:
\`\`\`bash
npm run dev
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
\`\`\`
Visit \`http://localhost:3000\` to see the app!

---
*Built with ❤️ for better, faster code reviews.*
