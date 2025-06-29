"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function DebugAuthPage() {
  const { user, loading, error, initialized, flushCache, resetAuthState } = useAuth()
  const [testResults, setTestResults] = useState<any>(null)
  const [isTesting, setIsTesting] = useState(false)

  const testConnection = async () => {
    setIsTesting(true)
    try {
      const response = await fetch('/api/auth-test')
      const data = await response.json()
      setTestResults(data)
    } catch (error) {
      setTestResults({
        success: false,
        error: 'Failed to test connection'
      })
    } finally {
      setIsTesting(false)
    }
  }

  const testAdminCreation = async () => {
    setIsTesting(true)
    try {
      const response = await fetch('/api/auth-test', {
        method: 'POST'
      })
      const data = await response.json()
      setTestResults(data)
    } catch (error) {
      setTestResults({
        success: false,
        error: 'Failed to test admin creation'
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Auth State */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication State</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Loading:</span>
              <span className={loading ? "text-orange-600" : "text-green-600"}>
                {loading ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Initialized:</span>
              <span className={initialized ? "text-green-600" : "text-red-600"}>
                {initialized ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Authenticated:</span>
              <span className={user ? "text-green-600" : "text-red-600"}>
                {user ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Is Admin:</span>
              <span className={user?.isAdmin ? "text-green-600" : "text-red-600"}>
                {user?.isAdmin ? "Yes" : "No"}
              </span>
            </div>
            {user && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.displayName}</p>
              </div>
            )}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Connection Test */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={testConnection} 
                disabled={isTesting}
                className="flex-1"
              >
                {isTesting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Test Connection
              </Button>
              <Button 
                onClick={testAdminCreation} 
                disabled={isTesting}
                variant="outline"
              >
                Test Admin Creation
              </Button>
            </div>
            
            {testResults && (
              <div className="mt-4">
                <Alert className={testResults.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {testResults.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={testResults.success ? "text-green-700" : "text-red-700"}>
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(testResults, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cache Management */}
        <Card>
          <CardHeader>
            <CardTitle>Cache Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={flushCache} 
              disabled={loading}
              className="w-full"
              variant="outline"
            >
              Flush Cache
            </Button>
            <Button 
              onClick={resetAuthState} 
              disabled={loading}
              className="w-full"
              variant="destructive"
            >
              Reset Auth State
            </Button>
            <p className="text-sm text-gray-600">
              Use these buttons to clear authentication cache and reset the authentication state.
            </p>
          </CardContent>
        </Card>

        {/* Environment Check */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Check</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Supabase URL:</span>
              <span className="text-xs">
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Supabase Key:</span>
              <span className="text-xs">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Environment:</span>
              <span className="text-xs">
                {process.env.NODE_ENV}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button asChild>
              <a href="/admin/login">Go to Login</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/admin">Go to Admin</a>
            </Button>
            <Button asChild variant="outline">
              <a href="/test-testimonials">Test Testimonials</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 