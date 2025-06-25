import type { Metadata } from "next"
import { Check, Shield, Zap, Layout, PaintbrushIcon as Paint, PencilRuler } from "lucide-react"
import { CategoryHeader } from "@/components/category-header"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"

export const metadata: Metadata = {
  title: "Muebles de Melamina | GCH Servicios Profesionales",
  description:
    "Muebles de melamina a medida para cocinas, closets, dormitorios y oficinas. Diseño personalizado y alta calidad en acabados.",
}

// Datos de ejemplo para los productos
const products = [
  {
    id: "m1",
    name: "Cocina Moderna Lineal",
    description:
      "Cocina moderna en melamina con acabados de primera calidad. Incluye muebles altos y bajos, cajones con sistema de cierre suave y espacio para electrodomésticos.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg",
    category: "cocinas",
  },
  {
    id: "m2",
    name: "Closet con Puertas Corredizas",
    description:
      "Closet amplio con puertas corredizas, optimizando el espacio de tu dormitorio. Incluye secciones para colgar ropa, cajones y zapatera.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "closets",
  },
  {
    id: "m3",
    name: "Centro de Entretenimiento",
    description:
      "Mueble para sala diseñado para albergar equipo audiovisual, con paneles para TV y almacenamiento para accesorios.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "salas",
  },
  {
    id: "m4",
    name: "Escritorio Ejecutivo",
    description:
      "Escritorio de oficina con múltiples cajones y superficie amplia para trabajar cómodamente. Diseño elegante y profesional.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "oficinas",
  },
  {
    id: "m5",
    name: "Cocina en L con Desayunador",
    description:
      "Cocina en forma de L con desayunador incorporado, perfecta para espacios familiares. Incluye espacio para electrodomésticos y almacenamiento.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg",
    category: "cocinas",
  },
  {
    id: "m6",
    name: "Walk-in Closet Personalizado",
    description:
      "Closet abierto tipo walk-in con distribucion personalizada para ropa, calzado y accesorios. Incluye iluminación LED integrada.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "closets",
  },
  {
    id: "m7",
    name: "Biblioteca Modular",
    description: "Biblioteca con estantes ajustables y puertas inferiores. Perfecta para salas de estar o estudios.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "salas",
  },
  {
    id: "m8",
    name: "Estación de Trabajo Compartida",
    description:
      "Estación de trabajo para dos personas con separaciones y almacenamiento independiente para cada usuario.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sofa-en-salon-con-espacio-para-copiar.jpg-xx46bJso1sedTxBrRUJw6dOrUCVwOZ.jpeg",
    category: "oficinas",
  },
  {
    id: "m9",
    name: "Mueble de TV con Iluminación",
    description:
      "Mueble para sala con soporte para TV, iluminación LED y almacenamiento para equipos audiovisuales y accesorios.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/service2.jpg-ncVpuRktHjthYWZnHvjqgtPlIGPRL3.jpeg",
    category: "salas",
  },
]

// Preguntas frecuentes sobre muebles de melamina
const mueblesFAQs = [
  {
    question: "¿Qué ventajas tiene la melamina frente a otros materiales?",
    answer:
      "La melamina ofrece excelente relación calidad-precio, gran variedad de acabados y colores, resistencia a la humedad y al desgaste diario, fácil limpieza y mantenimiento, y es más ligera que la madera maciza. Además, es un material sostenible que contribuye a la conservación de bosques naturales.",
  },
  {
    question: "¿Cuánto tiempo dura un mueble de melamina?",
    answer:
      "Con un uso y mantenimiento adecuados, los muebles de melamina pueden durar entre 10 y 15 años. La durabilidad depende de la calidad del tablero (utilizamos melamina de 18mm de espesor), los herrajes y el tipo de cantos aplicados. Nuestros muebles incluyen cantos de PVC que aumentan significativamente su resistencia a golpes y humedad.",
  },
  {
    question: "¿Cuál es el proceso de fabricación de un mueble a medida?",
    answer:
      "El proceso comienza con una visita técnica para tomar medidas exactas y entender sus necesidades. Luego diseñamos el mueble en software especializado y presentamos renders para su aprobación. Una vez aprobado, fabricamos las piezas en nuestro taller con maquinaria de precisión, y finalmente realizamos la instalación en su domicilio. Todo el proceso toma aproximadamente 2-3 semanas dependiendo de la complejidad.",
  },
  {
    question: "¿Qué tipos de herrajes utilizan en sus muebles?",
    answer:
      "Utilizamos herrajes de marcas reconocidas como Hafele, Blum y FGV que garantizan durabilidad y funcionamiento suave. Esto incluye bisagras con cierre suave, correderas telescópicas para cajones, sistemas push para puertas sin tiradores, y diversos accesorios para optimizar el espacio interior como canastos extraíbles, organizadores y sistemas de iluminación LED.",
  },
  {
    question: "¿Ofrecen garantía para sus muebles de melamina?",
    answer:
      "Sí, todos nuestros muebles de melamina cuentan con 2 años de garantía que cubre defectos de fabricación, problemas con herrajes y acabados. La garantía no cubre daños por mal uso, exposición a humedad excesiva o modificaciones realizadas por terceros.",
  },
  {
    question: "¿Cómo debo mantener mis muebles de melamina?",
    answer:
      "Para el mantenimiento diario, recomendamos limpiar con un paño ligeramente húmedo y secar inmediatamente. Evite productos abrasivos o solventes que puedan dañar la superficie. Para manchas difíciles, use jabón neutro diluido en agua. Evite colocar objetos muy calientes directamente sobre la superficie y seque inmediatamente cualquier derrame de líquidos, especialmente en las uniones y cantos.",
  },
  {
    question: "¿Puedo modificar un mueble después de instalado?",
    answer:
      "Aunque es posible realizar algunas modificaciones menores después de la instalación, recomendamos definir bien todos los detalles durante la fase de diseño. Cambios estructurales importantes podrían comprometer la estabilidad del mueble. Para adaptaciones futuras, consúltenos primero para evaluar la viabilidad técnica.",
  },
]

export default function MueblesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <CategoryHeader
          title="Muebles de Melamina"
          description="Diseños exclusivos y funcionales para cada espacio de tu hogar u oficina"
          imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7bce69ba-dc4b-47b3-9612-1e1b957e4f1d-sYG2I7Eg7V4RLL1QnIwnxvN8LWKluG.jpeg"
        />

        <FeaturesSection
          title="¿Por qué elegir nuestros muebles de melamina?"
          features={[
            {
              title: "Alta Durabilidad",
              description:
                "Utilizamos melamina de 18mm de espesor con cantos de PVC que garantizan mayor resistencia y durabilidad.",
              icon: <Shield className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Diseño a Medida",
              description: "Creamos muebles que se adaptan perfectamente a tus espacios y necesidades específicas.",
              icon: <PencilRuler className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Instalación Rápida",
              description: "Nuestro equipo garantiza una instalación profesional y en el tiempo acordado.",
              icon: <Zap className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Múltiples Acabados",
              description:
                "Amplia variedad de colores y texturas para elegir, desde maderas clásicas hasta diseños modernos.",
              icon: <Paint className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Optimización de Espacio",
              description: "Maximizamos cada centímetro de tu espacio con soluciones inteligentes de almacenamiento.",
              icon: <Layout className="h-6 w-6 text-gch-blue" />,
            },
            {
              title: "Garantía de Calidad",
              description: "Todos nuestros muebles cuentan con garantía de 2 años en materiales y fabricación.",
              icon: <Check className="h-6 w-6 text-gch-blue" />,
            },
          ]}
        />

        <ProductGrid
          title="Nuestra Colección de Muebles"
          description="Explora nuestra amplia variedad de muebles de melamina para todos los ambientes"
          products={products}
          categories={["cocinas", "closets", "salas", "oficinas"]}
        />

        <FAQSection
          title="Preguntas Frecuentes sobre Muebles de Melamina"
          description="Resolvemos tus dudas sobre nuestros productos y servicios"
          faqs={mueblesFAQs}
        />

        <CTASection
          title="¿Tienes un proyecto en mente?"
          description="Contáctanos para una cotización personalizada de tus muebles de melamina"
          buttonText="Solicitar Cotización"
          buttonLink="#contacto"
        />
      </main>
    </div>
  )
}
