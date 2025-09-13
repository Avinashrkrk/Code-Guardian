"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Left Panel - Auth Form */}
      <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-16 xl:px-20 overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-80">
          {/* Header - More Compact */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/logo.png"
                alt="Code Guardian"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="font-display font-bold text-lg gradient-text">
                Code Guardian
              </span>
            </div>
            
            <h2 className="text-2xl font-display font-bold text-foreground mb-1">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          {/* Auth Form */}
          {children}
        </div>
      </div>

      {/* Right Panel - Hero Content */}
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        
        {/* Theme Toggle */}
        {/* <div className="absolute top-6 right-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div> */}

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-12">
          <div className="max-w-md">
            <h3 className="font-display text-3xl font-bold text-foreground mb-4">
              Empower Your Team
              <br />
              <span className="gradient-text">Fewer Bugs. Smarter Reviews.</span>
              <br />
              Every Commit.
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              From solo developers to enterprise teams, CodeGuardian streamlines code reviews, improves collaboration, and accelerates your path to production.
            </p>
            
            {/* Features */}
            {/* <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">14 Days Free Trial</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">No Credit Card Needed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Setup in 2 minutes</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="absolute bottom-6 left-12 right-12">
          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            applicable to Code Guardian
          </div>
        </div>
      </div>
    </div>
  );
}












// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// interface AuthLayoutProps {
//   children: React.ReactNode;
//   title: string;
//   subtitle?: string;
// }

// export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
//   const { theme, setTheme } = useTheme();

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Left Panel - Auth Form */}
//       <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
//         <div className="mx-auto w-full max-w-sm lg:w-96">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex items-center space-x-2 mb-8">
//               <Image
//                 src="/logo.png"
//                 alt="Code Guardian"
//                 width={32}
//                 height={32}
//                 className="w-8 h-8"
//               />
//               <span className="font-display font-bold text-xl gradient-text">
//                 Code Guardian
//               </span>
//             </div>
            
//             <h2 className="text-3xl font-display font-bold text-foreground mb-2">
//               {title}
//             </h2>
//             {subtitle && (
//               <p className="text-muted-foreground">
//                 {subtitle}
//               </p>
//             )}
//           </div>

//           {/* Auth Form */}
//           {children}
//         </div>
//       </div>

//       {/* Right Panel - Hero Content */}
//       <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        
//         {/* Theme Toggle */}
//         <div className="absolute top-6 right-6">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//             className="rounded-full"
//           >
//             <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           </Button>
//         </div>

//         {/* Content */}
//         <div className="relative h-full flex flex-col justify-center px-12">
//           <div className="max-w-md">
//             <h3 className="font-display text-3xl font-bold text-foreground mb-4">
//               Cut Code Review Time
//               <br />
//               <span className="gradient-text">& Bugs in Half.</span>
//               <br />
//               Instantly.
//             </h3>
//             <p className="text-lg text-muted-foreground mb-8">
//               Supercharge your team to ship faster with the most advanced AI code reviews.
//             </p>
            
//             {/* Features */}
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-primary rounded-full"></div>
//                 <span className="text-muted-foreground">14 Days Free Trial</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-primary rounded-full"></div>
//                 <span className="text-muted-foreground">No Credit Card Needed</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-2 h-2 bg-primary rounded-full"></div>
//                 <span className="text-muted-foreground">Setup in 2 minutes</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Links */}
//         <div className="absolute bottom-6 left-12 right-12">
//           <div className="text-center text-sm text-muted-foreground">
//             By continuing, you agree to the{" "}
//             <a href="/terms" className="text-primary hover:underline">
//               Terms of Use
//             </a>{" "}
//             and{" "}
//             <a href="/privacy" className="text-primary hover:underline">
//               Privacy Policy
//             </a>{" "}
//             applicable to Code Guardian
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }