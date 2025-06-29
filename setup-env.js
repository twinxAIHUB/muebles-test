#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 GCH Services Environment Setup');
console.log('==================================\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists!');
  console.log('If you want to recreate it, delete the existing file first.\n');
  process.exit(0);
}

// Create template .env.local
const envTemplate = `# Supabase Configuration
# Get these values from your Supabase project dashboard
# Settings → API → Project URL and anon public key

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdG5wdmJqY2JqY2JqY2JqY2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjUwNjI0MDAsImV4cCI6MTk0MDYzODQwMH0.your_actual_key_here

# Optional: Additional environment variables
# NODE_ENV=development
`;

try {
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Created .env.local template file');
  console.log('\n📝 Next steps:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project (or create one)');
  console.log('3. Go to Settings → API');
  console.log('4. Copy the Project URL and anon public key');
  console.log('5. Replace the placeholder values in .env.local');
  console.log('6. Restart your development server');
  console.log('\n🔍 To verify setup, visit: http://localhost:3000/diagnose');
} catch (error) {
  console.error('❌ Failed to create .env.local:', error.message);
  process.exit(1);
} 