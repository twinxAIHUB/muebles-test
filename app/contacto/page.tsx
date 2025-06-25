import type { Metadata } from "next"
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedSection } from "@/components/animated-section"

export const metadata: Metadata = {
  title: "Contacto | GCH Servicios Profesionales",
  description: "Contáctanos para consultas, cotizaciones o información sobre nuestros servicios de diseño y muebles.",
}

export default function ContactoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Cabecera */}
        <section className="bg-gch-blue/10 py-16 md:py-24">
          <div className="container">
            <AnimatedSection animation="fade" className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 md:text-5xl text-gch-gray">
                Contáctanos
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Estamos aquí para responder tus preguntas y ayudarte a transformar tus espacios. Contáctanos por
                cualquiera de nuestros canales o completa el formulario a continuación.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Información de contacto y formulario */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2">
              {/* Información de contacto */}
              <AnimatedSection animation="slide-right">
                <div className="space-y-8">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold mb-6 text-gch-gray">Información de Contacto</h2>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <Phone className="mr-4 h-6 w-6 text-gch-blue" />
                        <div>
                          <p className="font-medium text-lg">Teléfono</p>
                          <p className="text-muted-foreground">(01) 234-5678</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="mr-4 h-6 w-6 text-gch-blue" />
                        <div>
                          <p className="font-medium text-lg">WhatsApp</p>
                          <p className="text-muted-foreground">+51 987 654 321</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Mail className="mr-4 h-6 w-6 text-gch-blue" />
                        <div>
                          <p className="font-medium text-lg">Email</p>
                          <p className="text-muted-foreground">contacto@gchservicios.com</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="mr-4 h-6 w-6 text-gch-blue" />
                        <div>
                          <p className="font-medium text-lg">Dirección</p>
                          <p className="text-muted-foreground">Av. Ejemplo 123, Lima, Perú</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold mb-6 text-gch-gray">Horario de Atención</h2>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Lunes a Viernes: 9:00 am - 6:00 pm</p>
                      <p className="text-muted-foreground">Sábados: 9:00 am - 1:00 pm</p>
                      <p className="text-muted-foreground">Domingos: Cerrado</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl font-semibold mb-6 text-gch-gray">Síguenos en redes</h2>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="rounded-full bg-gch-blue/10 p-3 hover:bg-gch-blue/20 text-gch-blue transition-colors"
                      >
                        <Facebook className="h-6 w-6" />
                        <span className="sr-only">Facebook</span>
                      </a>
                      <a
                        href="#"
                        className="rounded-full bg-gch-blue/10 p-3 hover:bg-gch-blue/20 text-gch-blue transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                        <span className="sr-only">Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Formulario de contacto */}
              <AnimatedSection animation="slide-left" delay={0.2}>
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <h2 className="font-serif text-2xl font-semibold mb-6 text-gch-gray">Envíanos un mensaje</h2>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium">
                        Nombre completo
                      </label>
                      <Input id="nombre" placeholder="Ingresa tu nombre completo" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Correo electrónico
                      </label>
                      <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="telefono" className="text-sm font-medium">
                        Teléfono
                      </label>
                      <Input id="telefono" type="tel" placeholder="+51 999 999 999" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="asunto" className="text-sm font-medium">
                        Asunto
                      </label>
                      <Input id="asunto" placeholder="Asunto de tu mensaje" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="mensaje" className="text-sm font-medium">
                        Mensaje
                      </label>
                      <Textarea
                        id="mensaje"
                        placeholder="Escribe tu mensaje aquí..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gch-yellow hover:bg-gch-blue text-black">
                      Enviar Mensaje
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Mapa */}
        <section className="py-8 md:py-12">
          <div className="container">
            <AnimatedSection animation="fade">
              <div className="rounded-lg overflow-hidden shadow-sm border h-[400px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.964376164557!2d-77.03196492394376!3d-12.046654888118304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d35662c7%3A0x15f8bcc3bdae5e4e!2sCentro%20de%20Lima%2C%20Lima%2C%20Per%C3%BA!5e0!3m2!1ses-419!2sus!4v1686599590000!5m2!1ses-419!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de GCH Servicios Profesionales"
                ></iframe>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
