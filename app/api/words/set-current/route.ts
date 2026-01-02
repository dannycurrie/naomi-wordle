import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const currentWord = await prisma.word.findFirst({
        where: { isCurrentWord: true },
    });
    if (currentWord) {
        await prisma.word.update({
            where: { id: currentWord.id },
            data: { isCurrentWord: false },
        });
    }

    try {
        const { id } = await request.json();
        await prisma.word.update({
            where: { id: id },
            data: { isCurrentWord: true },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error setting current word:', error);
        return NextResponse.json({ error: 'Failed to set current word' }, { status: 500 });
    }
}