import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedList } from "@/components/animated-list"

export const metadata: Metadata = {
  title: "Blog | GCH Servicios Profesionales",
  description: "Artículos, consejos y tendencias sobre diseño de interiores, muebles de melamina y decoración.",
}

// Datos de ejemplo para los artículos del blog
const blogPosts = [
  {
    id: "renovar-cocina-muebles-melamina",
    title: "10 ideas para renovar tu cocina con muebles de melamina",
    excerpt:
      "Descubre cómo transformar tu cocina con muebles de melamina modernos y funcionales. Te presentamos ideas innovadoras que combinan estética y practicidad para espacios de cualquier tamaño.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg",
    date: "12 Mayo, 2025",
    category: "muebles",
    author: "Carlos Mendoza",
  },
  {
    id: "elegir-puerta-ducha-ideal",
    title: "Guía para elegir la puerta de ducha ideal para tu baño",
    excerpt:
      "Todo lo que necesitas saber antes de comprar una puerta de ducha: tipos de vidrio, sistemas de apertura, medidas y acabados que mejor se adaptan a tu espacio y estilo.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp",
    date: "28 Abril, 2025",
    category: "puertas",
    author: "Ana Gutiérrez",
  },
  {
    id: "tendencias-decoracion-oficinas",
    title: "Tendencias 2025 en decoración de interiores para oficinas modernas",
    excerpt:
      "Las últimas tendencias en diseño de espacios de trabajo que combinan funcionalidad, bienestar y estética. Descubre cómo crear oficinas que inspiren productividad y creatividad.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    date: "15 Abril, 2025",
    category: "decoracion",
    author: "Luis Ramírez",
  },
  {
    id: "closets-optimizar-espacio",
    title: "Closets a medida: Cómo optimizar el espacio en dormitorios pequeños",
    excerpt:
      "Aprende a maximizar el espacio de almacenamiento en dormitorios pequeños con closets de melamina diseñados a medida. Soluciones prácticas y estéticas para cada necesidad.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    date: "2 Abril, 2025",
    category: "muebles",
    author: "María Sánchez",
  },
  {
    id: "mantenimiento-puertas-ducha",
    title: "Mantenimiento de puertas de ducha: Consejos para prolongar su vida útil",
    excerpt:
      "Guía completa para el cuidado y mantenimiento de puertas de ducha de vidrio templado. Aprende a prevenir manchas de cal, mantener los herrajes en buen estado y solucionar problemas comunes.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bda3388b-6063-4488-adad-d26b18f6e50b-zCKYSuDJLPx1gHnCbnN5jZyBGQxYq1.jpeg",
    date: "20 Marzo, 2025",
    category: "puertas",
    author: "Roberto Díaz",
  },
  {
    id: "colores-tendencia-interiores",
    title: "Colores de tendencia para interiores en 2025",
    excerpt:
      "Descubre la paleta de colores que dominará el diseño de interiores este año. Desde tonos tierra hasta azules profundos, te mostramos cómo incorporarlos en tu hogar u oficina.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    date: "5 Marzo, 2025",
    category: "decoracion",
    author: "Patricia López",
  },
  {
    id: "materiales-sostenibles-muebles",
    title: "Materiales sostenibles para muebles: Alternativas eco-amigables",
    excerpt:
      "Explora las opciones de materiales sostenibles para muebles que combinan durabilidad, estética y respeto por el medio ambiente. Desde melaminas certificadas hasta acabados naturales.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg",
    date: "18 Febrero, 2025",
    category: "muebles",
    author: "Javier Torres",
  },
  {
    id: "remodelacion-bano-bajo-presupuesto",
    title: "Cómo remodelar tu baño con bajo presupuesto",
    excerpt:
      "Ideas prácticas para renovar tu baño sin gastar una fortuna. Desde cambios simples como actualizar la grifería hasta soluciones más completas como instalar una nueva puerta de ducha.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp",
    date: "3 Febrero, 2025",
    category: "remodelacion",
    author: "Carmen Rodríguez",
  },
  {
    id: "iluminacion-espacios-interiores",
    title: "La importancia de la iluminación en espacios interiores",
    excerpt:
      "Guía completa sobre cómo planificar la iluminación en diferentes espacios del hogar. Aprende a combinar luz ambiental, funcional y decorativa para crear ambientes acogedores y prácticos.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    date: "15 Enero, 2025",
    category: "decoracion",
    author: "Daniel Morales",
  },
]

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Cabecera */}
        <section className="bg-gch-blue/10 py-16 md:py-24">
          <div className="container">
            <AnimatedSection animation="fade" className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 md:text-5xl text-gch-gray">
                Blog y Consejos
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Explora nuestros artículos sobre diseño de interiores, muebles de melamina, puertas de ducha y las
                últimas tendencias en decoración.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Buscador y filtros */}
        <section className="py-8 md:py-12 border-b">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="w-full md:w-1/3">
                <div className="relative">
                  <Input placeholder="Buscar artículos..." className="pr-10" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <span className="sr-only">Buscar</span>
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full md:w-auto">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="muebles">Muebles</TabsTrigger>
                  <TabsTrigger value="puertas">Puertas</TabsTrigger>
                  <TabsTrigger value="decoracion">Decoración</TabsTrigger>
                  <TabsTrigger value="remodelacion">Remodelación</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Artículos destacados */}
        <section className="py-12 md:py-16">
          <div className="container">
            <AnimatedSection animation="slide-up" className="mb-10">
              <h2 className="font-serif text-3xl font-bold text-gch-gray">Artículos destacados</h2>
            </AnimatedSection>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Artículo destacado principal */}
              <AnimatedSection animation="fade" className="md:col-span-2 lg:col-span-2">
                <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md h-full">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Image
                      src={blogPosts[0].image || "/placeholder.svg"}
                      alt={blogPosts[0].title}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gch-blue/10 text-gch-blue text-xs px-2.5 py-0.5 rounded-full">
                        {blogPosts[0].category}
                      </span>
                      <span className="text-xs text-muted-foreground">{blogPosts[0].date}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-2">
                      <Link href={`/blog/${blogPosts[0].id}`} className="hover:text-gch-blue">
                        {blogPosts[0].title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Por {blogPosts[0].author}</span>
                      <Button variant="link" asChild className="p-0 h-auto text-gch-blue hover:text-gch-yellow">
                        <Link href={`/blog/${blogPosts[0].id}`}>
                          Leer más
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Artículo destacado secundario */}
              <AnimatedSection animation="fade" delay={0.2} className="lg:col-span-1">
                <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md h-full">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={blogPosts[1].image || "/placeholder.svg"}
                      alt={blogPosts[1].title}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gch-blue/10 text-gch-blue text-xs px-2.5 py-0.5 rounded-full">
                        {blogPosts[1].category}
                      </span>
                      <span className="text-xs text-muted-foreground">{blogPosts[1].date}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      <Link href={`/blog/${blogPosts[1].id}`} className="hover:text-gch-blue">
                        {blogPosts[1].title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{blogPosts[1].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Por {blogPosts[1].author}</span>
                      <Button variant="link" asChild className="p-0 h-auto text-gch-blue hover:text-gch-yellow">
                        <Link href={`/blog/${blogPosts[1].id}`}>
                          Leer más
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Lista de artículos */}
        <section className="py-12 md:py-16 bg-stone-50">
          <div className="container">
            <AnimatedSection animation="slide-up" className="mb-10">
              <h2 className="font-serif text-3xl font-bold text-gch-gray">Todos los artículos</h2>
            </AnimatedSection>

            <AnimatedList className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
              {blogPosts.slice(2).map((post) => (
                <div
                  key={post.id}
                  className="group overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={800}
                      height={450}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gch-blue/10 text-gch-blue text-xs px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-gch-blue">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Por {post.author}</span>
                      <Button variant="link" asChild className="p-0 h-auto text-gch-blue hover:text-gch-yellow">
                        <Link href={`/blog/${post.id}`}>
                          Leer más
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </AnimatedList>

            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                className="border-gch-blue text-gch-gray hover:text-gch-blue hover:bg-gch-blue/10"
              >
                Cargar más artículos
              </Button>
            </div>
          </div>
        </section>

        {/* Suscripción al newsletter */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="bg-gch-blue/10 rounded-lg p-8 md:p-12">
              <AnimatedSection animation="fade" className="max-w-3xl mx-auto text-center">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gch-gray mb-4">
                  Suscríbete a nuestro newsletter
                </h2>
                <p className="text-muted-foreground mb-6">
                  Recibe nuestros últimos artículos, consejos de diseño y ofertas especiales directamente en tu bandeja
                  de entrada.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input placeholder="Tu correo electrónico" type="email" className="flex-1" />
                  <Button className="bg-gch-yellow hover:bg-gch-blue text-black">Suscribirme</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Al suscribirte, aceptas nuestra política de privacidad. Puedes darte de baja en cualquier momento.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
