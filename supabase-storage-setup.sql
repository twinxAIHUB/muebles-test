-- Supabase Storage Setup
-- Run this in your Supabase SQL Editor after creating the bucket manually

-- Create storage bucket (if not exists)
-- Note: You need to create the bucket manually in the Supabase dashboard first
-- This script only sets up the policies

-- Storage bucket policies for 'uploads' bucket
-- Allow public access to read files
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own files
CREATE POLICY "Authenticated users can update files" ON storage.objects FOR UPDATE 
USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete files" ON storage.objects FOR DELETE 
USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Optional: Create folders in the bucket
-- These will be created automatically when files are uploaded, but you can create them manually
-- INSERT INTO storage.objects (bucket_id, name, owner) VALUES ('uploads', 'images/', auth.uid());
-- INSERT INTO storage.objects (bucket_id, name, owner) VALUES ('uploads', 'images/properties/', auth.uid());
-- INSERT INTO storage.objects (bucket_id, name, owner) VALUES ('uploads', 'images/testimonials/', auth.uid());
-- INSERT INTO storage.objects (bucket_id, name, owner) VALUES ('uploads', 'images/projects/', auth.uid());
-- INSERT INTO storage.objects (bucket_id, name, owner) VALUES ('uploads', 'videos/', auth.uid());
-- INSERT INTO storage.objects (bucket_id, name, owner) VALUES ('uploads', 'videos/hero/', auth.uid()); 