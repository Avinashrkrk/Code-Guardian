import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/index';

import { users } from '@/db/schema/users';
import { accounts } from '@/db/schema/accounts';
import { sessions } from '@/db/schema/sessions';
import { verificationTokens } from '@/db/schema/verificationTokens';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      issuer: 'https://github.com/login/oauth',
      authorization: {
        params: {
          scope: 'repo read:user user:email',
        },
      },
    }),
    ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.tokenType = account.token_type;
        token.scope = account.scope;
        token.provider = account.provider;
      }
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Safely extend the session object without using `any`
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id:
            (token?.sub as string | undefined) ??
            (user as { id?: string })?.id ??
            session.user?.id,
        },
        accessToken: token?.accessToken as string | undefined,
        refreshToken: token?.refreshToken as string | undefined,
        expiresAt: token?.expiresAt as number | undefined,
        provider: token?.provider as string | undefined,
      };

      return updatedSession;
    },
  },
});


