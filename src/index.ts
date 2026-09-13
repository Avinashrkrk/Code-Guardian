import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import dns from 'dns';
import 'server-only';

// Fix for Node.js 18+ fetch throwing ENOTFOUND on IPv6 connections to Neon DB in local environments
dns.setDefaultResultOrder('ipv4first');


if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
