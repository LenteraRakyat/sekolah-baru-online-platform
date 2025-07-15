
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  School,
  Save,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users,
  GraduationCap,
  Clock,
} from "lucide-react";

const SchoolSettings = () => {
  const { toast } = useToast();
  
  const [schoolData, setSchoolData] = useState({
    name: "SMP Negeri 1 Jakarta",
    npsn: "20109031",
    address: "Jl. Merdeka No. 123, Jakarta Pusat",
    phone: "(021) 3456789",
    email: "info@smpn1jakarta.sch.id",
    website: "www.smpn1jakarta.sch.id",
    principal: "Dr. Ahmad Suryadi, M.Pd",
    accreditation: "A",
    capacity: 480,
    description: "SMP Negeri 1 Jakarta adalah sekolah menengah pertama negeri yang berlokasi di Jakarta Pusat. Sekolah ini memiliki visi untuk menciptakan generasi yang cerdas, berkarakter, dan berprestasi.",
  });

  const [registrationSettings, setRegistrationSettings] = useState({
    isOpen: true,
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    announcementDate: "2024-05-15",
    maxApplications: 960,
    requirementMessage: "Silakan lengkapi semua dokumen yang diperlukan untuk proses verifikasi.",
  });

  const [systemSettings, setSystemSettings] = useState({
    autoVerification: false,
    emailNotifications: true,
    smsNotifications: false,
    allowLateRegistration: false,
    requireParentData: true,
    allowDocumentEdit: true,
  });

  const handleSaveSchoolData = () => {
    toast({
      title: "Data Sekolah Disimpan",
      description: "Informasi sekolah berhasil diperbarui",
    });
  };

  const handleSaveRegistrationSettings = () => {
    toast({
      title: "Pengaturan Pendaftaran Disimpan",
      description: "Konfigurasi pendaftaran berhasil diperbarui",
    });
  };

  const handleSaveSystemSettings = () => {
    toast({
      title: "Pengaturan Sistem Disimpan",
      description: "Konfigurasi sistem berhasil diperbarui",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pengaturan Sekolah</h2>
        <p className="text-muted-foreground">Kelola informasi dan konfigurasi sekolah</p>
      </div>

      <Tabs defaultValue="school" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="school">Data Sekolah</TabsTrigger>
          <TabsTrigger value="registration">Pendaftaran</TabsTrigger>
          <TabsTrigger value="system">Sistem</TabsTrigger>
        </TabsList>

        <TabsContent value="school">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Informasi Sekolah
              </CardTitle>
              <CardDescription>
                Kelola data dasar sekolah yang akan ditampilkan kepada calon siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">Nama Sekolah</Label>
                  <Input
                    id="schoolName"
                    value={schoolData.name}
                    onChange={(e) => setSchoolData({...schoolData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="npsn">NPSN</Label>
                  <Input
                    id="npsn"
                    value={schoolData.npsn}
                    onChange={(e) => setSchoolData({...schoolData, npsn: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Sekolah</Label>
                <Textarea
                  id="address"
                  value={schoolData.address}
                  onChange={(e) => setSchoolData({...schoolData, address: e.target.value})}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={schoolData.phone}
                    onChange={(e) => setSchoolData({...schoolData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={schoolData.email}
                    onChange={(e) => setSchoolData({...schoolData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={schoolData.website}
                    onChange={(e) => setSchoolData({...schoolData, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="principal">Kepala Sekolah</Label>
                  <Input
                    id="principal"
                    value={schoolData.principal}
                    onChange={(e) => setSchoolData({...schoolData, principal: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accreditation">Akreditasi</Label>
                  <Input
                    id="accreditation"
                    value={schoolData.accreditation}
                    onChange={(e) => setSchoolData({...schoolData, accreditation: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Kapasitas Siswa</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={schoolData.capacity}
                    onChange={(e) => setSchoolData({...schoolData, capacity: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Sekolah</Label>
                <Textarea
                  id="description"
                  value={schoolData.description}
                  onChange={(e) => setSchoolData({...schoolData, description: e.target.value})}
                  className="min-h-[120px]"
                />
              </div>

              <Button onClick={handleSaveSchoolData} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Data Sekolah
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Pengaturan Pendaftaran
              </CardTitle>
              <CardDescription>
                Konfigurasi periode dan aturan pendaftaran PPDB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Status Pendaftaran</h4>
                  <p className="text-sm text-muted-foreground">
                    {registrationSettings.isOpen ? "Pendaftaran sedang dibuka" : "Pendaftaran ditutup"}
                  </p>
                </div>
                <Switch
                  checked={registrationSettings.isOpen}
                  onCheckedChange={(checked) => 
                    setRegistrationSettings({...registrationSettings, isOpen: checked})
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={registrationSettings.startDate}
                    onChange={(e) => setRegistrationSettings({...registrationSettings, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Tanggal Berakhir</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={registrationSettings.endDate}
                    onChange={(e) => setRegistrationSettings({...registrationSettings, endDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="announcementDate">Tanggal Pengumuman</Label>
                  <Input
                    id="announcementDate"
                    type="date"
                    value={registrationSettings.announcementDate}
                    onChange={(e) => setRegistrationSettings({...registrationSettings, announcementDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxApplications">Maksimal Pendaftar</Label>
                <Input
                  id="maxApplications"
                  type="number"
                  value={registrationSettings.maxApplications}
                  onChange={(e) => setRegistrationSettings({...registrationSettings, maxApplications: parseInt(e.target.value)})}
                />
                <p className="text-sm text-muted-foreground">
                  Batas maksimal jumlah pendaftar yang dapat mengajukan permohonan
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirementMessage">Pesan Persyaratan</Label>
                <Textarea
                  id="requirementMessage"
                  value={registrationSettings.requirementMessage}
                  onChange={(e) => setRegistrationSettings({...registrationSettings, requirementMessage: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              <Button onClick={handleSaveRegistrationSettings} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Pendaftaran
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pengaturan Sistem
              </CardTitle>
              <CardDescription>
                Konfigurasi fitur dan automasi sistem PPDB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Verifikasi Otomatis</h4>
                    <p className="text-sm text-muted-foreground">
                      Otomatis verifikasi dokumen yang memenuhi kriteria
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.autoVerification}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, autoVerification: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Notifikasi Email</h4>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi status pendaftaran via email
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, emailNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Notifikasi SMS</h4>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi penting via SMS
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, smsNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Pendaftaran Terlambat</h4>
                    <p className="text-sm text-muted-foreground">
                      Izinkan pendaftaran setelah batas waktu dengan persetujuan admin
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.allowLateRegistration}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, allowLateRegistration: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Data Orang Tua Wajib</h4>
                    <p className="text-sm text-muted-foreground">
                      Wajibkan pengisian data lengkap orang tua/wali
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.requireParentData}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, requireParentData: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Edit Dokumen</h4>
                    <p className="text-sm text-muted-foreground">
                      Izinkan siswa mengedit dokumen yang sudah diupload
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.allowDocumentEdit}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, allowDocumentEdit: checked})
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSaveSystemSettings} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Sistem
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolSettings;
