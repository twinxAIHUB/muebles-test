'use client'

import { useState, useEffect } from 'react'

export default function TestSupabase() {
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runTest = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-supabase')
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    runTest()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Testing Supabase connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Supabase Connection Test</h1>
        
        {testResult && (
          <div className="space-y-6">
            {/* Overall Status */}
            <div className={`p-6 rounded-lg border ${testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h2 className={`text-xl font-semibold ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {testResult.success ? '✅ Supabase is working!' : '❌ Supabase connection failed'}
              </h2>
              {testResult.error && (
                <p className="text-red-600 mt-2">{testResult.error}</p>
              )}
            </div>

            {/* Database Test */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Connection</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                testResult.database?.working 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {testResult.database?.working ? '✅ Working' : '❌ Failed'}
              </div>
              {testResult.database?.error && (
                <p className="text-red-600 mt-2 text-sm">{testResult.database.error}</p>
              )}
              {testResult.database?.data && (
                <div className="mt-4 p-4 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Sample data from site_settings:</p>
                  <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(testResult.database.data, null, 2)}</pre>
                </div>
              )}
            </div>

            {/* Authentication Test */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                testResult.authentication?.working 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {testResult.authentication?.working ? '✅ Working' : '❌ Failed'}
              </div>
              {testResult.authentication?.error && (
                <p className="text-red-600 mt-2 text-sm">{testResult.authentication.error}</p>
              )}
            </div>

            {/* Storage Test */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                testResult.storage?.working 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {testResult.storage?.working ? '✅ Working' : '❌ Failed'}
              </div>
              {testResult.storage?.error && (
                <p className="text-red-600 mt-2 text-sm">{testResult.storage.error}</p>
              )}
              {testResult.storage?.buckets && testResult.storage.buckets.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Available buckets:</p>
                  <ul className="mt-2 space-y-1">
                    {testResult.storage.buckets.map((bucket: string) => (
                      <li key={bucket} className="text-sm bg-gray-50 px-3 py-1 rounded inline-block mr-2">
                        {bucket}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Environment Variables Check */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Variables</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 w-48">NEXT_PUBLIC_SUPABASE_URL:</span>
                  <span className={`text-sm ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}`}>
                    {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 w-48">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
                  <span className={`text-sm ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}`}>
                    {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}
                  </span>
                </div>
              </div>
            </div>

            {/* Retry Button */}
            <div className="text-center">
              <button
                onClick={runTest}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Retry Test'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 