"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [compactMode, setCompactMode] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const pathname = usePathname()

  const isHomePage = pathname === "/"

  const handleScroll = useCallback(() => {
      setScrolled(window.scrollY > 20)
      setCompactMode(window.scrollY > 100)
    
    const totalHeight = document.body.scrollHeight - window.innerHeight
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    } else {
      setScrollProgress(0)
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call on mount to set initial state
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500",
        compactMode ? "compact-header" : "",
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg shadow-black/10"
          : isHomePage
            ? "bg-transparent py-4"
            : "bg-gch-blue/90 backdrop-blur-md py-3 shadow-lg shadow-gch-blue/20",
        compactMode && (isHomePage ? "py-1 bg-black/90 backdrop-blur-md" : "py-1 bg-gch-blue/95 backdrop-blur-md"),
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-10 group">
            <div
              className={cn(
                "absolute -inset-2 rounded-full transition-all duration-300 opacity-0",
                isHomePage ? "bg-black/30 group-hover:opacity-100" : "bg-white/10 group-hover:opacity-100",
              )}
            ></div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/png-logo-300x148-YoLJTEsRPwPNJlduUWmZkHgFOHBfKY.png"
              width={150}
              height={40}
              alt="GCH Servicios Profesionales"
              className={cn("relative z-10 transition-all duration-300", compactMode ? "h-8 w-auto" : "h-10 w-auto")}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink href="/" compact={compactMode}>
              Inicio
            </NavLink>

            <div className="relative group">
              <button
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium transition-colors group-hover:after:scale-x-100 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform",
                  compactMode && "py-1.5 text-xs",
                  isHomePage
                    ? "text-white hover:text-gch-yellow after:bg-gch-yellow"
                    : "text-white hover:text-white/80 after:bg-white",
                )}
                onClick={() => toggleDropdown("productos")}
              >
                Productos
                <ChevronDown
                  className={cn(
                    "ml-1 transition-transform duration-300",
                    compactMode ? "h-3 w-3" : "h-4 w-4",
                    activeDropdown === "productos" ? "rotate-180" : "",
                  )}
                />
              </button>

              {activeDropdown === "productos" && (
                <div className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-5 duration-200">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <DropdownLink href="/muebles">Muebles de Melamina</DropdownLink>
                    <DropdownLink href="/puertas">Puertas de Ducha</DropdownLink>
                    <DropdownLink href="/decoracion">Decoración</DropdownLink>
                    <DropdownLink href="/remodelacion">Remodelación</DropdownLink>
                  </div>
                </div>
              )}
            </div>

            <NavLink href="/proyectos" compact={compactMode}>
              Galería de Proyectos
            </NavLink>
            <NavLink href="/blog" compact={compactMode}>
              Blog
            </NavLink>
            <NavLink href="/chatbot" compact={compactMode}>
              Chatbot
            </NavLink>
            <NavLink href="/contacto" compact={compactMode}>
              Contacto
            </NavLink>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className={cn(
                "font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
                compactMode ? "text-xs px-4 py-1 rounded-full" : "px-6 py-2 rounded-full",
                isHomePage
                  ? "bg-gch-yellow hover:bg-gch-blue text-black hover:shadow-gch-blue/20"
                  : "bg-gch-yellow hover:bg-white text-black hover:shadow-white/30",
              )}
            >
              <Link href="/cotizacion">Solicitar Cotización</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-gch-yellow"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/95 pt-16 animate-in fade-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-6">
              <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                Inicio
              </MobileNavLink>

              <div>
                <button
                  className="flex items-center justify-between w-full text-lg font-medium text-white mb-2"
                  onClick={() => toggleDropdown("mobile-productos")}
                >
                  Productos
                  <ChevronDown
                    className={cn(
                      "ml-1 h-5 w-5 transition-transform duration-200",
                      activeDropdown === "mobile-productos" ? "rotate-180" : "",
                    )}
                  />
                </button>

                {activeDropdown === "mobile-productos" && (
                  <div className="pl-4 space-y-3 mt-2">
                    <MobileNavLink href="/muebles" onClick={() => setMobileMenuOpen(false)}>
                      Muebles de Melamina
                    </MobileNavLink>
                    <MobileNavLink href="/puertas" onClick={() => setMobileMenuOpen(false)}>
                      Puertas de Ducha
                    </MobileNavLink>
                    <MobileNavLink href="/decoracion" onClick={() => setMobileMenuOpen(false)}>
                      Decoración
                    </MobileNavLink>
                    <MobileNavLink href="/remodelacion" onClick={() => setMobileMenuOpen(false)}>
                      Remodelación
                    </MobileNavLink>
                  </div>
                )}
              </div>

              <MobileNavLink href="/proyectos" onClick={() => setMobileMenuOpen(false)}>
                Galería de Proyectos
              </MobileNavLink>
              <MobileNavLink href="/blog" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </MobileNavLink>
              <MobileNavLink href="/chatbot" onClick={() => setMobileMenuOpen(false)}>
                Chatbot
              </MobileNavLink>
              <MobileNavLink href="/contacto" onClick={() => setMobileMenuOpen(false)}>
                Contacto
              </MobileNavLink>

              <div className="pt-4">
                <Button
                  asChild
                  className="w-full bg-gch-yellow hover:bg-gch-blue text-black font-medium py-3 rounded-full transition-all duration-300"
                >
                  <Link href="/cotizacion" onClick={() => setMobileMenuOpen(false)}>
                    Solicitar Cotización
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative elements for subpages */}
      {!isHomePage && (
        <>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gch-yellow/0 via-gch-yellow/50 to-gch-yellow/0"></div>
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gch-yellow/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gch-yellow/10 to-transparent"></div>
        </>
      )}

      {/* Progress bar for scroll position */}
      {compactMode && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800">
          <div
            className={cn("h-full transition-all duration-300", isHomePage ? "bg-gch-yellow" : "bg-white")}
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      )}
    </header>
  )
}

// Helper Components
function NavLink({
  href,
  children,
  compact = false,
}: {
  href: string
  children: React.ReactNode
  compact?: boolean
}) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  const isHomePage = pathname === "/"
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors relative group/link after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform",
        compact && "py-1.5 text-xs",
        isActive
          ? "text-gch-yellow after:scale-x-100 after:bg-gch-yellow"
          : isHomePage
          ? "text-white hover:text-gch-yellow after:bg-gch-yellow"
          : "text-white hover:text-white/80 after:bg-white",
      )}
    >
      {children}
    </Link>
  )
}

function DropdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      role="menuitem"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-lg font-medium text-white hover:text-gch-yellow"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
