import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Search,
  Book,
  Video,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Settings,
  Users,
  FileCheck,
  Calendar,
} from "lucide-react";

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      title: "Pendaftaran",
      icon: FileCheck,
      color: "bg-blue-100 text-blue-600",
      articles: 12,
    },
    {
      title: "Verifikasi Dokumen",
      icon: FileText,
      color: "bg-green-100 text-green-600",
      articles: 8,
    },
    {
      title: "Manajemen Pengguna",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      articles: 6,
    },
    {
      title: "Pengaturan Sistem",
      icon: Settings,
      color: "bg-orange-100 text-orange-600",
      articles: 10,
    },
    {
      title: "Jadwal & Kegiatan",
      icon: Calendar,
      color: "bg-pink-100 text-pink-600",
      articles: 5,
    },
  ];

  const faqs = [
    {
      question: "Bagaimana cara menambah pengguna baru?",
      answer: "Untuk menambah pengguna baru, pergi ke menu 'Kelola Pengguna' di sidebar, klik tombol 'Tambah Pengguna', isi formulir dengan data pengguna, pilih peran yang sesuai, lalu klik 'Simpan'. Pengguna baru akan menerima email konfirmasi untuk mengaktifkan akunnya.",
      category: "Manajemen Pengguna",
    },
    {
      question: "Bagaimana proses verifikasi dokumen?",
      answer: "Proses verifikasi dokumen dilakukan melalui menu 'Verifikasi Dokumen'. Anda dapat melihat daftar dokumen yang menunggu verifikasi, klik pada dokumen untuk melihat detail, periksa keaslian dan kelengkapan dokumen, lalu pilih 'Setujui' atau 'Tolak' dengan memberikan alasan jika ditolak.",
      category: "Verifikasi Dokumen",
    },
    {
      question: "Bagaimana cara mengubah periode pendaftaran?",
      answer: "Untuk mengubah periode pendaftaran, buka menu 'Data Sekolah', pilih tab 'Pendaftaran', atur tanggal mulai dan berakhir pendaftaran, serta tanggal pengumuman. Jangan lupa untuk mengaktifkan atau menonaktifkan status pendaftaran sesuai kebutuhan.",
      category: "Pendaftaran",
    },
    {
      question: "Bagaimana cara export data pendaftar?",
      answer: "Data pendaftar dapat diekspor melalui menu 'Export Data' di sidebar atau melalui tombol 'Export' yang tersedia di halaman 'Laporan'. Anda dapat memilih format file (PDF atau Excel) dan rentang data yang ingin diekspor.",
      category: "Laporan",
    },
    {
      question: "Bagaimana cara mengirim pengumuman ke pendaftar?",
      answer: "Untuk mengirim pengumuman, buka menu 'Pengumuman', klik 'Buat Pengumuman', isi judul dan konten pengumuman, pilih kategori dan target penerima, aktifkan opsi 'Kirim via Email' jika diperlukan, lalu publikasikan pengumuman.",
      category: "Pengumuman",
    },
    {
      question: "Apa yang harus dilakukan jika lupa password?",
      answer: "Jika lupa password, klik link 'Lupa Password' di halaman login, masukkan email yang terdaftar, dan ikuti instruksi yang dikirim ke email untuk mereset password. Jika masih mengalami kesulitan, hubungi administrator sistem.",
      category: "Akun",
    },
  ];

  const guides = [
    {
      title: "Panduan Memulai PPDB Online",
      description: "Langkah-langkah dasar untuk memulai penggunaan sistem",
      type: "Dokumentasi",
      icon: Book,
    },
    {
      title: "Video Tutorial Verifikasi Dokumen",
      description: "Cara melakukan verifikasi dokumen dengan benar",
      type: "Video",
      icon: Video,
    },
    {
      title: "Panduan Lengkap Manajemen Pengguna",
      description: "Mengelola pengguna dan hak akses sistem",
      type: "Dokumentasi",
      icon: Book,
    },
    {
      title: "Tutorial Membuat Laporan",
      description: "Cara membuat dan mengunduh laporan PPDB",
      type: "Video",
      icon: Video,
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Pusat Bantuan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Temukan jawaban untuk pertanyaan Anda tentang penggunaan sistem PPDB Online
        </p>
        
        <div className="max-w-xl mx-auto mt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Cari bantuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tips Cepat</h3>
              <p className="text-muted-foreground">
                Gunakan shortcut keyboard <kbd className="px-2 py-1 bg-background rounded border text-sm">Ctrl + K</kbd> untuk 
                membuka pencarian cepat di mana saja dalam aplikasi.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className={`inline-flex p-3 rounded-full ${category.color} mb-3`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-sm">{category.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{category.articles} artikel</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle>Pertanyaan yang Sering Diajukan</CardTitle>
            <CardDescription>Jawaban untuk pertanyaan umum</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-3">
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-0">
                      <Badge variant="outline" className="mb-2">{faq.category}</Badge>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Guides & Contact */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Panduan & Tutorial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {guides.map((guide, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <div className={`p-2 rounded-lg ${guide.type === 'Video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    <guide.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{guide.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{guide.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Butuh Bantuan Lebih?</CardTitle>
              <CardDescription>Hubungi tim support kami</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-3" />
                Live Chat
                <Badge className="ml-auto bg-green-500">Online</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-3" />
                support@ppdb.sekolah.id
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-3" />
                (021) 1234-5678
              </Button>
              <div className="pt-2">
                <p className="text-xs text-muted-foreground text-center">
                  Jam operasional: Senin - Jumat, 08:00 - 16:00 WIB
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
