const { spawn } = require('child_process');

const env = {
  ...process.env,
  SUPABASE_URL: 'https://yxusmjvegxvtwpckwjwy.supabase.co',
  SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dXNtanZlZ3h2dHdwY2t3and5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjI4MTcsImV4cCI6MjA2NTM5ODgxN30.bwVLcXPORPjp1ReAsRv26wGKeTROVnW2PJ3_--qs8JA',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dXNtanZlZ3h2dHdwY2t3and5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjI4MTcsImV4cCI6MjA2NTM5ODgxN30.bwVLcXPORPjp1ReAsRv26wGKeTROVnW2PJ3_--qs8JA',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dXNtanZlZ3h2dHdwY2t3and5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjI4MTcsImV4cCI6MjA2NTM5ODgxN30.bwVLcXPORPjp1ReAsRv26wGKeTROVnW2PJ3_--qs8JA'
};

const child = spawn('npx', ['-y', 'supabase-mcp', '--help'], {
  env,
  stdio: 'inherit'
});

child.on('close', (code) => {
  console.log(`Process exited with code ${code}`);
}); 