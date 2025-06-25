import { projectsService } from "@/lib/database";
import type { Metadata, ResolvingMetadata } from 'next'
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const project = await projectsService.getById(id);

  if (!project) {
    return {
      title: 'Proyecto no encontrado'
    }
  }
 
  return {
    title: `${project.title} | Proyectos de Diseño`,
    description: project.description,
    openGraph: {
      images: project.images.length > 0 ? [project.images[0]] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await projectsService.getById(params.id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold">Proyecto no encontrado</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          El proyecto que estás buscando no existe o fue eliminado.
        </p>
        <Link href="/proyectos" className="mt-8 inline-flex items-center text-lg text-gch-blue hover:underline">
          <ChevronLeft className="mr-2 h-5 w-5" />
          Volver a la galería de proyectos
        </Link>
      </div>
    );
  }

  const { title, description, mainCategory, subCategory, images, tags } = project;

  return (
    <section className="container py-12 md:py-20">
      <AnimatedSection animation="slide-up">
        <Link href="/proyectos" className="inline-flex items-center text-sm text-muted-foreground hover:text-gch-blue mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a todos los proyectos
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gch-gray">{title}</h1>
            <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-base bg-gch-yellow/20 text-gch-yellow border-gch-yellow/30">{mainCategory}</Badge>
                <Badge variant="outline" className="text-base">{subCategory}</Badge>
            </div>
        </div>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
            {tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection animation="fade" delay={0.2} className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
             <div key={index} className="overflow-hidden rounded-lg shadow-lg border border-gray-200/50">
                <Image
                    src={image}
                    alt={`${title} - Imagen ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover aspect-[4/3]"
                />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
} 