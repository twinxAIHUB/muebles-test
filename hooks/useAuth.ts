import { useState, useEffect } from 'react'
import { authService, type AuthUser } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial user state
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
    setLoading(false)

    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      const user = await authService.signIn(email, password)
      setUser(user)
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign in'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createAdminAccount = async (
    email: string, 
    password: string, 
    name: string, 
    role: "super_admin" | "admin" | "editor" = "admin"
  ) => {
    try {
      setError(null)
      setLoading(true)
      const user = await authService.createAdminAccount(email, password, name, role)
      setUser(user)
      return user
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during account creation'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      setLoading(true)
      await authService.signOut()
      setUser(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign out'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setError(null)
      await authService.resetPassword(email)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during password reset'
      setError(errorMessage)
      throw err
    }
  }

  const updateProfile = async (uid: string, data: any) => {
    try {
      setError(null)
      const updatedAdmin = await authService.updateAdminProfile(uid, data)
      // Update local user state
      if (user && user.uid === uid) {
        setUser({ ...user, adminData: updatedAdmin })
      }
      return updatedAdmin
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during profile update'
      setError(errorMessage)
      throw err
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    createAdminAccount,
    signOut,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  }
} 