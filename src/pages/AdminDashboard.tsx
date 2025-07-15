
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
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
  XCircle,
  Clock,
  FileText,
  UserCheck
} from "lucide-react";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  const stats = [
    { title: "Total Pendaftar", value: "1,250", icon: Users, color: "blue", change: "+15%" },
    { title: "Menunggu Verifikasi", value: "125", icon: Clock, color: "yellow", change: "-8%" },
    { title: "Terverifikasi", value: "890", icon: FileCheck, color: "green", change: "+12%" },
    { title: "Ditolak", value: "235", icon: XCircle, color: "red", change: "+3%" },
  ];

  const [applications, setApplications] = useState([
    { id: "PPDB001", name: "Ahmad Fadil Rahman", school: "SMP Negeri 1", status: "pending", date: "2024-01-15", documents: 5, completedDocs: 4 },
    { id: "PPDB002", name: "Siti Nurhaliza", school: "SMP Negeri 2", status: "approved", date: "2024-01-15", documents: 6, completedDocs: 6 },
    { id: "PPDB003", name: "Budi Santoso", school: "SMP Al-Azhar", status: "pending", date: "2024-01-14", documents: 6, completedDocs: 3 },
    { id: "PPDB004", name: "Rina Kartika", school: "SMP Negeri 3", status: "rejected", date: "2024-01-14", documents: 6, completedDocs: 6 },
    { id: "PPDB005", name: "Doni Pratama", school: "SMP Swasta", status: "approved", date: "2024-01-13", documents: 6, completedDocs: 6 },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800", label: "Menunggu" },
      approved: { variant: "default" as const, color: "bg-green-100 text-green-800", label: "Disetujui" },
      rejected: { variant: "destructive" as const, color: "bg-red-100 text-red-800", label: "Ditolak" },
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

  const handleApprove = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: "approved" } : app
    ));
    toast({
      title: "Permohonan Disetujui",
      description: `Permohonan ${id} telah disetujui`,
    });
  };

  const handleReject = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: "rejected" } : app
    ));
    toast({
      title: "Permohonan Ditolak",
      description: `Permohonan ${id} telah ditolak`,
      variant: "destructive",
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBulkAction = (action: string) => {
    if (selectedApplications.length === 0) {
      toast({
        title: "Tidak ada yang dipilih",
        description: "Pilih minimal satu permohonan untuk melakukan aksi",
        variant: "destructive",
      });
      return;
    }

    if (action === "approve") {
      setApplications(prev => prev.map(app => 
        selectedApplications.includes(app.id) ? { ...app, status: "approved" } : app
      ));
      toast({
        title: "Permohonan Disetujui",
        description: `${selectedApplications.length} permohonan telah disetujui`,
      });
    } else if (action === "reject") {
      setApplications(prev => prev.map(app => 
        selectedApplications.includes(app.id) ? { ...app, status: "rejected" } : app
      ));
      toast({
        title: "Permohonan Ditolak",
        description: `${selectedApplications.length} permohonan telah ditolak`,
        variant: "destructive",
      });
    }
    
    setSelectedApplications([]);
  };

  const toggleSelection = (id: string) => {
    setSelectedApplications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedApplications(prev => 
      prev.length === filteredApplications.length 
        ? []
        : filteredApplications.map(app => app.id)
    );
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
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs font-medium mt-1 ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} dari bulan lalu
                    </p>
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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Cari nama atau ID pendaftar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="approved">Disetujui</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedApplications.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-700 font-medium">
                    {selectedApplications.length} item terpilih
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleBulkAction("approve")}
                    className="text-green-600 hover:text-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Setujui
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleBulkAction("reject")}
                    className="text-red-600 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Tolak
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={selectedApplications.length === filteredApplications.length}
                    onChange={toggleSelectAll}
                    className="mr-3"
                  />
                  <span className="text-sm font-medium text-gray-700">Pilih Semua</span>
                </div>
                
                {filteredApplications.map((app) => (
                  <div key={app.id} className="flex items-center p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(app.id)}
                      onChange={() => toggleSelection(app.id)}
                      className="mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{app.name}</h4>
                        <Badge 
                          variant={getStatusBadge(app.status).variant}
                          className={getStatusBadge(app.status).color}
                        >
                          {getStatusBadge(app.status).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{app.school}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>ID: {app.id}</span>
                        <span>•</span>
                        <span>{app.date}</span>
                        <span>•</span>
                        <span>Dokumen: {app.completedDocs}/{app.documents}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="Lihat Detail">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {app.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => handleApprove(app.id)}
                            title="Setujui"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleReject(app.id)}
                            title="Tolak"
                          >
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

          {/* Quick Actions & Summary */}
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
                  <UserCheck className="h-4 w-4 mr-2" />
                  Kelola Pengguna
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Lihat Statistik
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Ringkasan Hari Ini</CardTitle>
                <CardDescription>Aktivitas terbaru sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pendaftar Baru</span>
                  <span className="font-semibold text-green-600">+23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Berkas Diverifikasi</span>
                  <span className="font-semibold text-blue-600">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pengumuman Dikirim</span>
                  <span className="font-semibold text-purple-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tingkat Penyelesaian</span>
                  <span className="font-semibold text-green-600">87%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">Peringatan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-orange-700">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      15 berkas sudah melewati batas waktu verifikasi
                    </p>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Kuota pendaftaran tersisa 30% dari total
                    </p>
                  </div>
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
