import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedList } from "@/components/animated-list"
import { CheckCircle2, Clock, FileText, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Solicitar Cotización | GCH Servicios Profesionales",
  description: "Solicita una cotización personalizada para tus proyectos de muebles, remodelación o decoración.",
}

export default function CotizacionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Cabecera */}
        <section className="bg-gch-blue/10 py-16 md:py-24">
          <div className="container">
            <AnimatedSection animation="fade" className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight mb-4 md:text-5xl text-gch-gray">
                Solicita tu Cotización
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Completa el formulario a continuación para recibir una cotización personalizada para tu proyecto.
                Nuestro equipo te contactará en menos de 24 horas.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Proceso de cotización */}
        <section className="py-12 md:py-16">
          <div className="container">
            <AnimatedSection animation="slide-up" className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-gch-gray">Nuestro proceso</h2>
              <p className="mt-2 text-muted-foreground">Así funciona nuestro proceso de cotización</p>
            </AnimatedSection>

            <AnimatedList className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.15}>
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-gch-blue/10 p-4 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-gch-blue" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">1. Solicitud</h3>
                <p className="text-muted-foreground">
                  Completa el formulario con los detalles de tu proyecto y necesidades específicas.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-gch-blue/10 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-gch-blue" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">2. Evaluación</h3>
                <p className="text-muted-foreground">
                  Nuestro equipo evalúa tu solicitud y prepara una propuesta personalizada.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-gch-blue/10 p-4 rounded-full mb-4">
                  <Phone className="h-8 w-8 text-gch-blue" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">3. Contacto</h3>
                <p className="text-muted-foreground">
                  Te contactamos para aclarar detalles y coordinar una visita técnica si es necesario.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-gch-blue/10 p-4 rounded-full mb-4">
                  <CheckCircle2 className="h-8 w-8 text-gch-blue" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">4. Propuesta</h3>
                <p className="text-muted-foreground">
                  Recibes una cotización detallada con precios, plazos y especificaciones técnicas.
                </p>
              </div>
            </AnimatedList>
          </div>
        </section>

        {/* Formulario de cotización */}
        <section className="py-12 md:py-16 bg-stone-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection animation="fade" className="bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="font-serif text-2xl font-semibold mb-6 text-gch-gray">Formulario de Cotización</h2>
                <form className="space-y-6">
                  {/* Información personal */}
                  <div>
                    <h3 className="font-medium text-lg mb-4">Información personal</h3>
                    <div className="grid gap-4 md:grid-cols-2">
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
                        <Input id="telefono" type="tel" placeholder="+51 999 999 999" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="distrito" className="text-sm font-medium">
                          Distrito
                        </label>
                        <Input id="distrito" placeholder="Distrito donde se realizará el proyecto" />
                      </div>
                    </div>
                  </div>

                  {/* Detalles del proyecto */}
                  <div>
                    <h3 className="font-medium text-lg mb-4">Detalles del proyecto</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="tipo-proyecto" className="text-sm font-medium">
                          Tipo de proyecto
                        </label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo de proyecto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="muebles-cocina">Muebles de Cocina</SelectItem>
                            <SelectItem value="closets">Closets y Vestidores</SelectItem>
                            <SelectItem value="puertas-ducha">Puertas de Ducha</SelectItem>
                            <SelectItem value="muebles-oficina">Muebles para Oficina</SelectItem>
                            <SelectItem value="remodelacion">Remodelación Integral</SelectItem>
                            <SelectItem value="decoracion">Decoración de Interiores</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="presupuesto" className="text-sm font-medium">
                          Presupuesto aproximado
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un rango de presupuesto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="menos-1000">Menos de S/. 1,000</SelectItem>
                            <SelectItem value="1000-3000">S/. 1,000 - S/. 3,000</SelectItem>
                            <SelectItem value="3000-5000">S/. 3,000 - S/. 5,000</SelectItem>
                            <SelectItem value="5000-10000">S/. 5,000 - S/. 10,000</SelectItem>
                            <SelectItem value="mas-10000">Más de S/. 10,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="tiempo" className="text-sm font-medium">
                          Tiempo estimado para el proyecto
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="¿Cuándo necesitas el proyecto?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgente">Lo antes posible</SelectItem>
                            <SelectItem value="1-mes">En el próximo mes</SelectItem>
                            <SelectItem value="1-3-meses">En 1-3 meses</SelectItem>
                            <SelectItem value="3-6-meses">En 3-6 meses</SelectItem>
                            <SelectItem value="solo-cotizacion">Solo quiero una cotización</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="descripcion" className="text-sm font-medium">
                          Descripción del proyecto
                        </label>
                        <Textarea
                          id="descripcion"
                          placeholder="Describe tu proyecto con el mayor detalle posible: medidas, materiales preferidos, estilo, etc."
                          className="min-h-[150px]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">¿Tienes planos o imágenes de referencia?</label>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tiene-planos" />
                          <label
                            htmlFor="tiene-planos"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Sí, puedo enviarlos por correo electrónico
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferencias de contacto */}
                  <div>
                    <h3 className="font-medium text-lg mb-4">Preferencias de contacto</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">¿Cómo prefieres que te contactemos?</label>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="contacto-telefono" defaultChecked />
                            <label
                              htmlFor="contacto-telefono"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Teléfono / WhatsApp
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="contacto-email" />
                            <label
                              htmlFor="contacto-email"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Correo electrónico
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Horario preferido para contacto</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un horario" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="manana">Mañana (9:00 am - 12:00 pm)</SelectItem>
                            <SelectItem value="tarde">Tarde (12:00 pm - 5:00 pm)</SelectItem>
                            <SelectItem value="noche">Noche (5:00 pm - 8:00 pm)</SelectItem>
                            <SelectItem value="cualquiera">Cualquier horario</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox id="terminos" required />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terminos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Acepto los términos y condiciones
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Al enviar este formulario, acepto que GCH Servicios Profesionales utilice mis datos para
                        contactarme y enviarme la cotización solicitada.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gch-yellow hover:bg-gch-blue text-black">
                    Solicitar Cotización
                  </Button>
                </form>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
