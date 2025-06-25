"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { AnimatedSection } from "./animated-section"

interface CategoryHeaderProps {
  title: string
  description: string
  imageSrc: string
  children?: ReactNode
}

export function CategoryHeader({ title, description, imageSrc, children }: CategoryHeaderProps) {
  return (
    <section className="relative pt-28 pb-20 md:pt-32 md:pb-28">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gch-blue/30 to-transparent z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gch-yellow/10 to-transparent z-0"></div>
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gch-yellow/10 to-transparent z-0"></div>

      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="container relative z-10">
        <AnimatedSection animation="fade" className="max-w-3xl mx-auto text-center text-white">
          <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 md:text-5xl lg:text-6xl text-shadow-lg">
            {title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 text-shadow-sm">{description}</p>
          {children}
        </AnimatedSection>
      </div>
    </section>
  )
}
