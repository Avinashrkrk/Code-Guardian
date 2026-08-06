import { auth } from "@/auth/authSetup";
import { db } from "@/index";
import { repositories } from "@/db/schema/repositories";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { LearningsManager } from "@/components/dashboard/learnings-manager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LearningsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Fetch active repositories for this user
  const activeRepos = await db
    .select()
    .from(repositories)
    .where(
      and(
        eq(repositories.userId, session.user.id),
        eq(repositories.isActive, true)
      )
    );

  return (
    <div className="h-full">
      <DashboardHeader
        title="Learnings"
        description="Add custom instructions to guide the AI's review behavior."
      />
      <div className="p-6 max-w-4xl mx-auto">
        <LearningsManager repos={activeRepos} />
      </div>
    </div>
  );
}
