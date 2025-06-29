"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, RefreshCw, AlertTriangle } from "lucide-react"

export default function DiagnosePage() {
  const [diagnostics, setDiagnostics] = useState<any>({})
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const results: any = {}

    try {
      // Check environment variables
      results.env = {
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        nodeEnv: process.env.NODE_ENV
      }

      // Check localStorage
      if (typeof window !== 'undefined') {
        results.localStorage = {
          hasSupabaseAuth: !!localStorage.getItem('supabase.auth.token'),
          hasMultipleAuthKeys: Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))
            .filter(key => key && key.includes('auth')).length,
          totalKeys: localStorage.length
        }
      }

      // Test Supabase connection
      try {
        const response = await fetch('/api/auth-test')
        const data = await response.json()
        results.supabaseTest = data
      } catch (error) {
        results.supabaseTest = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }

      // Test testimonials API
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        results.testimonialsTest = data
      } catch (error) {
        results.testimonialsTest = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }

      // Check if we can access the auth hook
      try {
        const { useAuth } = await import('@/hooks/useAuth')
        results.authHook = { available: true }
      } catch (error) {
        results.authHook = { 
          available: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }

    } catch (error) {
      results.generalError = error instanceof Error ? error.message : 'Unknown error'
    }

    setDiagnostics(results)
    setIsRunning(false)
  }

  const clearAllStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
      sessionStorage.clear()
      window.location.reload()
    }
  }

  const forceRedirectToLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login'
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Authentication Diagnostics</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Environment Check */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Supabase URL:</span>
              <span className={diagnostics.env?.supabaseUrl ? "text-green-600" : "text-red-600"}>
                {diagnostics.env?.supabaseUrl ? "✓ Set" : "✗ Missing"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Supabase Key:</span>
              <span className={diagnostics.env?.supabaseKey ? "text-green-600" : "text-red-600"}>
                {diagnostics.env?.supabaseKey ? "✓ Set" : "✗ Missing"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Node Environment:</span>
              <span className="text-blue-600">
                {diagnostics.env?.nodeEnv || "Unknown"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* LocalStorage Check */}
        <Card>
          <CardHeader>
            <CardTitle>Browser Storage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Supabase Auth Token:</span>
              <span className={diagnostics.localStorage?.hasSupabaseAuth ? "text-orange-600" : "text-green-600"}>
                {diagnostics.localStorage?.hasSupabaseAuth ? "✓ Found" : "✗ None"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Auth Keys Count:</span>
              <span className="text-blue-600">
                {diagnostics.localStorage?.hasMultipleAuthKeys || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Storage Keys:</span>
              <span className="text-blue-600">
                {diagnostics.localStorage?.totalKeys || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Supabase Test */}
        <Card>
          <CardHeader>
            <CardTitle>Supabase Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {diagnostics.supabaseTest ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Status:</span>
                  <span className={diagnostics.supabaseTest.success ? "text-green-600" : "text-red-600"}>
                    {diagnostics.supabaseTest.success ? "✓ Connected" : "✗ Failed"}
                  </span>
                </div>
                {diagnostics.supabaseTest.error && (
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700 text-xs">
                      {diagnostics.supabaseTest.error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-gray-500">Not tested yet</div>
            )}
          </CardContent>
        </Card>

        {/* Testimonials Test */}
        <Card>
          <CardHeader>
            <CardTitle>Database Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {diagnostics.testimonialsTest ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span>Status:</span>
                  <span className={diagnostics.testimonialsTest.success ? "text-green-600" : "text-red-600"}>
                    {diagnostics.testimonialsTest.success ? "✓ Connected" : "✗ Failed"}
                  </span>
                </div>
                {diagnostics.testimonialsTest.error && (
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700 text-xs">
                      {diagnostics.testimonialsTest.error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-gray-500">Not tested yet</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <Button 
              onClick={runDiagnostics} 
              disabled={isRunning}
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Run Diagnostics
            </Button>
            <Button 
              onClick={clearAllStorage} 
              variant="outline"
            >
              Clear All Storage
            </Button>
            <Button 
              onClick={forceRedirectToLogin} 
              variant="outline"
            >
              Go to Login
            </Button>
            <Button asChild variant="outline">
              <a href="/debug-auth">Debug Auth</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {diagnostics.env && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            {!diagnostics.env.supabaseUrl || !diagnostics.env.supabaseKey ? (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  <strong>Missing Environment Variables:</strong> You need to set up your Supabase environment variables.
                  <br />
                  Create a <code>.env.local</code> file with:
                  <pre className="mt-2 bg-gray-100 p-2 rounded text-xs">
                    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url<br />
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
                  </pre>
                </AlertDescription>
              </Alert>
            ) : diagnostics.localStorage?.hasSupabaseAuth ? (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                  <strong>Stale Authentication Data:</strong> There's cached authentication data that might be causing issues.
                  <br />
                  Try clicking "Clear All Storage" above.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  <strong>Environment looks good!</strong> If you're still having issues, try clearing storage and restarting the development server.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 