import { DashboardSidebar } from "@/components/dashboard/sidebar";
// import { DashboardHeader } from "@/components/dashboard/header";
import { auth } from "@/auth/authSetup";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar user={session?.user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <DashboardHeader /> */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}