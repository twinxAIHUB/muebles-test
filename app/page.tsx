import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedList } from "@/components/animated-list"
import { VideoBackground } from "@/components/video-background"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedProjects } from "@/components/featured-projects"
import { HeroScrollButton } from "@/components/hero-scroll-button"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section con Video de Fondo - Versión más llamativa */}
        <section className="relative h-screen w-full overflow-hidden">
          <VideoBackground
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5862607_Indoors_Day_1920x1080-vKnjJJvLMg0JChAMmAaE9IViBKjrI4.mp4"
            poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

          {/* Elementos decorativos */}
          <div className="absolute inset-0 z-[1]">
            <div className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full bg-gch-blue/20 blur-3xl"></div>
            <div className="absolute bottom-[30%] left-[15%] w-40 h-40 rounded-full bg-gch-yellow/10 blur-3xl"></div>
          </div>

          <div className="container relative z-10 flex h-full flex-col items-start justify-center text-white">
            <div className="max-w-3xl">
              <AnimatedSection animation="slide-right" duration={0.8}>
                <h2 className="text-gch-yellow font-medium tracking-widest uppercase mb-4">
                  GCH Servicios Profesionales
                </h2>
              </AnimatedSection>

              <AnimatedSection animation="slide-right" delay={0.2} duration={0.8}>
                <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-light tracking-tight mb-6 leading-[1.1]">
                  <span className="block">Diseño Interior</span>
                  <span className="block mt-2 text-gch-blue">de Lujo</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="slide-right" delay={0.4} duration={0.8}>
                <div className="h-1 w-24 bg-gch-yellow my-8"></div>
                <p className="text-xl md:text-2xl text-white/90 font-light max-w-xl">
                  Transformamos espacios con elegancia y funcionalidad, creando ambientes exclusivos que reflejan tu
                  estilo
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fade" delay={0.6} duration={0.8}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="text-base bg-gch-yellow hover:bg-gch-yellow/90 text-black uppercase tracking-wider px-8 py-6"
                    size="lg"
                  >
                    <Link href="/cotizacion">Solicitar cotización</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="text-base border-gch-blue bg-transparent text-white hover:bg-gch-blue/20 hover:border-gch-blue/80 uppercase tracking-wider px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-gch-blue/20"
                    size="lg"
                  >
                    <Link href="/proyectos">Ver proyectos</Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>

          <HeroScrollButton />

          {/* Decoración lateral */}
          <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-b from-gch-blue/0 via-gch-blue/40 to-gch-blue/0"></div>
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-gch-yellow/0 via-gch-yellow/40 to-gch-yellow/0"></div>
        </section>

        {/* Categorías de Productos */}
        <section className="py-16 md:py-24">
          <div className="container">
            <AnimatedSection animation="slide-up">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-center mb-12 md:text-4xl text-gch-gray">
                Nuestros Productos y Servicios
              </h2>
            </AnimatedSection>
            <AnimatedList className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.15}>
              {/* Muebles de Melamina */}
              <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg"
                  alt="Muebles de melamina para cocina"
                  width={800}
                  height={600}
                  className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white">Muebles de Melamina</h3>
                  <p className="mt-2 text-sm text-white/90">
                    Diseños exclusivos en closets, cocinas y muebles a medida, fabricados con la mejor melamina del
                    mercado
                  </p>
                  <Button
                    variant="outline"
                    asChild
                    className="mt-4 bg-gch-blue/20 text-white backdrop-blur-sm hover:bg-gch-blue/40 border-gch-blue"
                  >
                    <Link href="/muebles">Ver catálogo</Link>
                  </Button>
                </div>
              </div>

              {/* Puertas de Ducha */}
              <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp"
                  alt="Puertas de ducha de vidrio templado"
                  width={800}
                  height={600}
                  className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white">Puertas de Ducha</h3>
                  <p className="mt-2 text-sm text-white/90">
                    Fabricación e instalación de puertas de ducha en vidrio templado a medida, con acabados de lujo y
                    garantía de durabilidad
                  </p>
                  <Button
                    variant="outline"
                    asChild
                    className="mt-4 bg-gch-blue/20 text-white backdrop-blur-sm hover:bg-gch-blue/40 border-gch-blue"
                  >
                    <Link href="/puertas">Ver catálogo</Link>
                  </Button>
                </div>
              </div>

              {/* Decoración */}
              <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg"
                  alt="Accesorios decorativos para el hogar"
                  width={800}
                  height={600}
                  className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white">Decoración</h3>
                  <p className="mt-2 text-sm text-white/90">
                    Accesorios decorativos y mobiliario auxiliar para realzar tus espacios – desde lámparas hasta
                    alfombras – con estilo sofisticado
                  </p>
                  <Button
                    variant="outline"
                    asChild
                    className="mt-4 bg-gch-blue/20 text-white backdrop-blur-sm hover:bg-gch-blue/40 border-gch-blue"
                  >
                    <Link href="/decoracion">Ver catálogo</Link>
                  </Button>
                </div>
              </div>

              {/* Remodelación */}
              <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg"
                  alt="Proyecto de remodelación de interiores"
                  width={800}
                  height={600}
                  className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white">Remodelación</h3>
                  <p className="mt-2 text-sm text-white/90">
                    Proyectos integrales de remodelación para hogares y oficinas; transformamos cada rincón combinando
                    diseño y funcionalidad de alto nivel
                  </p>
                  <Button
                    variant="outline"
                    asChild
                    className="mt-4 bg-gch-blue/20 text-white backdrop-blur-sm hover:bg-gch-blue/40 border-gch-blue"
                  >
                    <Link href="/remodelacion">Ver catálogo</Link>
                  </Button>
                </div>
              </div>
            </AnimatedList>
          </div>
        </section>

        <FeaturedProjects />

        {/* Testimonios */}
        <TestimonialsSection />

        {/* Blog */}
        <section className="py-16 md:py-24">
          <div className="container">
            <AnimatedSection animation="slide-up">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-center mb-12 md:text-4xl text-gch-gray">
                Blog y Consejos
              </h2>
            </AnimatedSection>
            <AnimatedList className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
              {/* Artículo 1 */}
              <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg"
                    alt="Ideas para renovar tu cocina con muebles de melamina"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">12 Mayo, 2025</p>
                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    <Link href="/blog/renovar-cocina-muebles-melamina" className="hover:text-gch-blue">
                      10 ideas para renovar tu cocina con muebles de melamina
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    Descubre cómo transformar tu cocina con muebles de melamina modernos y funcionales. Te presentamos
                    ideas innovadoras que combinan estética y practicidad para espacios de cualquier tamaño.
                  </p>
                  <Button variant="link" asChild className="mt-2 h-8 p-0 text-gch-blue hover:text-gch-yellow">
                    <Link href="/blog/renovar-cocina-muebles-melamina">
                      Leer más
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Artículo 2 */}
              <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp"
                    alt="Guía para elegir la puerta de ducha ideal"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">28 Abril, 2025</p>
                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    <Link href="/blog/elegir-puerta-ducha-ideal" className="hover:text-gch-blue">
                      Guía para elegir la puerta de ducha ideal para tu baño
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    Todo lo que necesitas saber antes de comprar una puerta de ducha: tipos de vidrio, sistemas de
                    apertura, medidas y acabados que mejor se adaptan a tu espacio y estilo.
                  </p>
                  <Button variant="link" asChild className="mt-2 h-8 p-0 text-gch-blue hover:text-gch-yellow">
                    <Link href="/blog/elegir-puerta-ducha-ideal">
                      Leer más
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Artículo 3 */}
              <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg"
                    alt="Tendencias 2025 en decoración de interiores para oficinas"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">15 Abril, 2025</p>
                  <h3 className="mt-2 font-serif text-xl font-semibold">
                    <Link href="/blog/tendencias-decoracion-oficinas" className="hover:text-gch-blue">
                      Tendencias 2025 en decoración de interiores para oficinas modernas
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    Las últimas tendencias en diseño de espacios de trabajo que combinan funcionalidad, bienestar y
                    estética. Descubre cómo crear oficinas que inspiren productividad y creatividad.
                  </p>
                  <Button variant="link" asChild className="mt-2 h-8 p-0 text-gch-blue hover:text-gch-yellow">
                    <Link href="/blog/tendencias-decoracion-oficinas">
                      Leer más
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedList>

            <AnimatedSection animation="slide-up" delay={0.3}>
              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-gch-blue text-gch-gray hover:text-gch-blue hover:bg-gch-blue/10"
                >
                  <Link href="/blog">
                    Ver todos los artículos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Formulario de Contacto */}
        <section id="contacto" className="py-16 bg-gch-blue text-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection animation="slide-right">
                <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
                  ¿Listo para iniciar tu proyecto?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Contáctanos para una asesoría personalizada.
                </p>
              </AnimatedSection>

                <AnimatedSection animation="slide-right" delay={0.2}>
                <div className="rounded-lg bg-white/10 p-8 backdrop-blur-sm border border-white/20">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium">
                        Nombre completo
                      </label>
                      <Input id="nombre" placeholder="Ingresa tu nombre completo" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Correo electrónico
                      </label>
                      <Input id="email" type="email" placeholder="tu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="telefono" className="text-sm font-medium">
                        Teléfono
                      </label>
                      <Input id="telefono" type="tel" placeholder="+51 999 999 999" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="servicio" className="text-sm font-medium">
                        Servicio de interés
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un servicio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="muebles">Muebles de Melamina</SelectItem>
                          <SelectItem value="puertas">Puertas de Ducha</SelectItem>
                          <SelectItem value="decoracion">Decoración</SelectItem>
                          <SelectItem value="remodelacion">Remodelación</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mensaje" className="text-sm font-medium">
                        Mensaje
                      </label>
                      <Textarea
                        id="mensaje"
                        placeholder="Describe tu proyecto, medidas, ubicación, etc."
                        className="min-h-[120px]"
                      />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gch-yellow hover:bg-gch-blue text-black transition-all duration-300 hover:shadow-lg hover:shadow-gch-blue/20 hover:-translate-y-0.5"
                    >
                      Enviar Solicitud
                    </Button>
                  </form>
                  </div>
                </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
