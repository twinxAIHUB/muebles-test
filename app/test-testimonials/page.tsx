"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestTestimonialsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const addSampleTestimonials = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST'
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult({ success: false, error: 'Failed to add testimonials' })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTestimonials = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/testimonials')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult({ success: false, error: 'Failed to fetch testimonials' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Testimonials Test Page</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Sample Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={addSampleTestimonials} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Adding...' : 'Add Sample Testimonials'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fetch Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchTestimonials} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Fetching...' : 'Fetch Testimonials'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 