import { NextRequest, NextResponse } from 'next/server';
import { appendLocalRecord } from '@/utils/localDb';
import { createAdminClient } from '@/utils/supabase/admin';

const FIREBASE_WAITLIST_URL = process.env.FIREBASE_WAITLIST_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, country, stage, goal } = body ?? {};

    if (!firstName || !lastName || !email || !country || !stage || !goal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const record = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      country,
      stage,
      goal,
      source: 'landing_waitlist',
      createdAt: now,
    };

    await appendLocalRecord('applications.json', record);

    const supabase = createAdminClient();
    if (supabase) {
      void (async () => {
        try {
          await supabase.from('waitlist_applications').insert({
            application_id: record.id,
            first_name: firstName,
            last_name: lastName,
            email,
            country,
            stage,
            goal,
            source: 'landing_waitlist',
            created_at: now,
          });
        } catch (err) {
          console.error('Supabase waitlist sync failed:', err);
        }
      })();
    }

    if (FIREBASE_WAITLIST_URL) {
      void (async () => {
        try {
          await fetch(FIREBASE_WAITLIST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record),
          });
        } catch (err) {
          console.error('Firebase waitlist sync failed:', err);
        }
      })();
    }

    return NextResponse.json(
      { success: true, message: 'Waitlist submission stored successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist route error:', error);
    return NextResponse.json({ error: 'Failed to process waitlist request' }, { status: 500 });
  }
}
