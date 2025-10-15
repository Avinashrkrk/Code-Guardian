'use client';

import { type User } from 'next-auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateUserProfile, deleteUserAccount } from '@/app/actions/user';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="hover-glow">
      {pending ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}

type ProfileFormProps = {
  user: User;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction] = useActionState(updateUserProfile, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <div className="space-y-8">
      <form action={formAction} id="profile-form" className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>
              This is your personal information from your GitHub account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Primary Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email ?? ''}
                disabled
                className="h-11 bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name ?? ''}
                placeholder="Your full name"
                className="h-11 bg-background"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-6 flex justify-end">
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            This action is permanent and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={deleteUserAccount}
            onSubmit={(e) => {
              if (
                !window.confirm(
                  'Are you sure you want to delete your account? This action is irreversible.'
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/5">
              <div>
                <Label className="text-destructive">Delete Account</Label>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <Button variant="destructive" type="submit">
                Delete Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

