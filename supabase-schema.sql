-- GCH Servicios Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    uid TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT CHECK (role IN ('super_admin', 'admin', 'editor')) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    price TEXT NOT NULL,
    type TEXT CHECK (type IN ('casa', 'departamento', 'oficina', 'local')) NOT NULL,
    status TEXT CHECK (status IN ('disponible', 'vendido', 'reservado')) NOT NULL DEFAULT 'disponible',
    images TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    status TEXT CHECK (status IN ('active', 'inactive', 'pending')) NOT NULL DEFAULT 'pending',
    image TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create hero_config table
CREATE TABLE IF NOT EXISTS hero_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    video_url TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL DEFAULT 'GCH Servicios',
    subtitle TEXT NOT NULL DEFAULT 'Muebles de Melamina y Más',
    is_autoplay BOOLEAN DEFAULT true,
    is_muted BOOLEAN DEFAULT true,
    volume INTEGER CHECK (volume >= 0 AND volume <= 100) DEFAULT 50,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_name TEXT NOT NULL DEFAULT 'GCH Servicios',
    site_description TEXT NOT NULL DEFAULT 'Muebles de Melamina y Servicios de Remodelación',
    contact_email TEXT NOT NULL DEFAULT 'contacto@gchservicios.com',
    contact_phone TEXT NOT NULL DEFAULT '+52 123 456 7890',
    address TEXT NOT NULL DEFAULT 'Ciudad de México, México',
    company_name TEXT NOT NULL DEFAULT 'GCH Servicios',
    timezone TEXT NOT NULL DEFAULT 'America/Mexico_City',
    language TEXT NOT NULL DEFAULT 'es',
    business_hours TEXT NOT NULL DEFAULT 'Lunes a Viernes: 9:00 AM - 6:00 PM',
    social_media JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    main_category TEXT CHECK (main_category IN ('Residencial', 'Comercial')) NOT NULL,
    sub_category TEXT CHECK (sub_category IN ('Muebles de Melamina', 'Puertas de Ducha', 'Decoración', 'Remodelación')) NOT NULL,
    images TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge base for chatbot
CREATE TABLE IF NOT EXISTS knowledge (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admins_uid ON admins(uid);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_is_active ON admins(is_active);

CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at);

CREATE INDEX IF NOT EXISTS idx_projects_main_category ON projects(main_category);
CREATE INDEX IF NOT EXISTS idx_projects_sub_category ON projects(sub_category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default hero config
INSERT INTO hero_config (video_url, title, subtitle, is_autoplay, is_muted, volume)
VALUES ('', 'GCH Servicios', 'Muebles de Melamina y Más', true, true, 50)
ON CONFLICT DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (site_name, site_description, contact_email, contact_phone, address, company_name, timezone, language, business_hours, social_media)
VALUES (
    'GCH Servicios',
    'Muebles de Melamina y Servicios de Remodelación',
    'contacto@gchservicios.com',
    '+52 123 456 7890',
    'Ciudad de México, México',
    'GCH Servicios',
    'America/Mexico_City',
    'es',
    'Lunes a Viernes: 9:00 AM - 6:00 PM',
    '{}'
)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admins table
CREATE POLICY "Admins can view all admins" ON admins FOR SELECT USING (true);
CREATE POLICY "Only super admins can insert admins" ON admins FOR INSERT WITH CHECK (true);
CREATE POLICY "Only super admins can update admins" ON admins FOR UPDATE USING (true);
CREATE POLICY "Only super admins can delete admins" ON admins FOR DELETE USING (true);

-- Create RLS policies for properties table
CREATE POLICY "Properties are viewable by everyone" ON properties FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert properties" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update properties" ON properties FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete properties" ON properties FOR DELETE USING (true);

-- Create RLS policies for testimonials table
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert testimonials" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update testimonials" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete testimonials" ON testimonials FOR DELETE USING (true);

-- Create RLS policies for hero_config table
CREATE POLICY "Hero config is viewable by everyone" ON hero_config FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert hero config" ON hero_config FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update hero config" ON hero_config FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete hero config" ON hero_config FOR DELETE USING (true);

-- Create RLS policies for site_settings table
CREATE POLICY "Site settings are viewable by everyone" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert site settings" ON site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update site settings" ON site_settings FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete site settings" ON site_settings FOR DELETE USING (true);

-- Create RLS policies for projects table
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE USING (true);

-- Insert sample entries into knowledge base
INSERT INTO knowledge (question, answer, category) VALUES
('¿Qué servicios ofrecen?', 'Ofrecemos muebles de melamina a medida, puertas de ducha personalizadas, servicios de decoración y remodelación de espacios.', 'servicios'),
('¿Dónde están ubicados?', 'Nuestra empresa está ubicada en Lima, Perú. Atendemos a clientes en toda la región.', 'empresa'),
('¿Cómo puedo solicitar una cotización?', 'Puedes solicitar una cotización a través de nuestro formulario web, por WhatsApp o llamándonos directamente.', 'cotización'); 