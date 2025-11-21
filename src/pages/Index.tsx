
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "@/components/Header";
import { 
  Calendar, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  BookOpen,
  Award,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";
import studentsClassroom from "@/assets/students-classroom.jpg";
import schoolLibrary from "@/assets/school-library.jpg";
import sportsFacilities from "@/assets/sports-facilities.jpg";
import scienceLab from "@/assets/science-lab.jpg";
import heroStudents from "@/assets/hero-students.jpg";

const Index = () => {
  const timeline = [
    { phase: "Pendaftaran", date: "1 - 15 Januari 2024", status: "active" },
    { phase: "Verifikasi Berkas", date: "16 - 20 Januari 2024", status: "upcoming" },
    { phase: "Pengumuman", date: "25 Januari 2024", status: "upcoming" },
    { phase: "Daftar Ulang", date: "26 - 30 Januari 2024", status: "upcoming" },
  ];

  const requirements = [
    "Fotokopi Ijazah/SKHUN atau Surat Keterangan Lulus",
    "Fotokopi Kartu Keluarga",
    "Fotokopi Akta Kelahiran",
    "Pas Foto terbaru 3x4 (2 lembar)",
    "Surat Keterangan Sehat dari Dokter",
    "Fotokopi Rapor Semester 1-5"
  ];

  const carouselImages = [
    { src: schoolBuilding, title: "Gedung Sekolah", description: "Fasilitas modern dan nyaman" },
    { src: studentsClassroom, title: "Ruang Kelas", description: "Suasana belajar yang kondusif" },
    { src: schoolLibrary, title: "Perpustakaan", description: "Koleksi buku lengkap" },
    { src: sportsFacilities, title: "Fasilitas Olahraga", description: "Lapangan dan sarana olahraga" },
    { src: scienceLab, title: "Laboratorium", description: "Lab sains modern" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroStudents} 
            alt="Students celebrating" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/85 to-blue-600/90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 slide-in-up">
              Penerimaan Peserta Didik Baru
            </h1>
            <p className="text-xl sm:text-2xl mb-8 opacity-90 slide-in-up">
              SMA Negeri 1 Lovable - Tahun Ajaran 2024/2025
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-up">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/register">
                  <FileText className="mr-2 h-5 w-5" />
                  Daftar Sekarang
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/student">
                  <Users className="mr-2 h-5 w-5" />
                  Login Siswa
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fasilitas Sekolah</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lihat berbagai fasilitas dan lingkungan belajar di SMA Negeri 1 Lovable
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.title}
                            className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                            <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                            <p className="text-white/90 text-sm">{image.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow gradient-card">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">1,250</h3>
                <p className="text-gray-600">Total Pendaftar</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow gradient-card">
              <CardContent className="p-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">890</h3>
                <p className="text-gray-600">Berkas Terverifikasi</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow gradient-card">
              <CardContent className="p-8">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">360</h3>
                <p className="text-gray-600">Kuota Tersedia</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Timeline PPDB 2024</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ikuti setiap tahapan penerimaan peserta didik baru dengan seksama
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <Card key={index} className={`relative border-0 shadow-lg ${
                item.status === 'active' ? 'ring-2 ring-blue-500 shadow-blue-200' : ''
              }`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    item.status === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {item.status === 'active' ? (
                      <Clock className="h-6 w-6" />
                    ) : (
                      <Calendar className="h-6 w-6" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.phase}</h3>
                  <p className="text-sm text-gray-600">{item.date}</p>
                  {item.status === 'active' && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Aktif
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Persyaratan Pendaftaran</h2>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8" size="lg">
                <Link to="/register">
                  <FileText className="mr-2 h-5 w-5" />
                  Mulai Pendaftaran
                </Link>
              </Button>
            </div>
            
            <Card className="border-0 shadow-xl gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" />
                  Informasi Sekolah
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-gray-600">Jl. Pendidikan No. 123, Kota Lovable</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Telepon</p>
                    <p className="text-gray-600">(021) 1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@sman1lovable.sch.id</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">SMA Negeri 1 Lovable</h3>
            <p className="text-gray-400 mb-6">
              Membangun generasi unggul dan berkarakter untuk masa depan bangsa
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link to="/register">Daftar</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Link to="/student">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
