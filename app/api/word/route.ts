import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Find the word where is_current_word is true
    const currentWord = await prisma.word.findFirst({
      where: {
        isCurrentWord: true,
      },
    });

    if (!currentWord || !currentWord.word) {
      return NextResponse.json(
        { error: 'No current word found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ word: currentWord.word });
  } catch (error) {
    console.error('Error fetching current word:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current word' },
      { status: 500 }
    );
  }
}

