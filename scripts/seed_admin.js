const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

(async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('Supabase URL or service key missing');
    process.exit(1);
  }
  const supabase = createClient(supabaseUrl, serviceKey);
  const hash = await bcrypt.hash('1%mfc2026', 10);
  const { data, error } = await supabase.from('admin_users').insert([
    { username: 'admin', password_hash: hash },
  ]);
  if (error) {
    console.error('Error inserting admin:', error);
    process.exit(1);
  }
  console.log('Admin user created:', data);
})();
