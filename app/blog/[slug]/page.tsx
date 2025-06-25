import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft, Facebook, Linkedin, Twitter } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"

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
    authorImage: "/placeholder.svg?key=u6vol",
    content: `
      <p>La cocina es uno de los espacios más importantes del hogar, y renovarla puede transformar por completo la experiencia de vivir en casa. Los muebles de melamina ofrecen una excelente alternativa para quienes buscan durabilidad, estética y un precio accesible.</p>
      
      <h2>1. Aprovecha las esquinas con muebles en L</h2>
      <p>Las esquinas suelen ser espacios desaprovechados en muchas cocinas. Un diseño en forma de L permite maximizar el almacenamiento y crear una superficie de trabajo continua. La melamina permite crear estas estructuras a medida exacta para tu espacio.</p>
      
      <h2>2. Integra iluminación LED bajo los muebles altos</h2>
      <p>La iluminación no solo es funcional sino que puede transformar completamente el ambiente. Instalar tiras LED bajo los muebles altos no solo facilita las tareas de cocina sino que crea un ambiente acogedor y moderno.</p>
      
      <h2>3. Opta por acabados que imitan materiales naturales</h2>
      <p>La tecnología actual permite que la melamina imite perfectamente acabados como madera, mármol o concreto. Estos acabados aportan calidez y sofisticación a un costo mucho menor que los materiales originales.</p>
      
      <h2>4. Incorpora sistemas de organización internos</h2>
      <p>Los cajones y gabinetes pueden optimizarse con divisores, bandejas extraíbles y organizadores específicos para utensilios. Estos elementos mejoran significativamente la funcionalidad de tu cocina.</p>
      
      <h2>5. Combina colores y texturas</h2>
      <p>No temas mezclar diferentes acabados de melamina. Una combinación de colores claros con acentos en tonos más oscuros o vibrantes puede crear un diseño contemporáneo y personalizado.</p>
      
      <h2>6. Diseña una isla central multifuncional</h2>
      <p>Si el espacio lo permite, una isla central de melamina puede servir como área de preparación, almacenamiento adicional y zona de comedor informal. Es una solución versátil que añade valor a tu cocina.</p>
      
      <h2>7. Integra electrodomésticos con frentes a juego</h2>
      <p>Muchos electrodomésticos actuales permiten instalar paneles frontales personalizados. Utilizar melamina del mismo acabado que tus muebles crea una apariencia uniforme y elegante.</p>
      
      <h2>8. Añade puertas con vidrio o sin tiradores</h2>
      <p>Las puertas con insertos de vidrio aportan ligereza visual, mientras que los sistemas push-to-open (sin tiradores) crean líneas limpias y minimalistas, ideales para cocinas contemporáneas.</p>
      
      <h2>9. Crea un mueble despensero vertical</h2>
      <p>Un mueble alto y estrecho con cajones extraíbles aprovecha espacios reducidos y permite almacenar gran cantidad de productos de manera organizada y accesible.</p>
      
      <h2>10. Instala un respaldo de melamina a juego</h2>
      <p>En lugar de azulejos tradicionales, un respaldo de melamina resistente a la humedad crea continuidad visual y es muy fácil de limpiar. Además, elimina las juntas donde suele acumularse suciedad.</p>
      
      <h2>Conclusión</h2>
      <p>La melamina ofrece infinitas posibilidades para renovar tu cocina combinando estética, funcionalidad y durabilidad. Con un diseño bien planificado, puedes lograr un espacio que no solo luzca espectacular sino que también mejore tu experiencia diaria en la cocina.</p>
      
      <p>Recuerda que la clave está en equilibrar tus necesidades prácticas con el estilo que deseas lograr. Un profesional puede ayudarte a maximizar el potencial de tu espacio y garantizar que los muebles se adapten perfectamente a tus requerimientos específicos.</p>
    `,
    relatedPosts: ["closets-optimizar-espacio", "materiales-sostenibles-muebles", "colores-tendencia-interiores"],
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
    authorImage: "/placeholder.svg?key=a85ex",
    content: `
      <p>Elegir la puerta de ducha adecuada puede transformar completamente la funcionalidad y estética de tu baño. Con tantas opciones disponibles en el mercado, es importante conocer los diferentes tipos, materiales y sistemas para tomar la mejor decisión.</p>
      
      <h2>Tipos de puertas de ducha</h2>
      
      <h3>Puertas batientes</h3>
      <p>Las puertas batientes se abren hacia adentro o hacia afuera como una puerta convencional. Son ideales para espacios amplios y ofrecen un acceso completo a la ducha. Requieren espacio libre para su apertura, por lo que no son recomendables para baños muy pequeños.</p>
      
      <h3>Puertas corredizas</h3>
      <p>Las puertas corredizas se deslizan horizontalmente sobre rieles. Son perfectas para baños con espacio limitado ya que no requieren área adicional para abrirse. Existen modelos con una o dos hojas móviles, dependiendo del tamaño de la ducha.</p>
      
      <h3>Puertas plegables</h3>
      <p>Las puertas plegables están compuestas por paneles que se doblan como un acordeón. Son una excelente solución para espacios muy reducidos donde no hay suficiente espacio para una puerta batiente ni para una corrediza completa.</p>
      
      <h3>Mamparas fijas</h3>
      <p>No son puertas como tal, sino paneles fijos que actúan como separadores. Son minimalistas y elegantes, ideales para duchas tipo walk-in. Suelen combinarse con un panel móvil más pequeño para evitar salpicaduras.</p>
      
      <h2>Materiales y grosores</h2>
      
      <h3>Vidrio templado</h3>
      <p>El vidrio templado es el material más utilizado por su seguridad, durabilidad y estética. Los grosores más comunes son:</p>
      <ul>
        <li>6mm: Económico pero menos resistente. Recomendado solo para mamparas pequeñas.</li>
        <li>8mm: Ofrece un buen equilibrio entre precio y resistencia. Es el más utilizado en instalaciones residenciales.</li>
        <li>10mm: Mayor resistencia y sensación de solidez. Ideal para puertas grandes o diseños premium.</li>
      </ul>
      
      <h3>Acabados del vidrio</h3>
      <p>Existen diferentes acabados que afectan tanto la estética como la funcionalidad:</p>
      <ul>
        <li>Transparente: Maximiza la sensación de amplitud y permite que la luz fluya libremente.</li>
        <li>Esmerilado o mateado: Ofrece privacidad sin sacrificar la luminosidad.</li>
        <li>Serigrafiado: Con patrones o diseños que añaden un elemento decorativo.</li>
        <li>Tintado: En tonos grises, bronces o azulados para complementar la decoración del baño.</li>
      </ul>
      
      <h2>Sistemas de apertura y herrajes</h2>
      
      <h3>Herrajes y perfiles</h3>
      <p>Los herrajes no solo son funcionales sino que también definen el estilo de la puerta:</p>
      <ul>
        <li>Acero inoxidable: Duradero y resistente a la corrosión. Disponible en acabado pulido o cepillado.</li>
        <li>Acabados especiales: Negro mate, bronce, dorado o níquel cepillado para complementar otros elementos del baño.</li>
      </ul>
      
      <h3>Con o sin marco</h3>
      <p>Las puertas con marco completo ofrecen mayor estabilidad y mejor sellado contra fugas de agua. Las puertas sin marco (frameless) tienen un aspecto más minimalista y contemporáneo, pero requieren vidrio más grueso para garantizar su estabilidad.</p>
      
      <h2>Medidas y consideraciones del espacio</h2>
      
      <p>Antes de comprar una puerta de ducha, es fundamental tomar medidas precisas:</p>
      <ul>
        <li>Ancho de la apertura</li>
        <li>Altura desde el plato de ducha hasta el techo</li>
        <li>Verificar si las paredes están a escuadra (90°)</li>
        <li>Considerar la ubicación de las tuberías y salidas de agua</li>
      </ul>
      
      <h2>Tratamientos especiales</h2>
      
      <p>Existen tratamientos que pueden mejorar significativamente la experiencia de uso:</p>
      <ul>
        <li>Tratamiento antical: Facilita la limpieza al evitar que se adhieran residuos de cal y jabón.</li>
        <li>Vidrio autolimpiante: Incorpora tecnología que reduce la acumulación de suciedad.</li>
        <li>Sistemas de cierre suave: Evitan golpes y aumentan la vida útil de la puerta.</li>
      </ul>
      
      <h2>Presupuesto y calidad</h2>
      
      <p>El precio de una puerta de ducha varía considerablemente según el tipo, material, tamaño y marca. Es importante considerar que una puerta de calidad es una inversión a largo plazo. Los aspectos que más influyen en el precio son:</p>
      <ul>
        <li>Grosor del vidrio</li>
        <li>Calidad de los herrajes</li>
        <li>Complejidad de la instalación</li>
        <li>Tratamientos especiales</li>
        <li>Personalización</li>
      </ul>
      
      <h2>Conclusión</h2>
      
      <p>Elegir la puerta de ducha ideal requiere considerar múltiples factores: el espacio disponible, el estilo del baño, el presupuesto y las necesidades específicas de los usuarios. Una puerta bien seleccionada no solo mejorará la funcionalidad de tu baño sino que también aumentará el valor de tu propiedad.</p>
      
      <p>Recomendamos siempre consultar con profesionales que puedan asesorarte en la toma de medidas y la selección del modelo más adecuado para tu espacio. La instalación profesional garantiza además el correcto funcionamiento y la durabilidad de tu inversión.</p>
    `,
    relatedPosts: [
      "mantenimiento-puertas-ducha",
      "remodelacion-bano-bajo-presupuesto",
      "tendencias-decoracion-oficinas",
    ],
  },
]

// Función para generar metadatos dinámicos
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.id === params.slug)

  if (!post) {
    return {
      title: "Artículo no encontrado | GCH Servicios Profesionales",
      description: "El artículo que buscas no existe o ha sido movido.",
    }
  }

  return {
    title: `${post.title} | GCH Servicios Profesionales`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.id === params.slug)

  if (!post) {
    notFound()
  }

  // Encontrar posts relacionados
  const relatedPosts = post.relatedPosts
    ? blogPosts.filter((relatedPost) => post.relatedPosts?.includes(relatedPost.id))
    : []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Cabecera del artículo */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 z-0">
            <div className="h-full w-full bg-gch-blue/5" />
          </div>

          <div className="container relative z-10">
            <AnimatedSection animation="fade" className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent">
                  <Link href="/blog" className="flex items-center text-gch-blue">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Volver al blog
                  </Link>
                </Button>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gch-blue/10 text-gch-blue text-sm px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gch-gray">
                  {post.title}
                </h1>

                <div className="flex items-center mt-6">
                  <div className="h-10 w-10 rounded-full bg-gch-blue/20 overflow-hidden">
                    <Image
                      src={post.authorImage || "/placeholder.svg?height=100&width=100&query=person"}
                      alt={post.author}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-muted-foreground">Especialista en diseño</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contenido del artículo */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Artículo principal */}
              <div className="lg:col-span-8">
                <AnimatedSection animation="fade">
                  {/* Imagen destacada */}
                  <div className="rounded-lg overflow-hidden mb-8">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={1200}
                      height={675}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>

                  {/* Compartir */}
                  <div className="mt-12 pt-6 border-t">
                    <p className="font-medium mb-4">Comparte este artículo:</p>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Compartir en Facebook</span>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Compartir en Twitter</span>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">Compartir en LinkedIn</span>
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4">
                <div className="space-y-8">
                  {/* Autor */}
                  <AnimatedSection animation="slide-left" className="bg-white p-6 rounded-lg border">
                    <h3 className="font-serif text-xl font-semibold mb-4">Sobre el autor</h3>
                    <div className="flex items-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-gch-blue/20 overflow-hidden">
                        <Image
                          src={post.authorImage || "/placeholder.svg?height=100&width=100&query=person"}
                          alt={post.author}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{post.author}</p>
                        <p className="text-sm text-muted-foreground">Especialista en diseño</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Experto en diseño de interiores con más de 10 años de experiencia en proyectos residenciales y
                      comerciales. Especializado en optimización de espacios y tendencias contemporáneas.
                    </p>
                  </AnimatedSection>

                  {/* Artículos relacionados */}
                  {relatedPosts.length > 0 && (
                    <AnimatedSection animation="slide-left" delay={0.2} className="bg-white p-6 rounded-lg border">
                      <h3 className="font-serif text-xl font-semibold mb-4">Artículos relacionados</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <div key={relatedPost.id} className="flex items-start">
                            <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={relatedPost.image || "/placeholder.svg"}
                                alt={relatedPost.title}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <h4 className="font-medium text-sm line-clamp-2">
                                <Link href={`/blog/${relatedPost.id}`} className="hover:text-gch-blue">
                                  {relatedPost.title}
                                </Link>
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">{relatedPost.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AnimatedSection>
                  )}

                  {/* Categorías */}
                  <AnimatedSection animation="slide-left" delay={0.3} className="bg-white p-6 rounded-lg border">
                    <h3 className="font-serif text-xl font-semibold mb-4">Categorías</h3>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/blog?category=muebles"
                        className="bg-gch-blue/10 hover:bg-gch-blue/20 text-gch-blue px-3 py-1 rounded-full text-sm"
                      >
                        Muebles
                      </Link>
                      <Link
                        href="/blog?category=puertas"
                        className="bg-gch-blue/10 hover:bg-gch-blue/20 text-gch-blue px-3 py-1 rounded-full text-sm"
                      >
                        Puertas
                      </Link>
                      <Link
                        href="/blog?category=decoracion"
                        className="bg-gch-blue/10 hover:bg-gch-blue/20 text-gch-blue px-3 py-1 rounded-full text-sm"
                      >
                        Decoración
                      </Link>
                      <Link
                        href="/blog?category=remodelacion"
                        className="bg-gch-blue/10 hover:bg-gch-blue/20 text-gch-blue px-3 py-1 rounded-full text-sm"
                      >
                        Remodelación
                      </Link>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
