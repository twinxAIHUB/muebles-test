# Environment Setup Guide

## The Issue
You're stuck on the login page because the Supabase environment variables are not configured. This is the most common cause of authentication issues.

## Quick Fix

### 1. Create Environment File
Create a file called `.env.local` in your project root with the following content:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Get Your Supabase Credentials

1. **Go to your Supabase project**: https://supabase.com/dashboard
2. **Select your project** (or create one if you don't have it)
3. **Go to Settings → API**
4. **Copy the following values**:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Example `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdG5wdmJqY2JqY2JqY2JqY2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MjUwNjI0MDAsImV4cCI6MTk0MDYzODQwMH0.your_actual_key_here
```

### 4. Restart Development Server
After creating the `.env.local` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
# or
pnpm dev
```

## Verification Steps

### 1. Check Environment Variables
Visit `/diagnose` to verify your environment variables are set correctly.

### 2. Test Connection
Visit `/debug-auth` and click "Test Connection" to verify Supabase connectivity.

### 3. Try Login Again
Go to `/admin/login` and try logging in.

## Common Issues

### Issue: "Missing Environment Variables"
**Solution**: Create the `.env.local` file as shown above.

### Issue: "Invalid API Key"
**Solution**: Make sure you're using the **anon public** key, not the service role key.

### Issue: "Project URL not found"
**Solution**: Verify your Supabase project URL is correct and the project exists.

### Issue: "Database connection failed"
**Solution**: 
1. Make sure your Supabase database is running
2. Check if you've run the database schema: `supabase-schema.sql`
3. Verify RLS policies are set up correctly

## Database Setup

If you haven't set up your database yet:

1. **Run the schema**: Copy and paste the contents of `supabase-schema.sql` into your Supabase SQL editor
2. **Enable Row Level Security**: The schema includes RLS policies
3. **Create an admin account**: Use the registration form on `/admin/login`

## Still Having Issues?

1. **Visit `/diagnose`** - This will show you exactly what's wrong
2. **Check browser console** - Look for any JavaScript errors
3. **Clear browser storage** - Use the "Clear All Storage" button on `/diagnose`
4. **Restart everything** - Stop the dev server, clear storage, restart server

## Support

If you're still having issues after following these steps, the diagnostic page at `/diagnose` will provide specific information about what's failing. 