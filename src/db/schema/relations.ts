import { relations } from 'drizzle-orm';
import { users } from './users';
import { accounts } from './accounts';
import { sessions } from './sessions';
import { repositories } from './repositories';
import { reviewJobs } from './reviewJobs';
import { learnings } from './learnings';

// A user can have many accounts (e.g., GitHub, Google)
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  repositories: many(repositories),
}));

// An account must belong to one user
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// A session must belong to one user
export const sessionsRelations = relations(sessions, ({ one }) => ({ 
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// A repository is activated by one user
export const repositoriesRelations = relations(repositories, ({ one, many }) => ({
  user: one(users, {
    fields: [repositories.userId],
    references: [users.id],
  }),
  reviewJobs: many(reviewJobs),
  learnings: many(learnings),
}));

// A review job belongs to one repository
export const reviewJobsRelations = relations(reviewJobs, ({ one }) => ({
  repository: one(repositories, {
    fields: [reviewJobs.repoId],
    references: [repositories.id],
  }),
}));

// A learning belongs to one repository
export const learningsRelations = relations(learnings, ({ one }) => ({
  repository: one(repositories, {
    fields: [learnings.repoId],
    references: [repositories.id],
  }),
}));