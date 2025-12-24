
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
  Mail,
  Download,
  FileCheck
} from "lucide-react";
import schoolBuilding from "@/assets/school-building.jpg";
import studentsClassroom from "@/assets/students-classroom.jpg";
import schoolLibrary from "@/assets/school-library.jpg";
import sportsFacilities from "@/assets/sports-facilities.jpg";
import scienceLab from "@/assets/science-lab.jpg";
import heroStudents from "@/assets/hero-students.jpg";
import registrationCta from "@/assets/registration-cta.jpg";

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
      <section className="relative overflow-hidden text-white min-h-[80vh] lg:min-h-screen flex items-center">
        {/* Background Image - Full Width */}
        <div className="absolute inset-0 w-screen left-1/2 -translate-x-1/2">
          <img 
            src={heroStudents} 
            alt="Students celebrating" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/85 to-blue-600/90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h4 className="text-lg sm:text-xl lg:text-2xl font-medium mb-4 opacity-90 slide-in-up">
              Penerimaan Siswa Baru Tahun Ajaran 2026/2027
            </h4>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 slide-in-up">
              Mencetak Generasi Qur'ani, Yang Cerdas, Cermat, Intelek, Kreatif dan Mandiri serta Berakhlak Mulia
            </h2>
            <h3 className="text-xl sm:text-2xl mb-8 opacity-80 slide-in-up">
              Pondok Pesantren Antar Benua memadukan pendidikan pesantren, kurikulum nasional, dan teknologi modern
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-up">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/select-level">
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

      {/* Selayang Pandang Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Selayang Pandang</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="relative">
              <img 
                src={schoolBuilding} 
                alt="Pondok Pesantren Antar Benua" 
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg">
                <p className="text-2xl font-bold">Sejak 2010</p>
                <p className="text-sm opacity-90">Mendidik Generasi Qur'ani</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="font-semibold text-blue-600">Pondok Pesantren Antar Benua</span> adalah lembaga pendidikan Islam terpadu yang menggabungkan pendidikan pesantren tradisional dengan kurikulum nasional dan teknologi modern.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Didirikan dengan visi untuk mencetak generasi Qur'ani yang cerdas, cermat, intelek, kreatif, mandiri, dan berakhlak mulia, pesantren kami berkomitmen memberikan pendidikan berkualitas tinggi yang seimbang antara ilmu agama dan ilmu pengetahuan umum.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan tenaga pengajar profesional, fasilitas modern, dan lingkungan islami yang kondusif, kami siap membimbing putra-putri Anda menjadi generasi penerus bangsa yang berakhlakul karimah.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-600">500+</p>
                  <p className="text-gray-600 text-sm">Santri Aktif</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-purple-600">50+</p>
                  <p className="text-gray-600 text-sm">Tenaga Pengajar</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-600">95%</p>
                  <p className="text-gray-600 text-sm">Tingkat Kelulusan</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-orange-600">100+</p>
                  <p className="text-gray-600 text-sm">Penghafal Al-Qur'an</p>
                </div>
              </div>
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

      {/* Download Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Unduh Dokumen</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Download file-file penting untuk proses pendaftaran
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Formulir Pendaftaran</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Formulir pendaftaran siswa baru yang perlu diisi
                </p>
                <a 
                  href="/formulir-pendaftaran.pdf" 
                  download="Formulir-Pendaftaran.pdf"
                  className="inline-flex items-center justify-center w-full gap-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Unduh Formulir
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Brosur Sekolah</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Informasi lengkap tentang fasilitas dan program sekolah
                </p>
                <a 
                  href="/brosur-sekolah.pdf" 
                  download="Brosur-Sekolah.pdf"
                  className="inline-flex items-center justify-center w-full gap-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Unduh Brosur
                </a>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Panduan Pendaftaran</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Panduan lengkap langkah-langkah pendaftaran siswa baru
                </p>
                <a 
                  href="/panduan-pendaftaran.pdf" 
                  download="Panduan-Pendaftaran.pdf"
                  className="inline-flex items-center justify-center w-full gap-2 rounded-md bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2 text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Unduh Panduan
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Persyaratan Pendaftaran</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Siapkan dokumen-dokumen berikut untuk proses pendaftaran santri baru
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Requirements Cards */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requirements.map((req, index) => (
                  <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="bg-gradient-to-br from-green-400 to-green-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{req}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
            </div>
            
            {/* Registration CTA Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group aspect-square">
              <img 
                src={registrationCta} 
                alt="Daftar Sekarang - Pondok Pesantren Antar Benua" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {/* Top Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pondok Pesantren Antar Benua
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Mencetak Generasi Qur'ani yang cerdas, cermat, intelek, kreatif, mandiri, dan berakhlak mulia untuk masa depan bangsa dan agama.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Link Cepat</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/select-level" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Pendaftaran
                  </Link>
                </li>
                <li>
                  <Link to="/student" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Portal Santri
                  </Link>
                </li>
                <li>
                  <a href="/panduan-pendaftaran.pdf" download className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Unduh Panduan
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Hubungi Kami</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Jl. Pendidikan Islam No. 123, Kota Lovable</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">(021) 1234-5678</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">info@pesantrenantarbenua.sch.id</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 Pondok Pesantren Antar Benua. Hak Cipta Dilindungi.
              </p>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span>Mendidik Generasi Qur'ani</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
