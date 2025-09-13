import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Code Guardian",
  description: "Sign in to your Code Guardian account",
};

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome Back"
      subtitle="Login using one of the following providers:"
    >
      <LoginForm />
    </AuthLayout>
  );
}