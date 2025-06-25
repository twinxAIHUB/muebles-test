# Supabase Setup Guide for GCH Servicios

This guide will help you set up Supabase for your GCH Servicios admin dashboard.

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [Supabase Console](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name:** `gch-servicios`
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL script
4. This will create all necessary tables, indexes, and policies

### 5. Set Up Storage

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `uploads`
3. Set the bucket to **Public**
4. Configure CORS if needed (optional)

### 6. Configure Authentication

1. Go to **Authentication** > **Settings**
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs:
   - `http://localhost:3000/admin/login`
   - `http://localhost:3000/admin`
   - Your production URLs when ready

## 📊 Database Structure

The schema creates the following tables:

### `admins` Table
- **id:** UUID (Primary Key)
- **uid:** Text (Unique, Supabase Auth User ID)
- **email:** Text (Unique)
- **name:** Text
- **role:** Text (super_admin, admin, editor)
- **is_active:** Boolean
- **last_login:** Timestamp
- **created_at:** Timestamp
- **updated_at:** Timestamp

### `properties` Table
- **id:** UUID (Primary Key)
- **title:** Text
- **description:** Text
- **location:** Text
- **price:** Text
- **type:** Text (casa, departamento, oficina, local)
- **status:** Text (disponible, vendido, reservado)
- **images:** Text Array
- **features:** Text Array
- **created_at:** Timestamp
- **updated_at:** Timestamp

### `testimonials` Table
- **id:** UUID (Primary Key)
- **name:** Text
- **role:** Text
- **company:** Text
- **content:** Text
- **rating:** Integer (1-5)
- **status:** Text (active, inactive, pending)
- **image:** Text
- **created_at:** Timestamp
- **updated_at:** Timestamp

### `hero_config` Table
- **id:** UUID (Primary Key)
- **video_url:** Text
- **title:** Text
- **subtitle:** Text
- **is_autoplay:** Boolean
- **is_muted:** Boolean
- **volume:** Integer (0-100)
- **updated_at:** Timestamp

### `site_settings` Table
- **id:** UUID (Primary Key)
- **site_name:** Text
- **site_description:** Text
- **contact_email:** Text
- **contact_phone:** Text
- **address:** Text
- **company_name:** Text
- **timezone:** Text
- **language:** Text
- **business_hours:** Text
- **social_media:** JSONB
- **updated_at:** Timestamp

### `projects` Table
- **id:** UUID (Primary Key)
- **title:** Text
- **description:** Text
- **main_category:** Text (Residencial, Comercial)
- **sub_category:** Text (Muebles de Melamina, Puertas de Ducha, Decoración, Remodelación)
- **images:** Text Array
- **tags:** Text Array
- **created_at:** Timestamp
- **updated_at:** Timestamp

## 🔐 Security Features

### Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:

- **Public Read Access:** All tables allow public read access
- **Authenticated Write Access:** Only authenticated users can create/update/delete
- **Admin Management:** Admin operations require proper authentication

### Authentication
- Email/password authentication
- Admin role verification
- Secure session management

## 📁 Storage Configuration

### Bucket Structure
```
uploads/
├── images/
│   ├── properties/
│   ├── testimonials/
│   └── projects/
└── videos/
    └── hero/
```

### File Upload Rules
- **Supported Formats:** JPG, PNG, GIF, WebP, MP4, MOV
- **Max File Size:** 10MB for images, 100MB for videos
- **Public Access:** All uploaded files are publicly accessible

## 🧪 Testing the Setup

### 1. Start Development Server
```bash
pnpm dev
```

### 2. Test Admin Authentication
1. Navigate to `http://localhost:3000/admin/login`
2. Click "Create Account" tab
3. Create your first admin account
4. Verify you can log in and access the dashboard

### 3. Test Database Operations
1. Go to the admin dashboard
2. Try creating a property or testimonial
3. Check your Supabase dashboard to see the data

### 4. Test File Uploads
1. Try uploading an image in the admin panel
2. Verify the file appears in your Supabase storage

## 🔧 Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Check your environment variables
   - Ensure the anon key is correct
   - Restart your development server

2. **"Table doesn't exist" error**
   - Run the SQL schema script in Supabase
   - Check table names match exactly

3. **"Permission denied" error**
   - Check RLS policies in Supabase
   - Verify user authentication status

4. **File upload fails**
   - Check storage bucket exists and is public
   - Verify file size and format
   - Check CORS settings

### Debug Mode

Enable debug logging by adding to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 🚀 Production Deployment

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

### Security Checklist
- [ ] Update redirect URLs in Supabase Auth settings
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring and alerts
- [ ] Review RLS policies
- [ ] Test all functionality in production

### Performance Optimization
- [ ] Enable database connection pooling
- [ ] Set up proper indexes (already included in schema)
- [ ] Configure CDN for static assets
- [ ] Monitor query performance

## 📞 Support

If you encounter issues:

1. **Check Supabase logs** in the dashboard
2. **Review browser console** for client-side errors
3. **Verify environment variables** are set correctly
4. **Test database connectivity** in Supabase dashboard

For additional help:
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)

---

**🎉 Congratulations!** Your Supabase setup is complete. You can now create admin accounts, manage content, and use all the features of your GCH Servicios admin dashboard. 