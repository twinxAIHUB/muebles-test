import type { Metadata } from "next"
import ProjectGallery from "@/components/project-gallery"
import { AnimatedSection } from "@/components/animated-section"
import { AddProjectPanel } from "@/components/add-project-panel"

export const metadata: Metadata = {
  title: "Galería de Proyectos | Muebles de Melamina y Diseño Interior de Lujo en Perú",
  description:
    "Explora nuestra galería de proyectos de diseño interior, muebles de melamina, puertas de ducha y remodelaciones realizadas en Perú.",
}

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <AnimatedSection animation="slide-up" className="mx-auto max-w-3xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Nuestros Proyectos</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Explora nuestra colección de proyectos de diseño interior, muebles a medida y remodelaciones para
                hogares y espacios comerciales.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fade" delay={0.2} className="mt-6 flex justify-end">
              <AddProjectPanel />
            </AnimatedSection>

            <AnimatedSection animation="fade" delay={0.3} className="mt-12 md:mt-16">
              <ProjectGallery />
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  )
}
