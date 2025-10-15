'use server';

import { auth, signOut } from '@/auth/authSetup';
import { db } from '@/index';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type FormState = {
  success?: string;
  error?: string;
} | null;

export async function updateUserProfile(
  prevState: FormState,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Not authenticated' };
  }

  const newName = formData.get('name') as string;
  if (!newName || newName.trim().length < 2) {
    return { error: 'Name must be at least 2 characters long.' };
  }

  try {
    await db
      .update(users)
      .set({ name: newName.trim() })
      .where(eq(users.id, session.user.id));

    revalidatePath('/dashboard', 'layout');
    revalidatePath('/dashboard/profile');

    return { success: 'Profile updated successfully!' };
  } catch (dbError) {
    console.error('Database error updating profile:', dbError);
    return { error: 'Failed to update profile. Please try again.' };
  }
}

export async function deleteUserAccount() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  try {
    await db.delete(users).where(eq(users.id, session.user.id));

    await signOut();
  } catch (dbError) {
    console.error('Database error deleting account:', dbError);
    throw new Error('Failed to delete account.');
  }

  redirect('/');
}

