import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import 'server-only';

// We removed the manual dotenv configuration.
// Next.js automatically loads variables from .env.local into process.env.
// The 'server-only' package prevents this file from ever being included in a client-side bundle.

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
