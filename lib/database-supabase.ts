import { supabase, type Database } from './supabase'

// Types from Supabase
type AdminUser = Database['public']['Tables']['admins']['Row']
type AdminUserInsert = Database['public']['Tables']['admins']['Insert']
type AdminUserUpdate = Database['public']['Tables']['admins']['Update']

type Property = Database['public']['Tables']['properties']['Row']
type PropertyInsert = Database['public']['Tables']['properties']['Insert']
type PropertyUpdate = Database['public']['Tables']['properties']['Update']

type Testimonial = Database['public']['Tables']['testimonials']['Row']
type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert']
type TestimonialUpdate = Database['public']['Tables']['testimonials']['Update']

type HeroConfig = Database['public']['Tables']['hero_config']['Row']
type HeroConfigInsert = Database['public']['Tables']['hero_config']['Insert']
type HeroConfigUpdate = Database['public']['Tables']['hero_config']['Update']

type SiteSettings = Database['public']['Tables']['site_settings']['Row']
type SiteSettingsInsert = Database['public']['Tables']['site_settings']['Insert']
type SiteSettingsUpdate = Database['public']['Tables']['site_settings']['Update']

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type ProjectUpdate = Database['public']['Tables']['projects']['Update']

// Admin Users CRUD
export const adminService = {
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching admins:', error)
      throw error
    }
  },

  async getByUid(uid: string) {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('uid', uid)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching admin by UID:', error)
      return null
    }
  },

  async getByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching admin by email:', error)
      return null
    }
  },

  async create(adminData: Omit<AdminUserInsert, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const now = new Date().toISOString()
      const newAdmin: AdminUserInsert = {
        ...adminData,
        is_active: adminData.is_active ?? true,
        last_login: adminData.last_login ?? now,
        created_at: now,
        updated_at: now
      }

      const { data, error } = await supabase
        .from('admins')
        .insert(newAdmin)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating admin:', error)
      throw error
    }
  },

  async update(id: string, adminData: Partial<AdminUserUpdate>) {
    try {
      const updateData: AdminUserUpdate = {
        ...adminData,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('admins')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating admin:', error)
      throw error
    }
  },

  async updateLastLogin(uid: string) {
    try {
      const { error } = await supabase
        .from('admins')
        .update({
          last_login: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('uid', uid)

      if (error) throw error
    } catch (error) {
      console.error('Error updating last login:', error)
      throw error
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting admin:', error)
      throw error
    }
  },

  async isAdmin(uid: string) {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id')
        .eq('uid', uid)
        .eq('is_active', true)
        .single()

      if (error) throw error
      return !!data
    } catch (error) {
      console.error('Error checking if user is admin:', error)
      return false
    }
  }
}

// Projects CRUD
export const projectsService = {
  async getAll(filters?: { mainCategory?: string; subCategory?: string; search?: string }) {
    try {
      let query = supabase.from('projects').select('*')

      if (filters?.mainCategory) {
        query = query.eq('main_category', filters.mainCategory)
      }

      if (filters?.subCategory) {
        query = query.eq('sub_category', filters.subCategory)
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching project:', error)
      throw error
    }
  },

  async create(projectData: Omit<ProjectInsert, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const now = new Date().toISOString()
      const newProject: ProjectInsert = {
        ...projectData,
        images: projectData.images || [],
        tags: projectData.tags || [],
        created_at: now,
        updated_at: now
      }

      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },

  async update(id: string, projectData: Partial<ProjectUpdate>) {
    try {
      const updateData: ProjectUpdate = {
        ...projectData,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }
}

// Properties CRUD
export const propertiesService = {
  async getAll(filters?: { type?: string; status?: string; search?: string }) {
    try {
      let query = supabase.from('properties').select('*')

      if (filters?.type) {
        query = query.eq('type', filters.type)
      }

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw error
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching property:', error)
      throw error
    }
  },

  async create(propertyData: Omit<PropertyInsert, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const now = new Date().toISOString()
      const newProperty: PropertyInsert = {
        ...propertyData,
        images: propertyData.images || [],
        features: propertyData.features || [],
        created_at: now,
        updated_at: now
      }

      const { data, error } = await supabase
        .from('properties')
        .insert(newProperty)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating property:', error)
      throw error
    }
  },

  async update(id: string, propertyData: Partial<PropertyUpdate>) {
    try {
      const updateData: PropertyUpdate = {
        ...propertyData,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('properties')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting property:', error)
      throw error
    }
  }
}

// Testimonials CRUD
export const testimonialsService = {
  async getAll(filters?: { status?: string; search?: string }) {
    try {
      let query = supabase.from('testimonials').select('*')

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,company.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      throw error
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching testimonial:', error)
      throw error
    }
  },

  async create(testimonialData: Omit<TestimonialInsert, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const now = new Date().toISOString()
      const newTestimonial: TestimonialInsert = {
        ...testimonialData,
        status: testimonialData.status || 'pending',
        image: testimonialData.image || '',
        created_at: now,
        updated_at: now
      }

      const { data, error } = await supabase
        .from('testimonials')
        .insert(newTestimonial)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating testimonial:', error)
      throw error
    }
  },

  async update(id: string, testimonialData: Partial<TestimonialUpdate>) {
    try {
      const updateData: TestimonialUpdate = {
        ...testimonialData,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('testimonials')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating testimonial:', error)
      throw error
    }
  },

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      throw error
    }
  }
}

// Hero Configuration
export const heroService = {
  async get() {
    try {
      const { data, error } = await supabase
        .from('hero_config')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
      
      if (!data) {
        // Create default config if none exists
        const defaultConfig: HeroConfigInsert = {
          video_url: '',
          title: 'GCH Servicios',
          subtitle: 'Muebles de Melamina y Más',
          is_autoplay: true,
          is_muted: true,
          volume: 50,
          updated_at: new Date().toISOString()
        }

        const { data: newData, error: createError } = await supabase
          .from('hero_config')
          .insert(defaultConfig)
          .select()
          .single()

        if (createError) throw createError
        return newData
      }

      return data
    } catch (error) {
      console.error('Error fetching hero config:', error)
      throw error
    }
  },

  async update(configData: Partial<HeroConfigUpdate>) {
    try {
      const updateData: HeroConfigUpdate = {
        ...configData,
        updated_at: new Date().toISOString()
      }

      // Try to update existing record
      const { data, error } = await supabase
        .from('hero_config')
        .update(updateData)
        .eq('id', 1) // Assuming single record
        .select()
        .single()

      if (error) {
        // If no record exists, create one
        const newConfig: HeroConfigInsert = {
          video_url: configData.video_url || '',
          title: configData.title || 'GCH Servicios',
          subtitle: configData.subtitle || 'Muebles de Melamina y Más',
          is_autoplay: configData.is_autoplay ?? true,
          is_muted: configData.is_muted ?? true,
          volume: configData.volume ?? 50,
          updated_at: new Date().toISOString()
        }

        const { data: newData, error: createError } = await supabase
          .from('hero_config')
          .insert(newConfig)
          .select()
          .single()

        if (createError) throw createError
        return newData
      }

      return data
    } catch (error) {
      console.error('Error updating hero config:', error)
      throw error
    }
  }
}

// Site Settings
export const settingsService = {
  async get() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
      
      if (!data) {
        // Create default settings if none exists
        const defaultSettings: SiteSettingsInsert = {
          site_name: 'GCH Servicios',
          site_description: 'Muebles de Melamina y Servicios de Remodelación',
          contact_email: 'contacto@gchservicios.com',
          contact_phone: '+52 123 456 7890',
          address: 'Ciudad de México, México',
          company_name: 'GCH Servicios',
          timezone: 'America/Mexico_City',
          language: 'es',
          business_hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM',
          social_media: {},
          updated_at: new Date().toISOString()
        }

        const { data: newData, error: createError } = await supabase
          .from('site_settings')
          .insert(defaultSettings)
          .select()
          .single()

        if (createError) throw createError
        return newData
      }

      return data
    } catch (error) {
      console.error('Error fetching site settings:', error)
      throw error
    }
  },

  async update(settingsData: Partial<SiteSettingsUpdate>) {
    try {
      const updateData: SiteSettingsUpdate = {
        ...settingsData,
        updated_at: new Date().toISOString()
      }

      // Try to update existing record
      const { data, error } = await supabase
        .from('site_settings')
        .update(updateData)
        .eq('id', 1) // Assuming single record
        .select()
        .single()

      if (error) {
        // If no record exists, create one
        const newSettings: SiteSettingsInsert = {
          site_name: settingsData.site_name || 'GCH Servicios',
          site_description: settingsData.site_description || 'Muebles de Melamina y Servicios de Remodelación',
          contact_email: settingsData.contact_email || 'contacto@gchservicios.com',
          contact_phone: settingsData.contact_phone || '+52 123 456 7890',
          address: settingsData.address || 'Ciudad de México, México',
          company_name: settingsData.company_name || 'GCH Servicios',
          timezone: settingsData.timezone || 'America/Mexico_City',
          language: settingsData.language || 'es',
          business_hours: settingsData.business_hours || 'Lunes a Viernes: 9:00 AM - 6:00 PM',
          social_media: settingsData.social_media || {},
          updated_at: new Date().toISOString()
        }

        const { data: newData, error: createError } = await supabase
          .from('site_settings')
          .insert(newSettings)
          .select()
          .single()

        if (createError) throw createError
        return newData
      }

      return data
    } catch (error) {
      console.error('Error updating site settings:', error)
      throw error
    }
  }
}

// File Upload Service
export const uploadService = {
  async uploadImage(file: File, path: string = 'images'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const filePath = `${path}/${fileName}`

      // Check if file already exists (optional, Supabase will error if duplicate)
      // If you want to allow overwrites, add upsert: true to upload options
      console.log('Uploading to:', filePath)
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, { upsert: false })

      if (error) {
        console.error('Upload error:', error, JSON.stringify(error));
        throw error;
      }

      const { data: publicData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath)

      if (!publicData || !publicData.publicUrl) {
        throw new Error('No public URL returned from Supabase')
      }

      console.log('Public URL:', publicData.publicUrl)
      return publicData.publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  async uploadVideo(file: File, path: string = 'videos'): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${path}/${fileName}`

      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(filePath, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading video:', error)
      throw error
    }
  },

  async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const urlParts = url.split('/')
      const filePath = urlParts.slice(-2).join('/') // Get last two parts for path/file.ext

      const { error } = await supabase.storage
        .from('uploads')
        .remove([filePath])

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }
}

// Export types for backward compatibility
export type {
  AdminUser,
  Property,
  Testimonial,
  HeroConfig,
  SiteSettings,
  Project
} 