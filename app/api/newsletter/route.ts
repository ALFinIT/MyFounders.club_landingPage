import { NextRequest, NextResponse } from 'next/server';
import { appendLocalRecord } from '@/utils/localDb';
import { createAdminClient } from '@/utils/supabase/admin';

// Beehiiv V2 Configuration (Recommended)
const BEEHIIV_API_KEY_V2 = process.env.BEEHIIV_API_KEY_V2;
const BEEHIIV_API_URL_V2 = process.env.BEEHIIV_API_URL_V2;

// Beehiiv V1 Configuration (Fallback)
const BEEHIIV_API_KEY_V1 = process.env.BEEHIIV_API_KEY_V1;
const BEEHIIV_API_URL_V1 = process.env.BEEHIIV_API_URL_V1;

// Legacy keys for backward compatibility
const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const now = new Date().toISOString();
    const record = {
      id: crypto.randomUUID(),
      email: normalizedEmail,
      source: 'newsletter',
      createdAt: now,
    };

    await appendLocalRecord('newsletter_subscriptions.json', record);

    const supabase = createAdminClient();
    if (supabase) {
      void (async () => {
        try {
          await supabase
            .from('newsletter_subscriptions')
            .upsert(
              {
                subscription_id: record.id,
                email: normalizedEmail,
                source: 'newsletter',
                created_at: now,
                updated_at: now,
              },
              { onConflict: 'email' }
            );
        } catch (err) {
          console.error('Supabase newsletter sync failed:', err);
        }
      })();
    }

    // Try V2 API first
    if (BEEHIIV_API_KEY_V2 && BEEHIIV_API_URL_V2) {
      try {
        const response = await fetch(BEEHIIV_API_URL_V2, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BEEHIIV_API_KEY_V2}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: normalizedEmail,
            reactivate_existing: true,
            utm_source: 'mfc-landing-page',
            utm_medium: 'newsletter-signup',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(
            { success: true, message: 'Subscribed to newsletter successfully (V2)', data },
            { status: 201 }
          );
        }

        const errorData = await response.json().catch(() => ({}));
        console.error('Beehiiv V2 error:', errorData);
        // Fall through to try V1 if V2 fails
      } catch (v2Error) {
        console.error('Beehiiv V2 request failed:', v2Error);
        // Fall through to try V1
      }
    }

    // Try V1 API as fallback
    if (BEEHIIV_API_KEY_V1 && BEEHIIV_API_URL_V1) {
      try {
        const response = await fetch(BEEHIIV_API_URL_V1, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${BEEHIIV_API_KEY_V1}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: normalizedEmail,
            reactivate_existing: true,
            utm_source: 'mfc-landing-page',
            utm_medium: 'newsletter-signup',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(
            { success: true, message: 'Subscribed to newsletter successfully (V1)', data },
            { status: 201 }
          );
        }

        const errorData = await response.json().catch(() => ({}));
        console.error('Beehiiv V1 error:', errorData);
        // Fall through to try legacy
      } catch (v1Error) {
        console.error('Beehiiv V1 request failed:', v1Error);
        // Fall through to try legacy
      }
    }

    // Try legacy API as last resort
    if (BEEHIIV_API_KEY && BEEHIIV_PUBLICATION_ID) {
      try {
        const response = await fetch(
          `https://api.beehiiv.com/v1/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: normalizedEmail,
              reactivate_existing: true,
              utm_source: 'mfc-landing-page',
              utm_medium: 'newsletter-signup',
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(
            { success: true, message: 'Subscribed to newsletter successfully (Legacy)', data },
            { status: 201 }
          );
        }

        const errorData = await response.json().catch(() => ({}));
        console.error('Beehiiv legacy error:', errorData);
      } catch (legacyError) {
        console.error('Beehiiv legacy request failed:', legacyError);
      }
    }

    // All methods failed
    console.error('No valid Beehiiv configuration available');
    return NextResponse.json(
      { error: 'Newsletter service not configured' },
      { status: 500 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
