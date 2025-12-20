import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileText,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  ZoomIn,
  RotateCw,
  FileCheck,
  User,
} from "lucide-react";

interface Document {
  id: string;
  studentId: string;
  studentName: string;
  documentType: string;
  fileName: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  fileSize: string;
  rejectionReason?: string;
}

const DocumentVerification = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const [documents, setDocuments] = useState<Document[]>([
    { id: "DOC001", studentId: "PPDB001", studentName: "Ahmad Fadil Rahman", documentType: "Ijazah SD", fileName: "ijazah_ahmad.pdf", uploadDate: "2024-01-15 10:30", status: "pending", fileSize: "1.2 MB" },
    { id: "DOC002", studentId: "PPDB001", studentName: "Ahmad Fadil Rahman", documentType: "Kartu Keluarga", fileName: "kk_ahmad.pdf", uploadDate: "2024-01-15 10:32", status: "pending", fileSize: "800 KB" },
    { id: "DOC003", studentId: "PPDB002", studentName: "Siti Nurhaliza", documentType: "Akta Kelahiran", fileName: "akta_siti.pdf", uploadDate: "2024-01-14 14:20", status: "approved", fileSize: "950 KB" },
    { id: "DOC004", studentId: "PPDB003", studentName: "Budi Santoso", documentType: "Rapor", fileName: "rapor_budi.pdf", uploadDate: "2024-01-14 09:15", status: "rejected", fileSize: "2.1 MB", rejectionReason: "Dokumen tidak lengkap" },
    { id: "DOC005", studentId: "PPDB004", studentName: "Rina Kartika", documentType: "Pas Foto", fileName: "foto_rina.jpg", uploadDate: "2024-01-13 16:45", status: "pending", fileSize: "500 KB" },
    { id: "DOC006", studentId: "PPDB005", studentName: "Doni Pratama", documentType: "Ijazah SD", fileName: "ijazah_doni.pdf", uploadDate: "2024-01-13 11:20", status: "approved", fileSize: "1.1 MB" },
    { id: "DOC007", studentId: "PPDB003", studentName: "Budi Santoso", documentType: "Kartu Keluarga", fileName: "kk_budi.pdf", uploadDate: "2024-01-14 09:18", status: "pending", fileSize: "780 KB" },
  ]);

  const documentTypes = ["Ijazah SD", "Kartu Keluarga", "Akta Kelahiran", "Pas Foto", "Rapor", "SKHUN"];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Menunggu", icon: Clock },
      approved: { color: "bg-green-100 text-green-800 border-green-200", label: "Disetujui", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800 border-red-200", label: "Ditolak", icon: XCircle },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.documentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    const matchesType = typeFilter === "all" || doc.documentType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === "pending").length,
    approved: documents.filter(d => d.status === "approved").length,
    rejected: documents.filter(d => d.status === "rejected").length,
  };

  const handleApprove = (docId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, status: "approved" as const } : doc
    ));
    toast({
      title: "Dokumen Disetujui",
      description: "Dokumen berhasil diverifikasi",
    });
    setSelectedDocument(null);
  };

  const handleReject = (docId: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Harap masukkan alasan penolakan",
        variant: "destructive",
      });
      return;
    }
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, status: "rejected" as const, rejectionReason } : doc
    ));
    toast({
      title: "Dokumen Ditolak",
      description: "Status dokumen telah diperbarui",
      variant: "destructive",
    });
    setSelectedDocument(null);
    setRejectionReason("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Verifikasi Dokumen</h2>
          <p className="text-muted-foreground">Periksa dan validasi dokumen calon siswa</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
                <p className="text-sm text-blue-600">Total Dokumen</p>
              </div>
              <FileText className="h-10 w-10 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
                <p className="text-sm text-yellow-600">Menunggu</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
                <p className="text-sm text-green-600">Disetujui</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
                <p className="text-sm text-red-600">Ditolak</p>
              </div>
              <XCircle className="h-10 w-10 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress Verifikasi</span>
            <span className="text-sm text-muted-foreground">
              {stats.approved + stats.rejected} / {stats.total} dokumen diproses
            </span>
          </div>
          <Progress value={((stats.approved + stats.rejected) / stats.total) * 100} className="h-3" />
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Daftar Dokumen</CardTitle>
          <CardDescription>{filteredDocuments.length} dokumen ditemukan</CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari nama siswa, ID, atau jenis dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Jenis Dokumen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                {documentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {filteredDocuments.map((doc) => {
              const StatusIcon = getStatusBadge(doc.status).icon;
              return (
                <div 
                  key={doc.id} 
                  className="flex items-center p-4 border rounded-xl hover:bg-muted/30 transition-all duration-200"
                >
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold truncate">{doc.documentType}</h4>
                      <Badge className={`${getStatusBadge(doc.status).color} border flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {getStatusBadge(doc.status).label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {doc.studentName}
                      </span>
                      <span>•</span>
                      <span>{doc.fileName}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                    {doc.rejectionReason && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        {doc.rejectionReason}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {doc.status === "pending" && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleApprove(doc.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setSelectedDocument(doc)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Document Preview Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => { setSelectedDocument(null); setRejectionReason(""); }}>
        <DialogContent className="max-w-3xl">
          {selectedDocument && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {selectedDocument.documentType}
                </DialogTitle>
                <DialogDescription>
                  Uploaded oleh {selectedDocument.studentName} pada {selectedDocument.uploadDate}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Document Preview Placeholder */}
                <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center">
                    <FileCheck className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">{selectedDocument.fileName}</p>
                    <p className="text-sm text-muted-foreground">{selectedDocument.fileSize}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <ZoomIn className="h-4 w-4 mr-2" />
                    Perbesar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RotateCw className="h-4 w-4 mr-2" />
                    Putar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Unduh
                  </Button>
                </div>

                {selectedDocument.status === "pending" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Alasan Penolakan (jika ditolak)</label>
                      <Textarea 
                        placeholder="Masukkan alasan penolakan..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(selectedDocument.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Setujui Dokumen
                      </Button>
                      <Button 
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleReject(selectedDocument.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Tolak Dokumen
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentVerification;
