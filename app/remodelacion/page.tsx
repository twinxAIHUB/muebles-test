import type { Metadata } from "next"
import { HardHat, PencilRuler, ClipboardCheck, Timer, Settings, Brush } from "lucide-react"
import { CategoryHeader } from "@/components/category-header"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Remodelación de Interiores | GCH Servicios Profesionales",
  description:
    "Servicios profesionales de remodelación de interiores para hogares y espacios comerciales. Transformamos cada ambiente con calidad y precisión.",
}

// Datos de ejemplo para los proyectos
const projects = [
  {
    id: "r1",
    name: "Remodelación Integral de Cocina",
    description:
      "Transformación completa de cocina incluyendo muebles de melamina, encimera de cuarzo, instalaciones eléctricas y sanitarias nuevas.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg",
    category: "cocinas",
  },
  {
    id: "r2",
    name: "Renovación de Baño Principal",
    description:
      "Actualización completa de baño con nueva ducha de vidrio templado, porcelanato importado y mueble de lavabo suspendido.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bda3388b-6063-4488-adad-d26b18f6e50b-zCKYSuDJLPx1gHnCbnN5jZyBGQxYq1.jpeg",
    category: "baños",
  },
  {
    id: "r3",
    name: "Remodelación de Sala y Comedor",
    description:
      "Rediseño de sala-comedor con nuevos acabados en pisos, iluminación LED y mobiliario a medida para optimizar el espacio.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "salas",
  },
  {
    id: "r4",
    name: "Oficina Corporativa",
    description:
      "Transformación de espacio de trabajo con estaciones modulares, salas de reuniones y áreas comunes para empleados.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "comerciales",
  },
  {
    id: "r5",
    name: "Ampliación de Cocina",
    description:
      "Proyecto de ampliación de cocina integrando espacio de desayunador y optimizando la distribución de los elementos.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg",
    category: "cocinas",
  },
  {
    id: "r6",
    name: "Baño con Concepto Spa",
    description:
      "Remodelación de baño con enfoque wellness, incluyendo ducha tipo lluvia, bañera exenta y acabados en piedra natural.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bda3388b-6063-4488-adad-d26b18f6e50b-zCKYSuDJLPx1gHnCbnN5jZyBGQxYq1.jpeg",
    category: "baños",
  },
  {
    id: "r7",
    name: "Dormitorio Principal con Vestidor",
    description: "Rediseño de dormitorio principal incluyendo walk-in closet, nuevos acabados e iluminación ambient e.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "dormitorios",
  },
  {
    id: "r8",
    name: "Local Comercial Minimalista",
    description:
      "Remodelación de tienda con diseño minimalista, iluminación estratégica y mobiliario de exhibición personalizado.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "comerciales",
  },
  {
    id: "r9",
    name: "Terraza Multifuncional",
    description:
      "Transformación de terraza en espacio multifuncional con pérgola, deck de madera y zona de parrilla integrada.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "exteriores",
  },
]

// Preguntas frecuentes sobre remodelación
const remodelacionFAQs = [
  {
    question: "¿Cuánto tiempo toma un proyecto de remodelación?",
    answer:
      "La duración depende de la complejidad y alcance del proyecto. Una remodelación básica de un ambiente (como un baño) puede tomar entre 2-4 semanas. Proyectos más completos como cocinas suelen requerir 4-6 semanas. Remodelaciones integrales de viviendas pueden extenderse de 2 a 6 meses. Factores como la disponibilidad de materiales, permisos municipales o hallazgos imprevistos durante la obra pueden afectar el cronograma. En nuestra propuesta inicial establecemos un calendario detallado con los tiempos estimados para cada fase del proyecto.",
  },
  {
    question: "¿Necesito desocupar completamente el espacio durante la remodelación?",
    answer:
      "No siempre es necesario desocupar completamente el espacio. Para remodelaciones parciales (como un baño o cocina), es posible continuar habitando la vivienda, aunque con ciertas incomodidades. Para remodelaciones integrales, recomendamos desocupar temporalmente el espacio por seguridad, comodidad y para agilizar los trabajos. En proyectos comerciales, podemos coordinar trabajos por fases o en horarios extendidos para minimizar la interrupción de actividades. Evaluamos cada caso particular y recomendamos la mejor opción según el alcance de la obra.",
  },
  {
    question: "¿Ustedes se encargan de obtener los permisos municipales necesarios?",
    answer:
      "Sí, nos encargamos de gestionar todos los permisos municipales requeridos para su proyecto. Esto incluye licencias de construcción, permisos de remodelación, aprobaciones de planos y cualquier otro trámite necesario según las normativas locales. Este servicio está incluido en nuestros proyectos de remodelación integral, aunque los costos de tasas municipales y derechos de trámite son adicionales y varían según el distrito y tipo de proyecto. Contamos con arquitectos colegiados que firman los planos y supervisan que todo cumpla con las regulaciones vigentes.",
  },
  {
    question: "¿Cómo manejan los imprevistos durante la obra?",
    answer:
      "Los imprevistos son parte natural de cualquier proyecto de remodelación. Nuestro enfoque incluye: 1) Una evaluación inicial exhaustiva para minimizar sorpresas, 2) Un fondo de contingencia recomendado del 10-15% del presupuesto total, 3) Comunicación inmediata con el cliente ante cualquier hallazgo imprevisto, presentando alternativas de solución con sus respectivos costos y tiempos, 4) Documentación detallada de cualquier cambio mediante órdenes de cambio formales que requieren su aprobación antes de proceder. Nuestro objetivo es resolver los imprevistos de manera eficiente sin comprometer la calidad ni generar retrasos significativos.",
  },
  {
    question: "¿Ofrecen garantía por los trabajos realizados?",
    answer:
      "Sí, todos nuestros proyectos de remodelación cuentan con garantía. Ofrecemos 1 año de garantía en acabados e instalaciones generales y 5 años en elementos estructurales. La garantía cubre defectos de construcción, problemas de instalación y fallas en los sistemas implementados (eléctricos, sanitarios, etc.). Excluye daños por uso indebido, mantenimiento inadecuado o modificaciones realizadas por terceros. Además, trasladamos al cliente las garantías de fábrica de los productos instalados (como griferías, sanitarios, etc.) que suelen tener sus propias condiciones y plazos.",
  },
  {
    question: "¿Puedo hacer modificaciones al proyecto una vez iniciada la obra?",
    answer:
      "Sí, es posible realizar modificaciones durante la ejecución del proyecto, aunque recomendamos definir la mayor cantidad de detalles durante la fase de diseño para evitar sobrecostos y retrasos. Cualquier cambio solicitado se evalúa en términos de viabilidad técnica, impacto en el cronograma y costo adicional. Los cambios se formalizan mediante órdenes de cambio que requieren su aprobación. Modificaciones estructurales o que afecten instalaciones ya realizadas suelen tener un impacto mayor en tiempo y costo que cambios en acabados o elementos decorativos.",
  },
  {
    question: "¿Cómo se realizan los pagos en un proyecto de remodelación?",
    answer:
      "Nuestro esquema de pagos típico incluye: 1) Un adelanto inicial del 40% para asegurar materiales y programar el equipo de trabajo, 2) Pagos parciales según avance de obra, generalmente 2-3 pagos que corresponden a hitos específicos del proyecto (30% al completar obra gruesa, 20% al finalizar instalaciones), 3) Un pago final del 10% contra entrega y conformidad del proyecto. Para proyectos grandes, elaboramos un cronograma de pagos más detallado. Aceptamos transferencias bancarias, depósitos y tarjetas de crédito (estas últimas con un cargo adicional por comisión). Todos nuestros pagos están respaldados por comprobantes fiscales.",
  },
]

export default function RemodelacionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <CategoryHeader
          title="Remodelación de Interiores"
          description="Proyectos integrales que transforman por completo tus espacios"
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg"
        />

        <FeaturesSection
          title="Nuestro proceso de remodelación"
          description="Un enfoque profesional para resultados excepcionales"
          features={[
            {
              title: "Equipo Especializado",
              description:
                "Contamos con arquitectos, diseñadores y técnicos especialistas en cada área de tu proyecto.",
              icon: <HardHat className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Diseño Personalizado",
              description: "Creamos planos y renderizados 3D para que visualices el resultado final antes de comenzar.",
              icon: <PencilRuler className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Planificación Detallada",
              description:
                "Desarrollamos un cronograma preciso de actividades, materiales y costos para evitar sorpresas.",
              icon: <ClipboardCheck className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Ejecución Puntual",
              description:
                "Nos comprometemos con los tiempos establecidos para minimizar las molestias durante la obra.",
              icon: <Timer className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Instalaciones Modernas",
              description:
                "Actualizamos las instalaciones eléctricas, sanitarias y de gas cumpliendo todas las normativas vigentes.",
              icon: <Settings className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Acabados Premium",
              description:
                "Utilizamos materiales de primera calidad y acabados profesionales en todos nuestros proyectos.",
              icon: <Brush className="h-6 w-6 text-gch-blue" />,
            },
          ]}
        />

        <ProductGrid
          title="Proyectos de Remodelación"
          description="Descubre cómo hemos transformado espacios para nuestros clientes"
          products={projects}
          categories={["cocinas", "baños", "dormitorios", "salas", "comerciales", "exteriores"]}
        />

        <FAQSection
          title="Preguntas Frecuentes sobre Remodelación"
          description="Resolvemos tus dudas sobre nuestros servicios de remodelación"
          faqs={remodelacionFAQs}
        />

        <CTASection
          title="¿Tienes un proyecto de remodelación?"
          description="Agenda una visita técnica gratuita para evaluar tu espacio y brindarte la mejor solución"
          buttonText="Solicitar Visita Técnica"
          buttonLink="#contacto"
        />
      </main>
    </div>
  )
}
