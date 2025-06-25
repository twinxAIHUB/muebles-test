"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AnimatedList } from "@/components/animated-list"
import { AnimatedSection } from "@/components/animated-section"
import { projectsService, type Project } from "@/lib/database"
import { ChevronRight, Package, Loader2 } from "lucide-react"

type ProjectFilter = "all" | "Residencial" | "Comercial"

const filterOptions = [
  { value: "all", label: "Todos" },
  { value: "Residencial", label: "Residencial" },
  { value: "Comercial", label: "Comercial" },
]

export default function ProjectGallery() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("all")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const allProjects = await projectsService.getAll()
        setProjects(allProjects)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((project) => project.main_category === selectedFilter)

  return (
    <div className="space-y-8">
      <AnimatedSection animation="slide-up">
        <Tabs
          defaultValue="all"
          value={selectedFilter}
          onValueChange={(value) => setSelectedFilter(value as ProjectFilter)}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            {filterOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </AnimatedSection>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-gch-blue" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <AnimatedSection animation="fade" className="text-center py-16">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No hay proyectos en esta categoría</h3>
          <p className="mt-2 text-sm text-gray-500">Prueba a seleccionar otra categoría o vuelve más tarde.</p>
        </AnimatedSection>
      ) : (
        <AnimatedList className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {filteredProjects.map((project) => (
            <Link
              href={`/proyectos/${project.id}`}
            key={project.id}
              className="group flex flex-col overflow-hidden rounded-lg border bg-white text-gch-gray shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
          >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                  src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              </div>
              <div className="flex flex-col flex-grow p-5">
                <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs bg-gch-yellow/20 text-gch-yellow border-gch-yellow/30">
                        {project.main_category}
                    </Badge>
                    <span className="text-xs text-gray-400">{project.sub_category}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold line-clamp-2">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-grow">{project.description}</p>
                <div className="mt-4 flex items-center font-semibold text-gch-blue transition-transform group-hover:translate-x-1">
                  Ver proyecto
                  <ChevronRight className="ml-1 h-4 w-4" />
            </div>
          </div>
            </Link>
        ))}
      </AnimatedList>
      )}
    </div>
  )
}
