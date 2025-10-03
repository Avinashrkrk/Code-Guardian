"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function DashboardHeader({
  title = "Repositories",
  description = "List of repositories accessible to Code Guardian.",
  actionLabel = "Add Repositories",
  onAction,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <Button
          onClick={onAction}
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow"
        >
          <Plus className="w-5 h-5 mr-2" />
          {actionLabel}
        </Button>
      </div>
    </header>
  );
}