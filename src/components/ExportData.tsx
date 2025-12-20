import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  FileText,
  Table,
  FileSpreadsheet,
  File,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  FileCheck,
  BarChart3,
  Trash2,
} from "lucide-react";

interface ExportHistory {
  id: string;
  name: string;
  type: string;
  format: "pdf" | "excel" | "csv";
  createdAt: string;
  fileSize: string;
  status: "completed" | "processing" | "failed";
}

const ExportData = () => {
  const { toast } = useToast();
  const [selectedFormat, setSelectedFormat] = useState("excel");
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const [exportHistory, setExportHistory] = useState<ExportHistory[]>([
    {
      id: "EXP001",
      name: "Data Pendaftar - Januari 2024",
      type: "Pendaftar",
      format: "excel",
      createdAt: "2024-01-15 10:30",
      fileSize: "2.5 MB",
      status: "completed",
    },
    {
      id: "EXP002",
      name: "Laporan Verifikasi Dokumen",
      type: "Verifikasi",
      format: "pdf",
      createdAt: "2024-01-14 15:45",
      fileSize: "1.2 MB",
      status: "completed",
    },
    {
      id: "EXP003",
      name: "Statistik Pendaftaran",
      type: "Statistik",
      format: "pdf",
      createdAt: "2024-01-13 09:00",
      fileSize: "850 KB",
      status: "completed",
    },
  ]);

  const dataOptions = [
    { id: "students", label: "Data Calon Siswa", icon: Users, count: 1250 },
    { id: "applications", label: "Data Pendaftaran", icon: FileCheck, count: 1250 },
    { id: "documents", label: "Status Dokumen", icon: FileText, count: 6250 },
    { id: "verification", label: "Hasil Verifikasi", icon: CheckCircle, count: 1125 },
    { id: "schedule", label: "Jadwal Kegiatan", icon: Calendar, count: 15 },
    { id: "statistics", label: "Statistik & Laporan", icon: BarChart3, count: null },
  ];

  const formatOptions = [
    { id: "excel", label: "Excel (.xlsx)", icon: FileSpreadsheet, color: "text-green-600" },
    { id: "csv", label: "CSV (.csv)", icon: Table, color: "text-blue-600" },
    { id: "pdf", label: "PDF (.pdf)", icon: File, color: "text-red-600" },
  ];

  const toggleDataSelection = (id: string) => {
    setSelectedData(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    if (selectedData.length === 0) {
      toast({
        title: "Error",
        description: "Pilih minimal satu jenis data untuk diekspor",
        variant: "destructive",
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          
          const newExport: ExportHistory = {
            id: `EXP${String(exportHistory.length + 1).padStart(3, '0')}`,
            name: `Export Data - ${new Date().toLocaleDateString('id-ID')}`,
            type: selectedData.join(", "),
            format: selectedFormat as "pdf" | "excel" | "csv",
            createdAt: new Date().toLocaleString('id-ID'),
            fileSize: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
            status: "completed",
          };
          
          setExportHistory([newExport, ...exportHistory]);
          
          toast({
            title: "Export Berhasil",
            description: "File siap untuk diunduh",
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleDownload = (id: string) => {
    toast({
      title: "Mengunduh File",
      description: "File sedang diunduh...",
    });
  };

  const handleDelete = (id: string) => {
    setExportHistory(prev => prev.filter(e => e.id !== id));
    toast({
      title: "File Dihapus",
      description: "File export berhasil dihapus",
    });
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "excel": return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case "csv": return <Table className="h-4 w-4 text-blue-600" />;
      case "pdf": return <File className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">Proses</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Gagal</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Export Data</h2>
          <p className="text-muted-foreground">Ekspor data PPDB ke berbagai format file</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Konfigurasi Export</CardTitle>
            <CardDescription>Pilih data dan format yang ingin diekspor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Data Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Pilih Data</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dataOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedData.includes(option.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-muted/30'
                    }`}
                    onClick={() => toggleDataSelection(option.id)}
                  >
                    <Checkbox 
                      checked={selectedData.includes(option.id)}
                      onCheckedChange={() => toggleDataSelection(option.id)}
                      className="mr-3"
                    />
                    <option.icon className="h-5 w-5 text-muted-foreground mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{option.label}</p>
                      {option.count !== null && (
                        <p className="text-xs text-muted-foreground">{option.count} data</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Rentang Tanggal (Opsional)</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFrom">Dari Tanggal</Label>
                  <Input
                    id="dateFrom"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateTo">Sampai Tanggal</Label>
                  <Input
                    id="dateTo"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Format File</Label>
              <div className="grid grid-cols-3 gap-3">
                {formatOptions.map(format => (
                  <div 
                    key={format.id}
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedFormat === format.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedFormat(format.id)}
                  >
                    <format.icon className={`h-8 w-8 ${format.color} mb-2`} />
                    <span className="text-sm font-medium">{format.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Progress */}
            {isExporting && (
              <div className="space-y-2 p-4 border rounded-lg bg-primary/5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Mengekspor data...</span>
                  <span className="text-sm text-muted-foreground">{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="h-2" />
              </div>
            )}

            {/* Export Button */}
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleExport}
              disabled={isExporting || selectedData.length === 0}
            >
              <Download className="h-5 w-5 mr-2" />
              {isExporting ? 'Mengekspor...' : 'Export Data'}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Ringkasan Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Calon Siswa</span>
                </div>
                <span className="font-semibold">1,250</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileCheck className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Terverifikasi</span>
                </div>
                <span className="font-semibold">890</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">Dokumen</span>
                </div>
                <span className="font-semibold">6,250</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Tips</h4>
                  <p className="text-xs text-muted-foreground">
                    Export data dalam format Excel untuk analisis lebih lanjut, 
                    atau PDF untuk keperluan cetak dan arsip.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export History */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Riwayat Export</CardTitle>
          <CardDescription>File yang telah diekspor sebelumnya</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exportHistory.map(item => (
              <div 
                key={item.id}
                className="flex items-center p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="p-3 bg-muted rounded-lg mr-4">
                  {getFormatIcon(item.format)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.createdAt}
                    </span>
                    <span>{item.fileSize}</span>
                    <span className="uppercase">{item.format}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {item.status === "completed" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownload(item.id)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Unduh
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(item.id)}
                  >
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

export default ExportData;
