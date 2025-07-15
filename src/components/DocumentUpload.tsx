
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Upload, 
  Download, 
  Edit, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  name: string;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  required: boolean;
  file?: File;
  uploadDate?: string;
  rejectionReason?: string;
}

interface DocumentUploadProps {
  documents: Document[];
  onDocumentUpload: (docName: string, file: File) => void;
  onDocumentDelete: (docName: string) => void;
  readonly?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  documents, 
  onDocumentUpload, 
  onDocumentDelete,
  readonly = false 
}) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: "Belum Upload", color: "bg-gray-100 text-gray-800" },
      uploaded: { label: "Menunggu Review", color: "bg-blue-100 text-blue-800" },
      approved: { label: "Disetujui", color: "bg-green-100 text-green-800" },
      rejected: { label: "Ditolak", color: "bg-red-100 text-red-800" },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const handleFileUpload = async (docName: string, file: File) => {
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Format file tidak didukung",
        description: "Silakan upload file PDF, JPG, atau PNG",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Ukuran file terlalu besar",
        description: "Maksimal ukuran file adalah 2MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(docName);
    
    // Simulate upload delay
    setTimeout(() => {
      onDocumentUpload(docName, file);
      setUploading(null);
      toast({
        title: "File berhasil diupload",
        description: `${docName} telah berhasil diupload dan menunggu verifikasi`,
      });
    }, 1000);
  };

  const handleDelete = (docName: string) => {
    onDocumentDelete(docName);
    toast({
      title: "File dihapus",
      description: `${docName} telah dihapus`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <h4 className="font-medium text-gray-900 text-sm leading-tight">
                  {doc.name}
                </h4>
              </div>
              {doc.required && (
                <span className="text-xs text-red-500 font-medium">Wajib</span>
              )}
            </div>
            
            <div className="space-y-3">
              <Badge className={`${getStatusBadge(doc.status).color} text-xs`}>
                {getStatusBadge(doc.status).label}
              </Badge>

              {doc.status === 'rejected' && doc.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-md p-2">
                  <p className="text-xs text-red-700 font-medium">Alasan penolakan:</p>
                  <p className="text-xs text-red-600">{doc.rejectionReason}</p>
                </div>
              )}

              {doc.uploadDate && (
                <p className="text-xs text-gray-500">
                  Upload: {doc.uploadDate}
                </p>
              )}

              <div className="flex gap-2">
                {doc.status === 'pending' || doc.status === 'rejected' ? (
                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(doc.name, file);
                      }}
                      className="hidden"
                      id={`file-${index}`}
                      disabled={readonly || uploading === doc.name}
                    />
                    <label htmlFor={`file-${index}`}>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full cursor-pointer"
                        disabled={readonly || uploading === doc.name}
                        asChild
                      >
                        <span>
                          {uploading === doc.name ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-1"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-3 w-3 mr-1" />
                              Upload
                            </>
                          )}
                        </span>
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="flex gap-1 w-full">
                    <Button size="sm" variant="ghost" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Lihat
                    </Button>
                    {!readonly && (
                      <>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(doc.name)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DocumentUpload;
