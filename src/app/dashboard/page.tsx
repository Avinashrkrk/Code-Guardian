import { type Endpoints } from "@octokit/types";
import { auth } from "@/auth/authSetup";
import { db } from "@/index";
import { accounts } from "@/db/schema/accounts";
import { eq } from "drizzle-orm";
import { Octokit } from "@octokit/rest";
import { RepositoriesTable } from "@/components/dashboard/repositories-table";
import { redirect } from "next/navigation";

type Repositories = Endpoints["GET /user/repos"]["response"]["data"];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Prefer token from session if available
  // @ts-expect-error augmented by auth callbacks
  const sessionAccessToken: string | undefined = session.accessToken;
  // @ts-expect-error augmented by auth callbacks
  const sessionRefreshToken: string | undefined = session.refreshToken;

  let repos: Repositories = [];
  let needsReconnect = false;
  let attemptedRefresh = false;

  const activeAccessToken = sessionAccessToken;
  if (activeAccessToken) {
    try {
      const octokit = new Octokit({ auth: activeAccessToken });
      const { data } = await octokit.repos.listForAuthenticatedUser({
        sort: "updated",
        per_page: 100,
      });
      repos = data;
    } catch (error) {
      console.error("Error fetching repositories:", error);
      // Mark for reconnect if token is invalid/expired/revoked
      const err = error as { status?: number; message?: string };
      const isUnauthorized = err?.status === 401 || err?.message?.toLowerCase().includes("bad credentials");
      if (isUnauthorized && sessionRefreshToken && !attemptedRefresh) {
        // Try to refresh the token once
        attemptedRefresh = true;
        try {
          const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              client_id: process.env.AUTH_GITHUB_ID,
              client_secret: process.env.AUTH_GITHUB_SECRET,
              grant_type: "refresh_token",
              refresh_token: sessionRefreshToken,
            }),
          });

          if (tokenRes.ok) {
            const tokenJson = (await tokenRes.json()) as {
              access_token?: string;
              refresh_token?: string;
              token_type?: string;
              scope?: string;
              expires_in?: number;
            };

            if (tokenJson.access_token) {
              const newAccessToken = tokenJson.access_token;
              const newRefreshToken = tokenJson.refresh_token ?? sessionRefreshToken;
              const newExpiresAt = tokenJson.expires_in
                ? Math.floor(Date.now() / 1000) + tokenJson.expires_in
                : null;

              // Persist updated tokens
              await db
                .update(accounts)
                .set({
                  access_token: newAccessToken,
                  refresh_token: newRefreshToken ?? null,
                  expires_at: newExpiresAt ?? null,
                  token_type: tokenJson.token_type ?? null,
                  scope: tokenJson.scope ?? null,
                })
                .where(
                  eq(accounts.provider, "github")
                );

              // Retry once with new token
              const retryOctokit = new Octokit({ auth: newAccessToken });
              const { data } = await retryOctokit.repos.listForAuthenticatedUser({
                sort: "updated",
                per_page: 100,
              });
              repos = data;
            } else {
              needsReconnect = true;
            }
          } else {
            needsReconnect = true;
          }
        } catch (refreshError) {
          console.error("Failed to refresh GitHub token:", refreshError);
          needsReconnect = true;
        }
      } else if (isUnauthorized) {
        needsReconnect = true;
      }
    }
  }

  return (
    <div className="h-full">
      {activeAccessToken && !needsReconnect ? (
        <RepositoriesTable
          repositories={
            repos
              .filter((repo) => repo.updated_at !== null)
              .map((repo) => ({
                ...repo,
                updated_at: repo.updated_at ?? "",
              }))
          }
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-display font-bold text-foreground">
              {needsReconnect ? "GitHub Reconnection Required" : "GitHub Connection Required"}
            </h2>
            <p className="text-muted-foreground">
              {needsReconnect
                ? "Your GitHub token seems invalid or expired. Please reconnect to continue."
                : "Please connect your GitHub account to access your repositories."}
            </p>
            <div>
              <a
                href={`/api/auth/signin?provider=github&callbackUrl=${encodeURIComponent("/dashboard")}`}
                className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-background hover:opacity-90"
              >
                {needsReconnect ? "Reconnect GitHub" : "Connect GitHub"}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}