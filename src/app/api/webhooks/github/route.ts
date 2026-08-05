import { NextResponse } from 'next/server';
import { verifyGitHubWebhook } from '@/lib/github-webhook';
import { db } from '@/index';
import { accounts } from '@/db/schema/accounts';
import { repositories } from '@/db/schema/repositories';
import { eq, inArray, and } from 'drizzle-orm';
import { inngest } from '@/inngest/client';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('x-hub-signature-256');
    const event = req.headers.get('x-github-event');
    const body = await req.text();

    const isValid = verifyGitHubWebhook(
      body,
      signature,
      process.env.GITHUB_WEBHOOK_SECRET
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized signature' }, { status: 401 });
    }

    const payload = JSON.parse(body);

    if (event === 'installation' && payload.action === 'created') {
      await handleRepositoriesAdded(payload.installation, payload.repositories);
    } 
    else if (event === 'installation_repositories' && payload.action === 'added') {
      await handleRepositoriesAdded(payload.installation, payload.repositories_added);
    }
    else if (event === 'installation_repositories' && payload.action === 'removed') {
      await handleRepositoriesRemoved(payload.installation.id, payload.repositories_removed);
    }
    else if (event === 'installation' && payload.action === 'deleted') {
      await handleInstallationDeleted(payload.installation.id);
    }
    else if (event === 'pull_request' && (payload.action === 'opened' || payload.action === 'synchronize' || payload.action === 'reopened')) {
      // Send event to Inngest for background processing
      await inngest.send({
        name: 'github/pull_request.opened',
        data: {
          pull_request: payload.pull_request,
          repositoryFullName: payload.repository.full_name,
          installationId: payload.installation?.id,
        },
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

interface GitHubAccount {
  id: number;
  login: string;
}

interface GitHubInstallation {
  id: number;
  account: GitHubAccount;
}

interface GitHubRepo {
  id: number;
  name?: string;
  full_name?: string;
}

async function handleRepositoriesAdded(installation: GitHubInstallation, repos: GitHubRepo[]) {
  if (!repos || repos.length === 0) return;

  const githubAccountId = installation.account.id.toString();
  const installationId = installation.id.toString();

  // Find the internal user associated with this GitHub account
  const matchedAccounts = await db
    .select()
    .from(accounts)
    .where(eq(accounts.providerAccountId, githubAccountId))
    .limit(1);

  if (matchedAccounts.length === 0) {
    console.error(`No internal user found for GitHub account ID: ${githubAccountId}`);
    return;
  }

  const userId = matchedAccounts[0].userId;

  // Map and insert the repositories
  const insertData = repos.map((repo: GitHubRepo) => ({
    githubRepoId: repo.id.toString(),
    name: repo.name || repo.full_name || 'Unnamed Repository',
    owner: installation.account.login,
    installationId: installationId,
    userId: userId,
    isActive: true,
  }));

  // ON CONFLICT DO UPDATE
  await db.insert(repositories)
    .values(insertData)
    .onConflictDoUpdate({
      target: repositories.githubRepoId,
      set: {
        isActive: true,
        installationId: installationId,
        userId: userId,
      }
    });
}

async function handleInstallationDeleted(installationId: number) {
  await db.update(repositories)
    .set({ isActive: false })
    .where(eq(repositories.installationId, installationId.toString()));
}

async function handleRepositoriesRemoved(installationId: number, repos: GitHubRepo[]) {
  if (!repos || repos.length === 0) return;

  const repoIds = repos.map((r) => r.id.toString());

  await db.update(repositories)
    .set({ isActive: false })
    .where(
      and(
        eq(repositories.installationId, installationId.toString()),
        inArray(repositories.githubRepoId, repoIds)
      )
    );
}
