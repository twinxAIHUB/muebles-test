"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { 
  LayoutDashboard, 
  MessageSquare, 
  Video, 
  Settings, 
  LogOut,
  Menu,
  X,
  User,
  Users,
  Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading, signOut, isAuthenticated, isAdmin } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return; // Do nothing while loading

    // If user is authenticated
    if (isAuthenticated && isAdmin) {
      // If they are on the login page, redirect to dashboard
      if (pathname === '/admin/login') {
        router.push('/admin');
      }
    } else {
      // If user is not authenticated and not on the login page, redirect to login
      if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    }
  }, [loading, isAuthenticated, isAdmin, pathname, router]);

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
        </div>
      </ThemeProvider>
    )
  }

  // If not authenticated or not admin, show children (which should be login page)
  if (!isAuthenticated || !isAdmin) {
    // Return children (login page) without the full layout
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster position="top-right" theme="light" />
      </ThemeProvider>
    )
  }

  // If we get here, user is authenticated and is admin
  console.log('User authenticated and is admin, showing admin layout')

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Proyectos", href: "/admin/projects", icon: Briefcase },
    { name: "Testimonios", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Hero Video", href: "/admin/hero", icon: Video },
    { name: "Admins", href: "/admin/admins", icon: Users },
    { name: "Configuración", href: "/admin/settings", icon: Settings },
  ]

  const currentPage = navigation.find((item) => item.href === pathname)
  const userInitials = user?.adminData?.name?.split(' ').map(n => n[0]).join('') || user?.displayName?.split(' ').map(n => n[0]).join('') || 'A';

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full w-64 transform flex-col border-r border-white/20 bg-white/30 backdrop-blur-xl shadow-xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/20 px-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-yellow-500">
                <span className="text-sm font-bold text-white">GCH</span>
              </div>
              <span className="text-lg font-semibold text-slate-900">Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-700 hover:bg-white/20 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user?.photoURL || ''} alt="User Avatar" />
                      <AvatarFallback className="bg-blue-500 text-white text-xs font-bold">{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.adminData?.name || user?.displayName || 'Administrador'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "border border-blue-500/30 bg-blue-500/20 text-blue-600 shadow-lg"
                      : "text-slate-700 hover:bg-white/20 hover:text-slate-900"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-white/20 p-4">
            <p className="text-center text-xs text-slate-600">
              © {new Date().getFullYear()} GCH Servicios
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Floating mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="fixed top-4 left-4 z-40 lg:hidden bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg hover:bg-white/90"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page content */}
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="top-right" theme="light" />
    </ThemeProvider>
  )
} 