import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"

interface CTASectionProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}

export function CTASection({ title, description, buttonText, buttonLink }: CTASectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-gch-blue/5 to-gch-blue/15 md:py-24">
      <div className="container">
        <AnimatedSection animation="fade" className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          <Button
            className="mt-8 bg-gch-yellow hover:bg-gch-blue text-black button-hover hover:shadow-gch-blue/20"
            size="lg"
            asChild
          >
            <a href={buttonLink}>{buttonText}</a>
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
