
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
} from "lucide-react";

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [users, setUsers] = useState([
    {
      id: "USR001",
      name: "Dr. Siti Nurhaliza",
      email: "siti.nurhaliza@sekolah.id",
      phone: "08123456789",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      joinDate: "2023-08-01",
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
    },
  ]);

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: { variant: "default" as const, color: "bg-red-100 text-red-800", label: "Admin" },
      operator: { variant: "secondary" as const, color: "bg-blue-100 text-blue-800", label: "Operator" },
      verifikator: { variant: "outline" as const, color: "bg-green-100 text-green-800", label: "Verifikator" },
    };
    return variants[role as keyof typeof variants] || variants.operator;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "default" as const, color: "bg-green-100 text-green-800", label: "Aktif" },
      inactive: { variant: "secondary" as const, color: "bg-gray-100 text-gray-800", label: "Tidak Aktif" },
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Kelola Pengguna</h2>
          <p className="text-muted-foreground">Manajemen pengguna sistem PPDB</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Buat akun pengguna baru untuk sistem PPDB
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@sekolah.id" />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" placeholder="08123456789" />
              </div>
              <div>
                <Label htmlFor="role">Peran</Label>
                <Select>
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
              <Button className="w-full">Buat Pengguna</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
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
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 ml-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold">{user.name}</h4>
                    <Badge className={getRoleBadge(user.role).color}>
                      {getRoleBadge(user.role).label}
                    </Badge>
                    <Badge className={getStatusBadge(user.status).color}>
                      {getStatusBadge(user.status).label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </div>
                    <span>•</span>
                    <span>Login terakhir: {user.lastLogin}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" title="Lihat Detail">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" title="Edit">
                    <Edit className="h-4 w-4" />
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
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" title="Hapus">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
