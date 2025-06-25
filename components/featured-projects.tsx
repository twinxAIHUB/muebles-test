"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { projectsService, type Project } from "@/lib/database"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedList } from "@/components/animated-list"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await projectsService.getAll()
        setProjects(fetchedProjects)
        setFilteredProjects(fetchedProjects.slice(0, 6))
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch featured projects:", error)
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    let filtered = projects
    if (selectedCategory !== "all") {
      filtered = projects.filter(project => project.main_category === selectedCategory)
    }
    setFilteredProjects(filtered.slice(0, 6))
  }, [selectedCategory, projects])

  if (loading) {
    return (
      <section className="py-16 bg-stone-50 md:py-24">
        <div className="container">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gch-blue mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-stone-50 md:py-24">
      <div className="container">
        <AnimatedSection animation="slide-up">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-center mb-6 md:text-4xl text-gch-gray">
            Proyectos Realizados
          </h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Con más de 10 años de experiencia, hemos hecho realidad proyectos a la medida en hogares y negocios, siempre con un acabado de lujo y atención al detalle.
          </p>
          
          {/* Category Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={`${
                selectedCategory === "all" 
                  ? "bg-gch-blue text-white hover:bg-gch-blue/90" 
                  : "border-gch-blue text-gch-blue hover:bg-gch-blue/10"
              }`}
            >
              Todos
            </Button>
            <Button
              variant={selectedCategory === "Residencial" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Residencial")}
              className={`${
                selectedCategory === "Residencial" 
                  ? "bg-gch-blue text-white hover:bg-gch-blue/90" 
                  : "border-gch-blue text-gch-blue hover:bg-gch-blue/10"
              }`}
            >
              Residencial
            </Button>
            <Button
              variant={selectedCategory === "Comercial" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Comercial")}
              className={`${
                selectedCategory === "Comercial" 
                  ? "bg-gch-blue text-white hover:bg-gch-blue/90" 
                  : "border-gch-blue text-gch-blue hover:bg-gch-blue/10"
              }`}
            >
              Comercial
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedList className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gch-blue/10 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs bg-gch-yellow/20 text-gch-yellow border-gch-yellow/30">
                    {project.main_category}
                  </Badge>
                  <span className="text-xs text-gray-400">{project.sub_category}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-gch-gray line-clamp-2">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-grow">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <Button
                    variant="link"
                    asChild
                    className="h-8 p-0 text-gch-blue hover:text-gch-yellow group-hover:translate-x-1 transition-transform"
                  >
                    <Link href={`/proyectos/${project.id}`}>
                      Ver proyecto
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </AnimatedList>

        {filteredProjects.length === 0 && (
          <AnimatedSection animation="fade" className="text-center py-12">
            <p className="text-muted-foreground">No hay proyectos disponibles en esta categoría.</p>
          </AnimatedSection>
        )}

        <AnimatedSection animation="fade" delay={0.4} className="mt-12 text-center">
            <Button asChild size="lg" className="bg-gch-blue hover:bg-gch-blue/90 text-white">
                <Link href="/proyectos">Ver Todos los Proyectos</Link>
            </Button>
        </AnimatedSection>
      </div>
    </section>
  )
} 