"use client"

import { useState, useEffect } from "react"
import { 
  Building2, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardStats {
  totalProperties: number
  totalTestimonials: number
  totalViews: number
  monthlyGrowth: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalTestimonials: 0,
    totalViews: 0,
    monthlyGrowth: 0
  })

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalProperties: 24,
        totalTestimonials: 18,
        totalViews: 15420,
        monthlyGrowth: 12.5
      })
    }, 1000)
  }, [])

  const statCards = [
    {
      title: "Propiedades",
      value: stats.totalProperties,
      description: "Total de propiedades",
      icon: Building2,
      color: "bg-gch-blue",
      change: "+2 este mes",
      changeType: "positive" as const
    },
    {
      title: "Testimonios",
      value: stats.totalTestimonials,
      description: "Testimonios activos",
      icon: MessageSquare,
      color: "bg-green-500",
      change: "+3 este mes",
      changeType: "positive" as const
    },
    {
      title: "Visitas",
      value: stats.totalViews.toLocaleString(),
      description: "Visitas totales",
      icon: Eye,
      color: "bg-sky-500",
      change: "+12.5%",
      changeType: "positive" as const
    },
    {
      title: "Crecimiento",
      value: `${stats.monthlyGrowth}%`,
      description: "Crecimiento mensual",
      icon: TrendingUp,
      color: "bg-gch-yellow",
      change: "+2.3%",
      changeType: "positive" as const
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "property",
      title: "Nueva propiedad agregada",
      description: "Casa de lujo en Las Condes",
      time: "Hace 2 horas"
    },
    {
      id: 2,
      type: "testimonial",
      title: "Testimonio publicado",
      description: "Cliente satisfecho - María González",
      time: "Hace 4 horas"
    },
    {
      id: 3,
      type: "hero",
      title: "Video del hero actualizado",
      description: "Nuevo video de fondo subido",
      time: "Hace 1 día"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al panel de administración de GCH Servicios</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600">{stat.description}</p>
              <div className="flex items-center mt-2">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs ml-1 ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gray-900">Actividad Reciente</CardTitle>
            <CardDescription className="text-gray-600">
              Últimas acciones realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gch-yellow rounded-full mt-2 shadow-sm"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-gray-900">Acciones Rápidas</CardTitle>
            <CardDescription className="text-gray-600">
              Acciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start bg-white/50 border-white/30 text-gray-700 hover:bg-white/70 hover:border-white/50 shadow-sm"
              >
                <Link href="/admin/properties">
                  <Building2 className="mr-2 h-4 w-4" />
                  Gestionar Propiedades
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start bg-white/50 border-white/30 text-gray-700 hover:bg-white/70 hover:border-white/50 shadow-sm"
              >
                <Link href="/admin/testimonials">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Gestionar Testimonios
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start bg-white/50 border-white/30 text-gray-700 hover:bg-white/70 hover:border-white/50 shadow-sm"
              >
                <Link href="/admin/hero">
                  <Eye className="mr-2 h-4 w-4" />
                  Editar Hero Video
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-gray-900">Estado del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Servidor</p>
                <p className="text-xs text-gray-600">Operativo</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Base de Datos</p>
                <p className="text-xs text-gray-600">Conectado</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Almacenamiento</p>
                <p className="text-xs text-gray-600">75% disponible</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}