import { auth } from '@/auth/authSetup';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/dashboard/profile/profle';
import { DashboardHeader } from '@/components/dashboard/header';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        title="Profile"
        description="Manage your personal and account settings."
        actionLabel="Save Changes"
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <ProfileForm user={session.user} />
        </div>
      </div>
    </div>
  );
}

