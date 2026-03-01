-- Supabase schema for landing page forms

-- WhatsApp signups
create table if not exists whatsapp_signups (
  id uuid default gen_random_uuid() primary key,
  first_name text,
  phone text,
  created_at timestamptz default now()
);

-- Newsletter signups (Beehiv)
create table if not exists newsletter_signups (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  subscribed_at timestamptz default now(),
  beehiv_synced boolean default false
);

-- Applications (Secure Your Spot)
create table if not exists applications (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  one_pitch_sentence text not null,
  proof_of_work text,
  commitment_amount text default 'AED 500',
  agree_commitment boolean default false,
  created_at timestamptz default now()
);

-- Profiles table (for user profiles)
create table if not exists profiles (
  id uuid default gen_random_uuid() primary key,
  user_id text unique,
  name text,
  company text,
  email text,
  phone text,
  created_at timestamptz default now()
);
