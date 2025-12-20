import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  FileCheck,
  GraduationCap,
  Megaphone,
} from "lucide-react";

interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "registration" | "verification" | "announcement" | "test" | "orientation";
  status: "upcoming" | "ongoing" | "completed";
  participants?: number;
}

const ScheduleManagement = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    type: "registration" as const,
  });

  const [events, setEvents] = useState<ScheduleEvent[]>([
    {
      id: "EVT001",
      title: "Pembukaan Pendaftaran PPDB",
      description: "Pembukaan pendaftaran penerimaan peserta didik baru tahun ajaran 2024/2025",
      date: "2024-01-15",
      startTime: "08:00",
      endTime: "16:00",
      location: "Online & Offline",
      type: "registration",
      status: "completed",
      participants: 1250,
    },
    {
      id: "EVT002",
      title: "Verifikasi Dokumen Tahap 1",
      description: "Verifikasi dokumen untuk pendaftar gelombang pertama",
      date: "2024-01-20",
      startTime: "08:00",
      endTime: "15:00",
      location: "Ruang Administrasi",
      type: "verification",
      status: "ongoing",
      participants: 450,
    },
    {
      id: "EVT003",
      title: "Pengumuman Hasil Seleksi",
      description: "Pengumuman hasil seleksi administrasi tahap pertama",
      date: "2024-02-01",
      startTime: "10:00",
      endTime: "12:00",
      location: "Website & Email",
      type: "announcement",
      status: "upcoming",
    },
    {
      id: "EVT004",
      title: "Tes Akademik",
      description: "Pelaksanaan tes akademik untuk calon siswa",
      date: "2024-02-10",
      startTime: "08:00",
      endTime: "12:00",
      location: "Gedung Utama",
      type: "test",
      status: "upcoming",
    },
    {
      id: "EVT005",
      title: "Orientasi Siswa Baru",
      description: "Pengenalan lingkungan sekolah untuk siswa yang diterima",
      date: "2024-07-15",
      startTime: "07:00",
      endTime: "13:00",
      location: "Lapangan Sekolah",
      type: "orientation",
      status: "upcoming",
    },
  ]);

  const getTypeBadge = (type: string) => {
    const variants = {
      registration: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Pendaftaran", icon: CalendarDays },
      verification: { color: "bg-purple-100 text-purple-800 border-purple-200", label: "Verifikasi", icon: FileCheck },
      announcement: { color: "bg-green-100 text-green-800 border-green-200", label: "Pengumuman", icon: Megaphone },
      test: { color: "bg-orange-100 text-orange-800 border-orange-200", label: "Ujian", icon: GraduationCap },
      orientation: { color: "bg-pink-100 text-pink-800 border-pink-200", label: "Orientasi", icon: Users },
    };
    return variants[type as keyof typeof variants] || variants.registration;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: { color: "bg-yellow-100 text-yellow-800", label: "Akan Datang" },
      ongoing: { color: "bg-green-100 text-green-800", label: "Berlangsung" },
      completed: { color: "bg-gray-100 text-gray-800", label: "Selesai" },
    };
    return variants[status as keyof typeof variants] || variants.upcoming;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime) {
      toast({
        title: "Error",
        description: "Judul, tanggal, dan waktu mulai harus diisi",
        variant: "destructive",
      });
      return;
    }

    const event: ScheduleEvent = {
      id: `EVT${String(events.length + 1).padStart(3, '0')}`,
      ...newEvent,
      status: "upcoming",
    };

    setEvents([...events, event]);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      type: "registration",
    });
    setIsCreateOpen(false);
    
    toast({
      title: "Jadwal Dibuat",
      description: "Kegiatan berhasil ditambahkan ke jadwal",
    });
  };

  const upcomingEvents = events
    .filter(e => e.status === "upcoming" || e.status === "ongoing")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Jadwal Kegiatan</h2>
          <p className="text-muted-foreground">Kelola jadwal kegiatan PPDB</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kegiatan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tambah Kegiatan Baru</DialogTitle>
              <DialogDescription>
                Buat jadwal kegiatan baru untuk PPDB
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Judul Kegiatan</Label>
                <Input
                  placeholder="Masukkan judul kegiatan"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  placeholder="Deskripsi kegiatan..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Jenis Kegiatan</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(v) => setNewEvent({...newEvent, type: v as any})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="registration">Pendaftaran</SelectItem>
                      <SelectItem value="verification">Verifikasi</SelectItem>
                      <SelectItem value="announcement">Pengumuman</SelectItem>
                      <SelectItem value="test">Ujian</SelectItem>
                      <SelectItem value="orientation">Orientasi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Waktu Mulai</Label>
                  <Input
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Waktu Selesai</Label>
                  <Input
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Lokasi</Label>
                <Input
                  placeholder="Lokasi kegiatan"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsCreateOpen(false)}>
                  Batal
                </Button>
                <Button className="flex-1" onClick={handleCreateEvent}>
                  Simpan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDate(day);
                const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
                
                return (
                  <div 
                    key={day}
                    className={`min-h-[80px] p-2 border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors ${
                      isToday ? 'bg-primary/10 border-primary' : ''
                    }`}
                  >
                    <span className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>{day}</span>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div 
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${getTypeBadge(event.type).color}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 2} lainnya
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Kegiatan Mendatang
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map(event => {
                const TypeIcon = getTypeBadge(event.type).icon;
                return (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getTypeBadge(event.type).color}`}>
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {event.startTime} - {event.endTime}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                        <Badge className={`mt-2 ${getStatusBadge(event.status).color}`}>
                          {getStatusBadge(event.status).label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Events Timeline */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Timeline Kegiatan</CardTitle>
          <CardDescription>Semua kegiatan PPDB dalam satu tampilan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => {
                const TypeIcon = getTypeBadge(event.type).icon;
                return (
                  <div key={event.id} className="relative pl-10">
                    <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center ${getTypeBadge(event.type).color}`}>
                      <TypeIcon className="h-3 w-3" />
                    </div>
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge className={getTypeBadge(event.type).color}>
                          {getTypeBadge(event.type).label}
                        </Badge>
                        <Badge variant="outline" className={getStatusBadge(event.status).color}>
                          {getStatusBadge(event.status).label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.startTime} - {event.endTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                        {event.participants && (
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.participants} peserta
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManagement;
