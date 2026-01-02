import { NextResponse } from 'next/server';
import { customWords } from './customWords';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { word } = await request.json();
  if (customWords.includes(word)) {
    return NextResponse.json({ isValid: true });
  }
  let isValid = false;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    isValid = data.title !== "No Definitions Found";
  } catch (error) {
    console.error('Error fetching word:', error);
    return NextResponse.json({ error: 'Failed to fetch word' }, { status: 500 });
  }

  return NextResponse.json({ isValid });
}
