import { pgTable, text, serial, integer, timestamp, boolean } from 'drizzle-orm/pg-core';
import { repositories } from './repositories';

export const learnings = pgTable('learnings', {
  id: serial('id').primaryKey(),
  repoId: integer('repo_id')
    .notNull()
    .references(() => repositories.id, { onDelete: 'cascade' }),
  instruction: text('instruction').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
