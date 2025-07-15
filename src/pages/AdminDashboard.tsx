
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { 
  Users, 
  FileCheck, 
  AlertCircle, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    { title: "Total Pendaftar", value: "1,250", icon: Users, color: "blue" },
    { title: "Menunggu Verifikasi", value: "125", icon: AlertCircle, color: "yellow" },
    { title: "Terverifikasi", value: "890", icon: FileCheck, color: "green" },
    { title: "Ditolak", value: "235", icon: XCircle, color: "red" },
  ];

  const recentApplications = [
    { id: "PPDB001", name: "Ahmad Fadil", school: "SMP Negeri 1", status: "pending", date: "2024-01-15" },
    { id: "PPDB002", name: "Siti Nurhaliza", school: "SMP Negeri 2", status: "approved", date: "2024-01-15" },
    { id: "PPDB003", name: "Budi Santoso", school: "SMP Al-Azhar", status: "pending", date: "2024-01-14" },
    { id: "PPDB004", name: "Rina Kartika", school: "SMP Negeri 3", status: "rejected", date: "2024-01-14" },
    { id: "PPDB005", name: "Doni Pratama", school: "SMP Swasta", status: "approved", date: "2024-01-13" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800" },
      approved: { variant: "default" as const, color: "bg-green-100 text-green-800" },
      rejected: { variant: "destructive" as const, color: "bg-red-100 text-red-800" },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      yellow: "bg-yellow-100 text-yellow-600",
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin PPDB</h1>
          <p className="text-gray-600">Kelola dan pantau proses penerimaan peserta didik baru</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getStatColor(stat.color)}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Table */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Pendaftaran Terbaru</CardTitle>
                  <CardDescription>Daftar calon siswa yang baru mendaftar</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari nama atau ID pendaftar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{app.name}</h4>
                        <Badge 
                          variant={getStatusBadge(app.status).variant}
                          className={getStatusBadge(app.status).color}
                        >
                          {app.status === 'pending' ? 'Menunggu' : 
                           app.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{app.school}</p>
                      <p className="text-xs text-gray-500">ID: {app.id} • {app.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {app.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Tindakan yang sering digunakan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Verifikasi Berkas
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Lihat Statistik
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Kelola Pengguna
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Ringkasan Hari Ini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pendaftar Baru</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Berkas Diverifikasi</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pengumuman Dikirim</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Persentase Verifikasi</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
