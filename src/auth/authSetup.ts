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

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      authorization: {
        params: {
          scope: 'repo read:user user:email',
        },
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        token.tokenType = account.token_type;
        token.scope = account.scope;
        token.provider = account.provider;
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







// import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
// import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import { db } from '@/index';

// import { users } from '@/db/schema/users';
// import { accounts } from '@/db/schema/accounts';
// import { sessions } from '@/db/schema/sessions';
// import { verificationTokens } from '@/db/schema/verificationTokens';

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   adapter: DrizzleAdapter(db, {
//     usersTable: users,
//     accountsTable: accounts,
//     sessionsTable: sessions,
//     verificationTokensTable: verificationTokens,
//   }),
//   session: {
//     strategy: 'jwt',
//   },

//   // 2. Configure the GitHub Provider with your credentials
//   providers: [
//     GitHub({
//       clientId: process.env.AUTH_GITHUB_ID,
//       clientSecret: process.env.AUTH_GITHUB_SECRET,
//       authorization: {
//         params: {
//           scope: 'repo read:user user:email',
//         },
//       },
//     }),
//   ],

//   // 3. Add a callback to enrich the session object
//   callbacks: {
//     async jwt({ token, account }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//         token.expiresAt = account.expires_at;
//         token.tokenType = account.token_type;
//         token.scope = account.scope;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       // Ensure we always have the user id available from the JWT subject
//       const anySession = session as any;
//       anySession.user = anySession.user ?? {};
//       anySession.user.id = (token?.sub as string | undefined) ?? (user as any)?.id ?? anySession.user.id;
//       // expose tokens to server components
//       anySession.accessToken = token?.accessToken as string | undefined;
//       anySession.refreshToken = token?.refreshToken as string | undefined;
//       anySession.expiresAt = token?.expiresAt as number | undefined;
//       return anySession;
//     },
//   },
// });

