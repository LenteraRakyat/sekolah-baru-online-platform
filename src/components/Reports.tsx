
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
} from "recharts";
import {
  Download,
  FileText,
  TrendingUp,
  Users,
  FileCheck,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
} from "lucide-react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  // Data untuk grafik
  const registrationTrend = [
    { date: "01 Jan", count: 45 },
    { date: "05 Jan", count: 78 },
    { date: "10 Jan", count: 123 },
    { date: "15 Jan", count: 201 },
    { date: "20 Jan", count: 289 },
    { date: "25 Jan", count: 356 },
    { date: "30 Jan", count: 412 },
  ];

  const statusDistribution = [
    { name: "Pending", value: 125, color: "#f59e0b" },
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

  const reportStats = [
    {
      title: "Total Pendaftar",
      value: "1,250",
      change: "+15%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Tingkat Kelengkapan",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: FileCheck,
      color: "green",
    },
    {
      title: "Rata-rata Proses",
      value: "3.2 hari",
      change: "-0.5 hari",
      trend: "down",
      icon: Clock,
      color: "purple",
    },
    {
      title: "Tingkat Persetujuan",
      value: "71%",
      change: "+2%",
      trend: "up",
      icon: CheckCircle,
      color: "emerald",
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

  const exportReport = (type: string) => {
    console.log(`Exporting ${type} report...`);
    // Implementasi export akan ditambahkan nanti
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
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs font-medium mt-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.change} dari periode sebelumnya
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Tren Pendaftaran */}
        <Card>
          <CardHeader>
            <CardTitle>Tren Pendaftaran</CardTitle>
            <CardDescription>Jumlah pendaftar dari waktu ke waktu</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribusi Status */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Status Pendaftaran</CardTitle>
            <CardDescription>Persentase status verifikasi saat ini</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Dokumen */}
      <Card>
        <CardHeader>
          <CardTitle>Status Verifikasi Dokumen</CardTitle>
          <CardDescription>Jumlah dokumen yang diupload, diverifikasi, dan ditolak</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={documentStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="document" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uploaded" fill="#94a3b8" name="Diupload" />
              <Bar dataKey="verified" fill="#10b981" name="Diverifikasi" />
              <Bar dataKey="rejected" fill="#ef4444" name="Ditolak" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Aksi Export */}
      <Card>
        <CardHeader>
          <CardTitle>Export Laporan</CardTitle>
          <CardDescription>Unduh laporan dalam berbagai format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col"
              onClick={() => exportReport("pendaftar")}
            >
              <FileText className="h-8 w-8 mb-2" />
              <span>Data Pendaftar</span>
              <span className="text-xs text-muted-foreground">PDF & Excel</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col"
              onClick={() => exportReport("verifikasi")}
            >
              <FileCheck className="h-8 w-8 mb-2" />
              <span>Laporan Verifikasi</span>
              <span className="text-xs text-muted-foreground">PDF</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex-col"
              onClick={() => exportReport("statistik")}
            >
              <BarChart3 className="h-8 w-8 mb-2" />
              <span>Statistik Lengkap</span>
              <span className="text-xs text-muted-foreground">PDF & Excel</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
