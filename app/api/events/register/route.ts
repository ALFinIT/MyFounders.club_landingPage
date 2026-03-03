import { NextRequest, NextResponse } from 'next/server';
import { appendLocalRecord } from '@/utils/localDb';
import { createAdminClient } from '@/utils/supabase/admin';

type RegistrationPayload = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  track: string;
  notes?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<RegistrationPayload>;
    const fullName = String(body?.fullName ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const company = String(body?.company ?? '').trim();
    const role = String(body?.role ?? '').trim();
    const track = String(body?.track ?? '').trim();
    const notes = String(body?.notes ?? '').trim();

    if (!fullName || !email || !company || !role || !track) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const record = {
      id: crypto.randomUUID(),
      fullName,
      email,
      company,
      role,
      track,
      notes,
      createdAt: now,
      source: 'events_page',
    };

    await appendLocalRecord('event_registrations.json', record);

    const supabase = createAdminClient();
    if (supabase) {
      try {
        await supabase.from('event_registrations').insert({
          registration_id: record.id,
          full_name: fullName,
          email,
          company,
          role,
          track,
          notes,
          source: 'events_page',
          created_at: now,
        });
      } catch (err) {
        console.error('Supabase event registration sync failed:', err);
      }
    }

    return NextResponse.json({ success: true, message: 'Registration submitted.' }, { status: 200 });
  } catch (error) {
    console.error('Event registration error:', error);
    return NextResponse.json({ error: 'Failed to submit registration.' }, { status: 500 });
  }
}
