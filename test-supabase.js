// Test Supabase Connection
// Run this with: node test-supabase.js

const { createClient } = require('@supabase/supabase-js');

// Check if environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Checking Supabase Configuration...\n');

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set');
  console.log('Please add it to your .env.local file');
  process.exit(1);
}

if (!supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  console.log('Please add it to your .env.local file');
  process.exit(1);
}

console.log('✅ Environment variables found:');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Key: ${supabaseAnonKey.substring(0, 20)}...`);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
async function testConnection() {
  try {
    console.log('\n🔗 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('site_settings').select('*').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      
      if (error.message.includes('relation "site_settings" does not exist')) {
        console.log('\n💡 The database schema might not be set up yet.');
        console.log('Please run the supabase-schema.sql script in your Supabase dashboard.');
      }
      
      if (error.message.includes('Invalid API key')) {
        console.log('\n💡 Check your API key in the .env.local file.');
      }
      
      if (error.message.includes('Invalid URL')) {
        console.log('\n💡 Check your Supabase URL in the .env.local file.');
      }
      
      return;
    }
    
    console.log('✅ Connection successful!');
    console.log('✅ Database schema is working');
    
    // Test authentication
    console.log('\n🔐 Testing authentication...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.log('⚠️  Authentication test failed:', authError.message);
    } else {
      console.log('✅ Authentication is working');
    }
    
    // Test storage
    console.log('\n📁 Testing storage...');
    const { data: storageData, error: storageError } = await supabase.storage.listBuckets();
    
    if (storageError) {
      console.log('⚠️  Storage test failed:', storageError.message);
    } else {
      console.log('✅ Storage is working');
      console.log('   Available buckets:', storageData.map(b => b.name).join(', '));
    }
    
    console.log('\n🎉 Supabase is working correctly!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testConnection(); 