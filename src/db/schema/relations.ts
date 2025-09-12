import { relations } from 'drizzle-orm';
import { users } from './users';
import { accounts } from './accounts';
import { repositories } from './repositories';
import { reviewJobs } from './reviewJobs';

// A user can have many accounts (e.g., GitHub, Google)
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  repositories: many(repositories),
}));

// An account must belong to one user
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
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
}));

// A review job belongs to one repository
export const reviewJobsRelations = relations(reviewJobs, ({ one }) => ({
  repository: one(repositories, {
    fields: [reviewJobs.repoId],
    references: [repositories.id],
  }),
}));