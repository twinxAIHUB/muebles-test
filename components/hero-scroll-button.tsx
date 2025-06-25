"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function HeroScrollButton() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center transition-opacity duration-700 ${scrolled ? "opacity-0 translate-y-4" : "opacity-100"}`}
    >
      <span className="text-white/80 text-sm font-light mb-2">Descubrir más</span>
      <div className="animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/80 h-6 w-6"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </div>
      <button
        className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }}
        aria-label="Desplazarse hacia abajo"
      />
    </div>
  )
} 