import { NextResponse } from 'next/server'
import { testimonialsService } from '@/lib/database-supabase'

export async function GET() {
  try {
    const testimonials = await testimonialsService.getAll()
    return NextResponse.json({ success: true, data: testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Add sample testimonials if none exist
    const existingTestimonials = await testimonialsService.getAll()
    
    if (existingTestimonials.length === 0) {
      const sampleTestimonials = [
        {
          name: "María González",
          role: "CEO",
          company: "TechCorp",
          content: "Excelente servicio y profesionalismo. GCH transformó completamente nuestro espacio de trabajo con su expertise en diseño y construcción.",
          rating: 5,
          status: "active" as const,
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
        },
        {
          name: "Carlos Rodríguez",
          role: "Director",
          company: "Inmobiliaria Premium",
          content: "La calidad del trabajo superó nuestras expectativas. Definitivamente los recomendaremos para futuros proyectos.",
          rating: 5,
          status: "active" as const,
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        {
          name: "Ana Martínez",
          role: "Propietaria",
          company: "Restaurante El Buen Sabor",
          content: "GCH nos ayudó a crear el ambiente perfecto para nuestro restaurante. El resultado fue espectacular.",
          rating: 4,
          status: "active" as const,
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
        }
      ]

      for (const testimonial of sampleTestimonials) {
        await testimonialsService.create(testimonial)
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Sample testimonials added successfully',
        count: sampleTestimonials.length
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Testimonials already exist',
      count: existingTestimonials.length
    })
  } catch (error) {
    console.error('Error adding sample testimonials:', error)
    return NextResponse.json({ success: false, error: 'Failed to add sample testimonials' }, { status: 500 })
  }
} 