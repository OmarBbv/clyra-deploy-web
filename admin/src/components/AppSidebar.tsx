import { BookOpenCheck,  Home, MessageCircleQuestion, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";


const navbarItems = [
  {
    title: "Ana Sayfa",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Hikayeler",
    url: "stories",
    icon: BookOpenCheck,
  },
  {
    title:"Dersler",
    url: 'lessons',
    icon: BookOpenCheck
  },
  {
    title: "Soru Cevap",
    url: "#",
    icon: MessageCircleQuestion,
  },
  {
    title: "Ayarlar",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-64 bg-background text-foreground">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-24 w-full flex items-center justify-center my-2">
            <img src={'logo'} alt="Logo" className="h-full w-full object-cover rounded-lg" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navbarItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-2">
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-1 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}