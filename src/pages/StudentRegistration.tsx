
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import FormField from "@/components/FormField";
import StepIndicator from "@/components/StepIndicator";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  GraduationCap,
  FileText,
  CheckCircle,
  ArrowLeft,
  ArrowRight
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
    nationality: "Indonesia",
    
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Nama lengkap wajib diisi";
        if (!formData.gender) newErrors.gender = "Jenis kelamin wajib dipilih";
        if (!formData.birthPlace.trim()) newErrors.birthPlace = "Tempat lahir wajib diisi";
        if (!formData.birthDate) newErrors.birthDate = "Tanggal lahir wajib diisi";
        if (!formData.religion) newErrors.religion = "Agama wajib dipilih";
        break;
      case 2:
        if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi";
        if (!formData.phone.trim()) newErrors.phone = "Nomor HP wajib diisi";
        if (!formData.email.trim()) newErrors.email = "Email wajib diisi";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Format email tidak valid";
        }
        break;
      case 3:
        if (!formData.previousSchool.trim()) newErrors.previousSchool = "Asal sekolah wajib diisi";
        if (!formData.graduationYear) newErrors.graduationYear = "Tahun lulus wajib dipilih";
        if (!formData.nisn.trim()) newErrors.nisn = "NISN wajib diisi";
        break;
      case 4:
        if (!formData.fatherName.trim()) newErrors.fatherName = "Nama ayah wajib diisi";
        if (!formData.fatherJob.trim()) newErrors.fatherJob = "Pekerjaan ayah wajib diisi";
        if (!formData.motherName.trim()) newErrors.motherName = "Nama ibu wajib diisi";
        if (!formData.motherJob.trim()) newErrors.motherJob = "Pekerjaan ibu wajib diisi";
        if (!formData.parentPhone.trim()) newErrors.parentPhone = "Nomor HP orang tua wajib diisi";
        break;
      case 5:
        if (!formData.agreement) newErrors.agreement = "Anda harus menyetujui pernyataan";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Data Anda telah tersimpan. Silakan login ke dashboard untuk melanjutkan proses.",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const genderOptions = [
    { value: "male", label: "Laki-laki" },
    { value: "female", label: "Perempuan" }
  ];

  const religionOptions = [
    { value: "islam", label: "Islam" },
    { value: "kristen", label: "Kristen" },
    { value: "katolik", label: "Katolik" },
    { value: "hindu", label: "Hindu" },
    { value: "buddha", label: "Buddha" },
    { value: "konghucu", label: "Konghucu" }
  ];

  const graduationYearOptions = [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="fullName"
                label="Nama Lengkap"
                value={formData.fullName}
                onChange={(value) => handleInputChange("fullName", value)}
                placeholder="Masukkan nama lengkap"
                required
                error={errors.fullName}
              />
              <FormField
                id="nickname"
                label="Nama Panggilan"
                value={formData.nickname}
                onChange={(value) => handleInputChange("nickname", value)}
                placeholder="Nama panggilan"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="gender"
                label="Jenis Kelamin"
                type="select"
                value={formData.gender}
                onChange={(value) => handleInputChange("gender", value)}
                placeholder="Pilih jenis kelamin"
                options={genderOptions}
                required
                error={errors.gender}
              />
              <FormField
                id="religion"
                label="Agama"
                type="select"
                value={formData.religion}
                onChange={(value) => handleInputChange("religion", value)}
                placeholder="Pilih agama"
                options={religionOptions}
                required
                error={errors.religion}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="birthPlace"
                label="Tempat Lahir"
                value={formData.birthPlace}
                onChange={(value) => handleInputChange("birthPlace", value)}
                placeholder="Kota kelahiran"
                required
                error={errors.birthPlace}
              />
              <FormField
                id="birthDate"
                label="Tanggal Lahir"
                type="date"
                value={formData.birthDate}
                onChange={(value) => handleInputChange("birthDate", value)}
                required
                error={errors.birthDate}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FormField
              id="address"
              label="Alamat Lengkap"
              type="textarea"
              value={formData.address}
              onChange={(value) => handleInputChange("address", value)}
              placeholder="Masukkan alamat lengkap"
              required
              error={errors.address}
              rows={3}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="phone"
                label="Nomor HP"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                placeholder="08123456789"
                required
                error={errors.phone}
              />
              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                placeholder="email@contoh.com"
                required
                error={errors.email}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormField
              id="previousSchool"
              label="Asal Sekolah"
              value={formData.previousSchool}
              onChange={(value) => handleInputChange("previousSchool", value)}
              placeholder="Nama sekolah asal"
              required
              error={errors.previousSchool}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="graduationYear"
                label="Tahun Lulus"
                type="select"
                value={formData.graduationYear}
                onChange={(value) => handleInputChange("graduationYear", value)}
                placeholder="Pilih tahun lulus"
                options={graduationYearOptions}
                required
                error={errors.graduationYear}
              />
              <FormField
                id="nisn"
                label="NISN"
                value={formData.nisn}
                onChange={(value) => handleInputChange("nisn", value)}
                placeholder="Nomor Induk Siswa Nasional"
                required
                error={errors.nisn}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="fatherName"
                label="Nama Ayah"
                value={formData.fatherName}
                onChange={(value) => handleInputChange("fatherName", value)}
                placeholder="Nama lengkap ayah"
                required
                error={errors.fatherName}
              />
              <FormField
                id="fatherJob"
                label="Pekerjaan Ayah"
                value={formData.fatherJob}
                onChange={(value) => handleInputChange("fatherJob", value)}
                placeholder="Pekerjaan ayah"
                required
                error={errors.fatherJob}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="motherName"
                label="Nama Ibu"
                value={formData.motherName}
                onChange={(value) => handleInputChange("motherName", value)}
                placeholder="Nama lengkap ibu"
                required
                error={errors.motherName}
              />
              <FormField
                id="motherJob"
                label="Pekerjaan Ibu"
                value={formData.motherJob}
                onChange={(value) => handleInputChange("motherJob", value)}
                placeholder="Pekerjaan ibu"
                required
                error={errors.motherJob}
              />
            </div>

            <FormField
              id="parentPhone"
              label="Nomor HP Orang Tua"
              type="tel"
              value={formData.parentPhone}
              onChange={(value) => handleInputChange("parentPhone", value)}
              placeholder="08123456789"
              required
              error={errors.parentPhone}
            />
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

            <FormField
              id="achievements"
              label="Prestasi/Penghargaan (Opsional)"
              type="textarea"
              value={formData.achievements}
              onChange={(value) => handleInputChange("achievements", value)}
              placeholder="Tuliskan prestasi atau penghargaan yang pernah diraih"
              rows={3}
            />

            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement"
                checked={formData.agreement}
                onCheckedChange={(checked) => handleInputChange("agreement", checked as boolean)}
              />
              <div className="space-y-1">
                <label htmlFor="agreement" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Saya menyatakan bahwa data yang saya masukkan adalah benar dan dapat dipertanggungjawabkan.
                </label>
                {errors.agreement && (
                  <p className="text-sm text-red-600">{errors.agreement}</p>
                )}
              </div>
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
        <StepIndicator steps={steps} currentStep={currentStep} />

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
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Sebelumnya
              </Button>
              
              {currentStep < steps.length ? (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center"
                >
                  Selanjutnya
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreement || isSubmitting}
                  className="bg-green-600 hover:bg-green-700 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Kirim Pendaftaran
                    </>
                  )}
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
