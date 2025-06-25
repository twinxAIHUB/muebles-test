import type { Metadata } from "next"
import { Palette, LampFloor, Home, Gem, Clock, HeartHandshake } from "lucide-react"
import { CategoryHeader } from "@/components/category-header"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Decoración de Interiores | GCH Servicios Profesionales",
  description:
    "Servicios profesionales de decoración de interiores para transformar tus espacios con estilo y personalidad.",
}

// Datos de ejemplo para los productos
const products = [
  {
    id: "d1",
    name: "Sala Contemporánea",
    description:
      "Diseño y decoración de sala de estar con estilo contemporáneo. Incluye selección de mobiliario, iluminación y accesorios.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "salas",
  },
  {
    id: "d2",
    name: "Dormitorio Nórdico",
    description:
      "Decoración de dormitorio en estilo nórdico con tonos neutros, texturas naturales y elementos funcionales.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "dormitorios",
  },
  {
    id: "d3",
    name: "Comedor Elegante",
    description:
      "Transformación de comedor con elementos elegantes, lámpara colgante y accesorios decorativos que aportan calidez.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "comedores",
  },
  {
    id: "d4",
    name: "Oficina en Casa",
    description: "Diseño de espacio de trabajo en casa, combinando funcionalidad y estética para mayor productividad.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "oficinas",
  },
  {
    id: "d5",
    name: "Sala Minimalista",
    description:
      "Decoración de sala con enfoque minimalista, líneas limpias y una paleta de colores neutros para crear amplitud visual.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "salas",
  },
  {
    id: "d6",
    name: "Dormitorio Principal con Vestidor",
    description: "Proyecto integral de dormitorio principal que incluye zona de descanso y vestidor integrado.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "dormitorios",
  },
  {
    id: "d7",
    name: "Comedor para Espacios Pequeños",
    description:
      "Soluciones decorativas para comedores en espacios reducidos, maximizando funcionalidad sin sacrificar estilo.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "comedores",
  },
  {
    id: "d8",
    name: "Estación de Trabajo Corporativa",
    description:
      "Diseño de oficina corporativa con elementos ergonómicos y decoración profesional que favorece la productividad.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "oficinas",
  },
  {
    id: "d9",
    name: "Terraza con Estilo",
    description:
      "Transformación de terrazas en espacios habitables con mobiliario de exterior, iluminación y elementos decorativos.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "exteriores",
  },
]

// Preguntas frecuentes sobre decoración
const decoracionFAQs = [
  {
    question: "¿Cómo funciona el servicio de decoración de interiores?",
    answer:
      "Nuestro servicio comienza con una consulta inicial donde conocemos sus necesidades, gustos y presupuesto. Luego realizamos una visita al espacio para tomar medidas y evaluar las condiciones. Desarrollamos un concepto decorativo que incluye paleta de colores, materiales, mobiliario y accesorios, presentado mediante moodboards y/o renders 3D. Una vez aprobada la propuesta, coordinamos la adquisición de elementos decorativos, mobiliario y la implementación del proyecto, que puede incluir desde cambios simples hasta transformaciones completas del espacio.",
  },
  {
    question: "¿Cuánto tiempo toma un proyecto de decoración?",
    answer:
      "El tiempo varía según la complejidad y alcance del proyecto. Una decoración básica de un ambiente puede tomar entre 2-4 semanas desde la aprobación del concepto hasta la implementación. Proyectos más completos que involucren varios ambientes pueden extenderse de 1 a 3 meses. Factores como la disponibilidad de productos, tiempos de fabricación de muebles a medida o importaciones pueden afectar el cronograma. En la propuesta inicial establecemos un calendario detallado con los tiempos estimados para cada fase del proyecto.",
  },
  {
    question: "¿Trabajan con mi presupuesto existente o debo tener un monto mínimo?",
    answer:
      "Nos adaptamos a diferentes presupuestos y siempre buscamos optimizar la inversión del cliente. No tenemos un monto mínimo establecido, pero sí recomendamos ser realistas sobre lo que se puede lograr con el presupuesto disponible. Durante la consulta inicial, evaluamos sus objetivos y establecemos prioridades para distribuir el presupuesto de manera efectiva. Ofrecemos opciones en diferentes rangos de precio y podemos implementar el proyecto por fases si es necesario para adaptarnos a sus posibilidades económicas.",
  },
  {
    question: "¿Puedo incorporar muebles o elementos decorativos que ya tengo?",
    answer:
      "¡Absolutamente! Valoramos las piezas con significado personal y creemos en la sostenibilidad. Durante nuestra evaluación inicial, identificamos qué elementos existentes pueden integrarse al nuevo diseño, ya sea manteniéndolos tal cual, restaurándolos o reubicándolos. Nuestro objetivo es crear espacios que reflejen su personalidad, y muchas veces los objetos que ya posee son parte fundamental de esa identidad. Complementamos lo existente con nuevas adquisiciones que armonicen y eleven el conjunto.",
  },
  {
    question: "¿Qué estilos decorativos manejan?",
    answer:
      "Nuestro equipo está capacitado para trabajar con una amplia variedad de estilos decorativos, desde los más clásicos como el tradicional o colonial, hasta tendencias contemporáneas como el minimalismo, industrial, nórdico, bohemio, mid-century modern, o ecléctico. Lo más importante es que el estilo elegido refleje su personalidad y se adapte a su estilo de vida. Durante el proceso creativo, podemos combinar elementos de diferentes estilos para crear un espacio único y personalizado que resuene con sus gustos particulares.",
  },
  {
    question: "¿Ofrecen servicios de decoración virtual o a distancia?",
    answer:
      "Sí, contamos con servicios de decoración virtual para clientes que prefieren esta modalidad o se encuentran en otras ciudades. El proceso incluye videollamadas para conocer el espacio, cuestionarios detallados sobre preferencias, intercambio de fotos y medidas, y presentación digital de propuestas mediante moodboards, planos 2D y/o renders 3D. Proporcionamos una guía de compra detallada con enlaces a productos específicos y recomendaciones de implementación. Este servicio mantiene la calidad de nuestro asesoramiento profesional con mayor flexibilidad y generalmente a un costo más accesible que el servicio presencial.",
  },
  {
    question: "¿Cómo se determina el costo de un proyecto de decoración?",
    answer:
      "El costo se determina según varios factores: el tamaño del espacio a intervenir, la complejidad del proyecto (desde refrescar la decoración hasta transformaciones completas), la calidad de los materiales y productos seleccionados, y el nivel de personalización requerido. Ofrecemos diferentes modalidades de cobro: tarifa fija por proyecto, tarifa por hora de asesoría, o porcentaje sobre el costo total de implementación. En todos los casos, presentamos un presupuesto detallado antes de iniciar el trabajo para que tenga total claridad sobre la inversión requerida.",
  },
]

export default function DecoracionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <CategoryHeader
          title="Decoración de Interiores"
          description="Transforma tus espacios con estilo, personalidad y los mejores acabados"
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg"
        />

        <FeaturesSection
          title="Nuestros servicios de decoración"
          description="Creamos ambientes que reflejan tu personalidad y estilo de vida"
          features={[
            {
              title: "Asesoría de Estilo",
              description: "Identificamos tu estilo personal y las mejores opciones para reflejarlo en tu espacio.",
              icon: <Palette className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Selección de Iluminación",
              description:
                "Diseño de esquemas de iluminación que realzan la arquitectura y crean la atmósfera adecuada.",
              icon: <LampFloor className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Home Staging",
              description: "Preparamos tu propiedad para venta o alquiler, destacando sus mejores características.",
              icon: <Home className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Accesorios Decorativos",
              description: "Seleccionamos piezas únicas que complementan tu espacio y reflejan tu personalidad.",
              icon: <Gem className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Decoración por Temporadas",
              description: "Actualizamos tu decoración según la temporada para mantener tus espacios siempre frescos.",
              icon: <Clock className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Decoración Personalizada",
              description: "Creamos elementos decorativos personalizados que hacen único tu espacio.",
              icon: <HeartHandshake className="h-6 w-6 text-gch-blue" />,
            },
          ]}
        />

        <ProductGrid
          title="Proyectos de Decoración"
          description="Explora nuestros proyectos realizados en diferentes ambientes"
          products={products}
          categories={["salas", "dormitorios", "comedores", "oficinas", "exteriores"]}
        />

        <FAQSection
          title="Preguntas Frecuentes sobre Decoración"
          description="Resolvemos tus dudas sobre nuestros servicios de decoración"
          faqs={decoracionFAQs}
        />

        <CTASection
          title="¿Listo para transformar tus espacios?"
          description="Agenda una consulta con nuestros decoradores profesionales"
          buttonText="Agendar Consulta"
          buttonLink="#contacto"
        />
      </main>
    </div>
  )
}
