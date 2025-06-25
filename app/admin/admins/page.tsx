'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { adminService, type AdminUser } from '@/lib/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, Users, Shield, Edit, Trash2, Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function AdminsPage() {
  const { user } = useAuth()
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null)
  
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'admin' as 'super_admin' | 'admin' | 'editor',
    password: ''
  })

  const [editAdmin, setEditAdmin] = useState({
    name: '',
    role: 'admin' as 'super_admin' | 'admin' | 'editor',
    isActive: true
  })

  useEffect(() => {
    loadAdmins()
  }, [])

  const loadAdmins = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await adminService.getAll()
      setAdmins(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load admins')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError(null)
      // Note: In a real app, you'd need to implement password creation
      // For now, we'll just create the admin record
      const adminData: Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'> = {
        uid: `temp_${Date.now()}`, // This should be the actual Firebase UID
        email: newAdmin.email,
        name: newAdmin.name,
        role: newAdmin.role,
        isActive: true,
        lastLogin: new Date().toISOString()
      }
      
      await adminService.create(adminData)
      setIsCreateDialogOpen(false)
      setNewAdmin({ name: '', email: '', role: 'admin', password: '' })
      loadAdmins()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create admin')
    }
  }

  const handleEditAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAdmin) return
    
    try {
      setError(null)
      await adminService.update(selectedAdmin.id!, editAdmin)
      setIsEditDialogOpen(false)
      setSelectedAdmin(null)
      setEditAdmin({ name: '', role: 'admin', isActive: true })
      loadAdmins()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update admin')
    }
  }

  const handleDeleteAdmin = async (adminId: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return
    
    try {
      setError(null)
      await adminService.delete(adminId)
      loadAdmins()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete admin')
    }
  }

  const openEditDialog = (admin: AdminUser) => {
    setSelectedAdmin(admin)
    setEditAdmin({
      name: admin.name,
      role: admin.role,
      isActive: admin.isActive
    })
    setIsEditDialogOpen(true)
  }

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || admin.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800'
      case 'admin': return 'bg-blue-100 text-blue-800'
      case 'editor': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return '👑'
      case 'admin': return '🛡️'
      case 'editor': return '✏️'
      default: return '👤'
    }
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-xl">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Access Denied</h2>
            <p className="text-slate-600">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Admin Management
            </h1>
            <p className="text-slate-600 mt-2">Manage admin accounts and permissions</p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="backdrop-blur-sm bg-white/90 border-white/20">
              <DialogHeader>
                <DialogTitle>Create New Admin</DialogTitle>
                <DialogDescription>
                  Add a new administrator to the system
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    required
                    className="bg-white/50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    required
                    className="bg-white/50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newAdmin.role} onValueChange={(value: any) => setNewAdmin({ ...newAdmin, role: value })}>
                    <SelectTrigger className="bg-white/50 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    required
                    className="bg-white/50 border-slate-200"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
                    Create Admin
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium text-slate-700 mb-2 block">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/50 border-slate-200"
                  />
                </div>
              </div>
              <div className="w-48">
                <Label htmlFor="role-filter" className="text-sm font-medium text-slate-700 mb-2 block">
                  Role
                </Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="bg-white/50 border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Admins List */}
        {loading ? (
          <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg">
            <CardContent className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-slate-600">Loading admins...</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAdmins.map((admin) => (
              <Card key={admin.id} className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-semibold">
                        {admin.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-800">{admin.name}</CardTitle>
                        <CardDescription className="text-slate-600">{admin.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRoleBadgeColor(admin.role)}>
                        <span className="mr-1">{getRoleIcon(admin.role)}</span>
                        {admin.role.replace('_', ' ')}
                      </Badge>
                      <Badge variant={admin.isActive ? "default" : "secondary"}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm text-slate-600">
                    <div>Created: {new Date(admin.createdAt).toLocaleDateString()}</div>
                    <div>Last Login: {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(admin)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteAdmin(admin.id!)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredAdmins.length === 0 && (
          <Card className="backdrop-blur-sm bg-white/70 border-white/20 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No admins found</h3>
              <p className="text-slate-600">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="backdrop-blur-sm bg-white/90 border-white/20">
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>
            <DialogDescription>
              Update admin information and permissions
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={editAdmin.name}
                onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
                required
                className="bg-white/50 border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={editAdmin.role} onValueChange={(value: any) => setEditAdmin({ ...editAdmin, role: value })}>
                <SelectTrigger className="bg-white/50 border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is-active"
                checked={editAdmin.isActive}
                onChange={(e) => setEditAdmin({ ...editAdmin, isActive: e.target.checked })}
                className="rounded border-slate-300"
              />
              <Label htmlFor="is-active">Active</Label>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
                Update Admin
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 