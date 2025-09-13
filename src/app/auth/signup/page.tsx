import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started - Code Guardian",
  description: "Create your Code Guardian account and start your free trial",
};

export default function SignupPage() {
  return (
    <AuthLayout 
      title="Get Started"
    >
      <SignupForm />
    </AuthLayout>
  );
}