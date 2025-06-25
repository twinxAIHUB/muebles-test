import type React from "react"
import { AnimatedSection } from "./animated-section"
import { AnimatedList } from "./animated-list"

interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

interface FeaturesSectionProps {
  title: string
  description?: string
  features: Feature[]
}

export function FeaturesSection({ title, description, features }: FeaturesSectionProps) {
  return (
    <section className="py-16 bg-stone-50 md:py-24">
      <div className="container">
        <AnimatedSection animation="slide-up" className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">{title}</h2>
          {description && <p className="mt-4 text-muted-foreground">{description}</p>}
        </AnimatedSection>

        <AnimatedList className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 rounded-full bg-gch-blue/10 w-fit">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-serif font-semibold text-gch-gray">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </AnimatedList>
      </div>
    </section>
  )
}
