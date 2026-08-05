import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processPrReview } from "@/inngest/functions";

export const maxDuration = 60; // Allow Vercel to run up to 60 seconds (useful for AI calls)

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processPrReview,
  ],
});
