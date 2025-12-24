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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Save,
  FileText,
  User,
  Users,
  GraduationCap,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Settings,
  CheckSquare,
} from "lucide-react";

const RegistrationFormSettings = () => {
  const { toast } = useToast();

  // Education Levels Settings
  const [levelSettings, setLevelSettings] = useState({
    enableSD: true,
    enableSMP: true,
    enableSMA: true,
    sdLabel: "SD / MI",
    smpLabel: "SMP / MTs",
    smaLabel: "SMA / SMK / MA",
    sdDescription: "Sekolah Dasar / Madrasah Ibtidaiyah",
    smpDescription: "Sekolah Menengah Pertama / Madrasah Tsanawiyah",
    smaDescription: "Sekolah Menengah Atas / Kejuruan / Madrasah Aliyah",
  });

  // Personal Data Form Fields
  const [personalFields, setPersonalFields] = useState([
    { id: "fullName", label: "Nama Lengkap", type: "text", required: true, enabled: true },
    { id: "nickname", label: "Nama Panggilan", type: "text", required: false, enabled: true },
    { id: "gender", label: "Jenis Kelamin", type: "select", required: true, enabled: true },
    { id: "birthPlace", label: "Tempat Lahir", type: "text", required: true, enabled: true },
    { id: "birthDate", label: "Tanggal Lahir", type: "date", required: true, enabled: true },
    { id: "religion", label: "Agama", type: "select", required: true, enabled: true },
    { id: "nationality", label: "Kewarganegaraan", type: "text", required: false, enabled: true },
  ]);

  // Contact Form Fields
  const [contactFields, setContactFields] = useState([
    { id: "address", label: "Alamat Lengkap", type: "textarea", required: true, enabled: true },
    { id: "phone", label: "Nomor HP", type: "tel", required: true, enabled: true },
    { id: "email", label: "Email", type: "email", required: true, enabled: true },
  ]);

  // School Data Form Fields
  const [schoolFields, setSchoolFields] = useState([
    { id: "previousSchool", label: "Asal Sekolah", type: "text", required: true, enabled: true },
    { id: "graduationYear", label: "Tahun Lulus", type: "select", required: true, enabled: true },
    { id: "nisn", label: "NISN", type: "text", required: true, enabled: true },
  ]);

  // Parent Data Form Fields
  const [parentFields, setParentFields] = useState([
    { id: "fatherName", label: "Nama Ayah", type: "text", required: true, enabled: true },
    { id: "fatherJob", label: "Pekerjaan Ayah", type: "text", required: true, enabled: true },
    { id: "motherName", label: "Nama Ibu", type: "text", required: true, enabled: true },
    { id: "motherJob", label: "Pekerjaan Ibu", type: "text", required: true, enabled: true },
    { id: "parentPhone", label: "Nomor HP Orang Tua", type: "tel", required: true, enabled: true },
    { id: "parentEmail", label: "Email Orang Tua", type: "email", required: false, enabled: false },
    { id: "parentAddress", label: "Alamat Orang Tua", type: "textarea", required: false, enabled: false },
  ]);

  // Required Documents
  const [documentSettings, setDocumentSettings] = useState({
    requireDocuments: true,
    documents: [
      { id: "ijazah", label: "Fotokopi Ijazah/SKHUN atau Surat Keterangan Lulus", required: true, enabled: true, maxSize: 5 },
      { id: "kk", label: "Fotokopi Kartu Keluarga", required: true, enabled: true, maxSize: 5 },
      { id: "akta", label: "Fotokopi Akta Kelahiran", required: true, enabled: true, maxSize: 5 },
      { id: "foto", label: "Pas Foto terbaru 3x4", required: true, enabled: true, maxSize: 2 },
      { id: "sehat", label: "Surat Keterangan Sehat dari Dokter", required: true, enabled: true, maxSize: 5 },
      { id: "rapor", label: "Fotokopi Rapor Semester 1-5", required: true, enabled: true, maxSize: 10 },
    ],
    allowedFormats: ["pdf", "jpg", "jpeg", "png"],
    maxTotalSize: 50,
  });

  // Validation Settings
  const [validationSettings, setValidationSettings] = useState({
    requireAgreement: true,
    agreementText: "Saya menyatakan bahwa data yang saya masukkan adalah benar dan dapat dipertanggungjawabkan.",
    showProgressIndicator: true,
    allowSaveDraft: true,
    autoSaveInterval: 30,
    enableEmailVerification: false,
    enablePhoneVerification: false,
  });

  const handleSaveLevelSettings = () => {
    toast({
      title: "Pengaturan Jenjang Disimpan",
      description: "Konfigurasi jenjang pendidikan berhasil diperbarui",
    });
  };

  const handleSavePersonalFields = () => {
    toast({
      title: "Pengaturan Form Data Pribadi Disimpan",
      description: "Konfigurasi field data pribadi berhasil diperbarui",
    });
  };

  const handleSaveContactFields = () => {
    toast({
      title: "Pengaturan Form Kontak Disimpan",
      description: "Konfigurasi field kontak berhasil diperbarui",
    });
  };

  const handleSaveSchoolFields = () => {
    toast({
      title: "Pengaturan Form Sekolah Disimpan",
      description: "Konfigurasi field data sekolah berhasil diperbarui",
    });
  };

  const handleSaveParentFields = () => {
    toast({
      title: "Pengaturan Form Orang Tua Disimpan",
      description: "Konfigurasi field data orang tua berhasil diperbarui",
    });
  };

  const handleSaveDocumentSettings = () => {
    toast({
      title: "Pengaturan Dokumen Disimpan",
      description: "Konfigurasi persyaratan dokumen berhasil diperbarui",
    });
  };

  const handleSaveValidationSettings = () => {
    toast({
      title: "Pengaturan Validasi Disimpan",
      description: "Konfigurasi validasi form berhasil diperbarui",
    });
  };

  const addDocument = () => {
    setDocumentSettings(prev => ({
      ...prev,
      documents: [...prev.documents, { id: `doc_${Date.now()}`, label: "", required: true, enabled: true, maxSize: 5 }],
    }));
  };

  const removeDocument = (index: number) => {
    setDocumentSettings(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const updateDocument = (index: number, field: string, value: any) => {
    setDocumentSettings(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) =>
        i === index ? { ...doc, [field]: value } : doc
      ),
    }));
  };

  const renderFieldEditor = (
    fields: typeof personalFields,
    setFields: React.Dispatch<React.SetStateAction<typeof personalFields>>
  ) => (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-4 p-4 border rounded-lg">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              value={field.label}
              onChange={(e) => {
                const newFields = [...fields];
                newFields[index].label = e.target.value;
                setFields(newFields);
              }}
              placeholder="Label field"
            />
            <Select
              value={field.type}
              onValueChange={(value) => {
                const newFields = [...fields];
                newFields[index].type = value;
                setFields(newFields);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Teks</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="tel">Telepon</SelectItem>
                <SelectItem value="date">Tanggal</SelectItem>
                <SelectItem value="select">Pilihan</SelectItem>
                <SelectItem value="textarea">Teks Panjang</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Switch
                checked={field.required}
                onCheckedChange={(checked) => {
                  const newFields = [...fields];
                  newFields[index].required = checked;
                  setFields(newFields);
                }}
              />
              <span className="text-sm">Wajib</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={field.enabled}
                onCheckedChange={(checked) => {
                  const newFields = [...fields];
                  newFields[index].enabled = checked;
                  setFields(newFields);
                }}
              />
              <span className="text-sm">Aktif</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pengaturan Form Pendaftaran</h2>
        <p className="text-muted-foreground">Kelola field dan validasi form pendaftaran siswa baru</p>
      </div>

      <Tabs defaultValue="levels" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="levels" className="text-xs">Jenjang</TabsTrigger>
          <TabsTrigger value="personal" className="text-xs">Data Pribadi</TabsTrigger>
          <TabsTrigger value="contact" className="text-xs">Kontak</TabsTrigger>
          <TabsTrigger value="school" className="text-xs">Sekolah</TabsTrigger>
          <TabsTrigger value="parent" className="text-xs">Orang Tua</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs">Dokumen</TabsTrigger>
          <TabsTrigger value="validation" className="text-xs">Validasi</TabsTrigger>
        </TabsList>

        {/* Education Levels Tab */}
        <TabsContent value="levels">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Jenjang Pendidikan
              </CardTitle>
              <CardDescription>
                Aktifkan dan sesuaikan jenjang pendidikan yang tersedia untuk pendaftaran
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SD/MI */}
              <div className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500">SD/MI</Badge>
                    <h4 className="font-medium">Sekolah Dasar</h4>
                  </div>
                  <Switch
                    checked={levelSettings.enableSD}
                    onCheckedChange={(checked) => setLevelSettings({ ...levelSettings, enableSD: checked })}
                  />
                </div>
                {levelSettings.enableSD && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Label Singkat</Label>
                      <Input
                        value={levelSettings.sdLabel}
                        onChange={(e) => setLevelSettings({ ...levelSettings, sdLabel: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Deskripsi Lengkap</Label>
                      <Input
                        value={levelSettings.sdDescription}
                        onChange={(e) => setLevelSettings({ ...levelSettings, sdDescription: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SMP/MTs */}
              <div className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500">SMP/MTs</Badge>
                    <h4 className="font-medium">Sekolah Menengah Pertama</h4>
                  </div>
                  <Switch
                    checked={levelSettings.enableSMP}
                    onCheckedChange={(checked) => setLevelSettings({ ...levelSettings, enableSMP: checked })}
                  />
                </div>
                {levelSettings.enableSMP && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Label Singkat</Label>
                      <Input
                        value={levelSettings.smpLabel}
                        onChange={(e) => setLevelSettings({ ...levelSettings, smpLabel: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Deskripsi Lengkap</Label>
                      <Input
                        value={levelSettings.smpDescription}
                        onChange={(e) => setLevelSettings({ ...levelSettings, smpDescription: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SMA/SMK/MA */}
              <div className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-purple-500">SMA/SMK/MA</Badge>
                    <h4 className="font-medium">Sekolah Menengah Atas</h4>
                  </div>
                  <Switch
                    checked={levelSettings.enableSMA}
                    onCheckedChange={(checked) => setLevelSettings({ ...levelSettings, enableSMA: checked })}
                  />
                </div>
                {levelSettings.enableSMA && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Label Singkat</Label>
                      <Input
                        value={levelSettings.smaLabel}
                        onChange={(e) => setLevelSettings({ ...levelSettings, smaLabel: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Deskripsi Lengkap</Label>
                      <Input
                        value={levelSettings.smaDescription}
                        onChange={(e) => setLevelSettings({ ...levelSettings, smaDescription: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={handleSaveLevelSettings} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Jenjang
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Data Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Field Data Pribadi
              </CardTitle>
              <CardDescription>
                Sesuaikan field yang ditampilkan di form data pribadi siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderFieldEditor(personalFields, setPersonalFields)}
              <Button onClick={handleSavePersonalFields} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Data Pribadi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Field Kontak & Alamat
              </CardTitle>
              <CardDescription>
                Sesuaikan field yang ditampilkan di form kontak dan alamat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderFieldEditor(contactFields, setContactFields)}
              <Button onClick={handleSaveContactFields} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Kontak
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* School Data Tab */}
        <TabsContent value="school">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Field Data Sekolah
              </CardTitle>
              <CardDescription>
                Sesuaikan field yang ditampilkan di form data sekolah asal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderFieldEditor(schoolFields, setSchoolFields)}
              <Button onClick={handleSaveSchoolFields} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Data Sekolah
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parent Data Tab */}
        <TabsContent value="parent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Field Data Orang Tua
              </CardTitle>
              <CardDescription>
                Sesuaikan field yang ditampilkan di form data orang tua/wali
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderFieldEditor(parentFields, setParentFields)}
              <Button onClick={handleSaveParentFields} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Data Orang Tua
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Persyaratan Dokumen
              </CardTitle>
              <CardDescription>
                Kelola daftar dokumen yang harus diupload oleh calon siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Wajib Upload Dokumen</h4>
                  <p className="text-sm text-muted-foreground">Aktifkan fitur upload dokumen dalam pendaftaran</p>
                </div>
                <Switch
                  checked={documentSettings.requireDocuments}
                  onCheckedChange={(checked) => setDocumentSettings({ ...documentSettings, requireDocuments: checked })}
                />
              </div>

              {documentSettings.requireDocuments && (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Daftar Dokumen</Label>
                      <Button variant="outline" size="sm" onClick={addDocument}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Dokumen
                      </Button>
                    </div>

                    {documentSettings.documents.map((doc, index) => (
                      <div key={doc.id} className="p-4 border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="outline">Dokumen #{index + 1}</Badge>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-2 space-y-2">
                            <Label>Nama Dokumen</Label>
                            <Input
                              value={doc.label}
                              onChange={(e) => updateDocument(index, 'label', e.target.value)}
                              placeholder="Nama dokumen..."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Max Size (MB)</Label>
                            <Input
                              type="number"
                              value={doc.maxSize}
                              onChange={(e) => updateDocument(index, 'maxSize', parseInt(e.target.value))}
                            />
                          </div>
                          <div className="flex items-end gap-4">
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={doc.required}
                                onCheckedChange={(checked) => updateDocument(index, 'required', checked)}
                              />
                              <span className="text-sm">Wajib</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={doc.enabled}
                                onCheckedChange={(checked) => updateDocument(index, 'enabled', checked)}
                              />
                              <span className="text-sm">Aktif</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Format File yang Diizinkan</Label>
                      <Input
                        value={documentSettings.allowedFormats.join(", ")}
                        onChange={(e) => setDocumentSettings({
                          ...documentSettings,
                          allowedFormats: e.target.value.split(",").map(f => f.trim())
                        })}
                        placeholder="pdf, jpg, png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Total Upload (MB)</Label>
                      <Input
                        type="number"
                        value={documentSettings.maxTotalSize}
                        onChange={(e) => setDocumentSettings({
                          ...documentSettings,
                          maxTotalSize: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </>
              )}

              <Button onClick={handleSaveDocumentSettings} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Dokumen
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Validation Tab */}
        <TabsContent value="validation">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Pengaturan Validasi
              </CardTitle>
              <CardDescription>
                Kelola pengaturan validasi dan konfirmasi form pendaftaran
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Wajib Persetujuan</h4>
                    <p className="text-sm text-muted-foreground">Wajibkan persetujuan syarat dan ketentuan</p>
                  </div>
                  <Switch
                    checked={validationSettings.requireAgreement}
                    onCheckedChange={(checked) => setValidationSettings({ ...validationSettings, requireAgreement: checked })}
                  />
                </div>

                {validationSettings.requireAgreement && (
                  <div className="space-y-2">
                    <Label>Teks Persetujuan</Label>
                    <Textarea
                      value={validationSettings.agreementText}
                      onChange={(e) => setValidationSettings({ ...validationSettings, agreementText: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Indikator Progress</h4>
                    <p className="text-sm text-muted-foreground">Tampilkan step indicator di form</p>
                  </div>
                  <Switch
                    checked={validationSettings.showProgressIndicator}
                    onCheckedChange={(checked) => setValidationSettings({ ...validationSettings, showProgressIndicator: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Simpan Draft</h4>
                    <p className="text-sm text-muted-foreground">Izinkan menyimpan form sebagai draft</p>
                  </div>
                  <Switch
                    checked={validationSettings.allowSaveDraft}
                    onCheckedChange={(checked) => setValidationSettings({ ...validationSettings, allowSaveDraft: checked })}
                  />
                </div>

                {validationSettings.allowSaveDraft && (
                  <div className="space-y-2">
                    <Label>Auto-save Interval (detik)</Label>
                    <Input
                      type="number"
                      value={validationSettings.autoSaveInterval}
                      onChange={(e) => setValidationSettings({ ...validationSettings, autoSaveInterval: parseInt(e.target.value) })}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Verifikasi Email</h4>
                    <p className="text-sm text-muted-foreground">Wajibkan verifikasi email sebelum submit</p>
                  </div>
                  <Switch
                    checked={validationSettings.enableEmailVerification}
                    onCheckedChange={(checked) => setValidationSettings({ ...validationSettings, enableEmailVerification: checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Verifikasi Nomor HP</h4>
                    <p className="text-sm text-muted-foreground">Wajibkan verifikasi nomor HP via OTP</p>
                  </div>
                  <Switch
                    checked={validationSettings.enablePhoneVerification}
                    onCheckedChange={(checked) => setValidationSettings({ ...validationSettings, enablePhoneVerification: checked })}
                  />
                </div>
              </div>

              <Button onClick={handleSaveValidationSettings} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan Validasi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegistrationFormSettings;
