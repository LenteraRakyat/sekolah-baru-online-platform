
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "@/components/AppSidebar";
import UserManagement from "@/components/UserManagement";
import SchoolSettings from "@/components/SchoolSettings";
import Reports from "@/components/Reports";
import ApplicationsManagement from "@/components/ApplicationsManagement";
import StudentsManagement from "@/components/StudentsManagement";
import DocumentVerification from "@/components/DocumentVerification";
import AnnouncementsManagement from "@/components/AnnouncementsManagement";
import ScheduleManagement from "@/components/ScheduleManagement";
import MessagesCenter from "@/components/MessagesCenter";
import SystemSettings from "@/components/SystemSettings";
import HelpCenter from "@/components/HelpCenter";
import ExportData from "@/components/ExportData";
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
  UserCheck,
  Bell,
  Calendar,
  MessageSquare,
  HelpCircle,
  School,
  Settings,
  BarChart3,
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
      pending: { variant: "secondary" as const, color: "bg-warning/10 text-warning border border-warning/20", label: "Menunggu" },
      approved: { variant: "default" as const, color: "bg-success/10 text-success border border-success/20", label: "Disetujui" },
      rejected: { variant: "destructive" as const, color: "bg-destructive/10 text-destructive border border-destructive/20", label: "Ditolak" },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: "bg-primary/10 text-primary",
      yellow: "bg-warning/10 text-warning",
      green: "bg-success/10 text-success",
      red: "bg-destructive/10 text-destructive",
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

  // Komponen Dashboard utama
  const DashboardHome = () => (
    <div className="space-y-6 slide-in-up">
      {/* Header Dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Admin PPDB</h1>
        <p className="text-muted-foreground">Kelola dan pantau proses penerimaan peserta didik baru</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group">
            <CardContent className="p-6 relative">
              <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              <div className="flex items-center justify-between relative">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs font-medium mt-1 ${
                    stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change} dari bulan lalu
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${getStatColor(stat.color)}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications Table */}
        <Card className="lg:col-span-2 border-0 shadow-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-lg">Pendaftaran Terbaru</CardTitle>
                <CardDescription>Daftar calon siswa yang baru mendaftar</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari nama atau ID pendaftar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 rounded-lg">
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
              <div className="flex flex-wrap gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10 mt-4">
                <span className="text-sm text-primary font-medium">
                  {selectedApplications.length} item terpilih
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkAction("approve")}
                  className="text-success hover:text-success hover:bg-success/10 rounded-lg"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Setujui
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkAction("reject")}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Tolak
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  checked={selectedApplications.length === filteredApplications.length}
                  onChange={toggleSelectAll}
                  className="mr-3 rounded"
                />
                <span className="text-sm font-medium text-muted-foreground">Pilih Semua</span>
              </div>
              
              {filteredApplications.map((app) => (
                <div key={app.id} className="flex items-center p-4 bg-card border border-border rounded-xl hover:shadow-card transition-all duration-200 group">
                  <input
                    type="checkbox"
                    checked={selectedApplications.includes(app.id)}
                    onChange={() => toggleSelection(app.id)}
                    className="mr-4 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">{app.name}</h4>
                      <Badge 
                        variant={getStatusBadge(app.status).variant}
                        className={`${getStatusBadge(app.status).color} rounded-full px-3`}
                      >
                        {getStatusBadge(app.status).label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{app.school}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>ID: {app.id}</span>
                      <span>•</span>
                      <span>{app.date}</span>
                      <span>•</span>
                      <span>Dokumen: {app.completedDocs}/{app.documents}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" title="Lihat Detail" className="rounded-lg">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {app.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-success hover:text-success hover:bg-success/10 rounded-lg"
                          onClick={() => handleApprove(app.id)}
                          title="Setujui"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
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
          <Card className="border-0 shadow-card overflow-hidden">
            <div className="h-1 gradient-primary" />
            <CardHeader>
              <CardTitle className="text-lg">Aksi Cepat</CardTitle>
              <CardDescription>Tindakan yang sering digunakan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" variant="ghost">
                <FileCheck className="h-4 w-4 mr-3" />
                Verifikasi Berkas
              </Button>
              <Button className="w-full justify-start rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" variant="ghost">
                <UserCheck className="h-4 w-4 mr-3" />
                Kelola Pengguna
              </Button>
              <Button className="w-full justify-start rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" variant="ghost">
                <Download className="h-4 w-4 mr-3" />
                Export Data
              </Button>
              <Button className="w-full justify-start rounded-lg hover:bg-primary/5 hover:text-primary transition-colors" variant="ghost">
                <TrendingUp className="h-4 w-4 mr-3" />
                Lihat Statistik
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Hari Ini</CardTitle>
              <CardDescription>Aktivitas terbaru sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-success/5 rounded-lg">
                <span className="text-sm text-muted-foreground">Pendaftar Baru</span>
                <span className="font-bold text-success">+23</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                <span className="text-sm text-muted-foreground">Berkas Diverifikasi</span>
                <span className="font-bold text-primary">45</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                <span className="text-sm text-muted-foreground">Pengumuman Dikirim</span>
                <span className="font-bold text-accent">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-success/5 rounded-lg">
                <span className="text-sm text-muted-foreground">Tingkat Penyelesaian</span>
                <span className="font-bold text-success">87%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card border-l-4 border-l-warning bg-warning/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Peringatan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-2 bg-card/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    15 berkas sudah melewati batas waktu verifikasi
                  </p>
                </div>
                <div className="flex items-start gap-3 p-2 bg-card/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Kuota pendaftaran tersisa 30% dari total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b bg-white/90 backdrop-blur-md px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Panel Admin PPDB</h1>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/school-settings" element={<SchoolSettings />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/applications" element={<ApplicationsManagement />} />
              <Route path="/students" element={<StudentsManagement />} />
              <Route path="/verification" element={<DocumentVerification />} />
              <Route path="/announcements" element={<AnnouncementsManagement />} />
              <Route path="/schedule" element={<ScheduleManagement />} />
              <Route path="/messages" element={<MessagesCenter />} />
              <Route path="/settings" element={<SystemSettings />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/export" element={<ExportData />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
