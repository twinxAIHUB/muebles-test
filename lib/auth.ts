import { supabase } from './supabase'
import { adminService, type AdminUser } from './database-supabase'

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

  constructor() {
    // Listen for auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user
      if (user) {
        // Check if user is admin
        const isAdmin = await adminService.isAdmin(user.id)
        let adminData: AdminUser | undefined

        if (isAdmin) {
          const admin = await adminService.getByUid(user.id)
          adminData = admin || undefined
          // Update last login
          await adminService.updateLastLogin(user.id)
        }

        this.currentUser = {
          id: user.id,
          email: user.email,
          displayName: (user.user_metadata?.name ?? user.email ?? null) as string | null,
          photoURL: (user.user_metadata?.avatar_url ?? null) as string | null,
          isAdmin,
          adminData
        }
      } else {
        this.currentUser = null
      }
      this.listeners.forEach(listener => listener(this.currentUser))
    })
  }

  getCurrentUser() {
    return this.currentUser
  }

  onAuthStateChanged(listener: (user: AuthUser | null) => void): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  async signIn(email: string, password: string): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const user = data.user
    if (!user) throw new Error('No user returned from Supabase')
    // Check if user is admin
    const isAdmin = await adminService.isAdmin(user.id)
    if (!isAdmin) {
      await supabase.auth.signOut()
      throw new Error('Access denied. You are not authorized as an admin.')
    }
    let adminData: AdminUser | undefined
    if (isAdmin) {
      const admin = await adminService.getByUid(user.id)
      adminData = admin || undefined
      await adminService.updateLastLogin(user.id)
    }
    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      displayName: (user.user_metadata?.name ?? user.email ?? null) as string | null,
      photoURL: (user.user_metadata?.avatar_url ?? null) as string | null,
      isAdmin,
      adminData
    }
    this.currentUser = authUser
    return authUser
  }

  async createAdminAccount(email: string, password: string, name: string, role: 'super_admin' | 'admin' | 'editor' = 'admin'): Promise<AuthUser> {
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
      email: user.email,
      displayName: (name ?? user.email ?? null) as string | null,
      photoURL: (user.user_metadata?.avatar_url ?? null) as string | null,
      isAdmin: true,
      adminData: admin
    }
    this.currentUser = authUser
    return authUser
  }

  async signOut() {
    await supabase.auth.signOut()
    this.currentUser = null
  }

  async resetPassword(email: string) {
    await supabase.auth.resetPasswordForEmail(email)
  }

  async updateAdminProfile(uid: string, data: any) {
    // Update admin profile in database
    return await adminService.update(uid, data)
  }
}

export const authService = new AuthService() 