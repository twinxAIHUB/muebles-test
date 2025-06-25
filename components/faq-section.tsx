"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title: string
  description?: string
  faqs: FAQItem[]
  className?: string
}

export function FAQSection({ title, description, faqs, className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={cn("py-16 md:py-24 bg-stone-50", className)}>
      <div className="container">
        <AnimatedSection animation="slide-up" className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gch-gray">{title}</h2>
          {description && <p className="mt-4 text-muted-foreground">{description}</p>}
        </AnimatedSection>

        <div className="mt-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection
              key={index}
              animation="fade"
              delay={index * 0.1}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="flex items-center justify-between w-full p-6 text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-medium text-lg text-gch-gray">{faq.question}</h3>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gch-blue transition-transform duration-200",
                    openIndex === index ? "transform rotate-180" : "",
                  )}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={cn(
                  "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-96 pb-6" : "max-h-0",
                )}
              >
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
