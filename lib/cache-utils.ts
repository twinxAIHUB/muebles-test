import { supabase } from './supabase'

export class CacheUtils {
  /**
   * Flush all authentication-related cache and storage
   */
  static async flushAuthCache() {
    try {
      // Clear Supabase session
      await supabase.auth.signOut()
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        // Clear all Supabase-related items
        const keysToRemove = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && (key.includes('supabase') || key.includes('auth') || key.includes('admin'))) {
            keysToRemove.push(key)
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key))
        
        // Clear sessionStorage
        sessionStorage.clear()
        
        // Clear any cached data in memory
        if (window.__NEXT_DATA__) {
          // Clear Next.js cache
          window.location.reload()
        }
      }
      
      return { success: true, message: 'Cache flushed successfully' }
    } catch (error) {
      console.error('Error flushing cache:', error)
      return { success: false, error: 'Failed to flush cache' }
    }
  }

  /**
   * Clear specific cache items
   */
  static clearSpecificCache(patterns: string[]) {
    if (typeof window === 'undefined') return
    
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && patterns.some(pattern => key.includes(pattern))) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  /**
   * Reset authentication state
   */
  static async resetAuthState() {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut()
      
      // Clear auth-related storage
      this.clearSpecificCache(['supabase', 'auth', 'admin'])
      
      // Force page reload to reset all state
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login'
      }
      
      return { success: true, message: 'Authentication state reset' }
    } catch (error) {
      console.error('Error resetting auth state:', error)
      return { success: false, error: 'Failed to reset authentication state' }
    }
  }

  /**
   * Check if there are any cached authentication issues
   */
  static checkAuthCacheStatus() {
    if (typeof window === 'undefined') return { hasIssues: false }
    
    const issues = []
    
    // Check for stale auth tokens
    const authToken = localStorage.getItem('supabase.auth.token')
    if (authToken) {
      try {
        const tokenData = JSON.parse(authToken)
        const expiresAt = tokenData.expires_at
        if (expiresAt && Date.now() > expiresAt * 1000) {
          issues.push('Expired authentication token found')
        }
      } catch (e) {
        issues.push('Invalid authentication token format')
      }
    }
    
    // Check for conflicting auth states
    const hasMultipleAuthKeys = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))
      .filter(key => key && key.includes('auth')).length > 3
    
    if (hasMultipleAuthKeys) {
      issues.push('Multiple authentication cache entries detected')
    }
    
    return {
      hasIssues: issues.length > 0,
      issues
    }
  }
} 