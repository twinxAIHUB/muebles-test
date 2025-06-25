import Link from "next/link"
import Image from "next/image"
import { propertiesService, type Property } from "@/lib/database"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedList } from "@/components/animated-list"
import { ChevronRight, MapPin, DollarSign } from "lucide-react"

async function getFeaturedProperties() {
  try {
    // Fetch a limited number of available properties, sorted by creation date
    const properties = await propertiesService.getAll({
      status: "disponible",
    })
    // Return the latest 6
    return properties.slice(0, 6)
  } catch (error) {
    console.error("Failed to fetch featured properties:", error)
    return []
  }
}

export async function FeaturedProperties() {
  const properties: Property[] = await getFeaturedProperties()

  if (properties.length === 0) {
    return null // Don't render the section if there are no properties
  }

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container">
        <AnimatedSection animation="slide-up" className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">
            Propiedades Destacadas
          </h2>
          <p className="mt-4 text-muted-foreground">
            Explore nuestra selección exclusiva de propiedades disponibles.
          </p>
        </AnimatedSection>

        <AnimatedList className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative flex flex-col overflow-hidden rounded-lg bg-white border shadow-sm hover:shadow-lg hover:shadow-gch-blue/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                 <Badge className="absolute top-3 right-3 bg-gch-yellow text-black">{property.type}</Badge>
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-serif text-lg font-semibold text-gch-gray line-clamp-2">
                  {property.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gch-blue/70" />
                  {property.location}
                </p>
                <div className="flex-grow" />
                <div className="mt-4 flex items-center justify-between">
                   <p className="text-xl font-bold text-gch-blue">
                     {property.price}
                   </p>
                   <Button
                    variant="link"
                    asChild
                    className="h-8 p-0 text-gch-blue hover:text-gch-yellow group-hover:translate-x-1 transition-transform"
                  >
                    <Link href={`/propiedades/${property.id}`}>
                      Ver detalles
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </AnimatedList>
        
        <AnimatedSection animation="fade" delay={0.4} className="mt-12 text-center">
            <Button asChild size="lg" className="bg-gch-blue hover:bg-gch-blue/90 text-white">
                <Link href="/propiedades">Ver Todas las Propiedades</Link>
            </Button>
        </AnimatedSection>
      </div>
    </section>
  )
} 