
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  GraduationCap,
  FileText,
  CheckCircle
} from "lucide-react";

const StudentRegistration = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    nickname: "",
    gender: "",
    birthPlace: "",
    birthDate: "",
    religion: "",
    nationality: "",
    
    // Contact Info
    address: "",
    phone: "",
    email: "",
    
    // School Info
    previousSchool: "",
    graduationYear: "",
    nisn: "",
    
    // Parent Info
    fatherName: "",
    fatherJob: "",
    motherName: "",
    motherJob: "",
    parentPhone: "",
    
    // Additional
    achievements: "",
    agreement: false
  });

  const steps = [
    { number: 1, title: "Data Pribadi", icon: User },
    { number: 2, title: "Kontak & Alamat", icon: MapPin },
    { number: 3, title: "Data Sekolah", icon: GraduationCap },
    { number: 4, title: "Data Orang Tua", icon: Phone },
    { number: 5, title: "Konfirmasi", icon: CheckCircle },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    toast({
      title: "Pendaftaran Berhasil!",
      description: "Data Anda telah tersimpan. Silakan login ke dashboard untuk melanjutkan proses.",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nama Lengkap *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <Label htmlFor="nickname">Nama Panggilan</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange("nickname", e.target.value)}
                  placeholder="Nama panggilan"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Jenis Kelamin *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="religion">Agama *</Label>
                <Select value={formData.religion} onValueChange={(value) => handleInputChange("religion", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="islam">Islam</SelectItem>
                    <SelectItem value="kristen">Kristen</SelectItem>
                    <SelectItem value="katolik">Katolik</SelectItem>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="buddha">Buddha</SelectItem>
                    <SelectItem value="konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="birthPlace">Tempat Lahir *</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => handleInputChange("birthPlace", e.target.value)}
                  placeholder="Kota kelahiran"
                />
              </div>
              <div>
                <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange("birthDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Alamat Lengkap *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Masukkan alamat lengkap"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Nomor HP *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="08123456789"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@contoh.com"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="previousSchool">Asal Sekolah *</Label>
              <Input
                id="previousSchool"
                value={formData.previousSchool}
                onChange={(e) => handleInputChange("previousSchool", e.target.value)}
                placeholder="Nama sekolah asal"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="graduationYear">Tahun Lulus *</Label>
                <Select value={formData.graduationYear} onValueChange={(value) => handleInputChange("graduationYear", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tahun lulus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="nisn">NISN *</Label>
                <Input
                  id="nisn"
                  value={formData.nisn}
                  onChange={(e) => handleInputChange("nisn", e.target.value)}
                  placeholder="Nomor Induk Siswa Nasional"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fatherName">Nama Ayah *</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  placeholder="Nama lengkap ayah"
                />
              </div>
              <div>
                <Label htmlFor="fatherJob">Pekerjaan Ayah *</Label>
                <Input
                  id="fatherJob"
                  value={formData.fatherJob}
                  onChange={(e) => handleInputChange("fatherJob", e.target.value)}
                  placeholder="Pekerjaan ayah"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="motherName">Nama Ibu *</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange("motherName", e.target.value)}
                  placeholder="Nama lengkap ibu"
                />
              </div>
              <div>
                <Label htmlFor="motherJob">Pekerjaan Ibu *</Label>
                <Input
                  id="motherJob"
                  value={formData.motherJob}
                  onChange={(e) => handleInputChange("motherJob", e.target.value)}
                  placeholder="Pekerjaan ibu"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="parentPhone">Nomor HP Orang Tua *</Label>
              <Input
                id="parentPhone"
                value={formData.parentPhone}
                onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                placeholder="08123456789"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Ringkasan Data Pendaftaran</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Nama:</strong> {formData.fullName}</p>
                  <p><strong>Tempat, Tanggal Lahir:</strong> {formData.birthPlace}, {formData.birthDate}</p>
                  <p><strong>Jenis Kelamin:</strong> {formData.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
                  <p><strong>Agama:</strong> {formData.religion}</p>
                </div>
                <div>
                  <p><strong>Asal Sekolah:</strong> {formData.previousSchool}</p>
                  <p><strong>Tahun Lulus:</strong> {formData.graduationYear}</p>
                  <p><strong>NISN:</strong> {formData.nisn}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="achievements">Prestasi/Penghargaan (Opsional)</Label>
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) => handleInputChange("achievements", e.target.value)}
                placeholder="Tuliskan prestasi atau penghargaan yang pernah diraih"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreement"
                checked={formData.agreement}
                onCheckedChange={(checked) => handleInputChange("agreement", checked as boolean)}
              />
              <Label htmlFor="agreement" className="text-sm">
                Saya menyatakan bahwa data yang saya masukkan adalah benar dan dapat dipertanggungjawabkan.
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pendaftaran PPDB 2024</h1>
          <p className="text-gray-600">Lengkapi formulir pendaftaran dengan data yang benar</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs text-center text-gray-600 hidden sm:block">
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block absolute h-0.5 w-20 mt-5 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} style={{ marginLeft: '2.5rem' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5 mr-2" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              Langkah {currentStep} dari {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
              >
                Sebelumnya
              </Button>
              
              {currentStep < steps.length ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Selanjutnya
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreement}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Kirim Pendaftaran
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
