import { NextRequest, NextResponse } from 'next/server';
import { appendLocalRecordStrict, readLocalRecords } from '@/utils/localDb';
import { createAdminClient } from '@/utils/supabase/admin';

type SurveyAnswers = {
  fullName?: string;
  companyName?: string;
  role?: string;
  country?: string;
  industry?: string;
  stage?: string;
  barrier?: string;
};

function text(value: unknown) {
  return String(value ?? '').trim();
}

function validateAnswers(answers: SurveyAnswers) {
  const requiredChecks: Array<{ key: keyof SurveyAnswers; label: string }> = [
    { key: 'fullName', label: 'Full name' },
    { key: 'companyName', label: 'Company name' },
    { key: 'role', label: 'Role' },
    { key: 'country', label: 'GCC country' },
    { key: 'industry', label: 'Industry' },
    { key: 'stage', label: 'Funding stage' },
    { key: 'barrier', label: 'Biggest barrier' },
  ];

  for (const item of requiredChecks) {
    if (!text(answers[item.key])) {
      return `${item.label} is required.`;
    }
  }

  if (text(answers.fullName).length < 2) {
    return 'Full name must be at least 2 characters.';
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const now = new Date().toISOString();
    const clientSubmissionId = text(body?.clientSubmissionId);
    const answers = (body?.answers ?? {}) as SurveyAnswers;
    const validationError = validateAnswers(answers);

    if (!clientSubmissionId) {
      return NextResponse.json({ error: 'Missing submission id.' }, { status: 400 });
    }
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const existingLocal = (await readLocalRecords('survey_submissions.json')) as Array<{ clientSubmissionId?: string }>;
    if (existingLocal.some((item) => item?.clientSubmissionId === clientSubmissionId)) {
      return NextResponse.json(
        { success: true, duplicate: true, message: 'Submission already received.' },
        { status: 200 }
      );
    }

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Survey storage is unavailable.' }, { status: 503 });
    }

    const { data: existingRemote, error: duplicateCheckError } = await supabase
      .from('survey_submissions')
      .select('submission_id')
      .eq('submission_id', clientSubmissionId)
      .limit(1);

    if (duplicateCheckError) {
      console.error('Survey duplicate check failed:', duplicateCheckError);
      return NextResponse.json({ error: 'Failed to validate submission state.' }, { status: 500 });
    }
    if (Array.isArray(existingRemote) && existingRemote.length > 0) {
      return NextResponse.json(
        { success: true, duplicate: true, message: 'Submission already received.' },
        { status: 200 }
      );
    }

    const submission = {
      id: crypto.randomUUID(),
      clientSubmissionId,
      submittedAt: now,
      confirmed: true,
      user: body?.user ?? null,
      answers,
      meta: {
        source: 'gulf-survey',
      },
    };

    const { error: insertError } = await supabase.from('survey_submissions').insert({
      submission_id: clientSubmissionId,
      user_id: submission.user?.id ?? null,
      user_email: submission.user?.email ?? null,
      full_name: text(answers.fullName) || null,
      company_name: text(answers.companyName) || null,
      answers,
      submitted_at: now,
      source: 'gulf-survey',
    });

    if (insertError) {
      console.error('Supabase survey insert failed:', insertError);
      return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 });
    }

    await appendLocalRecordStrict('survey_submissions.json', submission);

    return NextResponse.json(
      { success: true, message: 'Survey submitted successfully.', submissionId: clientSubmissionId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Survey submit error:', error);
    return NextResponse.json({ error: 'Failed to submit survey.' }, { status: 500 });
  }
}
