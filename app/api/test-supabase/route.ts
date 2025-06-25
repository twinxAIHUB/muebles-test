import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Test database connection
    const { data: settingsData, error: settingsError } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)

    // Test authentication
    const { data: authData, error: authError } = await supabase.auth.getSession()

    // Test storage
    const { data: storageData, error: storageError } = await supabase.storage.listBuckets()

    return NextResponse.json({
      success: true,
      database: {
        working: !settingsError,
        error: settingsError?.message,
        data: settingsData
      },
      authentication: {
        working: !authError,
        error: authError?.message
      },
      storage: {
        working: !storageError,
        error: storageError?.message,
        buckets: storageData?.map(b => b.name) || []
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 