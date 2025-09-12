import { pgTable, text, serial, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const repositories = pgTable('repositories', {
  id: serial('id').primaryKey(),
  githubRepoId: text('github_repo_id').notNull().unique(),
  name: text('name').notNull(),
  owner: text('owner').notNull(),
  installationId: text('installation_id').notNull(),
  isActive: boolean('is_active').default(true),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});