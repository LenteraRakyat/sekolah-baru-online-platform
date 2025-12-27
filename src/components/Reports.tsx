import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Users,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
  Printer,
  RefreshCw,
  AlertTriangle,
  School,
  MapPin,
} from "lucide-react";

const Reports = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data untuk grafik
  const registrationTrend = [
    { date: "01 Jan", count: 45, target: 50 },
    { date: "05 Jan", count: 78, target: 80 },
    { date: "10 Jan", count: 123, target: 120 },
    { date: "15 Jan", count: 201, target: 180 },
    { date: "20 Jan", count: 289, target: 250 },
    { date: "25 Jan", count: 356, target: 320 },
    { date: "30 Jan", count: 412, target: 400 },
  ];

  const statusDistribution = [
    { name: "Menunggu", value: 125, color: "#f59e0b" },
    { name: "Disetujui", value: 890, color: "#10b981" },
    { name: "Ditolak", value: 235, color: "#ef4444" },
  ];

  const documentStatus = [
    { document: "Ijazah", uploaded: 1180, verified: 1050, rejected: 130 },
    { document: "Kartu Keluarga", uploaded: 1150, verified: 1020, rejected: 130 },
    { document: "Akta Kelahiran", uploaded: 1200, verified: 1100, rejected: 100 },
    { document: "Pas Foto", uploaded: 980, verified: 890, rejected: 90 },
    { document: "Rapor", uploaded: 1100, verified: 980, rejected: 120 },
  ];

  const schoolOrigin = [
    { name: "SD Negeri", value: 650, color: "#3b82f6" },
    { name: "SD Swasta", value: 320, color: "#8b5cf6" },
    { name: "MI Negeri", value: 180, color: "#10b981" },
    { name: "MI Swasta", value: 100, color: "#f59e0b" },
  ];

  const regionDistribution = [
    { region: "Jakarta Pusat", count: 245 },
    { region: "Jakarta Selatan", count: 312 },
    { region: "Jakarta Timur", count: 198 },
    { region: "Jakarta Barat", count: 267 },
    { region: "Jakarta Utara", count: 156 },
    { region: "Bekasi", count: 72 },
  ];

  const dailyRegistration = [
    { day: "Senin", count: 85 },
    { day: "Selasa", count: 92 },
    { day: "Rabu", count: 78 },
    { day: "Kamis", count: 95 },
    { day: "Jumat", count: 65 },
    { day: "Sabtu", count: 42 },
    { day: "Minggu", count: 28 },
  ];

  const reportStats = [
    {
      title: "Total Pendaftar",
      value: "1,250",
      change: "+15%",
      trend: "up",
      icon: Users,
      color: "blue",
      description: "dari periode sebelumnya",
    },
    {
      title: "Tingkat Kelengkapan",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: FileCheck,
      color: "green",
      description: "dokumen lengkap",
    },
    {
      title: "Rata-rata Proses",
      value: "3.2 hari",
      change: "-0.5 hari",
      trend: "down",
      icon: Clock,
      color: "purple",
      description: "waktu verifikasi",
    },
    {
      title: "Tingkat Persetujuan",
      value: "71%",
      change: "+2%",
      trend: "up",
      icon: CheckCircle,
      color: "emerald",
      description: "pendaftar diterima",
    },
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      emerald: "bg-emerald-100 text-emerald-600",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Diperbarui",
        description: "Data laporan telah diperbarui",
      });
    }, 1500);
  };

  const handlePrint = () => {
    toast({
      title: "Mencetak Laporan",
      description: "Membuka dialog cetak...",
    });
    window.print();
  };

  const exportReport = (type: string, format: string) => {
    toast({
      title: "Export Dimulai",
      description: `Mengekspor laporan ${type} ke ${format.toUpperCase()}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Laporan & Statistik</h2>
          <p className="text-muted-foreground">Analisis data pendaftaran dan verifikasi PPDB</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Periode Saat Ini</SelectItem>
              <SelectItem value="last-month">Bulan Lalu</SelectItem>
              <SelectItem value="last-year">Tahun Lalu</SelectItem>
              <SelectItem value="all">Semua Periode</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Cetak
          </Button>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                    <span className="text-xs text-muted-foreground">{stat.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${getStatColor(stat.color)}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs untuk berbagai laporan */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="registration">Pendaftaran</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
          <TabsTrigger value="demographics">Demografi</TabsTrigger>
        </TabsList>

        {/* Tab Ringkasan */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grafik Tren Pendaftaran */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tren Pendaftaran
                </CardTitle>
                <CardDescription>Perbandingan pendaftaran vs target</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={registrationTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      name="Pendaftar"
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="target" 
                      name="Target"
                      stroke="#10b981" 
                      fill="#10b981"
                      fillOpacity={0.1}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribusi Status */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Distribusi Status Pendaftaran
                </CardTitle>
                <CardDescription>Persentase status verifikasi saat ini</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  {statusDistribution.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pendaftaran Harian */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Pola Pendaftaran Harian
              </CardTitle>
              <CardDescription>Distribusi pendaftaran berdasarkan hari</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyRegistration}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" name="Pendaftar" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Pendaftaran */}
        <TabsContent value="registration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Tren Pendaftaran Detail</CardTitle>
                <CardDescription>Jumlah pendaftar dari waktu ke waktu</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={registrationTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      name="Aktual"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      name="Target"
                      stroke="#10b981" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Ringkasan Pendaftaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Target Pendaftaran</span>
                    <span className="text-2xl font-bold text-blue-600">1,500</span>
                  </div>
                  <div className="mt-2 h-2 bg-blue-200 rounded-full">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '83%' }} />
                  </div>
                  <p className="text-sm text-blue-600 mt-1">83% tercapai (1,250 dari 1,500)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">890</p>
                    <p className="text-sm text-green-700">Diterima</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">235</p>
                    <p className="text-sm text-red-700">Ditolak</p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-700">125 pendaftaran menunggu verifikasi</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Dokumen */}
        <TabsContent value="documents" className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Status Verifikasi Dokumen
              </CardTitle>
              <CardDescription>Jumlah dokumen yang diupload, diverifikasi, dan ditolak</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={documentStatus} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="document" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="uploaded" fill="#94a3b8" name="Diupload" />
                  <Bar dataKey="verified" fill="#10b981" name="Diverifikasi" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Ditolak" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documentStatus.map((doc, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">{doc.document}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Diupload</span>
                      <span className="font-medium">{doc.uploaded}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Diverifikasi</span>
                      <span className="font-medium text-green-600">{doc.verified}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">Ditolak</span>
                      <span className="font-medium text-red-600">{doc.rejected}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${(doc.verified / doc.uploaded) * 100}%` }} 
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {((doc.verified / doc.uploaded) * 100).toFixed(1)}% terverifikasi
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Demografi */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  Asal Sekolah
                </CardTitle>
                <CardDescription>Distribusi berdasarkan jenis sekolah asal</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={schoolOrigin}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      dataKey="value"
                    >
                      {schoolOrigin.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {schoolOrigin.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Wilayah Asal
                </CardTitle>
                <CardDescription>Distribusi berdasarkan wilayah tempat tinggal</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={regionDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Pendaftar" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Aksi Export */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Export Laporan</CardTitle>
          <CardDescription>Unduh laporan dalam berbagai format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col"
              onClick={() => exportReport("pendaftar", "excel")}
            >
              <FileText className="h-8 w-8 mb-2" />
              <span>Data Pendaftar</span>
              <span className="text-xs text-muted-foreground">PDF & Excel</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col"
              onClick={() => exportReport("verifikasi", "pdf")}
            >
              <FileCheck className="h-8 w-8 mb-2" />
              <span>Laporan Verifikasi</span>
              <span className="text-xs text-muted-foreground">PDF</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col"
              onClick={() => exportReport("statistik", "excel")}
            >
              <BarChart3 className="h-8 w-8 mb-2" />
              <span>Statistik Lengkap</span>
              <span className="text-xs text-muted-foreground">PDF & Excel</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col"
              onClick={() => exportReport("demografi", "pdf")}
            >
              <Users className="h-8 w-8 mb-2" />
              <span>Data Demografi</span>
              <span className="text-xs text-muted-foreground">PDF</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;