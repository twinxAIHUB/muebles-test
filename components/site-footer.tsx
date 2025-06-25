import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t bg-white py-8">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/png-logo-300x148-YoLJTEsRPwPNJlduUWmZkHgFOHBfKY.png"
                width={150}
                height={40}
                alt="GCH Servicios Profesionales"
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Transformamos espacios con diseños exclusivos y acabados de lujo. Más de 10 años de experiencia en muebles
              a medida y remodelaciones.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-gch-gray">Productos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/muebles"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Muebles de Melamina
                </Link>
              </li>
              <li>
                <Link
                  href="/puertas"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Puertas de Ducha
                </Link>
              </li>
              <li>
                <Link
                  href="/decoracion"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Decoración
                </Link>
              </li>
              <li>
                <Link
                  href="/remodelacion"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Remodelación
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-gch-gray">Enlaces</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/proyectos"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-gch-gray">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/terminos"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-sm text-muted-foreground hover:text-gch-blue transition-colors duration-200 hover:translate-x-0.5 inline-block"
                >
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} GCH Servicios Profesionales. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
