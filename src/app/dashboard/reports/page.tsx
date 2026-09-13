import { auth } from "@/auth/authSetup";
import { db } from "@/index";
import { reviewJobs } from "@/db/schema/reviewJobs";
import { repositories } from "@/db/schema/repositories";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { ReportsTable, type ReportJob } from "@/components/dashboard/reports-table";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Fetch all review jobs joined with their repository details for the current user
  const jobsData = await db
    .select({
      id: reviewJobs.id,
      pullRequestNumber: reviewJobs.pullRequestNumber,
      status: reviewJobs.status,
      createdAt: reviewJobs.createdAt,
      completedAt: reviewJobs.completedAt,
      repoName: repositories.name,
      repoOwner: repositories.owner,
    })
    .from(reviewJobs)
    .innerJoin(repositories, eq(reviewJobs.repoId, repositories.id))
    .where(eq(repositories.userId, session.user.id))
    .orderBy(desc(reviewJobs.createdAt));

  // The status enum from drizzle maps directly to our typescript type
  const jobs: ReportJob[] = jobsData.map(job => ({
    ...job,
    status: job.status as ReportJob["status"]
  }));

  return (
    <div className="h-full flex flex-col">
      <DashboardHeader
        title="Reports & History"
        description="View a history of all Pull Request reviews processed by Code Guardian."
      />
      
      <div className="flex-1 mt-4">
        <ReportsTable jobs={jobs} />
      </div>
    </div>
  );
}
