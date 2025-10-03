"use client";

import { useState } from "react";
import { handleLogout } from "@/app/actions/signout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Database,
  LayoutDashboard,
  Plug,
  FileText,
  BookOpen,
  Building2,
  ChevronLeft,
  ChevronDown,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";


interface DashboardSidebarProps {
  user?: {
    name?: string | null;
    image?: string | null;  
  };
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOrgSettingsOpen, setIsOrgSettingsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navigationItems = [
    { name: "Repositories", href: "/dashboard", icon: Database },
    { name: "Dashboard", href: "/dashboard/overview", icon: LayoutDashboard, locked: true },
    { name: "Integrations", href: "/dashboard/integrations", icon: Plug, locked: true },
    { name: "Reports", href: "/dashboard/reports", icon: FileText, locked: true },
    { name: "Learnings", href: "/dashboard/learnings", icon: BookOpen },
  ];

  const orgSettingsItems = [
    { name: "Configuration", href: "/dashboard/settings/config" },
    { name: "API Keys", href: "/dashboard/settings/api" },
  ];

  // const bottomItems = [
  //   { name: "Docs", href: "/docs", icon: FileCode },
  //   { name: "Support", href: "/support", icon: HelpCircle },
  // ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 relative`}
    >
      <div className="p-4 border-b border-sidebar-border">
        <button className="flex items-center space-x-3 w-full hover:bg-sidebar-accent rounded-lg p-2 transition-colors">
          <Image
            src="/logo.png"
            alt="Organization"
            width={32}
            height={32}
            className="rounded-full flex-shrink-0"
          />
          {!isCollapsed && (
            <>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sidebar-foreground text-sm">
                  Code Guardian
                </div>
              </div>
            </>
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.locked ? "#" : item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  } ${item.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={(e) => item.locked && e.preventDefault()}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-sm font-medium">{item.name}</span>
                      {item.locked && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                        </svg>
                      )}
                    </>
                  )}
                </Link>
              </li>
            );
          })}

          <li>
            <button
              onClick={() => setIsOrgSettingsOpen(!isOrgSettingsOpen)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50 w-full"
            >
              <Building2 className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm font-medium">
                    Organization Settings
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isOrgSettingsOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>
            {!isCollapsed && isOrgSettingsOpen && (
              <ul className="ml-8 mt-1 space-y-1">
                {orgSettingsItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* <li>
            <Link
              href="/dashboard/subscription"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <CreditCard className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">Subscription</span>}
            </Link>
          </li> */}
        </ul>

        {/* <ul className="mt-6 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-accent/50"
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul> */}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 flex-1">
            <Image
              src={user?.image || "/default-avatar.png"}  
              alt="User"
              width={32}
              height={32}
              className="rounded-full flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-sidebar-foreground truncate">
                {user?.name || "GitHub User"}
                </div>
                <div className="text-xs text-sidebar-foreground/60">Admin</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-lg"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
            
          <form action={handleLogout}>
          {!isCollapsed && (
            <Button variant="ghost" size="icon" className="rounded-lg" title="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          )}
          </form>
        </div>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-sidebar-accent border border-sidebar-border rounded-full flex items-center justify-center hover:bg-sidebar-accent/80 transition-colors z-10"
      >
        <ChevronLeft
          className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
        />
      </button>
    </aside>
  );
}