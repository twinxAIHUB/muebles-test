import { useState, useEffect } from 'react'
import { authService, type AuthUser } from '@/lib/auth'
import { CacheUtils } from '@/lib/cache-utils'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    let mounted = true

    const initializeAuth = async () => {
      try {
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted && loading) {
            console.warn('Auth initialization timeout - clearing cache')
            setError('Authentication timeout. Please try again.')
            setLoading(false)
            CacheUtils.flushAuthCache()
          }
        }, 10000) // 10 second timeout

        // Check for cache issues
        const cacheStatus = CacheUtils.checkAuthCacheStatus()
        if (cacheStatus.hasIssues) {
          console.warn('Auth cache issues detected:', cacheStatus.issues)
          await CacheUtils.flushAuthCache()
        }

        // Wait for auth service to initialize
        let attempts = 0
        while (!authService.isInitialized() && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }

        // Check for initialization errors
        const initError = authService.getInitializationError()
        if (initError) {
          console.error('Auth service initialization error:', initError)
          setError(`Authentication initialization failed: ${initError}`)
          setLoading(false)
          setInitialized(true)
          return
        }

        // Get initial user state
        const currentUser = authService.getCurrentUser()
        if (mounted) {
          setUser(currentUser)
          setLoading(false)
          setInitialized(true)
        }

        // Listen for auth state changes
        const unsubscribe = authService.onAuthStateChanged((user) => {
          if (mounted) {
            setUser(user)
            setLoading(false)
            setInitialized(true)
            setError(null) // Clear any previous errors
          }
        })

        return unsubscribe
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setError('Failed to initialize authentication')
          setLoading(false)
          setInitialized(true)
        }
      }
    }

    initializeAuth()

    return () => {
      mounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      
      // Clear any existing cache issues before signing in
      await CacheUtils.flushAuthCache()
      
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
      
      // Clear any existing cache issues before creating account
      await CacheUtils.flushAuthCache()
      
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
      // Clear cache after sign out
      await CacheUtils.flushAuthCache()
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
      if (user && user.id === uid) {
        setUser({ ...user, adminData: updatedAdmin })
      }
      return updatedAdmin
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during profile update'
      setError(errorMessage)
      throw err
    }
  }

  const flushCache = async () => {
    try {
      setError(null)
      setLoading(true)
      const result = await CacheUtils.flushAuthCache()
      if (result.success) {
        setUser(null)
        setError(null)
      } else {
        setError(result.error || 'Failed to flush cache')
      }
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while flushing cache'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetAuthState = async () => {
    try {
      setError(null)
      setLoading(true)
      const result = await CacheUtils.resetAuthState()
      if (!result.success) {
        setError(result.error || 'Failed to reset authentication state')
      }
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while resetting auth state'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    initialized,
    signIn,
    createAdminAccount,
    signOut,
    resetPassword,
    updateProfile,
    flushCache,
    resetAuthState,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  }
} 