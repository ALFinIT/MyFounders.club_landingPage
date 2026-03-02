-- Migration to create profiles table

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  whatsapp text,
  linkedin_url text,
  location text,
  nationality text,
  gender text,
  bio text,
  role text,
  avatar_url text,
  profile_completed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- trigger to update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
   new.updated_at = now();
   return new;
end;
$$ language 'plpgsql';

create trigger update_profiles_updated_at
before update on profiles
for each row
execute procedure update_updated_at_column();
