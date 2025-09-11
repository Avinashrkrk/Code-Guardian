'use server';

import { db } from "../index";
import { usersTable } from "@/db/schema/users";
import { revalidatePath } from "next/cache";

export async function createUser(_formData: FormData): Promise<void> {
    // This is a Server Action. It only runs on the server.
    const user: typeof usersTable.$inferInsert = {
        name: 'Aman',
        age: 20,
        email: 'aman@example.com',
      };
      
    try {
        await db.insert(usersTable).values(user);
        console.log('New user created!');
        // Optional: Revalidate the page to show new data if you were displaying a list of users.
        revalidatePath('/');
    } catch (error) {
        console.error("Error creating user:", error);
        // Intentionally do not return a value to satisfy Promise<void> signature
    }
}
