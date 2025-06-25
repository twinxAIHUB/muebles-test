"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PlusCircle, Upload, X } from "lucide-react"

export function AddProjectPanel() {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)

    // Simulación de carga
    setTimeout(() => {
      setUploading(false)
      setOpen(false)

      // Aquí iría la lógica real para guardar el proyecto
      // Por ahora solo mostramos un mensaje de éxito
      alert("Proyecto añadido correctamente")

      // Opcional: redirigir a la página de proyectos
      // router.push('/proyectos')
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gch-blue hover:bg-gch-blue/80 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Añadir Nuevo Proyecto</DialogTitle>
          <DialogDescription>Complete el formulario para añadir un nuevo proyecto a la galería.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Proyecto</Label>
              <Input id="title" placeholder="Ej: Remodelación de Cocina en Miraflores" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="furniture">Muebles</SelectItem>
                  <SelectItem value="bathroom">Baños</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describa el proyecto, incluyendo detalles sobre materiales, dimensiones, etc."
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Etiquetas (separadas por comas)</Label>
              <Input placeholder="Ej: Cocina, Moderno, Melamina" />
            </div>

            <div className="space-y-2">
              <Label>Imágenes del Proyecto</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageUpload}
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">Haga clic para seleccionar imágenes o arrastre y suelte aquí</p>
                  <p className="text-xs text-gray-400">PNG, JPG, WEBP hasta 5MB</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Imagen ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Cliente (opcional)</Label>
              <Input id="client" placeholder="Nombre del cliente o empresa" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input id="location" placeholder="Ej: Miraflores, Lima" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-gch-blue hover:bg-gch-blue/80 text-white" disabled={uploading}>
              {uploading ? "Guardando..." : "Guardar Proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
