import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const testPayload = {
      message: "Test message from GCH website",
      timestamp: new Date().toISOString(),
      source: 'gch-website-test',
      projects: [] // Empty projects array for test
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'https://twinxai.app.n8n.cloud/webhook/c7753a7d-0885-4de5-b1a6-57bba7cc40c0'
    
    console.log('Testing n8n webhook:', n8nWebhookUrl)
    console.log('Test payload:', testPayload)
    
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    })

    console.log('Test response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({
        success: false,
        status: response.status,
        error: errorText
      })
    }

    const data = await response.json()
    console.log('Test response data:', data)
    
    // Parse response the same way as main chatbot
    let responseMessage = 'Test response received'
    if (Array.isArray(data) && data.length > 0) {
      if (data[0].output) {
        responseMessage = data[0].output
      } else if (typeof data[0] === 'string') {
        responseMessage = data[0]
      }
    } else if (data.output) {
      responseMessage = data.output
    } else if (data.response) {
      responseMessage = data.response
    } else if (data.message) {
      responseMessage = data.message
    }
    
    return NextResponse.json({
      success: true,
      status: response.status,
      data: data,
      parsedMessage: responseMessage
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 