"use client"

import { useState } from "react"
import { 
  Save, 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "GCH Servicios",
    siteDescription: "Transformamos espacios con excelencia y profesionalismo",
    contactEmail: "contacto@gchservicios.com",
    contactPhone: "+56 9 1234 5678",
    address: "Santiago, Chile",
    companyName: "GCH Servicios Profesionales Ltda.",
    timezone: "America/Santiago",
    language: "es"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    orderUpdates: true,
    systemAlerts: true
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  })

  const handleSave = () => {
    toast.success("Configuración guardada exitosamente")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p className="text-gray-600">Administra la configuración general del sistema</p>
        </div>
        <Button onClick={handleSave} className="bg-gch-yellow text-black hover:bg-gch-yellow/90 shadow-lg">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Configuración General
            </CardTitle>
            <CardDescription className="text-gray-600">
              Información básica del sitio web
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Nombre del Sitio</Label>
              <Input
                value={generalSettings.siteName}
                onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                className="mt-1 bg-white/50 border-white/30 text-gray-900"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Descripción</Label>
              <Textarea
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                className="mt-1 bg-white/50 border-white/30 text-gray-900"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Email de Contacto</Label>
                <Input
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                  className="mt-1 bg-white/50 border-white/30 text-gray-900"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Teléfono</Label>
                <Input
                  value={generalSettings.contactPhone}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                  className="mt-1 bg-white/50 border-white/30 text-gray-900"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Dirección</Label>
              <Input
                value={generalSettings.address}
                onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                className="mt-1 bg-white/50 border-white/30 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Zona Horaria</Label>
                <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                  <SelectTrigger className="mt-1 bg-white/50 border-white/30 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 border-white/30">
                    <SelectItem value="America/Santiago">Santiago (GMT-3)</SelectItem>
                    <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                    <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Idioma</Label>
                <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}>
                  <SelectTrigger className="mt-1 bg-white/50 border-white/30 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 border-white/30">
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Información de la Empresa
            </CardTitle>
            <CardDescription className="text-gray-600">
              Datos legales y comerciales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Razón Social</Label>
              <Input
                value={generalSettings.companyName}
                onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                className="mt-1 bg-white/50 border-white/30 text-gray-900"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">RUT</Label>
                <Input
                  placeholder="12.345.678-9"
                  className="mt-1 bg-white/50 border-white/30 text-gray-900"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Giro</Label>
                <Input
                  placeholder="Construcción y remodelación"
                  className="mt-1 bg-white/50 border-white/30 text-gray-900"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Horarios de Atención</Label>
              <Input
                placeholder="Lunes a Viernes: 9:00 - 18:00"
                className="mt-1 bg-white/50 border-white/30 text-gray-900"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Redes Sociales</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <Input
                  placeholder="Instagram: @gchservicios"
                  className="bg-white/50 border-white/30 text-gray-900"
                />
                <Input
                  placeholder="Facebook: GCH Servicios"
                  className="bg-white/50 border-white/30 text-gray-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription className="text-gray-600">
              Configura cómo recibir notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Notificaciones por Email</Label>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Notificaciones SMS</Label>
              <Switch
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Emails de Marketing</Label>
              <Switch
                checked={notificationSettings.marketingEmails}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingEmails: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Actualizaciones de Pedidos</Label>
              <Switch
                checked={notificationSettings.orderUpdates}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderUpdates: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Alertas del Sistema</Label>
              <Switch
                checked={notificationSettings.systemAlerts}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-white/40 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Seguridad
            </CardTitle>
            <CardDescription className="text-gray-600">
              Configuración de seguridad y autenticación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm text-gray-600">Autenticación de Dos Factores</Label>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Tiempo de Sesión (minutos)</Label>
              <Select value={securitySettings.sessionTimeout.toString()} onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(value)})}>
                <SelectTrigger className="mt-1 bg-white/50 border-white/30 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/90 border-white/30">
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Expiración de Contraseña (días)</Label>
              <Select value={securitySettings.passwordExpiry.toString()} onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(value)})}>
                <SelectTrigger className="mt-1 bg-white/50 border-white/30 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/90 border-white/30">
                  <SelectItem value="30">30 días</SelectItem>
                  <SelectItem value="60">60 días</SelectItem>
                  <SelectItem value="90">90 días</SelectItem>
                  <SelectItem value="180">180 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Intentos de Login</Label>
              <Select value={securitySettings.loginAttempts.toString()} onValueChange={(value) => setSecuritySettings({...securitySettings, loginAttempts: parseInt(value)})}>
                <SelectTrigger className="mt-1 bg-white/50 border-white/30 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/90 border-white/30">
                  <SelectItem value="3">3 intentos</SelectItem>
                  <SelectItem value="5">5 intentos</SelectItem>
                  <SelectItem value="10">10 intentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 