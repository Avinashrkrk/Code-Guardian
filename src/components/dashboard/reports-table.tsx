"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";

export type ReportJob = {
  id: number;
  repoName: string;
  repoOwner: string;
  pullRequestNumber: string;
  status: "queued" | "in_progress" | "completed" | "failed";
  createdAt: Date;
  completedAt: Date | null;
};

interface ReportsTableProps {
  jobs: ReportJob[];
}

export function ReportsTable({ jobs }: ReportsTableProps) {
  const router = useRouter();

  useEffect(() => {
    // Refresh the page data every 5 seconds to get real-time status updates
    const interval = setInterval(() => {
      router.refresh();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [router]);

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-lg border-dashed">
        <p className="text-muted-foreground text-center">
          No review reports found. <br />
          Open a Pull Request on one of your active repositories to see Code Guardian in action!
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: ReportJob["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      case "in_progress":
        return (
          <Badge variant="outline" className="text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Reviewing
          </Badge>
        );
      case "queued":
      default:
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Queued
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Repository</TableHead>
            <TableHead>Pull Request</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => {
            const prUrl = `https://github.com/${job.repoOwner}/${job.repoName}/pull/${job.pullRequestNumber}`;
            
            let durationStr = "-";
            if (job.completedAt) {
              const diffMs = job.completedAt.getTime() - job.createdAt.getTime();
              const diffSec = Math.round(diffMs / 1000);
              if (diffSec < 60) durationStr = `${diffSec}s`;
              else durationStr = `${Math.floor(diffSec / 60)}m ${diffSec % 60}s`;
            }

            return (
              <TableRow key={job.id}>
                <TableCell className="font-medium">
                  {job.repoOwner}/{job.repoName}
                </TableCell>
                <TableCell>
                  <a
                    href={prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    #{job.pullRequestNumber}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(job.createdAt, { addSuffix: true })}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {durationStr}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
