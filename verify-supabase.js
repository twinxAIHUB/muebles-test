// Verify Supabase Setup
// Run this after setting up the database schema

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Environment variables not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifySetup() {
  console.log('🔍 Verifying Supabase Setup...\n');

  try {
    // Test all tables
    const tables = ['site_settings', 'hero_config', 'admins', 'properties', 'testimonials', 'projects'];
    
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: Working (${data?.length || 0} records)`);
      }
    }

    // Test authentication
    const { data: authData, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log(`❌ Authentication: ${authError.message}`);
    } else {
      console.log('✅ Authentication: Working');
    }

    // Test storage
    const { data: storageData, error: storageError } = await supabase.storage.listBuckets();
    if (storageError) {
      console.log(`❌ Storage: ${storageError.message}`);
    } else {
      console.log(`✅ Storage: Working (${storageData?.length || 0} buckets)`);
    }

    console.log('\n🎉 Supabase setup verification complete!');

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

verifySetup(); 