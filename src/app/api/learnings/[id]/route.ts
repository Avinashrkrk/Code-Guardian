import { NextResponse } from 'next/server';
import { db } from '@/index';
import { learnings } from '@/db/schema/learnings';
import { repositories } from '@/db/schema/repositories';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth/authSetup';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const learningId = parseInt(resolvedParams.id);

    // Verify ownership of the learning's repository
    const learningCheck = await db.select({
      repoId: learnings.repoId,
      userId: repositories.userId
    })
    .from(learnings)
    .innerJoin(repositories, eq(learnings.repoId, repositories.id))
    .where(eq(learnings.id, learningId))
    .limit(1);

    if (learningCheck.length === 0 || learningCheck[0].userId !== session.user.id) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
    }

    await db.delete(learnings).where(eq(learnings.id, learningId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting learning:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
