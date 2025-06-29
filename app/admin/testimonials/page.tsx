"use client"

import { useState, useEffect } from "react"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Star, 
  User,
  MessageSquare,
  Calendar,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { testimonialsService } from "@/lib/database-supabase"
import type { Testimonial } from "@/lib/database-supabase"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch testimonials from database
  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true)
      const filters: { status?: string; search?: string } = {}
      
      if (filterStatus !== "all") {
        filters.status = filterStatus
      }
      
      if (searchTerm) {
        filters.search = searchTerm
      }
      
      const data = await testimonialsService.getAll(filters)
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast.error("Error al cargar los testimonios")
    } finally {
      setIsLoading(false)
    }
  }

  // Refetch when filters change
  useEffect(() => {
    fetchTestimonials()
  }, [filterStatus, searchTerm])

  const handleAddTestimonial = async (testimonialData: Omit<Testimonial, "id" | "created_at" | "updated_at">) => {
    try {
      setIsSubmitting(true)
      await testimonialsService.create(testimonialData)
      await fetchTestimonials() // Refetch to get updated data
      setIsAddDialogOpen(false)
      toast.success("Testimonio agregado exitosamente")
    } catch (error) {
      console.error('Error adding testimonial:', error)
      toast.error("Error al agregar el testimonio")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
  }

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await testimonialsService.delete(id)
      await fetchTestimonials() // Refetch to get updated data
      toast.success("Testimonio eliminado exitosamente")
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast.error("Error al eliminar el testimonio")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "pending": return "bg-yellow-500"
      case "inactive": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-gch-yellow fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gch-blue" />
        <span className="ml-2 text-gray-600">Cargando testimonios...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestionar Testimonios</h1>
          <p className="text-gray-600">Administra los testimonios de clientes</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gch-yellow text-black hover:bg-gch-yellow/90 shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Testimonio
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Agregar Nuevo Testimonio</DialogTitle>
              <DialogDescription className="text-gray-600">
                Completa la información del testimonio
              </DialogDescription>
            </DialogHeader>
            <TestimonialForm onSubmit={handleAddTestimonial} isSubmitting={isSubmitting} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar testimonios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48 bg-white/50 border-white/30 text-gray-900">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 border-white/30">
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials Grid */}
      {testimonials.length === 0 ? (
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
          <CardContent className="pt-12 pb-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay testimonios</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "No se encontraron testimonios con los filtros aplicados"
                : "Aún no se han agregado testimonios. ¡Agrega el primero!"
              }
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gch-yellow text-black hover:bg-gch-yellow/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Primer Testimonio
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-gray-900 text-lg">{testimonial.name}</CardTitle>
                    <CardDescription className="text-gray-600">{testimonial.role} en {testimonial.company}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(testimonial.status)} text-white`}>
                    {testimonial.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(testimonial.created_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm line-clamp-4">{testimonial.content}</p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-white/50 border-white/30 text-gray-700 hover:bg-white/70">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/50 border-white/30 text-gray-700 hover:bg-white/70"
                    onClick={() => handleEditTestimonial(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/50 border-white/30 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function TestimonialForm({ onSubmit, isSubmitting }: { onSubmit: (data: any) => void; isSubmitting: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    status: "active" as "active" | "inactive" | "pending",
    image: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Nombre</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="mt-1 bg-white/50 border-white/30 text-gray-900"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Cargo</label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="mt-1 bg-white/50 border-white/30 text-gray-900"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Empresa</label>
        <Input
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          className="mt-1 bg-white/50 border-white/30 text-gray-900"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Testimonio</label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          className="mt-1 bg-white/50 border-white/30 text-gray-900"
          rows={4}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Calificación</label>
          <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})} disabled={isSubmitting}>
            <SelectTrigger className="mt-1 bg-white/50 border-white/30 text-gray-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/90 border-white/30">
              <SelectItem value="5">5 estrellas</SelectItem>
              <SelectItem value="4">4 estrellas</SelectItem>
              <SelectItem value="3">3 estrellas</SelectItem>
              <SelectItem value="2">2 estrellas</SelectItem>
              <SelectItem value="1">1 estrella</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Estado</label>
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as "active" | "inactive" | "pending"})} disabled={isSubmitting}>
            <SelectTrigger className="mt-1 bg-white/50 border-white/30 text-gray-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/90 border-white/30">
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">URL de imagen</label>
          <Input
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="mt-1 bg-white/50 border-white/30 text-gray-900"
            placeholder="https://..."
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="bg-gch-yellow text-black hover:bg-gch-yellow/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar Testimonio"
          )}
        </Button>
        <Button type="button" variant="outline" className="bg-white/50 border-white/30 text-gray-700 hover:bg-white/70" disabled={isSubmitting}>
          Cancelar
        </Button>
      </div>
    </form>
  )
} 