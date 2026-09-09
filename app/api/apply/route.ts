import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, linkedinUrl, aiUsage, why } = body;

    if (!name || !email || !phone || !linkedinUrl || !aiUsage || !why) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const application = await prisma.waitlistApplication.create({
      data: { name, email, phone, linkedinUrl, aiUsage, why },
    });

    return NextResponse.json(
      { success: true, message: 'Application received!', id: application.id },
      { status: 201 }
    );
  } catch (err: unknown) {
    // Unique constraint = duplicate email
    if (
      err instanceof Error &&
      err.message.includes('Unique constraint')
    ) {
      return NextResponse.json(
        { error: 'This email has already applied.' },
        { status: 409 }
      );
    }
    console.error('Apply API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
