import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Word } from '@prisma/client';
import { WordOption } from '@/app/types';

export const dynamic = 'force-dynamic';

const formatWords = (words: Word[]): WordOption[] => {
  if (!words) {
    return [];
  }
  return words.map((word: Word): WordOption => ({
    id: parseInt(word.id.toString()),
    word: word.word || '',
    createdAt: word.createdAt.toISOString(),
    isCurrentWord: word.isCurrentWord || false,
  }));
}

export async function GET() {
  try {
    
    const words = await prisma.word.findMany({
      select: {
        id: true,
        word: true,
        createdAt: true,
        isCurrentWord: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ words: formatWords(words) });
  } catch (error) {
    console.error('Error fetching words:', error);
    return NextResponse.json(
      { error: 'Failed to fetch words' },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  const { word } = await request.json();
  
  // Validate word length (4-10 characters)
  if (!word || typeof word !== 'string') {
    return NextResponse.json(
      { error: 'Word is required and must be a string' },
      { status: 400 }
    );
  }

  const wordLength = word.trim().length;
  if (wordLength < 4 || wordLength > 10) {
    return NextResponse.json(
      { error: 'Word must be between 4 and 10 characters long' },
      { status: 400 }
    );
  }

  await prisma.word.create({
    data: { word: word.trim().toUpperCase() },
  });
  return NextResponse.json({ success: true });
}
