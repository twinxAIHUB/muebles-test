import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { adminService } from '@/lib/database-supabase'

export async function GET() {
  try {
    // Test Supabase connection
    const { data: session, error: sessionError } = await supabase.auth.getSession()
    
    // Test database connection
    const { data: admins, error: dbError } = await supabase
      .from('admins')
      .select('count')
      .limit(1)

    return NextResponse.json({
      success: true,
      supabase: {
        connected: !sessionError,
        hasSession: !!session.session,
        error: sessionError?.message
      },
      database: {
        connected: !dbError,
        error: dbError?.message,
        adminCount: admins?.length || 0
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Auth test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Test creating a test admin account
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = 'testpassword123'
    
    // Create Supabase user
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          name: 'Test Admin',
          role: 'admin'
        }
      }
    })

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        step: 'user_creation'
      }, { status: 400 })
    }

    if (!data.user) {
      return NextResponse.json({
        success: false,
        error: 'No user returned from Supabase',
        step: 'user_creation'
      }, { status: 400 })
    }

    // Create admin record
    const adminData = {
      uid: data.user.id,
      email: data.user.email!,
      name: 'Test Admin',
      role: 'admin' as const,
      is_active: true,
      last_login: new Date().toISOString()
    }

    const admin = await adminService.create(adminData)

    // Clean up - delete the test user
    await supabase.auth.signOut()
    await adminService.delete(admin.id)

    return NextResponse.json({
      success: true,
      message: 'Test admin account created and cleaned up successfully',
      testUser: {
        id: data.user.id,
        email: data.user.email
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Auth test POST error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'admin_creation'
    }, { status: 500 })
  }
} 