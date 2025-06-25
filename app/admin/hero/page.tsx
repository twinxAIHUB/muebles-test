"use client"

import { useState } from "react"
import { 
  Upload, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Settings,
  Save,
  RotateCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"

export default function HeroPage() {
  const [videoUrl, setVideoUrl] = useState("https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4")
  const [title, setTitle] = useState("GCH Servicios")
  const [subtitle, setSubtitle] = useState("Transformamos espacios con excelencia y profesionalismo")
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState([50])
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSave = () => {
    toast.success("Configuración del hero guardada exitosamente")
  }

  const handleReset = () => {
    setTitle("GCH Servicios")
    setSubtitle("Transformamos espacios con excelencia y profesionalismo")
    setIsAutoplay(true)
    setIsMuted(true)
    setVolume([50])
    toast.success("Configuración restaurada")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurar Hero Video</h1>
        <p className="text-gray-600">Personaliza el video de fondo y contenido del hero</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Video Preview */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900">Vista Previa</CardTitle>
            <CardDescription className="text-gray-600">
              Cómo se verá el hero en el sitio web
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                autoPlay={isAutoplay}
                muted={isMuted}
                loop
                controls
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <p className="text-lg">{subtitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-white/50 border-white/30 text-gray-700 hover:bg-white/70"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsMuted(!isMuted)}
                  className="bg-white/50 border-white/30 text-gray-700 hover:bg-white/70"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-24"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900">Configuración</CardTitle>
            <CardDescription className="text-gray-600">
              Ajusta el contenido y comportamiento del hero
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video URL */}
            <div>
              <Label className="text-sm font-medium text-gray-700">URL del Video</Label>
              <div className="mt-2">
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://ejemplo.com/video.mp4"
                  className="bg-white/50 border-white/30 text-gray-900"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Asegúrate de que el video sea de alta calidad y esté optimizado para web
              </p>
            </div>

            {/* Title */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Título Principal</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del hero"
                className="mt-2 bg-white/50 border-white/30 text-gray-900"
              />
            </div>

            {/* Subtitle */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Subtítulo</Label>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Descripción o subtítulo"
                className="mt-2 bg-white/50 border-white/30 text-gray-900"
              />
            </div>

            {/* Video Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Configuración del Video</h4>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-600">Reproducción automática</Label>
                <Switch
                  checked={isAutoplay}
                  onCheckedChange={setIsAutoplay}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-600">Silenciado por defecto</Label>
                <Switch
                  checked={isMuted}
                  onCheckedChange={setIsMuted}
                />
              </div>

              <div>
                <Label className="text-sm text-gray-600">Volumen por defecto</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <VolumeX className="h-4 w-4 text-gray-500" />
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Volume2 className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="bg-gch-yellow text-black hover:bg-gch-yellow/90">
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="bg-white/50 border-white/30 text-gray-700 hover:bg-white/70"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Restaurar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-900">Subir Nuevo Video</CardTitle>
          <CardDescription className="text-gray-600">
            Reemplaza el video actual con uno nuevo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Subir Video</h3>
            <p className="text-gray-600 mb-4">
              Arrastra y suelta tu archivo de video aquí, o haz clic para seleccionar
            </p>
            <Button className="bg-gch-yellow text-black hover:bg-gch-yellow/90">
              Seleccionar Archivo
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Formatos soportados: MP4, WebM, OGV. Tamaño máximo: 50MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 