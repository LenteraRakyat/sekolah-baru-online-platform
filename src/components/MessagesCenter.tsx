import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Archive,
  Star,
  Clock,
  Check,
  CheckCheck,
  User,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "admin" | "user";
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  userName: string;
  userEmail: string;
  studentId: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isStarred: boolean;
  isArchived: boolean;
  messages: Message[];
}

const MessagesCenter = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "CONV001",
      userName: "Ahmad Fadil Rahman",
      userEmail: "ahmad.fadil@gmail.com",
      studentId: "PPDB001",
      lastMessage: "Terima kasih atas informasinya, Pak.",
      lastMessageTime: "10:30",
      unreadCount: 2,
      isStarred: true,
      isArchived: false,
      messages: [
        { id: "MSG001", content: "Selamat pagi, saya ingin bertanya tentang persyaratan dokumen.", timestamp: "09:00", sender: "user", status: "read" },
        { id: "MSG002", content: "Selamat pagi. Silakan tanyakan, kami siap membantu.", timestamp: "09:15", sender: "admin", status: "read" },
        { id: "MSG003", content: "Apakah ijazah harus yang asli atau boleh fotokopi?", timestamp: "09:20", sender: "user", status: "read" },
        { id: "MSG004", content: "Untuk verifikasi awal bisa menggunakan fotokopi yang dilegalisir. Ijazah asli akan diperiksa saat verifikasi akhir.", timestamp: "09:30", sender: "admin", status: "read" },
        { id: "MSG005", content: "Terima kasih atas informasinya, Pak.", timestamp: "10:30", sender: "user", status: "read" },
      ],
    },
    {
      id: "CONV002",
      userName: "Siti Nurhaliza",
      userEmail: "siti.nurhaliza@gmail.com",
      studentId: "PPDB002",
      lastMessage: "Baik, saya akan upload ulang dokumennya.",
      lastMessageTime: "Kemarin",
      unreadCount: 0,
      isStarred: false,
      isArchived: false,
      messages: [
        { id: "MSG006", content: "Dokumen KK saya ditolak, apa yang salah ya?", timestamp: "Kemarin 14:00", sender: "user", status: "read" },
        { id: "MSG007", content: "Dokumen KK Anda tidak jelas/blur. Mohon upload ulang dengan kualitas yang lebih baik.", timestamp: "Kemarin 14:30", sender: "admin", status: "read" },
        { id: "MSG008", content: "Baik, saya akan upload ulang dokumennya.", timestamp: "Kemarin 15:00", sender: "user", status: "read" },
      ],
    },
    {
      id: "CONV003",
      userName: "Budi Santoso",
      userEmail: "budi.santoso@gmail.com",
      studentId: "PPDB003",
      lastMessage: "Kapan pengumuman hasil seleksi?",
      lastMessageTime: "2 hari lalu",
      unreadCount: 1,
      isStarred: false,
      isArchived: false,
      messages: [
        { id: "MSG009", content: "Kapan pengumuman hasil seleksi?", timestamp: "2 hari lalu", sender: "user", status: "delivered" },
      ],
    },
    {
      id: "CONV004",
      userName: "Rina Kartika",
      userEmail: "rina.kartika@gmail.com",
      studentId: "PPDB004",
      lastMessage: "Apakah ada biaya pendaftaran?",
      lastMessageTime: "3 hari lalu",
      unreadCount: 0,
      isStarred: true,
      isArchived: false,
      messages: [
        { id: "MSG010", content: "Apakah ada biaya pendaftaran?", timestamp: "3 hari lalu 10:00", sender: "user", status: "read" },
        { id: "MSG011", content: "Tidak ada biaya pendaftaran. PPDB ini gratis.", timestamp: "3 hari lalu 10:30", sender: "admin", status: "read" },
      ],
    },
  ]);

  const filteredConversations = conversations.filter(conv => 
    !conv.isArchived && (
      conv.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `MSG${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      sender: "admin",
      status: "sent",
    };

    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { 
            ...conv, 
            messages: [...conv.messages, message],
            lastMessage: newMessage,
            lastMessageTime: "Baru saja",
          }
        : conv
    ));

    setSelectedConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, message],
    } : null);

    setNewMessage("");
    
    toast({
      title: "Pesan Terkirim",
      description: "Pesan berhasil dikirim",
    });
  };

  const handleStarConversation = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isStarred: !conv.isStarred } : conv
    ));
  };

  const handleArchiveConversation = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, isArchived: true } : conv
    ));
    if (selectedConversation?.id === id) {
      setSelectedConversation(null);
    }
    toast({
      title: "Percakapan Diarsipkan",
      description: "Percakapan telah dipindahkan ke arsip",
    });
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Check className="h-3 w-3 text-muted-foreground" />;
      case "delivered": return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case "read": return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Pesan & Chat</h2>
          <p className="text-muted-foreground">Komunikasi dengan calon siswa dan orang tua</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <MessageSquare className="h-4 w-4 mr-1" />
            {totalUnread} belum dibaca
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <Card className="border-0 shadow-md lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Cari percakapan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-380px)]">
              <div className="space-y-1 p-2">
                {filteredConversations.map(conv => (
                  <div 
                    key={conv.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conv.id 
                        ? 'bg-primary/10' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      setSelectedConversation(conv);
                      setConversations(prev => prev.map(c => 
                        c.id === conv.id ? { ...c, unreadCount: 0 } : c
                      ));
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conv.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm truncate">{conv.userName}</h4>
                            {conv.isStarred && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                          </div>
                          <span className="text-xs text-muted-foreground">{conv.lastMessageTime}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{conv.studentId}</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-0 shadow-md lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {selectedConversation.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.userName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedConversation.studentId}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleStarConversation(selectedConversation.id)}
                    >
                      <Star className={`h-4 w-4 ${selectedConversation.isStarred ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleArchiveConversation(selectedConversation.id)}
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${
                          message.sender === 'admin' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        } rounded-2xl px-4 py-2`}>
                          <p className="text-sm">{message.content}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 ${
                            message.sender === 'admin' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            <span className="text-xs">{message.timestamp}</span>
                            {message.sender === 'admin' && getMessageStatusIcon(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input 
                    placeholder="Ketik pesan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Pilih Percakapan</h3>
                <p className="text-muted-foreground">
                  Pilih percakapan dari daftar untuk mulai berkomunikasi
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesCenter;
