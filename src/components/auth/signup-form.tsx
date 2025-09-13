"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export function SignupForm() {
  const providers = [
    {
      name: "GitHub",
      icon: Github,
      onClick: () => signIn("github", { callbackUrl: "/dashboard" }),
    },
    {
      name: "Google",
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      onClick: () => console.log("Google signup"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Trial Info */}
      <div className="text-center space-y-3">
        <p className="text-muted-foreground">
          Get a <span className="font-semibold text-primary">free 14-day trial</span> for your entire team when
          <br />
          you sign up with your Git provider.
        </p>
      </div>

      {/* OAuth Providers */}
      <div className="space-y-4">
        {providers.map((provider) => {
          const Icon = provider.icon;
          return (
            <Button
              key={provider.name}
              variant="outline"
              className="w-full h-14 text-left justify-start space-x-4 border-border/50 text-foreground hover:text-primary bg-background/50 backdrop-blur-sm"
              onClick={provider.onClick}
            >
              <Icon className="w-6 h-6" />
              <span className="font-medium text-base">{provider.name}</span>
            </Button>
          );
        })}
      </div>

      {/* Sign In Link */}
      <div className="text-center pt-4">
        <span className="text-sm text-muted-foreground">
          Existing user?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Log In
          </Link>
        </span>
      </div>

      {/* Self-Hosted Link */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Switch to{" "}
          <Link href="/self-hosted" className="text-primary hover:underline">
            Self-Hosted Services
          </Link>
        </span>
      </div>
    </div>
  );
}



// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { Github, GitlabIcon as Gitlab } from "lucide-react";

// export function SignupForm() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // Handle signup logic here
//     setTimeout(() => setIsLoading(false), 2000);
//   };

//   const providers = [
//     {
//       name: "GitHub",
//       icon: Github,
//       onClick: () => console.log("GitHub signup"),
//     },
//     {
//       name: "GitLab",
//       icon: Gitlab,
//       onClick: () => console.log("GitLab signup"),
//     },
//     {
//       name: "Azure DevOps",
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M0 12v7.5l6.5-1.5v-12L0 12zm8.5-8v16L23 24V8.5L8.5 4z"/>
//         </svg>
//       ),
//       onClick: () => console.log("Azure DevOps signup"),
//     },
//     {
//       name: "Bitbucket",
//       icon: () => (
//         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M0 7.684L1.581.924a.544.544 0 0 1 .524-.415h19.79a.544.544 0 0 1 .524.657l-2.788 15.952a.544.544 0 0 1-.524.431H4.893a.544.544 0 0 1-.524-.431L0 7.684zm14.5 4.895h-3.25L10 8.421h6.5l-2 4.158z"/>
//         </svg>
//       ),
//       onClick: () => console.log("Bitbucket signup"),
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Trial Info */}
//       <div className="text-center space-y-2">
//         <p className="text-muted-foreground">
//           Get a <span className="font-semibold text-primary">free 14-day trial</span> for your entire team when
//           <br />
//           you sign up with your Git provider.
//         </p>
//       </div>

//       {/* OAuth Providers */}
//       <div className="space-y-3">
//         {providers.map((provider) => {
//           const Icon = provider.icon;
//           return (
//             <Button
//               key={provider.name}
//               variant="outline"
//               className="w-full h-12 text-left justify-start space-x-3 border-border hover:bg-accent/50"
//               onClick={provider.onClick}
//             >
//               <Icon className="w-5 h-5" />
//               <span className="font-medium">{provider.name}</span>
//             </Button>
//           );
//         })}
//       </div>

//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <Separator />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Or continue with email
//           </span>
//         </div>
//       </div>

//       {/* Email/Password Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-2">
//           <label htmlFor="fullName" className="text-sm font-medium text-foreground">
//             Full name
//           </label>
//           <Input
//             id="fullName"
//             name="fullName"
//             type="text"
//             value={formData.fullName}
//             onChange={handleChange}
//             placeholder="Enter your full name"
//             required
//             className="h-11"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="email" className="text-sm font-medium text-foreground">
//             Email address
//           </label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="name@company.com"
//             required
//             className="h-11"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="password" className="text-sm font-medium text-foreground">
//             Password
//           </label>
//           <Input
//             id="password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Create a strong password"
//             required
//             className="h-11"
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
//             Confirm password
//           </label>
//           <Input
//             id="confirmPassword"
//             name="confirmPassword"
//             type="password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm your password"
//             required
//             className="h-11"
//           />
//         </div>

//         <div className="flex items-start space-x-2">
//           <input
//             id="terms"
//             type="checkbox"
//             required
//             className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
//           />
//           <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
//             I agree to the{" "}
//             <Link href="/terms" className="text-primary hover:underline">
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link href="/privacy" className="text-primary hover:underline">
//               Privacy Policy
//             </Link>
//           </label>
//         </div>

//         <Button
//           type="submit"
//           className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90"
//           disabled={isLoading}
//         >
//           {isLoading ? "Creating account..." : "Create account"}
//         </Button>
//       </form>

//       {/* Sign In Link */}
//       <div className="text-center">
//         <span className="text-sm text-muted-foreground">
//           Existing user?{" "}
//           <Link href="/auth/login" className="text-primary hover:underline font-medium">
//             Log In
//           </Link>
//         </span>
//       </div>

//       {/* Self-Hosted Link */}
//       <div className="text-center">
//         <span className="text-sm text-muted-foreground">
//           Switch to{" "}
//           <Link href="/self-hosted" className="text-primary hover:underline">
//             Self-Hosted Services
//           </Link>
//         </span>
//       </div>
//     </div>
//   );
// }