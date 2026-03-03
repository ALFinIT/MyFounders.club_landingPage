import { NextRequest, NextResponse } from 'next/server';
import { appendLocalRecord } from '@/utils/localDb';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const now = new Date().toISOString();

    const submission = {
      id: crypto.randomUUID(),
      submittedAt: now,
      confirmed: true,
      user: body?.user ?? null,
      answers: body?.answers ?? {},
      meta: {
        source: 'gulf-survey',
      },
    };

    await appendLocalRecord('survey_submissions.json', submission);

    const supabase = createAdminClient();
    if (supabase) {
      void (async () => {
        try {
          await supabase.from('survey_submissions').insert({
            submission_id: submission.id,
            user_id: submission.user?.id ?? null,
            user_email: submission.user?.email ?? null,
            full_name: submission.answers?.fullName ?? null,
            company_name: submission.answers?.companyName ?? null,
            answers: submission.answers,
            submitted_at: now,
            source: 'gulf-survey',
          });
        } catch (err) {
          console.error('Supabase survey sync failed:', err);
        }
      })();
    }

    return NextResponse.json({ success: true, message: 'Survey submitted successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Survey submit error:', error);
    return NextResponse.json({ error: 'Failed to submit survey.' }, { status: 500 });
  }
}
