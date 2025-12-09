import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Users,
  Calendar,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ApplicationsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);

  const [applications, setApplications] = useState([
    { 
      id: "PPDB001", 
      name: "Ahmad Fadil Rahman", 
      email: "ahmad.fadil@email.com",
      phone: "081234567890",
      school: "SMP Negeri 1", 
      status: "pending", 
      date: "2024-01-15", 
      documents: 5, 
      completedDocs: 4,
      parentName: "Budi Rahman",
      address: "Jl. Merdeka No. 123, Jakarta"
    },
    { 
      id: "PPDB002", 
      name: "Siti Nurhaliza", 
      email: "siti.nur@email.com",
      phone: "081234567891",
      school: "SMP Negeri 2", 
      status: "approved", 
      date: "2024-01-15", 
      documents: 6, 
      completedDocs: 6,
      parentName: "Ahmad Halim",
      address: "Jl. Sudirman No. 45, Jakarta"
    },
    { 
      id: "PPDB003", 
      name: "Budi Santoso", 
      email: "budi.s@email.com",
      phone: "081234567892",
      school: "SMP Al-Azhar", 
      status: "pending", 
      date: "2024-01-14", 
      documents: 6, 
      completedDocs: 3,
      parentName: "Hendra Santoso",
      address: "Jl. Gatot Subroto No. 78, Jakarta"
    },
    { 
      id: "PPDB004", 
      name: "Rina Kartika", 
      email: "rina.k@email.com",
      phone: "081234567893",
      school: "SMP Negeri 3", 
      status: "rejected", 
      date: "2024-01-14", 
      documents: 6, 
      completedDocs: 6,
      parentName: "Kartika Dewi",
      address: "Jl. Thamrin No. 90, Jakarta"
    },
    { 
      id: "PPDB005", 
      name: "Doni Pratama", 
      email: "doni.p@email.com",
      phone: "081234567894",
      school: "SMP Swasta", 
      status: "approved", 
      date: "2024-01-13", 
      documents: 6, 
      completedDocs: 6,
      parentName: "Pratama Wijaya",
      address: "Jl. Kuningan No. 12, Jakarta"
    },
    { 
      id: "PPDB006", 
      name: "Maya Sari", 
      email: "maya.s@email.com",
      phone: "081234567895",
      school: "SMP Negeri 1", 
      status: "pending", 
      date: "2024-01-12", 
      documents: 6, 
      completedDocs: 5,
      parentName: "Sari Indah",
      address: "Jl. Menteng No. 34, Jakarta"
    },
  ]);

  const stats = [
    { title: "Total Pendaftaran", value: applications.length.toString(), icon: Users, color: "bg-blue-100 text-blue-600" },
    { title: "Menunggu", value: applications.filter(a => a.status === "pending").length.toString(), icon: Clock, color: "bg-yellow-100 text-yellow-600" },
    { title: "Disetujui", value: applications.filter(a => a.status === "approved").length.toString(), icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { title: "Ditolak", value: applications.filter(a => a.status === "rejected").length.toString(), icon: XCircle, color: "bg-red-100 text-red-600" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800", label: "Menunggu" },
      approved: { variant: "default" as const, color: "bg-green-100 text-green-800", label: "Disetujui" },
      rejected: { variant: "destructive" as const, color: "bg-red-100 text-red-800", label: "Ditolak" },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const handleApprove = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: "approved" } : app
    ));
    toast({
      title: "Pendaftaran Disetujui",
      description: `Pendaftaran ${id} telah disetujui`,
    });
  };

  const handleReject = (id: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id ? { ...app, status: "rejected" } : app
    ));
    toast({
      title: "Pendaftaran Ditolak",
      description: `Pendaftaran ${id} telah ditolak`,
      variant: "destructive",
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBulkAction = (action: string) => {
    if (selectedApplications.length === 0) {
      toast({
        title: "Tidak ada yang dipilih",
        description: "Pilih minimal satu pendaftaran untuk melakukan aksi",
        variant: "destructive",
      });
      return;
    }

    if (action === "approve") {
      setApplications(prev => prev.map(app => 
        selectedApplications.includes(app.id) ? { ...app, status: "approved" } : app
      ));
      toast({
        title: "Pendaftaran Disetujui",
        description: `${selectedApplications.length} pendaftaran telah disetujui`,
      });
    } else if (action === "reject") {
      setApplications(prev => prev.map(app => 
        selectedApplications.includes(app.id) ? { ...app, status: "rejected" } : app
      ));
      toast({
        title: "Pendaftaran Ditolak",
        description: `${selectedApplications.length} pendaftaran telah ditolak`,
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

  const handleExport = () => {
    toast({
      title: "Export Data",
      description: "Data pendaftaran sedang diexport...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelola Pendaftaran</h1>
        <p className="text-gray-600">Kelola dan verifikasi pendaftaran calon siswa baru</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Daftar Pendaftaran</CardTitle>
              <CardDescription>Semua pendaftaran calon siswa</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari nama, ID, atau email..."
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

          {/* Bulk Actions */}
          {selectedApplications.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg mt-4">
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
          {/* Select All */}
          <div className="flex items-center p-2 bg-gray-50 rounded-lg mb-4">
            <input
              type="checkbox"
              checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
              onChange={toggleSelectAll}
              className="mr-3"
            />
            <span className="text-sm font-medium text-gray-700">Pilih Semua</span>
          </div>
          
          {/* Applications List */}
          <div className="space-y-3">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Tidak ada pendaftaran ditemukan</p>
              </div>
            ) : (
              filteredApplications.map((app) => (
                <div key={app.id} className="flex items-center p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                  <input
                    type="checkbox"
                    checked={selectedApplications.includes(app.id)}
                    onChange={() => toggleSelection(app.id)}
                    className="mr-4"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900">{app.name}</h4>
                      <Badge 
                        variant={getStatusBadge(app.status).variant}
                        className={getStatusBadge(app.status).color}
                      >
                        {getStatusBadge(app.status).label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{app.school}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      <span>ID: {app.id}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {app.date}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        Dokumen: {app.completedDocs}/{app.documents}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedDetail(app)}
                      title="Lihat Detail"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {app.status === 'pending' && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-green-600 hover:text-green-700 hidden sm:flex"
                          onClick={() => handleApprove(app.id)}
                          title="Setujui"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hidden sm:flex"
                          onClick={() => handleReject(app.id)}
                          title="Tolak"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="sm:hidden">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedDetail(app)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat Detail
                        </DropdownMenuItem>
                        {app.status === 'pending' && (
                          <>
                            <DropdownMenuItem onClick={() => handleApprove(app.id)}>
                              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                              Setujui
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(app.id)}>
                              <XCircle className="h-4 w-4 mr-2 text-red-600" />
                              Tolak
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedDetail} onOpenChange={() => setSelectedDetail(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Pendaftaran</DialogTitle>
            <DialogDescription>
              ID: {selectedDetail?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedDetail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="font-medium">{selectedDetail.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={getStatusBadge(selectedDetail.status).color}>
                    {getStatusBadge(selectedDetail.status).label}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedDetail.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">No. Telepon</p>
                  <p className="font-medium">{selectedDetail.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nama Orang Tua</p>
                  <p className="font-medium">{selectedDetail.parentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sekolah Asal</p>
                  <p className="font-medium">{selectedDetail.school}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="font-medium">{selectedDetail.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Daftar</p>
                  <p className="font-medium">{selectedDetail.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kelengkapan Dokumen</p>
                  <p className="font-medium">{selectedDetail.completedDocs}/{selectedDetail.documents}</p>
                </div>
              </div>
              {selectedDetail.status === 'pending' && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      handleApprove(selectedDetail.id);
                      setSelectedDetail(null);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Setujui
                  </Button>
                  <Button 
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleReject(selectedDetail.id);
                      setSelectedDetail(null);
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Tolak
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationsManagement;
