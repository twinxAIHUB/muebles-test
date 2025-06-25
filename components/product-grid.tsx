"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedList } from "@/components/animated-list"
import { AnimatedSection } from "@/components/animated-section"
import { ChevronRight } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
}

interface ProductGridProps {
  title: string
  description?: string
  products: Product[]
  categories?: string[]
  defaultCategory?: string
}

export function ProductGrid({
  title,
  description,
  products,
  categories = [],
  defaultCategory = "all",
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory)
  const [openProduct, setOpenProduct] = useState<Product | null>(null)

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <AnimatedSection animation="slide-up" className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">{title}</h2>
          {description && <p className="mt-4 text-muted-foreground">{description}</p>}
        </AnimatedSection>

        {categories.length > 0 && (
          <AnimatedSection animation="slide-up" delay={0.2} className="mt-8">
            <Tabs
              defaultValue={defaultCategory}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="all">Todos</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </AnimatedSection>
        )}

        <AnimatedList className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer overflow-hidden rounded-lg bg-white border shadow-sm hover:shadow-lg hover:shadow-gch-blue/10 transition-all duration-300 hover:-translate-y-1"
              onClick={() => setOpenProduct(product)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-gch-gray">{product.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <Button
                  variant="link"
                  className="mt-2 h-8 p-0 text-gch-blue hover:text-gch-yellow group-hover:translate-x-1 transition-transform"
                >
                  Ver detalles
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </AnimatedList>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={!!openProduct} onOpenChange={() => setOpenProduct(null)}>
        {openProduct && (
          <DialogContent className="max-w-3xl shadow-xl animate-in fade-in-90 slide-in-from-bottom-10 duration-300">
            <DialogTitle className="font-serif text-2xl">{openProduct.name}</DialogTitle>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={openProduct.image || "/placeholder.svg"}
                  alt={openProduct.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-muted-foreground">{openProduct.description}</p>
                <div className="mt-6">
                  <Button className="w-full bg-gch-yellow hover:bg-gch-blue text-black">Solicitar Cotización</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
