import { NextResponse } from 'next/server';
import { db } from '@/index';
import { learnings } from '@/db/schema/learnings';
import { repositories } from '@/db/schema/repositories';
import { eq, and, desc } from 'drizzle-orm';
import { auth } from '@/auth/authSetup';

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const repoIdStr = searchParams.get('repoId');
    
    if (!repoIdStr) {
      return NextResponse.json({ error: 'repoId is required' }, { status: 400 });
    }

    const repoId = parseInt(repoIdStr);

    // Ensure the repo belongs to the user
    const repoCheck = await db.select().from(repositories)
      .where(and(eq(repositories.id, repoId), eq(repositories.userId, session.user.id)))
      .limit(1);

    if (repoCheck.length === 0) {
      return NextResponse.json({ error: 'Repository not found or unauthorized' }, { status: 404 });
    }

    const data = await db.select().from(learnings)
      .where(eq(learnings.repoId, repoId))
      .orderBy(desc(learnings.createdAt));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching learnings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { repoId, instruction } = body;

    if (!repoId || !instruction) {
      return NextResponse.json({ error: 'repoId and instruction are required' }, { status: 400 });
    }

    // Ensure the repo belongs to the user
    const repoCheck = await db.select().from(repositories)
      .where(and(eq(repositories.id, repoId), eq(repositories.userId, session.user.id)))
      .limit(1);

    if (repoCheck.length === 0) {
      return NextResponse.json({ error: 'Repository not found or unauthorized' }, { status: 404 });
    }

    const newLearning = await db.insert(learnings).values({
      repoId,
      instruction,
    }).returning();

    return NextResponse.json(newLearning[0]);
  } catch (error) {
    console.error('Error creating learning:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
