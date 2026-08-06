"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, RefreshCw, BookOpen } from "lucide-react";
import { toast } from "sonner";

interface Repository {
  id: number;
  name: string;
  githubRepoId: string;
}

interface Learning {
  id: number;
  repoId: number;
  instruction: string;
  isActive: boolean;
  createdAt: string;
}

export function LearningsManager({ repos }: { repos: Repository[] }) {
  const [selectedRepoId, setSelectedRepoId] = useState<string>("");
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [newInstruction, setNewInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedRepoId) {
      fetchLearnings(selectedRepoId);
    } else {
      setLearnings([]);
    }
  }, [selectedRepoId]);

  const fetchLearnings = async (repoId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/learnings?repoId=${repoId}`);
      if (res.ok) {
        const data = await res.json();
        setLearnings(data);
      } else {
        toast.error("Failed to load learnings");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLearning = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstruction.trim() || !selectedRepoId) return;

    try {
      const res = await fetch("/api/learnings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoId: parseInt(selectedRepoId),
          instruction: newInstruction.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setLearnings([data, ...learnings]);
        setNewInstruction("");
        toast.success("Learning added successfully!");
      } else {
        toast.error("Failed to add learning");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving");
    }
  };

  const handleDeleteLearning = async (id: number) => {
    try {
      const res = await fetch(`/api/learnings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLearnings(learnings.filter((l) => l.id !== id));
        toast.success("Learning deleted");
      } else {
        toast.error("Failed to delete learning");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Repository</CardTitle>
          <CardDescription>
            Choose a repository to configure custom AI review rules for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {repos.length > 0 ? (
            <Select onValueChange={setSelectedRepoId} value={selectedRepoId}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a repository" />
              </SelectTrigger>
              <SelectContent>
                {repos.map((repo) => (
                  <SelectItem key={repo.id} value={repo.id.toString()}>
                    {repo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-muted-foreground text-sm">
              You don&apos;t have any active repositories. Connect some in the Repositories tab.
            </p>
          )}
        </CardContent>
      </Card>

      {selectedRepoId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Custom Instructions
            </CardTitle>
            <CardDescription>
              Teach the AI how your team writes code. These rules will be injected into every AI code review for this repository.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleAddLearning} className="flex gap-3">
              <Input
                placeholder="e.g., 'We use Tailwind CSS, do not suggest styled-components.'"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!newInstruction.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </form>

            <div className="space-y-4 pt-4 border-t">
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : learnings.length > 0 ? (
                learnings.map((learning) => (
                  <div
                    key={learning.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                  >
                    <span className="text-sm font-medium">{learning.instruction}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteLearning(learning.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  <p>No custom instructions found for this repository.</p>
                  <p className="text-sm mt-1">Add your first rule above!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
