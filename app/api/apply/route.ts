import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase HTTP client (works natively on Cloudflare Edge)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, linkedinUrl, aiUsage, why } = body;

    if (!name || !email || !phone || !linkedinUrl || !aiUsage || !why) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Insert into Supabase via HTTP REST API
    const { data, error } = await supabase
      .from('waitlist_applications')
      .insert([{ name, email, phone, linkedinUrl, aiUsage, why }])
      .select()
      .single();

    if (error) {
      // 23505 is the Postgres error code for unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email has already applied.' },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { success: true, message: 'Application received!', id: data.id },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Apply API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
