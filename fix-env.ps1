# Fix environment variables
$envContent = @"
NEXT_PUBLIC_SUPABASE_URL=https://yxusmjvegxvtwpckwjwy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4dXNtanZlZ3h2dHdwY2t3and5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MjI4MTcsImV4cCI6MjA2NTM5ODgxN30.bwVLcXPORPjp1ReAsRv26wGKeTROVnW2PJ3_--qs8JA

# Optional: Analytics (if you want to use Firebase Analytics)
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "Environment file updated successfully!" 