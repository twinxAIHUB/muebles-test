import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          uid: string
          email: string
          name: string
          role: 'super_admin' | 'admin' | 'editor'
          is_active: boolean
          last_login: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          uid: string
          email: string
          name: string
          role: 'super_admin' | 'admin' | 'editor'
          is_active?: boolean
          last_login?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          uid?: string
          email?: string
          name?: string
          role?: 'super_admin' | 'admin' | 'editor'
          is_active?: boolean
          last_login?: string
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          price: string
          type: 'casa' | 'departamento' | 'oficina' | 'local'
          status: 'disponible' | 'vendido' | 'reservado'
          images: string[]
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          price: string
          type: 'casa' | 'departamento' | 'oficina' | 'local'
          status: 'disponible' | 'vendido' | 'reservado'
          images?: string[]
          features?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          price?: string
          type?: 'casa' | 'departamento' | 'oficina' | 'local'
          status?: 'disponible' | 'vendido' | 'reservado'
          images?: string[]
          features?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          company: string
          content: string
          rating: number
          status: 'active' | 'inactive' | 'pending'
          image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          company: string
          content: string
          rating: number
          status?: 'active' | 'inactive' | 'pending'
          image?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          company?: string
          content?: string
          rating?: number
          status?: 'active' | 'inactive' | 'pending'
          image?: string
          created_at?: string
          updated_at?: string
        }
      }
      hero_config: {
        Row: {
          id: string
          video_url: string
          title: string
          subtitle: string
          is_autoplay: boolean
          is_muted: boolean
          volume: number
          updated_at: string
        }
        Insert: {
          id?: string
          video_url: string
          title: string
          subtitle: string
          is_autoplay?: boolean
          is_muted?: boolean
          volume?: number
          updated_at?: string
        }
        Update: {
          id?: string
          video_url?: string
          title?: string
          subtitle?: string
          is_autoplay?: boolean
          is_muted?: boolean
          volume?: number
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          site_name: string
          site_description: string
          contact_email: string
          contact_phone: string
          address: string
          company_name: string
          timezone: string
          language: string
          business_hours: string
          social_media: {
            instagram?: string
            facebook?: string
            twitter?: string
          }
          updated_at: string
        }
        Insert: {
          id?: string
          site_name: string
          site_description: string
          contact_email: string
          contact_phone: string
          address: string
          company_name: string
          timezone: string
          language: string
          business_hours: string
          social_media?: {
            instagram?: string
            facebook?: string
            twitter?: string
          }
          updated_at?: string
        }
        Update: {
          id?: string
          site_name?: string
          site_description?: string
          contact_email?: string
          contact_phone?: string
          address?: string
          company_name?: string
          timezone?: string
          language?: string
          business_hours?: string
          social_media?: {
            instagram?: string
            facebook?: string
            twitter?: string
          }
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          main_category: 'Residencial' | 'Comercial'
          sub_category: 'Muebles de Melamina' | 'Puertas de Ducha' | 'Decoración' | 'Remodelación'
          images: string[]
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          main_category: 'Residencial' | 'Comercial'
          sub_category: 'Muebles de Melamina' | 'Puertas de Ducha' | 'Decoración' | 'Remodelación'
          images?: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          main_category?: 'Residencial' | 'Comercial'
          sub_category?: 'Muebles de Melamina' | 'Puertas de Ducha' | 'Decoración' | 'Remodelación'
          images?: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 