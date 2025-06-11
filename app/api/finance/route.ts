import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// export async function GET() {
//   const supabase = await createClient();
//   const { data: pending_to_pay } = await supabase.from("servic").select('*');

//   if (!pending_to_pay) {
//     return NextResponse.json({ error: 'No data found' }, { 
//       status: 404,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
//   return NextResponse.json(pending_to_pay, { 
//     status: 200,
//     headers: { 'Content-Type': 'application/json' }
//   });
// }
export async function GET(request: Request) {
  // For example, fetch data from your DB here
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
