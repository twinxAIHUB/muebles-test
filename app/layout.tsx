import type React from "react"
import "@/app/globals.css"
import { Inter, Playfair_Display } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata = {
  title: "Muebles de Melamina y Diseño Interior de Lujo en Perú - LuxMuebles",
  description:
    "Diseños exclusivos en muebles de melamina, puertas de ducha, decoración y servicios de remodelación de interiores para hogares y proyectos comerciales en Perú.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground`}>
          {children}
      </body>
    </html>
  )
}
