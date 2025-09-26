import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

// This table is required by Auth.js to store user session data.
export const sessions = pgTable('sessions', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

