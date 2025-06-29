'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react'
import { clearAuthCache, isCacheStale } from '@/lib/auth'

interface CacheManagerProps {
  showAlways?: boolean
  className?: string
}

export function CacheManager({ showAlways = false, className = '' }: CacheManagerProps) {
  const [cacheIssues, setCacheIssues] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Check cache status on mount and periodically
  useEffect(() => {
    const checkCache = () => {
      const stale = isCacheStale()
      setCacheIssues(stale)
    }

    checkCache()
    
    // Check every 30 seconds
    const interval = setInterval(checkCache, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleClearCache = async () => {
    setIsClearing(true)
    try {
      clearAuthCache()
      setCacheIssues(false)
      setShowSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
      
      // Reload page after a short delay
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Failed to clear cache:', error)
    } finally {
      setIsClearing(false)
    }
  }

  // Don't show anything if no cache issues and not forced to show
  if (!cacheIssues && !showAlways && !showSuccess) {
    return null
  }

  return (
    <div className={className}>
      {cacheIssues && (
        <Alert className="mb-4 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700">
            <div className="flex items-center justify-between">
              <span>Se detectaron problemas de caché que pueden afectar la funcionalidad.</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearCache}
                disabled={isClearing}
                className="ml-2 border-orange-300 text-orange-700 hover:bg-orange-100"
              >
                {isClearing ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3" />
                )}
                Limpiar Caché
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {showSuccess && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Caché limpiado exitosamente. Recargando página...
          </AlertDescription>
        </Alert>
      )}

      {showAlways && !cacheIssues && !showSuccess && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estado del caché: OK</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleClearCache}
              disabled={isClearing}
              className="text-gray-600 hover:bg-gray-100"
            >
              {isClearing ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
              Limpiar Caché
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 