import { NextResponse } from 'next/server';
import { supabase } from '../dbconnection';

export async function GET() {
  const { data, error } = await supabase.from('clients').select('*').limit(1);
  if (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
  return NextResponse.json({ success: true, data });
}