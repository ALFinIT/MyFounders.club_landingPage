import { NextRequest, NextResponse } from 'next/server';
import { appendLocalRecord } from '@/utils/localDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, country, stage, goal } = body ?? {};

    if (!firstName || !lastName || !email || !country || !stage || !goal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await appendLocalRecord('applications.json', {
      firstName,
      lastName,
      email,
      country,
      stage,
      goal,
      source: 'landing_waitlist',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Waitlist submission stored successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist route error:', error);
    return NextResponse.json({ error: 'Failed to process waitlist request' }, { status: 500 });
  }
}
