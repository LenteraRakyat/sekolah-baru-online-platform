import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  ArrowLeft,
  ArrowRight,
  Users,
  Calendar,
  Award
} from "lucide-react";

const SelectLevel = () => {
  const navigate = useNavigate();

  const educationLevels = [
    {
      id: "sd",
      name: "SD / MI",
      fullName: "Sekolah Dasar / Madrasah Ibtidaiyah",
      description: "Jenjang pendidikan dasar untuk usia 6-12 tahun",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200 hover:border-blue-400",
      quota: 120,
      ageRange: "6 - 12 Tahun"
    },
    {
      id: "smp",
      name: "SMP / MTs",
      fullName: "Sekolah Menengah Pertama / Madrasah Tsanawiyah",
      description: "Jenjang pendidikan menengah pertama untuk usia 12-15 tahun",
      icon: School,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200 hover:border-emerald-400",
      quota: 160,
      ageRange: "12 - 15 Tahun"
    },
    {
      id: "sma",
      name: "SMA / SMK / MA",
      fullName: "Sekolah Menengah Atas / Kejuruan / Madrasah Aliyah",
      description: "Jenjang pendidikan menengah atas untuk usia 15-18 tahun",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200 hover:border-purple-400",
      quota: 200,
      ageRange: "15 - 18 Tahun"
    }
  ];

  const handleSelectLevel = (levelId: string) => {
    navigate(`/register?level=${levelId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 slide-in-up">
            Pilih Jenjang Pendidikan
          </h1>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto slide-in-up">
            Pilih jenjang pendidikan yang sesuai untuk melanjutkan proses pendaftaran
          </p>
        </div>
      </section>

      {/* Level Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {educationLevels.map((level, index) => {
              const IconComponent = level.icon;
              return (
                <Card 
                  key={level.id}
                  className={`relative border-2 ${level.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => handleSelectLevel(level.id)}
                >
                  {/* Gradient Top Bar */}
                  <div className={`h-2 bg-gradient-to-r ${level.color}`}></div>
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 ${level.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-10 w-10 ${level.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">{level.name}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {level.fullName}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-center text-sm">
                      {level.description}
                    </p>
                    
                    {/* Info Cards */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <div className={`${level.bgColor} rounded-lg p-3 text-center`}>
                        <Users className={`h-5 w-5 ${level.iconColor} mx-auto mb-1`} />
                        <p className="text-xs text-gray-500">Kuota</p>
                        <p className={`font-bold ${level.iconColor}`}>{level.quota} Siswa</p>
                      </div>
                      <div className={`${level.bgColor} rounded-lg p-3 text-center`}>
                        <Calendar className={`h-5 w-5 ${level.iconColor} mx-auto mb-1`} />
                        <p className="text-xs text-gray-500">Usia</p>
                        <p className={`font-bold ${level.iconColor}`}>{level.ageRange}</p>
                      </div>
                    </div>

                    <Button 
                      className={`w-full mt-4 bg-gradient-to-r ${level.color} text-white hover:opacity-90 transition-opacity`}
                    >
                      Pilih Jenjang Ini
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              asChild
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Akreditasi A</h3>
                  <p className="text-sm text-gray-600">Semua jenjang pendidikan kami terakreditasi A</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Guru Profesional</h3>
                  <p className="text-sm text-gray-600">Tenaga pengajar berpengalaman dan tersertifikasi</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <School className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fasilitas Lengkap</h3>
                  <p className="text-sm text-gray-600">Sarana dan prasarana modern untuk mendukung pembelajaran</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelectLevel;
