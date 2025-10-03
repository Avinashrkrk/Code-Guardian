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

  const userAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, session.user.id));

  const githubAccount = userAccounts.find((acc) => acc.provider === "github");

  let repos: Repositories = [];

  if (githubAccount?.access_token) {
    try {
      const octokit = new Octokit({ auth: githubAccount.access_token });
      const { data } = await octokit.repos.listForAuthenticatedUser({
        sort: "updated",
        per_page: 100,
      });
      repos = data;
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  }

  return (
    <div className="h-full">
      {githubAccount?.access_token ? (
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
              GitHub Connection Required
            </h2>
            <p className="text-muted-foreground">
              Please connect your GitHub account to access your repositories.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}