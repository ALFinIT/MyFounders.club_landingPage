Quick Auth Setup (Supabase + Next)

1) Install dependencies (run in repo root):

```bash
# using npm
npm install
# or using pnpm
pnpm install
```

(You already have `@supabase/supabase-js` in `package.json`; I added `framer-motion` — run install to fetch it.)

2) Environment variables (create `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key (only for server-side tasks)
```

3) Files I added:
- `lib/supabaseClient.ts` — Supabase client wrapper
- `lib/AuthContext.tsx` — React provider + hooks for auth/profile
- `.vscode/settings.json` — ignores Tailwind/PostCSS unknown at-rule warnings in VS Code
- `app/auth/page.tsx` — combined signup/login UI with Supabase logic
- `app/complete-profile/page.tsx` — mandatory profile completion form
- `app/settings/page.tsx` — editable settings/profile page
- `app/_middleware.ts` — route guard for dashboard/settings
- `app/dashboard/page.tsx` — simple dashboard placeholder
- `app/api/create-profile/route.ts` — serverless profile creation endpoint
- `scripts/create_profiles_table.sql` — database migration for profiles table

4) Next steps are mostly complete. Remaining tasks include:
- Add motion and styling refinements (some animations are included)
- Test responsiveness across devices (components use Tailwind responsive utilities)

The full workflow is now:

Signup → Login → Mandatory Profile Completion → Role-Based Dashboard → Editable Settings

To finalize, run the SQL migration in your Supabase project (copy `scripts/create_profiles_table.sql` into the SQL editor or use `supabase db` CLI). You should also set the required env vars in `.env.local`.

Once the backend is prepared, you can start the dev server with:

```bash
npm run dev
# or pnpm dev
```

and test the authentication/profile flow.

---

### Events & Admin Backend Setup

The project now includes an events page and a simple admin panel using Supabase.

1. **Database tables:** run the SQL in `scripts/create_event_tables.sql` (and seed admin via `scripts/seed_admin.js`). You can execute these in Supabase SQL editor or via CLI. If you prefer, manually copy the statements:

   ```sql
   -- (see file for complete statements)
   ```

   After creation, the seed script (`node scripts/seed_admin.js`) will insert an `admin` user with password `1%mfc2026`.

2. **Environment variables:**
   - `ADMIN_SESSION_SECRET` – random string used to sign admin cookie. Keep this secret.
   - `NEXT_PUBLIC_SITE_URL` – (optional) base URL of your app; used by server components to call internal APIs. Fallback is a relative path.
   - (existing Supabase vars remain required)

3. **APIs added:**
   - `GET /api/events` – list events
   - `POST /api/events/register` – register for event (with or without login)
   - `POST /api/admin/login` – authenticate admin
   - `POST /api/admin/events/create` – create event (admin only)
   - `DELETE /api/admin/events/:id` – delete event (admin only)

4. **Protection:**
   - Middleware guards `/admin/*` and `/api/admin/*`, redirecting unauthenticated to `/admin`.
   - Admin session is stored in an HTTP-only cookie; value is HMAC-signed username.

5. **Pages:**
   - `/events` – public listing with registration buttons
   - `/admin` – login form
   - `/admin/dashboard` – event/registration management

Everything is wired server‑side; no UI layout changes were made as requested. Test the new functionality by visiting `/events` and `/admin` once your database has the new tables.

Everything is wired; feel free to adjust UI, add content to dashboard, or integrate further features.