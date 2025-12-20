import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  Settings,
  Save,
  Bell,
  Mail,
  Shield,
  Database,
  Palette,
  Globe,
  Clock,
  Lock,
  Key,
  RefreshCw,
  HardDrive,
  Trash2,
  AlertTriangle,
} from "lucide-react";

const SystemSettings = () => {
  const { toast } = useToast();

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "PPDB Online SMP Negeri 1",
    siteDescription: "Sistem Penerimaan Peserta Didik Baru",
    timezone: "Asia/Jakarta",
    language: "id",
    maintenanceMode: false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    emailServer: "smtp.sekolah.id",
    emailPort: "587",
    emailUsername: "noreply@sekolah.id",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireSpecialChar: true,
    requireUppercase: true,
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: 30,
    lastBackup: "2024-01-15 02:00",
  });

  const handleSaveGeneral = () => {
    toast({
      title: "Pengaturan Umum Disimpan",
      description: "Perubahan berhasil diterapkan",
    });
  };

  const handleSaveNotification = () => {
    toast({
      title: "Pengaturan Notifikasi Disimpan",
      description: "Konfigurasi notifikasi berhasil diperbarui",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Pengaturan Keamanan Disimpan",
      description: "Kebijakan keamanan berhasil diperbarui",
    });
  };

  const handleBackupNow = () => {
    toast({
      title: "Backup Dimulai",
      description: "Proses backup sedang berjalan...",
    });
  };

  const handleClearCache = () => {
    toast({
      title: "Cache Dibersihkan",
      description: "Cache sistem berhasil dihapus",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pengaturan Sistem</h2>
        <p className="text-muted-foreground">Konfigurasi dan pengaturan sistem PPDB</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Umum</span>
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifikasi</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Keamanan</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Backup</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Pengaturan Umum
              </CardTitle>
              <CardDescription>
                Konfigurasi dasar sistem PPDB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nama Situs</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDesc">Deskripsi Situs</Label>
                  <Input
                    id="siteDesc"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Zona Waktu</Label>
                  <Select 
                    value={generalSettings.timezone}
                    onValueChange={(v) => setGeneralSettings({...generalSettings, timezone: v})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jakarta">WIB (Jakarta)</SelectItem>
                      <SelectItem value="Asia/Makassar">WITA (Makassar)</SelectItem>
                      <SelectItem value="Asia/Jayapura">WIT (Jayapura)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bahasa</Label>
                  <Select 
                    value={generalSettings.language}
                    onValueChange={(v) => setGeneralSettings({...generalSettings, language: v})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Mode Pemeliharaan</h4>
                    <p className="text-sm text-yellow-700">
                      Aktifkan untuk menonaktifkan akses publik sementara
                    </p>
                  </div>
                </div>
                <Switch
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(v) => setGeneralSettings({...generalSettings, maintenanceMode: v})}
                />
              </div>

              <Button onClick={handleSaveGeneral}>
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notification">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Pengaturan Notifikasi
              </CardTitle>
              <CardDescription>
                Konfigurasi email, SMS, dan notifikasi push
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Notifikasi Email</h4>
                      <p className="text-sm text-muted-foreground">Kirim notifikasi via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailEnabled}
                    onCheckedChange={(v) => setNotificationSettings({...notificationSettings, emailEnabled: v})}
                  />
                </div>

                {notificationSettings.emailEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 border-l-2 border-primary/20">
                    <div className="space-y-2">
                      <Label>Server SMTP</Label>
                      <Input
                        value={notificationSettings.emailServer}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailServer: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Port</Label>
                      <Input
                        value={notificationSettings.emailPort}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailPort: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input
                        value={notificationSettings.emailUsername}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailUsername: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Notifikasi Push</h4>
                      <p className="text-sm text-muted-foreground">Kirim notifikasi browser</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.pushEnabled}
                    onCheckedChange={(v) => setNotificationSettings({...notificationSettings, pushEnabled: v})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageSquareIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Notifikasi SMS</h4>
                      <p className="text-sm text-muted-foreground">Kirim SMS untuk notifikasi penting</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsEnabled}
                    onCheckedChange={(v) => setNotificationSettings({...notificationSettings, smsEnabled: v})}
                  />
                </div>
              </div>

              <Button onClick={handleSaveNotification}>
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Pengaturan Keamanan
              </CardTitle>
              <CardDescription>
                Konfigurasi kebijakan keamanan sistem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Autentikasi Dua Faktor</h4>
                    <p className="text-sm text-muted-foreground">Wajibkan 2FA untuk semua admin</p>
                  </div>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(v) => setSecuritySettings({...securitySettings, twoFactorAuth: v})}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Batas Waktu Sesi (menit)</Label>
                    <span className="text-sm text-muted-foreground">{securitySettings.sessionTimeout} menit</span>
                  </div>
                  <Slider
                    value={[securitySettings.sessionTimeout]}
                    onValueChange={(v) => setSecuritySettings({...securitySettings, sessionTimeout: v[0]})}
                    min={5}
                    max={120}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Maksimal Percobaan Login</Label>
                    <span className="text-sm text-muted-foreground">{securitySettings.maxLoginAttempts} kali</span>
                  </div>
                  <Slider
                    value={[securitySettings.maxLoginAttempts]}
                    onValueChange={(v) => setSecuritySettings({...securitySettings, maxLoginAttempts: v[0]})}
                    min={3}
                    max={10}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Panjang Password Minimal</Label>
                    <span className="text-sm text-muted-foreground">{securitySettings.passwordMinLength} karakter</span>
                  </div>
                  <Slider
                    value={[securitySettings.passwordMinLength]}
                    onValueChange={(v) => setSecuritySettings({...securitySettings, passwordMinLength: v[0]})}
                    min={6}
                    max={16}
                    step={1}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">Wajib Karakter Khusus</span>
                  <Switch
                    checked={securitySettings.requireSpecialChar}
                    onCheckedChange={(v) => setSecuritySettings({...securitySettings, requireSpecialChar: v})}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">Wajib Huruf Besar</span>
                  <Switch
                    checked={securitySettings.requireUppercase}
                    onCheckedChange={(v) => setSecuritySettings({...securitySettings, requireUppercase: v})}
                  />
                </div>
              </div>

              <Button onClick={handleSaveSecurity}>
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup">
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Backup & Restore
                </CardTitle>
                <CardDescription>
                  Kelola backup database dan file sistem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h4 className="font-medium">Backup Otomatis</h4>
                      <p className="text-sm text-muted-foreground">Backup data secara berkala</p>
                    </div>
                  </div>
                  <Switch
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(v) => setBackupSettings({...backupSettings, autoBackup: v})}
                  />
                </div>

                {backupSettings.autoBackup && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-primary/20">
                    <div className="space-y-2">
                      <Label>Frekuensi Backup</Label>
                      <Select 
                        value={backupSettings.backupFrequency}
                        onValueChange={(v) => setBackupSettings({...backupSettings, backupFrequency: v})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Setiap Jam</SelectItem>
                          <SelectItem value="daily">Harian</SelectItem>
                          <SelectItem value="weekly">Mingguan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Simpan Backup (hari)</Label>
                      <Input
                        type="number"
                        value={backupSettings.backupRetention}
                        onChange={(e) => setBackupSettings({...backupSettings, backupRetention: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                )}

                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Backup Terakhir</p>
                      <p className="text-sm text-muted-foreground">{backupSettings.lastBackup}</p>
                    </div>
                    <Button onClick={handleBackupNow}>
                      <Database className="h-4 w-4 mr-2" />
                      Backup Sekarang
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <Trash2 className="h-5 w-5" />
                  Pembersihan Sistem
                </CardTitle>
                <CardDescription>
                  Hapus data sementara dan cache
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Bersihkan Cache</h4>
                    <p className="text-sm text-muted-foreground">Hapus file cache sementara</p>
                  </div>
                  <Button variant="outline" onClick={handleClearCache}>
                    Bersihkan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for MessageSquare icon
const MessageSquareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

export default SystemSettings;
