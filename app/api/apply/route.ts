import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('CRITICAL: Supabase Environment Variables are missing.');
      return NextResponse.json({ error: 'Server configuration error: Missing database keys.' }, { status: 500 });
    }

    // Initialize Supabase HTTP client inside the request to guarantee runtime evaluation
    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await req.json();
    const { name, email, phone, linkedinUrl, aiUsage, why } = body;

    if (!name || !email || !phone || !linkedinUrl || !aiUsage || !why) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Prisma usually generates the ID for us, but since we switched to Supabase HTTP, 
    // we need to generate it manually before inserting.
    const id = crypto.randomUUID();

    // Insert into Supabase via HTTP REST API
    const { data, error } = await supabase
      .from('waitlist_applications')
      .insert([{ id, name, email, phone, linkedinUrl, aiUsage, why }])
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
