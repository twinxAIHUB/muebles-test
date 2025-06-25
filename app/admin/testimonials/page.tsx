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
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  status: "active" | "inactive" | "pending"
  image: string
  createdAt: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  // Mock data
  useEffect(() => {
    setTestimonials([
      {
        id: 1,
        name: "María González",
        role: "CEO",
        company: "TechCorp",
        content: "Excelente servicio y profesionalismo. GCH transformó completamente nuestro espacio de trabajo con su expertise en diseño y construcción.",
        rating: 5,
        status: "active",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        createdAt: "2024-01-15"
      },
      {
        id: 2,
        name: "Carlos Rodríguez",
        role: "Director",
        company: "Inmobiliaria Premium",
        content: "La calidad del trabajo superó nuestras expectativas. Definitivamente los recomendaremos para futuros proyectos.",
        rating: 5,
        status: "active",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        createdAt: "2024-01-10"
      },
      {
        id: 3,
        name: "Ana Martínez",
        role: "Propietaria",
        company: "Restaurante El Buen Sabor",
        content: "GCH nos ayudó a crear el ambiente perfecto para nuestro restaurante. El resultado fue espectacular.",
        rating: 4,
        status: "pending",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        createdAt: "2024-01-05"
      }
    ])
  }, [])

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || testimonial.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleAddTestimonial = (testimonialData: Omit<Testimonial, "id" | "createdAt">) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: testimonials.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setTestimonials([...testimonials, newTestimonial])
    setIsAddDialogOpen(false)
    toast.success("Testimonio agregado exitosamente")
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
  }

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id))
    toast.success("Testimonio eliminado exitosamente")
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
            <TestimonialForm onSubmit={handleAddTestimonial} />
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTestimonials.map((testimonial) => (
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
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1 mb-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-xs text-gray-500">{testimonial.createdAt}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm line-clamp-4">{testimonial.content}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-white/50 border-white/30 text-gray-700 hover:bg-white/70">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button size="sm" variant="outline" className="bg-white/50 border-white/30 text-gray-700 hover:bg-white/70">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-white/50 border-white/30 text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TestimonialForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    status: "active",
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
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Cargo</label>
          <Input
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="mt-1 bg-white/50 border-white/30 text-gray-900"
            required
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
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Calificación</label>
          <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}>
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
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
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
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="bg-gch-yellow text-black hover:bg-gch-yellow/90">
          Guardar Testimonio
        </Button>
        <Button type="button" variant="outline" className="bg-white/50 border-white/30 text-gray-700 hover:bg-white/70">
          Cancelar
        </Button>
      </div>
    </form>
  )
} 