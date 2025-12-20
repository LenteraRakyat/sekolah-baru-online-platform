import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  FileText,
  Download,
  ChevronRight,
  User,
  School,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  nisn: string;
  email: string;
  phone: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  previousSchool: string;
  parentName: string;
  parentPhone: string;
  status: "pending" | "approved" | "rejected";
  documentProgress: number;
  registrationDate: string;
  photo?: string;
}

const StudentsManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [students] = useState<Student[]>([
    {
      id: "PPDB001",
      name: "Ahmad Fadil Rahman",
      nisn: "0012345678",
      email: "ahmad.fadil@gmail.com",
      phone: "08123456789",
      birthDate: "2010-05-15",
      birthPlace: "Jakarta",
      address: "Jl. Merdeka No. 123, Jakarta Pusat",
      previousSchool: "SD Negeri 01 Jakarta",
      parentName: "Budi Rahman",
      parentPhone: "08123456780",
      status: "pending",
      documentProgress: 80,
      registrationDate: "2024-01-15",
    },
    {
      id: "PPDB002",
      name: "Siti Nurhaliza",
      nisn: "0012345679",
      email: "siti.nurhaliza@gmail.com",
      phone: "08123456790",
      birthDate: "2010-08-20",
      birthPlace: "Bandung",
      address: "Jl. Asia Afrika No. 45, Bandung",
      previousSchool: "SD Swasta Budi Luhur",
      parentName: "Ahmad Suryadi",
      parentPhone: "08123456791",
      status: "approved",
      documentProgress: 100,
      registrationDate: "2024-01-14",
    },
    {
      id: "PPDB003",
      name: "Budi Santoso",
      nisn: "0012345680",
      email: "budi.santoso@gmail.com",
      phone: "08123456792",
      birthDate: "2010-03-10",
      birthPlace: "Surabaya",
      address: "Jl. Pemuda No. 67, Surabaya",
      previousSchool: "SD Negeri 05 Surabaya",
      parentName: "Joko Santoso",
      parentPhone: "08123456793",
      status: "pending",
      documentProgress: 60,
      registrationDate: "2024-01-13",
    },
    {
      id: "PPDB004",
      name: "Rina Kartika",
      nisn: "0012345681",
      email: "rina.kartika@gmail.com",
      phone: "08123456794",
      birthDate: "2010-11-25",
      birthPlace: "Yogyakarta",
      address: "Jl. Malioboro No. 89, Yogyakarta",
      previousSchool: "SD Muhammadiyah 1",
      parentName: "Hendra Kartika",
      parentPhone: "08123456795",
      status: "rejected",
      documentProgress: 100,
      registrationDate: "2024-01-12",
    },
    {
      id: "PPDB005",
      name: "Doni Pratama",
      nisn: "0012345682",
      email: "doni.pratama@gmail.com",
      phone: "08123456796",
      birthDate: "2010-07-08",
      birthPlace: "Semarang",
      address: "Jl. Pandanaran No. 12, Semarang",
      previousSchool: "SD Negeri 03 Semarang",
      parentName: "Andi Pratama",
      parentPhone: "08123456797",
      status: "approved",
      documentProgress: 100,
      registrationDate: "2024-01-11",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Menunggu" },
      approved: { color: "bg-green-100 text-green-800 border-green-200", label: "Diterima" },
      rejected: { color: "bg-red-100 text-red-800 border-red-200", label: "Ditolak" },
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.nisn.includes(searchTerm) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Calon Siswa", value: students.length, color: "bg-blue-500" },
    { label: "Menunggu Verifikasi", value: students.filter(s => s.status === "pending").length, color: "bg-yellow-500" },
    { label: "Diterima", value: students.filter(s => s.status === "approved").length, color: "bg-green-500" },
    { label: "Ditolak", value: students.filter(s => s.status === "rejected").length, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Data Calon Siswa</h2>
          <p className="text-muted-foreground">Kelola data calon siswa yang mendaftar</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-12 rounded-full ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Daftar Calon Siswa</CardTitle>
              <CardDescription>Total {filteredStudents.length} siswa ditemukan</CardDescription>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari nama, NISN, atau ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="approved">Diterima</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div 
                key={student.id} 
                className="flex items-center p-4 bg-muted/20 rounded-xl hover:bg-muted/40 transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedStudent(student)}
              >
                <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                  <AvatarImage src={student.photo} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 ml-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-lg">{student.name}</h4>
                    <Badge className={`${getStatusBadge(student.status).color} border`}>
                      {getStatusBadge(student.status).label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      NISN: {student.nisn}
                    </span>
                    <span className="flex items-center gap-1">
                      <School className="h-3 w-3" />
                      {student.previousSchool}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {student.registrationDate}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={student.documentProgress} className="h-2 flex-1 max-w-xs" />
                    <span className="text-xs text-muted-foreground">{student.documentProgress}% dokumen</span>
                  </div>
                </div>
                
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Detail Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block">{selectedStudent.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">ID: {selectedStudent.id}</span>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="personal" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
                  <TabsTrigger value="parent">Data Orang Tua</TabsTrigger>
                  <TabsTrigger value="documents">Dokumen</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">NISN</p>
                      <p className="font-medium">{selectedStudent.nisn}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedStudent.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Telepon</p>
                      <p className="font-medium">{selectedStudent.phone}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tempat, Tanggal Lahir</p>
                      <p className="font-medium">{selectedStudent.birthPlace}, {selectedStudent.birthDate}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-sm text-muted-foreground">Alamat</p>
                      <p className="font-medium">{selectedStudent.address}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <p className="text-sm text-muted-foreground">Asal Sekolah</p>
                      <p className="font-medium">{selectedStudent.previousSchool}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="parent" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Nama Orang Tua/Wali</p>
                      <p className="font-medium">{selectedStudent.parentName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Telepon Orang Tua</p>
                      <p className="font-medium">{selectedStudent.parentPhone}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {["Ijazah SD", "Kartu Keluarga", "Akta Kelahiran", "Pas Foto", "Rapor"].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span>{doc}</span>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Uploaded
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsManagement;
