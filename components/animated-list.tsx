"use client"

import React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedListProps {
  children: ReactNode
  className?: string
  itemClassName?: string
  staggerDelay?: number
  duration?: number
  once?: boolean
}

export function AnimatedList({
  children,
  className = "",
  itemClassName = "",
  staggerDelay = 0.1,
  duration = 0.5,
  once = true,
}: AnimatedListProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ freezeOnceVisible: once })

  // Variantes para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  // Variantes para los elementos individuales
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1.0], // Curva de animación más suave
      },
    },
  }

  // Convertir los hijos en un array para poder mapearlos
  const childrenArray = React.Children.toArray(children)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
