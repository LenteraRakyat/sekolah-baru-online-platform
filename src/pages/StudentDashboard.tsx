
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import { 
  User, 
  FileText, 
  Upload, 
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
  Edit,
  Clock
} from "lucide-react";

const StudentDashboard = () => {
  const [applicationStatus] = useState("pending"); // pending, approved, rejected

  const student = {
    name: "Ahmad Fadil Rahman",
    id: "PPDB001",
    school: "SMP Negeri 1 Jakarta",
    registrationDate: "15 Januari 2024",
    status: "pending"
  };

  const documents = [
    { name: "Ijazah/SKHUN", status: "uploaded", required: true },
    { name: "Kartu Keluarga", status: "uploaded", required: true },
    { name: "Akta Kelahiran", status: "uploaded", required: true },
    { name: "Pas Foto", status: "pending", required: true },
    { name: "Surat Keterangan Sehat", status: "pending", required: true },
    { name: "Rapor Semester 1-5", status: "uploaded", required: true },
  ];

  const timeline = [
    { step: "Pendaftaran", status: "completed", date: "15 Jan 2024" },
    { step: "Upload Dokumen", status: "current", date: "16 Jan 2024" },
    { step: "Verifikasi", status: "upcoming", date: "20 Jan 2024" },
    { step: "Pengumuman", status: "upcoming", date: "25 Jan 2024" },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-800" },
      approved: { label: "Disetujui", color: "bg-green-100 text-green-800" },
      rejected: { label: "Ditolak", color: "bg-red-100 text-red-800" },
      uploaded: { label: "Terupload", color: "bg-blue-100 text-blue-800" },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const getStepStatus = (status: string) => {
    const variants = {
      completed: { icon: CheckCircle, color: "text-green-500" },
      current: { icon: Clock, color: "text-blue-500" },
      upcoming: { icon: AlertCircle, color: "text-gray-400" },
    };
    return variants[status as keyof typeof variants] || variants.upcoming;
  };

  const uploadedDocs = documents.filter(doc => doc.status === "uploaded").length;
  const progressPercentage = (uploadedDocs / documents.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Siswa</h1>
              <p className="text-gray-600">Pantau status pendaftaran dan kelola dokumen Anda</p>
            </div>
            <Badge className={`${getStatusBadge(student.status).color} text-sm px-3 py-1`}>
              Status: {getStatusBadge(student.status).label}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Info */}
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informasi Pendaftar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nama Lengkap</label>
                    <p className="text-lg font-semibold text-gray-900">{student.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">ID Pendaftaran</label>
                    <p className="text-lg font-semibold text-gray-900">{student.id}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Asal Sekolah</label>
                    <p className="text-lg font-semibold text-gray-900">{student.school}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tanggal Daftar</label>
                    <p className="text-lg font-semibold text-gray-900">{student.registrationDate}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" className="mr-3">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profil
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Cetak Kartu Peserta
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Progress Pendaftaran</CardTitle>
              <CardDescription>Kelengkapan dokumen Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Dokumen</span>
                    <span className="text-sm text-gray-600">{uploadedDocs}/{documents.length}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                <div className="pt-4 space-y-3">
                  {timeline.map((step, index) => {
                    const StatusIcon = getStepStatus(step.status).icon;
                    return (
                      <div key={index} className="flex items-center">
                        <StatusIcon className={`h-5 w-5 mr-3 ${getStepStatus(step.status).color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{step.step}</p>
                          <p className="text-xs text-gray-500">{step.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="lg:col-span-3 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Dokumen Persyaratan
              </CardTitle>
              <CardDescription>Upload dan kelola dokumen pendaftaran Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-gray-900 text-sm">{doc.name}</h4>
                      {doc.required && (
                        <span className="text-xs text-red-500">*</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={`${getStatusBadge(doc.status).color} text-xs`}>
                        {getStatusBadge(doc.status).label}
                      </Badge>
                      
                      {doc.status === "pending" ? (
                        <Button size="sm" variant="outline">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      ) : (
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
                <p className="text-sm text-gray-600">
                  {uploadedDocs} dari {documents.length} dokumen sudah diupload
                </p>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kirim Berkas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="lg:col-span-3 border-0 shadow-lg bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <AlertCircle className="h-5 w-5 mr-2" />
                Informasi Penting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-blue-700">
                <p className="text-sm">
                  • Pastikan semua dokumen sudah diupload sebelum tanggal 20 Januari 2024
                </p>
                <p className="text-sm">
                  • Format file yang diterima: PDF, JPG, PNG (maksimal 2MB per file)
                </p>
                <p className="text-sm">
                  • Dokumen yang sudah diupload tidak dapat diubah setelah verifikasi dimulai
                </p>
                <p className="text-sm">
                  • Hubungi panitia jika mengalami kesulitan dalam proses upload dokumen
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
