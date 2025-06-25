import type { Metadata } from "next"
import { ShieldCheck, Sparkles, Droplets, Ruler, Timer, Award } from "lucide-react"
import { CategoryHeader } from "@/components/category-header"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Puertas de Ducha | GCH Servicios Profesionales",
  description:
    "Puertas de ducha en vidrio templado con diseños modernos y elegantes. Fabricación a medida e instalación profesional.",
}

// Datos de ejemplo para los productos
const products = [
  {
    id: "p1",
    name: "Puerta Batiente Simple",
    description:
      "Puerta de ducha batiente en vidrio templado de 8mm con acabados en acero inoxidable. Elegante y funcional para baños modernos.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp",
    category: "batiente",
  },
  {
    id: "p2",
    name: "Puerta Corrediza Doble",
    description:
      "Sistema corredizo para duchas con doble panel de vidrio templado de 8mm y herrajes de acero inoxidable de alta calidad.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bda3388b-6063-4488-adad-d26b18f6e50b-zCKYSuDJLPx1gHnCbnN5jZyBGQxYq1.jpeg",
    category: "corrediza",
  },
  {
    id: "p3",
    name: "Mampara Fija con Panel Móvil",
    description:
      "Combinación de panel fijo y puerta abatible en vidrio templado. Ideal para espacios modernos y minimalistas.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp",
    category: "mamparas",
  },
  {
    id: "p4",
    name: "Cabina de Ducha Angular",
    description:
      "Cabina para ducha en esquina con vidrio templado de 8mm y acabados en acero inoxidable. Solución elegante para baños pequeños.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bda3388b-6063-4488-adad-d26b18f6e50b-zCKYSuDJLPx1gHnCbnN5jZyBGQxYq1.jpeg",
    category: "cabinas",
  },
  {
    id: "p5",
    name: "Puerta Batiente con Panel Fijo",
    description:
      "Combinación de panel fijo y puerta batiente en vidrio templado de 10mm con herrajes minimalistas en negro mate.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp",
    category: "batiente",
  },
  {
    id: "p6",
    name: "Sistema Corredizo Minimalista",
    description: "Puerta corrediza con riel superior oculto y vidrio templado de 8mm. Diseño limpio y contemporáneo.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bda3388b-6063-4488-adad-d26b18f6e50b-zCKYSuDJLPx1gHnCbnN5jZyBGQxYq1.jpeg",
    category: "corrediza",
  },
  {
    id: "p7",
    name: "Mampara con Vidrio Grabado",
    description: "Panel fijo de vidrio templado con diseño grabado para mayor privacidad y elegancia en tu ducha.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp",
    category: "mamparas",
  },
  {
    id: "p8",
    name: "Cabina Completa 90x90",
    description: "Cabina completa para ducha con base, paneles de vidrio templado y sistema de puertas corredizas.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bda3388b-6063-4488-adad-d26b18f6e50b-zCKYSuDJLPx1gHnCbnN5jZyBGQxYq1.jpeg",
    category: "cabinas",
  },
  {
    id: "p9",
    name: "Puerta de Ducha Plegable",
    description:
      "Sistema plegable en vidrio templado para espacios reducidos. Permite aprovechar al máximo el espacio del baño.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp",
    category: "batiente",
  },
]

// Preguntas frecuentes sobre puertas de ducha
const puertasFAQs = [
  {
    question: "¿Qué grosor de vidrio es recomendable para una puerta de ducha?",
    answer:
      "Recomendamos vidrio templado de 8mm para la mayoría de las instalaciones estándar, ya que ofrece un excelente equilibrio entre resistencia y peso. Para puertas de mayor tamaño o diseños especiales, utilizamos vidrio de 10mm que proporciona mayor estabilidad. El vidrio de 6mm puede ser adecuado para mamparas fijas pequeñas, pero no lo recomendamos para puertas móviles por seguridad.",
  },
  {
    question: "¿Cuáles son las diferencias entre los sistemas batientes y corredizos?",
    answer:
      "Las puertas batientes abren hacia adentro o afuera como una puerta convencional, ofreciendo una apertura amplia y son ideales para espacios medianos a grandes. Las puertas corredizas se deslizan lateralmente sin ocupar espacio adicional al abrirse, siendo perfectas para baños pequeños. Los sistemas batientes suelen tener mejor sellado contra fugas de agua, mientras que los corredizos ofrecen un aspecto más minimalista y moderno.",
  },
  {
    question: "¿Qué tipos de acabados ofrecen para los herrajes?",
    answer:
      "Ofrecemos varios acabados para adaptarse a la estética de su baño: acero inoxidable pulido (brillante), acero inoxidable cepillado (mate), negro mate, bronce antiguo y dorado. Todos nuestros herrajes están fabricados con materiales resistentes a la corrosión y humedad, especialmente diseñados para ambientes de baño.",
  },
  {
    question: "¿Cómo se realiza la instalación de una puerta de ducha?",
    answer:
      "El proceso comienza con una visita técnica para tomar medidas precisas. La instalación incluye la fijación de perfiles a la pared (si el modelo lo requiere), montaje de herrajes, colocación del vidrio templado, instalación de burletes y sellado con silicona especial para baños. El tiempo de instalación varía entre 2-4 horas dependiendo de la complejidad del modelo. Recomendamos no usar la ducha durante las 24 horas posteriores para permitir que el sellador cure completamente.",
  },
  {
    question: "¿Las puertas de ducha requieren mantenimiento especial?",
    answer:
      "Para mantener su puerta de ducha en óptimas condiciones, recomendamos limpiarla después de cada uso con un jalador de agua para evitar manchas de cal. Para la limpieza regular, use productos no abrasivos específicos para vidrio. Periódicamente revise y ajuste los herrajes si es necesario. Si su puerta tiene tratamiento antical (opcional en nuestros productos), este debe renovarse aproximadamente cada 2 años para mantener su efectividad.",
  },
  {
    question: "¿Qué garantía ofrecen para las puertas de ducha?",
    answer:
      "Nuestras puertas de ducha cuentan con 5 años de garantía que cubre el vidrio templado contra defectos de fabricación, los herrajes contra fallas mecánicas y problemas de corrosión, y la instalación. La garantía no cubre daños por impactos, uso indebido o limpieza con productos abrasivos. Ofrecemos además un servicio de mantenimiento anual opcional para extender la vida útil de su puerta de ducha.",
  },
  {
    question: "¿Pueden instalar puertas de ducha en espacios irregulares?",
    answer:
      "Sí, nos especializamos en soluciones a medida para espacios irregulares. Podemos fabricar puertas para duchas con ángulos no estándar, techos inclinados, o espacios con columnas. En estos casos, realizamos un levantamiento detallado de medidas y creamos plantillas si es necesario para garantizar un ajuste perfecto. Estas soluciones personalizadas pueden requerir un tiempo adicional de fabricación y tener un costo superior a las instalaciones estándar.",
  },
]

export default function PuertasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <CategoryHeader
          title="Puertas de Ducha"
          description="Elegancia y funcionalidad en vidrio templado para transformar tu baño"
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Puerta-de-ducha-batiente-en-vidrio-8QbOKsZ1o4sWuYTXZrPnxKTkztNHyT.webp"
        />

        <FeaturesSection
          title="Características de nuestras puertas de ducha"
          features={[
            {
              title: "Vidrio Templado de Seguridad",
              description: "Utilizamos vidrio templado de 8mm y 10mm que garantiza seguridad y resistencia a impactos.",
              icon: <ShieldCheck className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Acabados Premium",
              description: "Herrajes en acero inoxidable, cromo o negro mate con garantía contra corrosión.",
              icon: <Sparkles className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Resistencia al Agua",
              description: "Tratamiento especial que evita la acumulación de cal y facilita la limpieza diaria.",
              icon: <Droplets className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Fabricación a Medida",
              description: "Tomamos medidas exactas de tu espacio para una instalación perfecta y sin filtraciones.",
              icon: <Ruler className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Instalación Profesional",
              description: "Nuestros técnicos especializados garantizan una instalación perfecta en tiempo récord.",
              icon: <Timer className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "5 Años de Garantía",
              description: "Respaldamos la calidad de nuestras puertas de ducha con una garantía extendida.",
              icon: <Award className="h-6 w-6 text-gch-blue" />,
            },
          ]}
        />

        <ProductGrid
          title="Nuestros Modelos de Puertas"
          description="Descubre diferentes estilos y sistemas para tu ducha"
          products={products}
          categories={["batiente", "corrediza", "mamparas", "cabinas"]}
        />

        <FAQSection
          title="Preguntas Frecuentes sobre Puertas de Ducha"
          description="Resolvemos tus dudas sobre nuestros productos y servicios"
          faqs={puertasFAQs}
        />

        <CTASection
          title="Transforma tu baño hoy mismo"
          description="Solicita una cotización personalizada para tu puerta de ducha ideal"
          buttonText="Contactar Ahora"
          buttonLink="#contacto"
        />
      </main>
    </div>
  )
}
