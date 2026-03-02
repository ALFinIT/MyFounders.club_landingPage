-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('founder','investor')) NOT NULL,
  event_date TIMESTAMP,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID,
  email TEXT,
  role_type TEXT CHECK (role_type IN ('founder','investor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for events: public select
CREATE POLICY "Public select events" ON events
  FOR SELECT USING (true);

-- Policies for registrations: users can insert only own or provide email when anonymous
CREATE POLICY "Insert registrations" ON event_registrations
  FOR INSERT WITH CHECK (
    (
      auth.uid() IS NOT NULL AND user_id = auth.uid()
    )
    OR
    (
      auth.uid() IS NULL AND email IS NOT NULL
    )
  );
CREATE POLICY "Select registrations" ON event_registrations
  FOR SELECT USING (true);

-- Policy for admin_users: no public access
CREATE POLICY "No public" ON admin_users
  FOR ALL USING (false);
