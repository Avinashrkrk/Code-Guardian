import { pgTable, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';

// This table is used by Auth.js for "magic link" email sign-ins.
// Even if you're only using GitHub login now, it's required by the adapter.
export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [
    primaryKey({ columns: [vt.identifier, vt.token] }),
  ]
);

