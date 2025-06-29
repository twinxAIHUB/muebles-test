"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, RefreshCw, AlertTriangle } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function TestLoginPage() {
  const { user, loading, error, initialized, signIn, createAdminAccount } = useAuth()
  const [testResults, setTestResults] = useState<any>({})
  const [isTesting, setIsTesting] = useState(false)
  const [testEmail, setTestEmail] = useState("test@example.com")
  const [testPassword, setTestPassword] = useState("testpassword123")

  const testEnvironment = async () => {
    setIsTesting(true)
    try {
      const response = await fetch('/api/env-test')
      const data = await response.json()
      setTestResults(prev => ({ ...prev, environment: data }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        environment: { success: false, error: 'Failed to test environment' }
      }))
    } finally {
      setIsTesting(false)
    }
  }

  const testSupabaseConnection = async () => {
    setIsTesting(true)
    try {
      const response = await fetch('/api/auth-test')
      const data = await response.json()
      setTestResults(prev => ({ ...prev, supabase: data }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        supabase: { success: false, error: 'Failed to test Supabase connection' }
      }))
    } finally {
      setIsTesting(false)
    }
  }

  const testCreateAdmin = async () => {
    setIsTesting(true)
    try {
      const email = `test-${Date.now()}@example.com`
      const password = "testpassword123"
      const name = "Test Admin"
      
      await createAdminAccount(email, password, name, "admin")
      setTestResults(prev => ({ 
        ...prev, 
        createAdmin: { success: true, message: `Admin account created: ${email}` }
      }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        createAdmin: { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }))
    } finally {
      setIsTesting(false)
    }
  }

  const testSignIn = async () => {
    setIsTesting(true)
    try {
      await signIn(testEmail, testPassword)
      setTestResults(prev => ({ 
        ...prev, 
        signIn: { success: true, message: "Sign in successful" }
      }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        signIn: { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        }
      }))
    } finally {
      setIsTesting(false)
    }
  }

  useEffect(() => {
    testEnvironment()
    testSupabaseConnection()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Login Test Page</h1>
      
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

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button 
                onClick={testEnvironment} 
                disabled={isTesting}
                size="sm"
              >
                Test Environment
              </Button>
              <Button 
                onClick={testSupabaseConnection} 
                disabled={isTesting}
                size="sm"
                variant="outline"
              >
                Test Supabase
              </Button>
            </div>
            
            {testResults.environment && (
              <div>
                <h4 className="font-medium mb-2">Environment:</h4>
                <Alert className={testResults.environment.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {testResults.environment.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={testResults.environment.success ? "text-green-700" : "text-red-700"}>
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(testResults.environment, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {testResults.supabase && (
              <div>
                <h4 className="font-medium mb-2">Supabase:</h4>
                <Alert className={testResults.supabase.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {testResults.supabase.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={testResults.supabase.success ? "text-green-700" : "text-red-700"}>
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(testResults.supabase, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Test Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Test Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testCreateAdmin} 
              disabled={isTesting}
              className="w-full"
            >
              {isTesting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Create Test Admin
            </Button>
            
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Test email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="password"
                placeholder="Test password"
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <Button 
                onClick={testSignIn} 
                disabled={isTesting}
                className="w-full"
                variant="outline"
              >
                Test Sign In
              </Button>
            </div>

            {testResults.createAdmin && (
              <Alert className={testResults.createAdmin.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <AlertDescription className={testResults.createAdmin.success ? "text-green-700" : "text-red-700"}>
                  {testResults.createAdmin.success ? testResults.createAdmin.message : testResults.createAdmin.error}
                </AlertDescription>
              </Alert>
            )}

            {testResults.signIn && (
              <Alert className={testResults.signIn.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <AlertDescription className={testResults.signIn.success ? "text-green-700" : "text-red-700"}>
                  {testResults.signIn.success ? testResults.signIn.message : testResults.signIn.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Button asChild>
                <a href="/admin/login">Go to Login</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/diagnose">Diagnose</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/debug-auth">Debug Auth</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 