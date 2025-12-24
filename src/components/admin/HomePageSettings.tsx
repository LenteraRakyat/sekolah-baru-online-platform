import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Home,
  Image,
  BarChart3,
  Calendar,
  HelpCircle,
  FileText,
  MessageSquare,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

const HomePageSettings = () => {
  const { toast } = useToast();

  // Hero Section Settings
  const [heroSettings, setHeroSettings] = useState({
    title: "Mencetak Generasi Qur'ani, Yang Cerdas, Cermat, Intelek, Kreatif dan Mandiri serta Berakhlak Mulia",
    subtitle: "Penerimaan Siswa Baru Tahun Ajaran 2026/2027",
    description: "Pondok Pesantren Antar Benua memadukan pendidikan pesantren, kurikulum nasional, dan teknologi modern",
    showDaftarButton: true,
    showLoginButton: true,
    daftarButtonText: "Daftar Sekarang",
    loginButtonText: "Login Siswa",
  });

  // Selayang Pandang Settings
  const [aboutSettings, setAboutSettings] = useState({
    title: "Selayang Pandang",
    description: "Pondok Pesantren Antar Benua adalah lembaga pendidikan Islam terpadu yang menggabungkan pendidikan pesantren tradisional dengan kurikulum nasional dan teknologi modern.",
    foundedYear: "2010",
    founderText: "Mendidik Generasi Qur'ani",
    showStats: true,
    stats: [
      { label: "Santri Aktif", value: "500+", color: "blue" },
      { label: "Tenaga Pengajar", value: "50+", color: "purple" },
      { label: "Tingkat Kelulusan", value: "95%", color: "green" },
      { label: "Penghafal Al-Qur'an", value: "100+", color: "orange" },
    ],
  });

  // Timeline Settings
  const [timelineSettings, setTimelineSettings] = useState({
    title: "Timeline PPDB 2024",
    description: "Ikuti setiap tahapan penerimaan peserta didik baru dengan seksama",
    showSection: true,
    phases: [
      { phase: "Pendaftaran", startDate: "2024-01-01", endDate: "2024-01-15", status: "active" },
      { phase: "Verifikasi Berkas", startDate: "2024-01-16", endDate: "2024-01-20", status: "upcoming" },
      { phase: "Pengumuman", startDate: "2024-01-25", endDate: "2024-01-25", status: "upcoming" },
      { phase: "Daftar Ulang", startDate: "2024-01-26", endDate: "2024-01-30", status: "upcoming" },
    ],
  });

  // Statistics Section Settings
  const [statsSettings, setStatsSettings] = useState({
    showSection: true,
    totalPendaftar: "1,250",
    berkasVerifikasi: "890",
    kuotaTersedia: "360",
  });

  // FAQ Settings
  const [faqSettings, setFaqSettings] = useState({
    title: "Tanya Jawab (FAQ)",
    showSection: true,
    items: [
      { question: "Bagaimana cara mendaftar di Pondok Pesantren Antar Benua?", answer: "Pendaftaran dapat dilakukan secara online melalui website ini..." },
      { question: "Apa saja persyaratan dokumen yang harus disiapkan?", answer: "Dokumen yang diperlukan meliputi fotokopi ijazah..." },
      { question: "Kapan periode pendaftaran PPDB?", answer: "Periode pendaftaran PPDB tahun ajaran 2026/2027..." },
      { question: "Apakah ada biaya pendaftaran?", answer: "Biaya pendaftaran sebesar Rp 100.000..." },
    ],
  });

  // Footer Settings
  const [footerSettings, setFooterSettings] = useState({
    schoolName: "Pondok Pesantren Antar Benua",
    address: "Jl. Pesantren No. 123, Jakarta Selatan",
    phone: "(021) 1234567",
    email: "info@ppab.sch.id",
    whatsapp: "081234567890",
    showSocialMedia: true,
    socialLinks: {
      facebook: "",
      instagram: "",
      youtube: "",
      twitter: "",
    },
  });

  const handleSaveHero = () => {
    toast({
      title: "Pengaturan Hero Disimpan",
      description: "Konten hero section berhasil diperbarui",
    });
  };

  const handleSaveAbout = () => {
    toast({
      title: "Pengaturan Selayang Pandang Disimpan",
      description: "Konten selayang pandang berhasil diperbarui",
    });
  };

  const handleSaveTimeline = () => {
    toast({
      title: "Pengaturan Timeline Disimpan",
      description: "Konfigurasi timeline berhasil diperbarui",
    });
  };

  const handleSaveStats = () => {
    toast({
      title: "Pengaturan Statistik Disimpan",
      description: "Data statistik berhasil diperbarui",
    });
  };

  const handleSaveFaq = () => {
    toast({
      title: "Pengaturan FAQ Disimpan",
      description: "Daftar FAQ berhasil diperbarui",
    });
  };

  const handleSaveFooter = () => {
    toast({
      title: "Pengaturan Footer Disimpan",
      description: "Konten footer berhasil diperbarui",
    });
  };

  const addFaqItem = () => {
    setFaqSettings(prev => ({
      ...prev,
      items: [...prev.items, { question: "", answer: "" }],
    }));
  };

  const removeFaqItem = (index: number) => {
    setFaqSettings(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateFaqItem = (index: number, field: 'question' | 'answer', value: string) => {
    setFaqSettings(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addTimelinePhase = () => {
    setTimelineSettings(prev => ({
      ...prev,
      phases: [...prev.phases, { phase: "", startDate: "", endDate: "", status: "upcoming" }],
    }));
  };

  const removeTimelinePhase = (index: number) => {
    setTimelineSettings(prev => ({
      ...prev,
      phases: prev.phases.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pengaturan Halaman Beranda</h2>
        <p className="text-muted-foreground">Kelola konten yang ditampilkan di halaman utama website</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="hero" className="text-xs">Hero</TabsTrigger>
          <TabsTrigger value="about" className="text-xs">Selayang Pandang</TabsTrigger>
          <TabsTrigger value="timeline" className="text-xs">Timeline</TabsTrigger>
          <TabsTrigger value="stats" className="text-xs">Statistik</TabsTrigger>
          <TabsTrigger value="faq" className="text-xs">FAQ</TabsTrigger>
          <TabsTrigger value="footer" className="text-xs">Footer</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Hero Section
              </CardTitle>
              <CardDescription>
                Kelola tampilan dan konten utama di bagian atas halaman beranda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Subtitle (Tahun Ajaran)</Label>
                <Input
                  id="heroSubtitle"
                  value={heroSettings.subtitle}
                  onChange={(e) => setHeroSettings({ ...heroSettings, subtitle: e.target.value })}
                  placeholder="Penerimaan Siswa Baru Tahun Ajaran..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroTitle">Judul Utama</Label>
                <Textarea
                  id="heroTitle"
                  value={heroSettings.title}
                  onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroDescription">Deskripsi</Label>
                <Textarea
                  id="heroDescription"
                  value={heroSettings.description}
                  onChange={(e) => setHeroSettings({ ...heroSettings, description: e.target.value })}
                  className="min-h-[60px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Tombol Daftar</h4>
                    <p className="text-sm text-muted-foreground">Tampilkan tombol pendaftaran</p>
                  </div>
                  <Switch
                    checked={heroSettings.showDaftarButton}
                    onCheckedChange={(checked) => setHeroSettings({ ...heroSettings, showDaftarButton: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Tombol Login</h4>
                    <p className="text-sm text-muted-foreground">Tampilkan tombol login siswa</p>
                  </div>
                  <Switch
                    checked={heroSettings.showLoginButton}
                    onCheckedChange={(checked) => setHeroSettings({ ...heroSettings, showLoginButton: checked })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="daftarButtonText">Teks Tombol Daftar</Label>
                  <Input
                    id="daftarButtonText"
                    value={heroSettings.daftarButtonText}
                    onChange={(e) => setHeroSettings({ ...heroSettings, daftarButtonText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginButtonText">Teks Tombol Login</Label>
                  <Input
                    id="loginButtonText"
                    value={heroSettings.loginButtonText}
                    onChange={(e) => setHeroSettings({ ...heroSettings, loginButtonText: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleSaveHero} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Hero
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Selayang Pandang Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Selayang Pandang
              </CardTitle>
              <CardDescription>
                Kelola informasi selayang pandang pesantren
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aboutTitle">Judul Section</Label>
                <Input
                  id="aboutTitle"
                  value={aboutSettings.title}
                  onChange={(e) => setAboutSettings({ ...aboutSettings, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutDescription">Deskripsi</Label>
                <Textarea
                  id="aboutDescription"
                  value={aboutSettings.description}
                  onChange={(e) => setAboutSettings({ ...aboutSettings, description: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Tahun Berdiri</Label>
                  <Input
                    id="foundedYear"
                    value={aboutSettings.foundedYear}
                    onChange={(e) => setAboutSettings({ ...aboutSettings, foundedYear: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founderText">Teks Tagline</Label>
                  <Input
                    id="founderText"
                    value={aboutSettings.founderText}
                    onChange={(e) => setAboutSettings({ ...aboutSettings, founderText: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tampilkan Statistik</h4>
                  <p className="text-sm text-muted-foreground">Tampilkan kartu statistik di section ini</p>
                </div>
                <Switch
                  checked={aboutSettings.showStats}
                  onCheckedChange={(checked) => setAboutSettings({ ...aboutSettings, showStats: checked })}
                />
              </div>

              {aboutSettings.showStats && (
                <div className="space-y-4">
                  <Label>Statistik Selayang Pandang</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aboutSettings.stats.map((stat, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-2">
                        <Input
                          placeholder="Label"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...aboutSettings.stats];
                            newStats[index].label = e.target.value;
                            setAboutSettings({ ...aboutSettings, stats: newStats });
                          }}
                        />
                        <Input
                          placeholder="Nilai"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...aboutSettings.stats];
                            newStats[index].value = e.target.value;
                            setAboutSettings({ ...aboutSettings, stats: newStats });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={handleSaveAbout} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Selayang Pandang
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline PPDB
              </CardTitle>
              <CardDescription>
                Kelola tahapan dan jadwal PPDB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tampilkan Timeline</h4>
                  <p className="text-sm text-muted-foreground">Tampilkan section timeline di halaman beranda</p>
                </div>
                <Switch
                  checked={timelineSettings.showSection}
                  onCheckedChange={(checked) => setTimelineSettings({ ...timelineSettings, showSection: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timelineTitle">Judul Section</Label>
                  <Input
                    id="timelineTitle"
                    value={timelineSettings.title}
                    onChange={(e) => setTimelineSettings({ ...timelineSettings, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timelineDesc">Deskripsi</Label>
                  <Input
                    id="timelineDesc"
                    value={timelineSettings.description}
                    onChange={(e) => setTimelineSettings({ ...timelineSettings, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Tahapan PPDB</Label>
                  <Button variant="outline" size="sm" onClick={addTimelinePhase}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Tahapan
                  </Button>
                </div>
                
                {timelineSettings.phases.map((phase, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <Badge variant={phase.status === 'active' ? 'default' : 'secondary'}>
                          {phase.status === 'active' ? 'Aktif' : 'Mendatang'}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeTimelinePhase(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Input
                        placeholder="Nama Tahapan"
                        value={phase.phase}
                        onChange={(e) => {
                          const newPhases = [...timelineSettings.phases];
                          newPhases[index].phase = e.target.value;
                          setTimelineSettings({ ...timelineSettings, phases: newPhases });
                        }}
                      />
                      <Input
                        type="date"
                        value={phase.startDate}
                        onChange={(e) => {
                          const newPhases = [...timelineSettings.phases];
                          newPhases[index].startDate = e.target.value;
                          setTimelineSettings({ ...timelineSettings, phases: newPhases });
                        }}
                      />
                      <Input
                        type="date"
                        value={phase.endDate}
                        onChange={(e) => {
                          const newPhases = [...timelineSettings.phases];
                          newPhases[index].endDate = e.target.value;
                          setTimelineSettings({ ...timelineSettings, phases: newPhases });
                        }}
                      />
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={phase.status}
                        onChange={(e) => {
                          const newPhases = [...timelineSettings.phases];
                          newPhases[index].status = e.target.value;
                          setTimelineSettings({ ...timelineSettings, phases: newPhases });
                        }}
                      >
                        <option value="active">Aktif</option>
                        <option value="upcoming">Mendatang</option>
                        <option value="completed">Selesai</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleSaveTimeline} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Timeline
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Statistik Pendaftaran
              </CardTitle>
              <CardDescription>
                Kelola angka statistik yang ditampilkan di halaman beranda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tampilkan Section Statistik</h4>
                  <p className="text-sm text-muted-foreground">Tampilkan kartu statistik pendaftaran</p>
                </div>
                <Switch
                  checked={statsSettings.showSection}
                  onCheckedChange={(checked) => setStatsSettings({ ...statsSettings, showSection: checked })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="totalPendaftar">Total Pendaftar</Label>
                  <Input
                    id="totalPendaftar"
                    value={statsSettings.totalPendaftar}
                    onChange={(e) => setStatsSettings({ ...statsSettings, totalPendaftar: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="berkasVerifikasi">Berkas Terverifikasi</Label>
                  <Input
                    id="berkasVerifikasi"
                    value={statsSettings.berkasVerifikasi}
                    onChange={(e) => setStatsSettings({ ...statsSettings, berkasVerifikasi: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kuotaTersedia">Kuota Tersedia</Label>
                  <Input
                    id="kuotaTersedia"
                    value={statsSettings.kuotaTersedia}
                    onChange={(e) => setStatsSettings({ ...statsSettings, kuotaTersedia: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleSaveStats} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Statistik
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Tanya Jawab (FAQ)
              </CardTitle>
              <CardDescription>
                Kelola daftar pertanyaan yang sering diajukan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tampilkan Section FAQ</h4>
                  <p className="text-sm text-muted-foreground">Tampilkan daftar FAQ di halaman beranda</p>
                </div>
                <Switch
                  checked={faqSettings.showSection}
                  onCheckedChange={(checked) => setFaqSettings({ ...faqSettings, showSection: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="faqTitle">Judul Section</Label>
                <Input
                  id="faqTitle"
                  value={faqSettings.title}
                  onChange={(e) => setFaqSettings({ ...faqSettings, title: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Daftar Pertanyaan</Label>
                  <Button variant="outline" size="sm" onClick={addFaqItem}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah FAQ
                  </Button>
                </div>

                {faqSettings.items.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">FAQ #{index + 1}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => removeFaqItem(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label>Pertanyaan</Label>
                      <Input
                        placeholder="Tulis pertanyaan..."
                        value={item.question}
                        onChange={(e) => updateFaqItem(index, 'question', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Jawaban</Label>
                      <Textarea
                        placeholder="Tulis jawaban..."
                        value={item.answer}
                        onChange={(e) => updateFaqItem(index, 'answer', e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleSaveFaq} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan FAQ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Tab */}
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Footer Website
              </CardTitle>
              <CardDescription>
                Kelola informasi kontak dan link di bagian footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="footerSchoolName">Nama Sekolah</Label>
                  <Input
                    id="footerSchoolName"
                    value={footerSettings.schoolName}
                    onChange={(e) => setFooterSettings({ ...footerSettings, schoolName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerPhone">Nomor Telepon</Label>
                  <Input
                    id="footerPhone"
                    value={footerSettings.phone}
                    onChange={(e) => setFooterSettings({ ...footerSettings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="footerAddress">Alamat</Label>
                <Textarea
                  id="footerAddress"
                  value={footerSettings.address}
                  onChange={(e) => setFooterSettings({ ...footerSettings, address: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="footerEmail">Email</Label>
                  <Input
                    id="footerEmail"
                    type="email"
                    value={footerSettings.email}
                    onChange={(e) => setFooterSettings({ ...footerSettings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerWhatsapp">WhatsApp</Label>
                  <Input
                    id="footerWhatsapp"
                    value={footerSettings.whatsapp}
                    onChange={(e) => setFooterSettings({ ...footerSettings, whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tampilkan Media Sosial</h4>
                  <p className="text-sm text-muted-foreground">Tampilkan link media sosial di footer</p>
                </div>
                <Switch
                  checked={footerSettings.showSocialMedia}
                  onCheckedChange={(checked) => setFooterSettings({ ...footerSettings, showSocialMedia: checked })}
                />
              </div>

              {footerSettings.showSocialMedia && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      placeholder="https://facebook.com/..."
                      value={footerSettings.socialLinks.facebook}
                      onChange={(e) => setFooterSettings({
                        ...footerSettings,
                        socialLinks: { ...footerSettings.socialLinks, facebook: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      placeholder="https://instagram.com/..."
                      value={footerSettings.socialLinks.instagram}
                      onChange={(e) => setFooterSettings({
                        ...footerSettings,
                        socialLinks: { ...footerSettings.socialLinks, instagram: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube URL</Label>
                    <Input
                      id="youtube"
                      placeholder="https://youtube.com/..."
                      value={footerSettings.socialLinks.youtube}
                      onChange={(e) => setFooterSettings({
                        ...footerSettings,
                        socialLinks: { ...footerSettings.socialLinks, youtube: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter/X URL</Label>
                    <Input
                      id="twitter"
                      placeholder="https://twitter.com/..."
                      value={footerSettings.socialLinks.twitter}
                      onChange={(e) => setFooterSettings({
                        ...footerSettings,
                        socialLinks: { ...footerSettings.socialLinks, twitter: e.target.value }
                      })}
                    />
                  </div>
                </div>
              )}

              <Button onClick={handleSaveFooter} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Footer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePageSettings;
