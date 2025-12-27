import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  Eye,
  Mail,
  Phone,
  Calendar,
  Clock,
  Activity,
  Key,
  Lock,
  UserCog,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "operator" | "verifikator";
  status: "active" | "inactive";
  lastLogin: string;
  joinDate: string;
  permissions: string[];
  notes?: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    phone: string;
    role: "admin" | "operator" | "verifikator";
    permissions: string[];
    notes: string;
  }>({
    name: "",
    email: "",
    phone: "",
    role: "operator",
    permissions: [],
    notes: "",
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: "USR001",
      name: "Dr. Siti Nurhaliza",
      email: "siti.nurhaliza@sekolah.id",
      phone: "08123456789",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      joinDate: "2023-08-01",
      permissions: ["all"],
    },
    {
      id: "USR002",
      name: "Ahmad Fauzi, S.Pd",
      email: "ahmad.fauzi@sekolah.id",
      phone: "08123456790",
      role: "operator",
      status: "active",
      lastLogin: "2024-01-15 14:20",
      joinDate: "2023-09-15",
      permissions: ["applications", "documents", "announcements"],
    },
    {
      id: "USR003",
      name: "Rina Kartika",
      email: "rina.kartika@sekolah.id",
      phone: "08123456791",
      role: "verifikator",
      status: "inactive",
      lastLogin: "2024-01-10 11:45",
      joinDate: "2023-10-01",
      permissions: ["documents", "verification"],
    },
    {
      id: "USR004",
      name: "Budi Santoso",
      email: "budi.santoso@sekolah.id",
      phone: "08123456792",
      role: "operator",
      status: "active",
      lastLogin: "2024-01-14 16:30",
      joinDate: "2023-11-01",
      permissions: ["applications", "students"],
    },
    {
      id: "USR005",
      name: "Maya Indah",
      email: "maya.indah@sekolah.id",
      phone: "08123456793",
      role: "verifikator",
      status: "active",
      lastLogin: "2024-01-15 08:00",
      joinDate: "2023-12-01",
      permissions: ["documents", "verification"],
    },
  ]);

  const permissionOptions = [
    { id: "applications", label: "Kelola Pendaftaran" },
    { id: "students", label: "Data Calon Siswa" },
    { id: "documents", label: "Verifikasi Dokumen" },
    { id: "announcements", label: "Pengumuman" },
    { id: "schedule", label: "Jadwal Kegiatan" },
    { id: "reports", label: "Laporan" },
    { id: "users", label: "Kelola Pengguna" },
    { id: "settings", label: "Pengaturan Sistem" },
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: { color: "bg-red-100 text-red-800 border-red-200", label: "Admin", icon: Shield },
      operator: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Operator", icon: UserCog },
      verifikator: { color: "bg-green-100 text-green-800 border-green-200", label: "Verifikator", icon: CheckCircle },
    };
    return variants[role as keyof typeof variants] || variants.operator;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { color: "bg-green-100 text-green-800 border-green-200", label: "Aktif" },
      inactive: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Tidak Aktif" },
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = [
    { label: "Total Pengguna", value: users.length, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Admin", value: users.filter(u => u.role === "admin").length, icon: Shield, color: "bg-red-100 text-red-600" },
    { label: "Operator", value: users.filter(u => u.role === "operator").length, icon: UserCog, color: "bg-purple-100 text-purple-600" },
    { label: "Aktif", value: users.filter(u => u.status === "active").length, icon: Activity, color: "bg-green-100 text-green-600" },
  ];

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
    toast({
      title: "Status Pengguna Diperbarui",
      description: "Status pengguna berhasil diubah",
    });
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Nama dan email harus diisi",
        variant: "destructive",
      });
      return;
    }

    const user: User = {
      id: `USR${String(users.length + 1).padStart(3, '0')}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: "active",
      lastLogin: "-",
      joinDate: new Date().toISOString().split('T')[0],
      permissions: newUser.role === "admin" ? ["all"] : newUser.permissions,
      notes: newUser.notes,
    };

    setUsers([...users, user]);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "operator",
      permissions: [],
      notes: "",
    });
    setIsCreateOpen(false);
    
    toast({
      title: "Pengguna Ditambahkan",
      description: `${user.name} berhasil ditambahkan sebagai ${getRoleBadge(user.role).label}`,
    });
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      toast({
        title: "Pengguna Dihapus",
        description: `${userToDelete.name} berhasil dihapus dari sistem`,
      });
      setUserToDelete(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleResetPassword = (user: User) => {
    toast({
      title: "Reset Password",
      description: `Link reset password telah dikirim ke ${user.email}`,
    });
  };

  const togglePermission = (permissionId: string) => {
    setNewUser(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Kelola Pengguna</h2>
          <p className="text-muted-foreground">Manajemen pengguna dan hak akses sistem PPDB</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Buat akun pengguna baru untuk sistem PPDB
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="info" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Informasi Dasar</TabsTrigger>
                <TabsTrigger value="permissions">Hak Akses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input 
                      id="name" 
                      placeholder="Masukkan nama lengkap"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@sekolah.id"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon</Label>
                    <Input 
                      id="phone" 
                      placeholder="08123456789"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Peran *</Label>
                    <Select 
                      value={newUser.role}
                      onValueChange={(v) => setNewUser({...newUser, role: v as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="operator">Operator</SelectItem>
                        <SelectItem value="verifikator">Verifikator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Catatan tambahan tentang pengguna ini..."
                    value={newUser.notes}
                    onChange={(e) => setNewUser({...newUser, notes: e.target.value})}
                  />
                </div>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4 mt-4">
                {newUser.role === "admin" ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="font-medium">Admin memiliki akses penuh ke seluruh sistem</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Pilih modul yang dapat diakses oleh pengguna ini
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {permissionOptions.map(permission => (
                        <div 
                          key={permission.id}
                          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                            newUser.permissions.includes(permission.id) 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:bg-muted/30'
                          }`}
                          onClick={() => togglePermission(permission.id)}
                        >
                          <Switch 
                            checked={newUser.permissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                            className="mr-3"
                          />
                          <span className="text-sm">{permission.label}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Batal</Button>
              <Button onClick={handleCreateUser}>Buat Pengguna</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User List */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Daftar Pengguna</CardTitle>
              <CardDescription>Total {filteredUsers.length} pengguna</CardDescription>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Peran</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="operator">Operator</SelectItem>
                <SelectItem value="verifikator">Verifikator</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Tidak ada pengguna ditemukan</p>
              </div>
            ) : (
              filteredUsers.map((user) => {
                const RoleIcon = getRoleBadge(user.role).icon;
                return (
                  <div key={user.id} className="flex items-center p-4 bg-muted/20 rounded-xl hover:bg-muted/40 transition-colors">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 ml-4">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="font-semibold">{user.name}</h4>
                        <Badge className={`${getRoleBadge(user.role).color} border flex items-center gap-1`}>
                          <RoleIcon className="h-3 w-3" />
                          {getRoleBadge(user.role).label}
                        </Badge>
                        <Badge className={`${getStatusBadge(user.status).color} border`}>
                          {getStatusBadge(user.status).label}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Login terakhir: {user.lastLogin}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Lihat Detail"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Reset Password"
                        onClick={() => handleResetPassword(user)}
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleToggleStatus(user.id)}
                        title={user.status === "active" ? "Nonaktifkan" : "Aktifkan"}
                      >
                        {user.status === "active" ? (
                          <Shield className="h-4 w-4 text-orange-600" />
                        ) : (
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700" 
                        title="Hapus"
                        onClick={() => {
                          setUserToDelete(user);
                          setIsDeleteConfirmOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* User Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-lg">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block">{selectedUser.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">{selectedUser.email}</span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="flex gap-2">
                  <Badge className={`${getRoleBadge(selectedUser.role).color} border`}>
                    {getRoleBadge(selectedUser.role).label}
                  </Badge>
                  <Badge className={`${getStatusBadge(selectedUser.status).color} border`}>
                    {getStatusBadge(selectedUser.status).label}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ID Pengguna</p>
                    <p className="font-medium">{selectedUser.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Telepon</p>
                    <p className="font-medium">{selectedUser.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Bergabung</p>
                    <p className="font-medium">{selectedUser.joinDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Login Terakhir</p>
                    <p className="font-medium">{selectedUser.lastLogin}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Hak Akses</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.includes("all") ? (
                      <Badge variant="outline" className="bg-yellow-50">Akses Penuh</Badge>
                    ) : (
                      selectedUser.permissions.map(p => (
                        <Badge key={p} variant="outline">{permissionOptions.find(o => o.id === p)?.label || p}</Badge>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => handleResetPassword(selectedUser)}>
                    <Key className="h-4 w-4 mr-2" />
                    Reset Password
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleToggleStatus(selectedUser.id)}
                  >
                    {selectedUser.status === "active" ? (
                      <>
                        <XCircle className="h-4 w-4 mr-2" />
                        Nonaktifkan
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Aktifkan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Konfirmasi Hapus
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus pengguna <strong>{userToDelete?.name}</strong>? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Hapus Pengguna
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;