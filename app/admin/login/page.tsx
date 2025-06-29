"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, Shield, UserPlus, RefreshCw, AlertTriangle } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const { user, loading, error, cacheIssues, login, forceClearCache } = useAuth()
  
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  
  // Registration form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin' as 'super_admin' | 'admin' | 'editor'
  })

  // Show timeout warning if loading takes too long
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false)

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      router.push('/admin')
    }
  }, [user, loading, router])

  // Show cache alert if cache issues detected
  useEffect(() => {
    if (cacheIssues) {
      setShowTimeoutWarning(true)
    }
  }, [cacheIssues])

  // Auto-clear cache on page load if there are issues
  useEffect(() => {
    if (cacheIssues) {
      console.log('Cache issues detected, auto-clearing...')
      forceClearCache()
    }
  }, [cacheIssues, forceClearCache])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading) {
        setShowTimeoutWarning(true)
      }
    }, 8000) // Show warning after 8 seconds

    return () => clearTimeout(timeoutId)
  }, [loading])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await login(loginData.email, loginData.password)
      if (result.success) {
        router.push('/admin')
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (registerData.password !== registerData.confirmPassword) {
      setIsSubmitting(false)
      return
    }
    
    try {
      // For now, just show an alert that registration is not implemented
      alert('Registration is not implemented yet. Please contact the administrator.')
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClearCache = async () => {
    setIsSubmitting(true)
    try {
      forceClearCache()
      setShowTimeoutWarning(false)
      // Reload the page after cache flush
      window.location.reload()
    } catch (error) {
      console.error('Failed to clear cache:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Verificando autenticación...</p>
            {cacheIssues && (
              <p className="text-sm text-orange-600 mt-2">Detectando problemas de caché...</p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              GCH Admin Panel
            </CardTitle>
            <CardDescription className="text-slate-600">
              Access your dashboard and manage your content
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Timeout Warning */}
            {showTimeoutWarning && (
              <Alert className="mb-4 border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-700">
                  <div className="flex items-center justify-between">
                    <span>Authentication is taking longer than expected.</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleClearCache}
                      disabled={isSubmitting}
                      className="ml-2 border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <RefreshCw className="w-3 h-3" />
                      )}
                      Clear Cache
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleClearCache}
                    className="ml-2 mt-2 border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Clear Cache & Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@gchservicios.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700 font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="border-slate-200 focus:border-blue-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    disabled={isSubmitting || !loginData.email || !loginData.password}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-slate-700 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-slate-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="admin@gchservicios.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-slate-700 font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="border-slate-200 focus:border-blue-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="text-slate-700 font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="border-slate-200 focus:border-blue-500 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    disabled={isSubmitting || !registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword || registerData.password !== registerData.confirmPassword}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Cache Management Section */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={handleClearCache}
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
                size="sm"
                disabled={isSubmitting}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Cache & Reload
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 