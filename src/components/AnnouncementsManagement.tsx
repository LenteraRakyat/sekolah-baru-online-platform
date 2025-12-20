import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Send,
  Calendar,
  Users,
  Mail,
  MessageSquare,
  Megaphone,
  Pin,
  Clock,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "info" | "important" | "urgent" | "schedule";
  status: "draft" | "published" | "scheduled";
  targetAudience: "all" | "pending" | "approved" | "rejected";
  isPinned: boolean;
  createdAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  author: string;
  views: number;
}

const AnnouncementsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    category: "info" as const,
    targetAudience: "all" as const,
    isPinned: false,
    sendEmail: false,
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "ANN001",
      title: "Jadwal Verifikasi Dokumen Tahap 1",
      content: "Verifikasi dokumen tahap pertama akan dilaksanakan pada tanggal 20-25 Januari 2024. Pastikan semua dokumen sudah lengkap.",
      category: "schedule",
      status: "published",
      targetAudience: "all",
      isPinned: true,
      createdAt: "2024-01-15 10:00",
      publishedAt: "2024-01-15 10:00",
      author: "Admin PPDB",
      views: 1250,
    },
    {
      id: "ANN002",
      title: "Pengumuman Hasil Seleksi Awal",
      content: "Hasil seleksi awal akan diumumkan pada tanggal 1 Februari 2024 melalui website resmi dan email masing-masing pendaftar.",
      category: "important",
      status: "scheduled",
      targetAudience: "all",
      isPinned: false,
      createdAt: "2024-01-14 14:30",
      scheduledAt: "2024-02-01 08:00",
      author: "Admin PPDB",
      views: 0,
    },
    {
      id: "ANN003",
      title: "Perpanjangan Waktu Pendaftaran",
      content: "Pendaftaran PPDB diperpanjang hingga tanggal 15 Februari 2024. Segera daftarkan diri Anda!",
      category: "urgent",
      status: "published",
      targetAudience: "all",
      isPinned: false,
      createdAt: "2024-01-13 09:00",
      publishedAt: "2024-01-13 09:00",
      author: "Admin PPDB",
      views: 890,
    },
    {
      id: "ANN004",
      title: "Tips Mengisi Formulir Pendaftaran",
      content: "Berikut adalah beberapa tips untuk mengisi formulir pendaftaran dengan benar dan lengkap...",
      category: "info",
      status: "draft",
      targetAudience: "pending",
      isPinned: false,
      createdAt: "2024-01-12 16:00",
      author: "Admin PPDB",
      views: 0,
    },
  ]);

  const getCategoryBadge = (category: string) => {
    const variants = {
      info: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Informasi", icon: MessageSquare },
      important: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Penting", icon: Bell },
      urgent: { color: "bg-red-100 text-red-800 border-red-200", label: "Mendesak", icon: Megaphone },
      schedule: { color: "bg-green-100 text-green-800 border-green-200", label: "Jadwal", icon: Calendar },
    };
    return variants[category as keyof typeof variants] || variants.info;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: { color: "bg-gray-100 text-gray-800", label: "Draft" },
      published: { color: "bg-green-100 text-green-800", label: "Dipublikasikan" },
      scheduled: { color: "bg-yellow-100 text-yellow-800", label: "Terjadwal" },
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ann.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: "Error",
        description: "Judul dan konten harus diisi",
        variant: "destructive",
      });
      return;
    }

    const newAnn: Announcement = {
      id: `ANN${String(announcements.length + 1).padStart(3, '0')}`,
      ...newAnnouncement,
      status: "draft",
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      author: "Admin PPDB",
      views: 0,
    };

    setAnnouncements([newAnn, ...announcements]);
    setNewAnnouncement({
      title: "",
      content: "",
      category: "info",
      targetAudience: "all",
      isPinned: false,
      sendEmail: false,
    });
    setIsCreateOpen(false);
    
    toast({
      title: "Pengumuman Dibuat",
      description: "Pengumuman berhasil disimpan sebagai draft",
    });
  };

  const handlePublish = (id: string) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id 
        ? { ...ann, status: "published" as const, publishedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
        : ann
    ));
    toast({
      title: "Pengumuman Dipublikasikan",
      description: "Pengumuman berhasil dipublikasikan",
    });
  };

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    toast({
      title: "Pengumuman Dihapus",
      description: "Pengumuman berhasil dihapus",
    });
  };

  const handleTogglePin = (id: string) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id ? { ...ann, isPinned: !ann.isPinned } : ann
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Kelola Pengumuman</h2>
          <p className="text-muted-foreground">Buat dan kelola pengumuman untuk calon siswa</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Buat Pengumuman
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Buat Pengumuman Baru</DialogTitle>
              <DialogDescription>
                Buat pengumuman untuk disampaikan kepada calon siswa
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Pengumuman</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul pengumuman"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Isi Pengumuman</Label>
                <Textarea
                  id="content"
                  placeholder="Masukkan isi pengumuman..."
                  className="min-h-[150px]"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select
                    value={newAnnouncement.category}
                    onValueChange={(v) => setNewAnnouncement({...newAnnouncement, category: v as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Informasi</SelectItem>
                      <SelectItem value="important">Penting</SelectItem>
                      <SelectItem value="urgent">Mendesak</SelectItem>
                      <SelectItem value="schedule">Jadwal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Target Penerima</Label>
                  <Select
                    value={newAnnouncement.targetAudience}
                    onValueChange={(v) => setNewAnnouncement({...newAnnouncement, targetAudience: v as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Pendaftar</SelectItem>
                      <SelectItem value="pending">Menunggu Verifikasi</SelectItem>
                      <SelectItem value="approved">Sudah Diterima</SelectItem>
                      <SelectItem value="rejected">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Pin Pengumuman</p>
                  <p className="text-sm text-muted-foreground">Tampilkan di bagian atas</p>
                </div>
                <Switch
                  checked={newAnnouncement.isPinned}
                  onCheckedChange={(v) => setNewAnnouncement({...newAnnouncement, isPinned: v})}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Kirim via Email</p>
                  <p className="text-sm text-muted-foreground">Kirim notifikasi email ke penerima</p>
                </div>
                <Switch
                  checked={newAnnouncement.sendEmail}
                  onCheckedChange={(v) => setNewAnnouncement({...newAnnouncement, sendEmail: v})}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsCreateOpen(false)}>
                  Batal
                </Button>
                <Button className="flex-1" onClick={handleCreateAnnouncement}>
                  Simpan sebagai Draft
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Megaphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{announcements.length}</p>
              <p className="text-sm text-muted-foreground">Total Pengumuman</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Send className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{announcements.filter(a => a.status === "published").length}</p>
              <p className="text-sm text-muted-foreground">Dipublikasikan</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{announcements.filter(a => a.status === "scheduled").length}</p>
              <p className="text-sm text-muted-foreground">Terjadwal</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <Edit className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{announcements.filter(a => a.status === "draft").length}</p>
              <p className="text-sm text-muted-foreground">Draft</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari pengumuman..."
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
                <SelectItem value="published">Dipublikasikan</SelectItem>
                <SelectItem value="scheduled">Terjadwal</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredAnnouncements.map((ann) => {
              const CategoryIcon = getCategoryBadge(ann.category).icon;
              return (
                <div 
                  key={ann.id} 
                  className={`p-4 border rounded-xl hover:bg-muted/30 transition-all duration-200 ${ann.isPinned ? 'border-primary/50 bg-primary/5' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getCategoryBadge(ann.category).color}`}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {ann.isPinned && (
                          <Pin className="h-4 w-4 text-primary" />
                        )}
                        <h4 className="font-semibold">{ann.title}</h4>
                        <Badge className={`${getCategoryBadge(ann.category).color} border`}>
                          {getCategoryBadge(ann.category).label}
                        </Badge>
                        <Badge variant="outline" className={getStatusBadge(ann.status).color}>
                          {getStatusBadge(ann.status).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{ann.content}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span>Dibuat: {ann.createdAt}</span>
                        {ann.publishedAt && <span>Dipublikasikan: {ann.publishedAt}</span>}
                        {ann.scheduledAt && <span>Dijadwalkan: {ann.scheduledAt}</span>}
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {ann.views} views
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleTogglePin(ann.id)}
                        className={ann.isPinned ? "text-primary" : ""}
                      >
                        <Pin className="h-4 w-4" />
                      </Button>
                      {ann.status === "draft" && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => handlePublish(ann.id)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(ann.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementsManagement;
