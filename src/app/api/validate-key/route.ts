import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { apiKey } = await req.json();
    if (!apiKey) {
      return NextResponse.json({ valid: false, error: 'API key is required.' }, { status: 400 });
    }

    // Fetch all API keys from Supabase
    const { data, error } = await supabase.from('api_keys').select('value');
    if (error) {
      return NextResponse.json({ valid: false, error: 'Database error.' }, { status: 500 });
    }

    const isValid = data?.some((row: { value: string }) => row.value === apiKey);
    if (isValid) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false, error: 'Invalid API key.' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ valid: false, error: 'Invalid request.' }, { status: 400 });
  }
}
