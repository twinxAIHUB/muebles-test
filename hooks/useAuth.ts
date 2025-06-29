import { useState, useEffect, useCallback } from 'react'
import { authService, clearAuthCache, isCacheStale } from '@/lib/auth'
import type { AuthUser } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cacheIssues, setCacheIssues] = useState(false)

  // Check for cache issues on mount
  useEffect(() => {
    const checkCache = () => {
      if (isCacheStale()) {
        setCacheIssues(true)
        console.warn('Auth cache is stale, clearing...')
        clearAuthCache()
      }
    }

    checkCache()
    
    // Check cache every minute
    const interval = setInterval(checkCache, 60000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced login with cache handling
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    try {
      // Clear cache before login attempt
      clearAuthCache()
      
      const result = await authService.login(email, password)
      
      if (result.success && result.user) {
        setUser(result.user)
        setCacheIssues(false)
        return { success: true, user: result.user }
      } else {
        setError(result.error || 'Login failed')
        return { success: false, error: result.error }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [])

  // Enhanced logout with cache clearing
  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
      clearAuthCache()
      setCacheIssues(false)
    } catch (err) {
      console.error('Logout error:', err)
      // Force clear cache even if logout fails
      clearAuthCache()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Force cache clear function
  const forceClearCache = useCallback(() => {
    clearAuthCache()
    setCacheIssues(false)
    setUser(null)
    setError(null)
    setLoading(false)
  }, [])

  // Check auth status with cache validation
  const checkAuth = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Check if cache is stale first
      if (isCacheStale()) {
        setCacheIssues(true)
        clearAuthCache()
        setUser(null)
        setLoading(false)
        return
      }

      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
      setCacheIssues(false)
    } catch (err) {
      console.error('Auth check error:', err)
      setError('Failed to check authentication status')
      setCacheIssues(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return {
    user,
    loading,
    error,
    cacheIssues,
    login,
    logout,
    checkAuth,
    forceClearCache,
    isAuthenticated: !!user
  }
} 