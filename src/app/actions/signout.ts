"use server";

import { signOut } from "@/auth/authSetup";

export async function handleLogout() {
  await signOut({ redirectTo: "/" });
}