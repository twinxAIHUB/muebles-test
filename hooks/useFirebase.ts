import { useState, useEffect, useCallback } from 'react'
import { 
  propertiesService, 
  testimonialsService, 
  heroService, 
  settingsService,
  uploadService,
  type Property,
  type Testimonial,
  type HeroConfig,
  type SiteSettings
} from '@/lib/database-supabase'

// Generic hook for managing Firebase data
export function useFirebaseData<T>(
  fetchFunction: () => Promise<T[]>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [fetchFunction])

  useEffect(() => {
    fetchData()
  }, dependencies)

  const refresh = () => {
    fetchData()
  }

  return { data, loading, error, refresh }
}

// Properties hook
export function useProperties(filters?: { type?: string; status?: string; search?: string }) {
  const fetchProperties = useCallback(() => propertiesService.getAll(filters), [filters])
  return useFirebaseData(fetchProperties, [filters])
}

// Testimonials hook
export function useTestimonials(filters?: { status?: string; search?: string }) {
  const fetchTestimonials = useCallback(() => testimonialsService.getAll(filters), [filters])
  return useFirebaseData(fetchTestimonials, [filters])
}

// Hero configuration hook
export function useHeroConfig() {
  const [config, setConfig] = useState<HeroConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await heroService.get()
      setConfig(result as HeroConfig)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateConfig = useCallback(async (data: Partial<HeroConfig>) => {
    try {
      setError(null)
      const result = await heroService.update(data)
      setConfig(result as HeroConfig)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }, [])

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  return { config, loading, error, updateConfig, refresh: fetchConfig }
}

// Settings hook
export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await settingsService.get()
      setSettings(result as SiteSettings)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSettings = useCallback(async (data: Partial<SiteSettings>) => {
    try {
      setError(null)
      const result = await settingsService.update(data)
      setSettings(result as SiteSettings)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  return { settings, loading, error, updateSettings, refresh: fetchSettings }
}

// File upload hook
export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = useCallback(async (file: File, path: string = 'images') => {
    try {
      setUploading(true)
      setError(null)
      const url = await uploadService.uploadImage(file, path)
      return url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setUploading(false)
    }
  }, [])

  const uploadVideo = useCallback(async (file: File, path: string = 'videos') => {
    try {
      setUploading(true)
      setError(null)
      const url = await uploadService.uploadVideo(file, path)
      return url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setUploading(false)
    }
  }, [])

  const deleteFile = useCallback(async (url: string) => {
    try {
      setError(null)
      await uploadService.deleteFile(url)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    }
  }, [])

  return { uploadImage, uploadVideo, deleteFile, uploading, error }
}

// CRUD operations hook
export function useCRUD<T extends { id?: string }>(
  service: {
    create: (data: any) => Promise<T>
    update: (id: string, data: any) => Promise<T>
    delete: (id: string) => Promise<boolean>
  }
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (data: any) => {
    try {
      setLoading(true)
      setError(null)
      const result = await service.create(data)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [service])

  const update = useCallback(async (id: string, data: any) => {
    try {
      setLoading(true)
      setError(null)
      const result = await service.update(id, data)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [service])

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const result = await service.delete(id)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [service])

  return { create, update, delete: remove, loading, error }
}

// Properties CRUD hook
export function usePropertiesCRUD() {
  return useCRUD(propertiesService)
}

// Testimonials CRUD hook
export function useTestimonialsCRUD() {
  return useCRUD(testimonialsService)
} 