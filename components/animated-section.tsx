"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade" | "slide-up" | "slide-right" | "scale"
  delay?: number
  duration?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fade",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ freezeOnceVisible: once })

  // Definir las variantes de animación
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === "slide-up" ? 30 : 0,
      x: animation === "slide-right" ? -30 : 0,
      scale: animation === "scale" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Curva de animación más suave
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
