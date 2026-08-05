import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/rest";

/**
 * Returns an authenticated Octokit instance for a specific GitHub App Installation.
 * This allows the app to fetch code and post comments on behalf of the installation.
 */
export async function getInstallationOctokit(installationId: number) {
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_PRIVATE_KEY;

  if (!appId || !privateKey) {
    throw new Error("Missing GITHUB_APP_ID or GITHUB_PRIVATE_KEY in environment variables");
  }

  // Handle potential escaped newlines from environment variables
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');

  const octokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: appId,
      privateKey: formattedPrivateKey,
      installationId: installationId,
    },
  });

  return octokit;
}
