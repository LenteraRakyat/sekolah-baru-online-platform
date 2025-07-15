
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  School,
  Settings,
  BarChart3,
  Calendar,
  Bell,
  MessageSquare,
  Download,
  HelpCircle,
  LogOut,
  GraduationCap,
  UserCheck,
  FileText,
  Cog,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Pendaftaran", url: "/admin/applications", icon: FileCheck },
  { title: "Calon Siswa", url: "/admin/students", icon: Users },
  { title: "Verifikasi Dokumen", url: "/admin/verification", icon: FileText },
  { title: "Pengumuman", url: "/admin/announcements", icon: Bell },
  { title: "Jadwal Kegiatan", url: "/admin/schedule", icon: Calendar },
  { title: "Laporan", url: "/admin/reports", icon: BarChart3 },
];

const settingsItems = [
  { title: "Data Sekolah", url: "/admin/school-settings", icon: School },
  { title: "Kelola Pengguna", url: "/admin/users", icon: UserCheck },
  { title: "Pengaturan Sistem", url: "/admin/settings", icon: Cog },
];

const supportItems = [
  { title: "Pesan & Chat", url: "/admin/messages", icon: MessageSquare },
  { title: "Bantuan", url: "/admin/help", icon: HelpCircle },
  { title: "Export Data", url: "/admin/export", icon: Download },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin") {
      return currentPath === "/admin";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    return isActive(path)
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
      : "hover:bg-muted/50";
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">PPDB Admin</h2>
              <p className="text-sm text-muted-foreground">Panel Administrasi</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Pengaturan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Dukungan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Admin PPDB</p>
              <p className="text-xs text-muted-foreground">admin@sekolah.id</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button variant="ghost" size="sm" className="mt-2 w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
