'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Database,
  Clock,
  Trash2,
  Activity
} from 'lucide-react'
import { clearAuthCache, isCacheStale } from '@/lib/auth'

interface CacheInfo {
  hasToken: boolean
  hasExpiry: boolean
  isStale: boolean
  tokenAge?: number
  expiryTime?: number
  localStorageKeys: string[]
  sessionStorageKeys: string[]
}

export default function CacheDiagnosticsPage() {
  const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null)
  const [isClearing, setIsClearing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date>(new Date())

  const checkCacheStatus = () => {
    if (typeof window === 'undefined') return

    const token = localStorage.getItem('supabase.auth.token')
    const expiresAt = localStorage.getItem('supabase.auth.expires_at')
    const refreshToken = localStorage.getItem('supabase.auth.refresh_token')
    
    const now = Date.now()
    const expiryTime = expiresAt ? parseInt(expiresAt) : undefined
    const tokenAge = token ? Math.floor((now - (expiryTime || now)) / 1000) : undefined
    
    const localStorageKeys = Object.keys(localStorage).filter(key => 
      key.includes('supabase') || key.includes('auth') || key.includes('cache')
    )
    
    const sessionStorageKeys = Object.keys(sessionStorage)

    setCacheInfo({
      hasToken: !!token,
      hasExpiry: !!expiresAt,
      isStale: isCacheStale(),
      tokenAge: tokenAge || undefined,
      expiryTime: expiryTime || undefined,
      localStorageKeys,
      sessionStorageKeys
    })
    
    setLastChecked(new Date())
  }

  useEffect(() => {
    checkCacheStatus()
    
    // Check every 10 seconds
    const interval = setInterval(checkCacheStatus, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleClearCache = async () => {
    setIsClearing(true)
    try {
      clearAuthCache()
      setShowSuccess(true)
      
      // Refresh cache info after clearing
      setTimeout(() => {
        checkCacheStatus()
        setShowSuccess(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to clear cache:', error)
    } finally {
      setIsClearing(false)
    }
  }

  const handleForceReload = () => {
    window.location.reload()
  }

  if (!cacheInfo) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <Activity className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2">Checking cache status...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cache Diagnostics</h1>
          <p className="text-slate-600 mt-2">
            Monitor and manage authentication cache status
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={checkCacheStatus}
            disabled={isClearing}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button
            variant="destructive"
            onClick={handleClearCache}
            disabled={isClearing}
          >
            {isClearing ? (
              <Activity className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            Clear Cache
          </Button>
        </div>
      </div>

      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Cache cleared successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Cache Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Cache Status Overview
          </CardTitle>
          <CardDescription>
            Last checked: {lastChecked.toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-600">Auth Token</p>
                <p className="text-lg font-semibold">
                  {cacheInfo.hasToken ? 'Present' : 'Missing'}
                </p>
              </div>
              <Badge variant={cacheInfo.hasToken ? 'default' : 'destructive'}>
                {cacheInfo.hasToken ? 'OK' : 'ERROR'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-600">Expiry Time</p>
                <p className="text-lg font-semibold">
                  {cacheInfo.hasExpiry ? 'Set' : 'Missing'}
                </p>
              </div>
              <Badge variant={cacheInfo.hasExpiry ? 'default' : 'destructive'}>
                {cacheInfo.hasExpiry ? 'OK' : 'ERROR'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-600">Cache Status</p>
                <p className="text-lg font-semibold">
                  {cacheInfo.isStale ? 'Stale' : 'Fresh'}
                </p>
              </div>
              <Badge variant={cacheInfo.isStale ? 'destructive' : 'default'}>
                {cacheInfo.isStale ? 'ISSUE' : 'OK'}
              </Badge>
            </div>
          </div>

          {cacheInfo.isStale && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-700">
                Cache is stale and may cause authentication issues. Consider clearing the cache.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Detailed Cache Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local Storage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Local Storage
            </CardTitle>
            <CardDescription>
              {cacheInfo.localStorageKeys.length} auth-related keys found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cacheInfo.localStorageKeys.length > 0 ? (
              <div className="space-y-2">
                {cacheInfo.localStorageKeys.map((key) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm">
                    <span className="font-mono text-slate-700">{key}</span>
                    <Badge variant="outline" className="text-xs">
                      {localStorage.getItem(key)?.length || 0} chars
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No auth-related keys found in localStorage</p>
            )}
          </CardContent>
        </Card>

        {/* Session Storage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Session Storage
            </CardTitle>
            <CardDescription>
              {cacheInfo.sessionStorageKeys.length} keys found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cacheInfo.sessionStorageKeys.length > 0 ? (
              <div className="space-y-2">
                {cacheInfo.sessionStorageKeys.map((key) => (
                  <div key={key} className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm">
                    <span className="font-mono text-slate-700">{key}</span>
                    <Badge variant="outline" className="text-xs">
                      {sessionStorage.getItem(key)?.length || 0} chars
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No keys found in sessionStorage</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Token Details */}
      {cacheInfo.hasToken && cacheInfo.hasExpiry && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Token Details
            </CardTitle>
            <CardDescription>
              Information about the current authentication token
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">Token Age</p>
                <p className="text-lg font-semibold">
                  {cacheInfo.tokenAge ? `${Math.abs(cacheInfo.tokenAge)} seconds` : 'Unknown'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Expires At</p>
                <p className="text-lg font-semibold">
                  {cacheInfo.expiryTime ? new Date(cacheInfo.expiryTime).toLocaleString() : 'Unknown'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Cache Management Actions</CardTitle>
          <CardDescription>
            Tools to manage and troubleshoot cache issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={checkCacheStatus}
              className="h-20 flex flex-col items-center justify-center"
            >
              <RefreshCw className="h-6 w-6 mb-2" />
              <span>Refresh Status</span>
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleClearCache}
              disabled={isClearing}
              className="h-20 flex flex-col items-center justify-center"
            >
              {isClearing ? (
                <Activity className="h-6 w-6 mb-2 animate-spin" />
              ) : (
                <Trash2 className="h-6 w-6 mb-2" />
              )}
              <span>Clear Cache</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleForceReload}
              className="h-20 flex flex-col items-center justify-center"
            >
              <RefreshCw className="h-6 w-6 mb-2" />
              <span>Force Reload</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 