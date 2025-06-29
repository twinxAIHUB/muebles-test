"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"
import { testimonialsService } from "@/lib/database-supabase"
import type { Testimonial } from "@/lib/database-supabase"

interface TestimonialsSectionProps {
  className?: string
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true)
      // Only fetch active testimonials for the front end
      const data = await testimonialsService.getAll({ status: "active" })
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-gch-yellow fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  // If no testimonials or loading, show a placeholder
  if (isLoading) {
    return (
      <section className={`py-16 md:py-24 relative overflow-hidden bg-white ${className}`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gch-blue/5 to-transparent -z-0"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <AnimatedSection animation="slide-right" className="text-center lg:text-left">
              <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                La confianza y satisfacción de nuestros clientes son nuestro mayor orgullo.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="slide-right" delay={0.2}>
              <div className="mt-10 lg:mt-0 p-8 rounded-xl bg-gradient-to-br from-gch-blue to-gch-blue/90 shadow-2xl shadow-gch-blue/20 text-white relative">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded mb-4"></div>
                  <div className="h-20 bg-white/20 rounded mb-6"></div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/20"></div>
                    <div className="ml-3">
                      <div className="h-3 bg-white/20 rounded w-20 mb-2"></div>
                      <div className="h-2 bg-white/20 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className={`py-16 md:py-24 relative overflow-hidden bg-white ${className}`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gch-blue/5 to-transparent -z-0"></div>
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <AnimatedSection animation="slide-right" className="text-center lg:text-left">
              <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">
                Lo que dicen nuestros clientes
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                La confianza y satisfacción de nuestros clientes son nuestro mayor orgullo.
              </p>
            </AnimatedSection>
            <AnimatedSection animation="slide-right" delay={0.2}>
              <div className="mt-10 lg:mt-0 p-8 rounded-xl bg-gradient-to-br from-gch-blue to-gch-blue/90 shadow-2xl shadow-gch-blue/20 text-white relative">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-xl font-semibold mb-4 text-gch-gray">Testimonio de ejemplo</h3>
                    <p className="text-sm text-muted-foreground">
                      "El equipo supo plasmar exactamente lo que queríamos. Remodelaron nuestra sala y cocina y el resultado
                      fue de revista. ¡Superaron nuestras expectativas!"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gch-yellow/50" />
                    <div className="ml-3">
                      <p className="text-sm font-medium">María L.</p>
                      <p className="text-xs text-muted-foreground">Cliente residencial</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className={`py-16 md:py-24 relative overflow-hidden bg-white ${className}`}>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gch-blue/5 to-transparent -z-0"></div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <AnimatedSection animation="slide-right" className="text-center lg:text-left">
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">
              Lo que dicen nuestros clientes
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              La confianza y satisfacción de nuestros clientes son nuestro mayor orgullo.
            </p>
            {testimonials.length > 1 && (
              <div className="mt-8 flex justify-center lg:justify-start gap-4">
                <Button
                  variant="outline"
                  className="rounded-full h-12 w-12 p-0 border-gch-blue/50 text-gch-blue hover:bg-gch-blue/10"
                  onClick={prevTestimonial}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full h-12 w-12 p-0 border-gch-blue/50 text-gch-blue hover:bg-gch-blue/10"
                  onClick={nextTestimonial}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection animation="slide-right" delay={0.2}>
            <div className="mt-10 lg:mt-0 p-8 rounded-xl bg-gradient-to-br from-gch-blue to-gch-blue/90 shadow-2xl shadow-gch-blue/20 text-white relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 text-gch-yellow/20">
                <svg fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14 14-6.2 14-14S23.8 2 16 2zm0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z" />
                  <path d="M16 10c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                </svg>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-4 text-gch-gray">
                    {currentTestimonial.name}
                  </h3>
                  <div className="flex items-center space-x-1 mb-3">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "{currentTestimonial.content}"
                  </p>
                </div>
                <div className="flex items-center">
                  {currentTestimonial.image ? (
                    <img 
                      src={currentTestimonial.image} 
                      alt={currentTestimonial.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gch-yellow/50 flex items-center justify-center">
                      <User className="h-5 w-5 text-gch-blue" />
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium">{currentTestimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentTestimonial.role} en {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
} 