import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    // Check if environment variables are set
    const hasUrl = !!supabaseUrl
    const hasKey = !!supabaseKey
    
    // Check if they look like valid Supabase credentials
    const urlIsValid = hasUrl && supabaseUrl!.includes('supabase.co')
    const keyIsValid = hasKey && supabaseKey!.startsWith('eyJ')
    
    return NextResponse.json({
      success: true,
      environment: {
        hasUrl,
        hasKey,
        urlIsValid,
        keyIsValid,
        urlPreview: hasUrl ? `${supabaseUrl!.substring(0, 30)}...` : null,
        keyPreview: hasKey ? `${supabaseKey!.substring(0, 20)}...` : null,
        nodeEnv: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Environment test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 