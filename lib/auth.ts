import { supabase } from './supabase'
import { adminService, type AdminUser } from './database-supabase'
import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'

export interface AuthUser {
  id: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  isAdmin: boolean
  adminData?: AdminUser
}

class AuthService {
  private currentUser: AuthUser | null = null
  private listeners: ((user: AuthUser | null) => void)[] = []
  private initialized = false
  private initializationError: string | null = null

  constructor() {
    this.initialize()
  }

  private async initialize() {
    try {
      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        try {
          const user = session?.user
          if (user) {
            // Check if user is admin
            let isAdmin = false
            let adminData: AdminUser | undefined

            try {
              isAdmin = await adminService.isAdmin(user.id)
              if (isAdmin) {
                adminData = await adminService.getByUid(user.id) || undefined
                // Update last login
                await adminService.updateLastLogin(user.id)
              }
            } catch (error) {
              console.error('Error checking admin status:', error)
              // If we can't check admin status, assume not admin for security
              isAdmin = false
            }

            this.currentUser = {
              id: user.id,
              email: user.email || null,
              displayName: (user.user_metadata?.name ?? user.email ?? null) as string | null,
              photoURL: (user.user_metadata?.avatar_url ?? null) as string | null,
              isAdmin,
              adminData
            }
          } else {
            this.currentUser = null
          }
          this.listeners.forEach(listener => listener(this.currentUser))
        } catch (error) {
          console.error('Error in auth state change handler:', error)
          this.currentUser = null
          this.listeners.forEach(listener => listener(null))
        }
      })

      this.initialized = true
    } catch (error) {
      console.error('Error initializing auth service:', error)
      this.initializationError = error instanceof Error ? error.message : 'Unknown initialization error'
      this.initialized = true // Mark as initialized so we don't keep trying
    }
  }

  getCurrentUser() {
    return this.currentUser
  }

  isInitialized() {
    return this.initialized
  }

  getInitializationError() {
    return this.initializationError
  }

  onAuthStateChanged(listener: (user: AuthUser | null) => void): () => void {
    this.listeners.push(listener)
    // Immediately call with current state
    listener(this.currentUser)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      const user = data.user
      if (!user) throw new Error('No user returned from Supabase')
      
      // Check if user is admin
      let isAdmin = false
      let adminData: AdminUser | undefined
      
      try {
        isAdmin = await adminService.isAdmin(user.id)
        if (!isAdmin) {
          await supabase.auth.signOut()
          throw new Error('Access denied. You are not authorized as an admin.')
        }
        adminData = await adminService.getByUid(user.id) || undefined
        await adminService.updateLastLogin(user.id)
      } catch (adminError) {
        console.error('Error checking admin status during sign in:', adminError)
        await supabase.auth.signOut()
        throw new Error('Access denied. You are not authorized as an admin.')
      }

      const authUser: AuthUser = {
        id: user.id,
        email: user.email || null,
        displayName: (user.user_metadata?.name ?? user.email ?? null) as string | null,
        photoURL: (user.user_metadata?.avatar_url ?? null) as string | null,
        isAdmin,
        adminData
      }
      this.currentUser = authUser
      return authUser
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  async createAdminAccount(email: string, password: string, name: string, role: 'super_admin' | 'admin' | 'editor' = 'admin'): Promise<AuthUser> {
    try {
      // Check if admin already exists
      const existingAdmin = await adminService.getByEmail(email)
      if (existingAdmin) {
        throw new Error('An admin with this email already exists.')
      }
      
      // Create Supabase user
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name, role } } })
      if (error) throw error
      const user = data.user
      if (!user) throw new Error('No user returned from Supabase')
      
      // Create admin record in database
      const adminData: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'> = {
        uid: user.id,
        email: user.email!,
        name,
        role,
        is_active: true,
        last_login: new Date().toISOString()
      }
      
      const admin = await adminService.create(adminData)
      const authUser: AuthUser = {
        id: user.id,
        email: user.email || null,
        displayName: (name ?? user.email ?? null) as string | null,
        photoURL: (user.user_metadata?.avatar_url ?? null) as string | null,
        isAdmin: true,
        adminData: admin
      }
      this.currentUser = authUser
      return authUser
    } catch (error) {
      console.error('Create admin account error:', error)
      throw error
    }
  }

  async signOut() {
    try {
      await supabase.auth.signOut()
      this.currentUser = null
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  async resetPassword(email: string) {
    try {
      await supabase.auth.resetPasswordForEmail(email)
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }

  async updateAdminProfile(uid: string, data: any) {
    try {
      return await adminService.update(uid, data)
    } catch (error) {
      console.error('Update admin profile error:', error)
      throw error
    }
  }
}

export const authService = new AuthService()

// Cache management utilities
export const clearAuthCache = () => {
  if (typeof window !== 'undefined') {
    // Clear localStorage
    localStorage.removeItem('supabase.auth.token')
    localStorage.removeItem('supabase.auth.expires_at')
    localStorage.removeItem('supabase.auth.refresh_token')
    
    // Clear sessionStorage
    sessionStorage.clear()
    
    // Clear any cached data
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
    }
    
    // Force reload if on login page
    if (window.location.pathname.includes('/admin/login')) {
      window.location.reload()
    }
  }
}

export const isCacheStale = () => {
  if (typeof window === 'undefined') return false
  
  const token = localStorage.getItem('supabase.auth.token')
  const expiresAt = localStorage.getItem('supabase.auth.expires_at')
  
  if (!token || !expiresAt) return true
  
  const expiryTime = parseInt(expiresAt)
  const currentTime = Date.now()
  
  // Consider cache stale if token expires in next 5 minutes or is already expired
  return currentTime >= (expiryTime - 300000)
} 