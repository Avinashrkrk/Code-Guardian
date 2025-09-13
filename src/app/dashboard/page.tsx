import { auth, signOut } from "@/auth/authSetup"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    return <p className="p-8 text-lg">You are not logged in.</p>
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Code Guardian 🚀</h1>
      <p className="text-lg">
        Logged in as <strong>{session.user?.email}</strong>
      </p>
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/" })
        }}
      >
        <Button variant="destructive" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  )
}
