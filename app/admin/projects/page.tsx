"use client"

import { useState, useEffect } from "react"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Package,
  Calendar,
  Loader2,
  Tag
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { projectsService, type Project, uploadService } from "@/lib/database"

const mainCategories = ['Residencial', 'Comercial'] as const;
const subCategories = ['Muebles de Melamina', 'Puertas de Ducha', 'Decoración', 'Remodelación'] as const;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<{ mainCategory: string, subCategory: string }>({ mainCategory: 'all', subCategory: 'all' })
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const fetchedProjects = await projectsService.getAll()
      setProjects(fetchedProjects as Project[])
      setError(null)
    } catch (err) {
      setError("Failed to fetch projects.")
      toast.error("Failed to fetch projects.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleSearchAndFilter = async () => {
    try {
      setLoading(true);
      const searchFilters = {
        mainCategory: filters.mainCategory !== 'all' ? filters.mainCategory : undefined,
        subCategory: filters.subCategory !== 'all' ? filters.subCategory : undefined,
        search: searchTerm,
      }
      const fetchedProjects = await projectsService.getAll(searchFilters);
      setProjects(fetchedProjects as Project[]);
      setError(null);
    } catch (err) {
      setError("Failed to filter projects.");
      toast.error("Failed to filter projects.");
    } finally {
      setLoading(false);
    }
  }

  const handleFormSubmit = async (formData: { title: string; description: string; main_category: Project['main_category']; sub_category: Project['sub_category']; images: string[]; tags: string[] }) => {
    try {
      if (editingProject) {
        await projectsService.update(editingProject.id!, formData)
        toast.success("Proyecto actualizado exitosamente")
      } else {
        await projectsService.create(formData)
        toast.success("Proyecto agregado exitosamente")
      }
      setIsFormOpen(false)
      setEditingProject(null)
      fetchProjects()
    } catch (error) {
      toast.error("Error al guardar el proyecto")
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }
  
  const handleAddNew = () => {
    setEditingProject(null)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if(window.confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
      try {
        await projectsService.delete(id)
        toast.success("Proyecto eliminado exitosamente")
        fetchProjects()
      } catch (error) {
        toast.error("Error al eliminar el proyecto")
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestionar Proyectos</h1>
          <p className="text-gray-600">Administra el portafolio de proyectos ({projects.length} en total)</p>
        </div>
        <Button onClick={handleAddNew} className="bg-gch-yellow text-black hover:bg-gch-yellow/90 shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Proyecto
        </Button>
      </div>

      <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative sm:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por título, descripción, etiquetas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 border-white/30 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <Select value={filters.mainCategory} onValueChange={(value) => setFilters(f => ({...f, mainCategory: value}))}>
              <SelectTrigger className="w-full bg-white/50 border-white/30 text-gray-900">
                <SelectValue placeholder="Categoría Principal" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 border-white/30">
                <SelectItem value="all">Todas las Principales</SelectItem>
                {mainCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filters.subCategory} onValueChange={(value) => setFilters(f => ({...f, subCategory: value}))}>
              <SelectTrigger className="w-full bg-white/50 border-white/30 text-gray-900">
                <SelectValue placeholder="Sub-categoría" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 border-white/30">
                <SelectItem value="all">Todas las Sub-categorías</SelectItem>
                {subCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleSearchAndFilter} className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-gch-blue" />
        </div>
      ) : error ? (
        <div className="text-center py-16 text-red-500 bg-red-50 rounded-lg">
          <p>{error}</p>
          <Button onClick={fetchProjects} className="mt-4">Reintentar</Button>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay proyectos</h3>
          <p className="mt-1 text-sm text-gray-500">Comienza agregando un nuevo proyecto.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-gray-900 text-lg">{project.title}</CardTitle>
                    <CardDescription className="text-gray-600 flex items-center text-sm">
                      {project.main_category} / {project.sub_category}
                    </CardDescription>
                  </div>
                  <Badge className="bg-gch-blue text-white text-xs">{new Date(project.created_at).toLocaleDateString()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow flex flex-col">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={project.images[0] || 'https://via.placeholder.com/400x300'} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-700 text-sm line-clamp-2 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-white/50 border-white/30 text-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <div className="flex gap-2 p-4 pt-0">
                  <Button onClick={() => handleEdit(project)} size="sm" variant="outline" className="flex-1 bg-white/50 border-white/30 text-gray-700 hover:bg-white/70">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button onClick={() => handleDelete(project.id!)} size="sm" variant="destructive" className="bg-red-500/80 text-white hover:bg-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">{editingProject ? "Editar Proyecto" : "Agregar Nuevo Proyecto"}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {editingProject ? "Actualiza la información del proyecto" : "Completa la información del nuevo proyecto"}
            </DialogDescription>
          </DialogHeader>
          <ProjectForm onSubmit={handleFormSubmit} project={editingProject} onClose={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProjectForm({ 
  onSubmit, 
  project,
  onClose
}: { 
  onSubmit: (data: { title: string; description: string; main_category: Project['main_category']; sub_category: Project['sub_category']; images: string[]; tags: string[] }) => void, 
  project: Project | null,
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainCategory: 'Residencial' as typeof mainCategories[number],
    subCategory: 'Muebles de Melamina' as typeof subCategories[number],
    images: [] as string[],
    tags: [] as string[],
  })
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        mainCategory: (project as any).main_category,
        subCategory: (project as any).sub_category,
        images: project.images || [],
        tags: project.tags || [],
      })
    } else {
      setFormData({
        title: '',
        description: '',
        mainCategory: 'Residencial',
        subCategory: 'Muebles de Melamina',
        images: [],
        tags: [],
      })
    }
  }, [project])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMainCategoryChange = (value: typeof mainCategories[number]) => {
    setFormData(prev => ({ ...prev, mainCategory: value }))
  }
  const handleSubCategoryChange = (value: typeof subCategories[number]) => {
    setFormData(prev => ({ ...prev, subCategory: value }))
  }

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(f => f.trim()) }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const uploadPromises = Array.from(files).map(file => 
      uploadService.uploadImage(file, `projects/${Date.now()}_${file.name}`)
    );

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      toast.success(`${files.length} imagen(es) subida(s) con éxito`);
    } catch (error) {
      toast.error("Error al subir las imágenes");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  }

  const handleRemoveImage = async (imageUrlToRemove: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return;

    try {
      await uploadService.deleteFile(imageUrlToRemove);
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter(url => url !== imageUrlToRemove)
      }));
      toast.success("Imagen eliminada");
    } catch (error) {
      toast.error("Error al eliminar la imagen");
      console.error(error);
    }
  }

  const setHighlightImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      images: [imageUrl, ...prev.images.filter(url => url !== imageUrl)]
    }));
    toast.info("Imagen destacada actualizada");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUploading) {
      toast.warning("Por favor, espera a que terminen de subirse las imágenes.");
      return;
    }
    // Map camelCase to snake_case for submission
    const mappedData = {
      title: formData.title,
      description: formData.description,
      main_category: formData.mainCategory,
      sub_category: formData.subCategory,
      images: formData.images,
      tags: formData.tags,
    };
    onSubmit(mappedData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Título del Proyecto</label>
        <Input name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Descripción</label>
        <Textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Categoría Principal</label>
          <Select value={formData.mainCategory} onValueChange={handleMainCategoryChange}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              {mainCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sub-categoría</label>
          <Select value={formData.subCategory} onValueChange={handleSubCategoryChange}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              {subCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2 col-span-2">
          <label className="text-sm font-medium text-gray-700">Etiquetas (separadas por comas)</label>
          <Input name="tags" value={formData.tags.join(', ')} onChange={handleTagsChange} />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Imágenes del Proyecto</label>
        <div className="p-4 bg-white/50 border border-dashed border-white/30 rounded-lg">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {formData.images.map((url, index) => (
              <div key={url} className="relative group aspect-square">
                <img src={url} alt={`Project image ${index + 1}`} className="w-full h-full object-cover rounded-md shadow-sm"/>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center gap-1">
                  <Button type="button" size="icon" variant="destructive" className="h-7 w-7" onClick={() => handleRemoveImage(url)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button type="button" size="icon" variant="default" className="h-7 w-7 bg-gch-yellow text-black hover:bg-gch-yellow/80" onClick={() => setHighlightImage(url)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute top-1 right-1 bg-gch-yellow text-black px-1.5 py-0.5 rounded-full text-xs font-bold">
                    Principal
                  </div>
                )}
              </div>
            ))}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-white/30 transition-colors">
              {isUploading ? (
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              ) : (
                <Plus className="h-6 w-6 text-gray-500" />
              )}
              <span className="mt-1 text-xs text-center text-gray-600">Agregar</span>
              <input type="file" multiple onChange={handleImageUpload} className="hidden" disabled={isUploading} />
            </label>
          </div>
        </div>
        <p className="text-xs text-gray-600">La primera imagen es la destacada (principal).</p>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button type="submit" className="bg-gch-blue text-white">Guardar Proyecto</Button>
      </div>
    </form>
  )
} 