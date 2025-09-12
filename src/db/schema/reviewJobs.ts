import { pgTable, text, serial, integer, timestamp } from 'drizzle-orm/pg-core';
import { repositories } from './repositories';

export const reviewJobs = pgTable('review_jobs', {
  id: serial('id').primaryKey(),
  repoId: integer('repo_id')
    .notNull()
    .references(() => repositories.id, { onDelete: 'cascade' }),
  pullRequestNumber: text('pull_request_number').notNull(),
  status: text('status', {
    enum: ['queued', 'in_progress', 'completed', 'failed'],
  })
    .default('queued')
    .notNull(),
  inngestJobId: text('inngest_job_id').unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});