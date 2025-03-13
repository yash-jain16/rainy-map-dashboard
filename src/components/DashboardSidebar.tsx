
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  HomeIcon, 
  CloudRainIcon, 
  MapPinIcon, 
  CalendarIcon,
  BarChart3Icon, 
  SettingsIcon,
  LogOutIcon
} from "lucide-react";
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Weather Data', icon: CloudRainIcon, path: '/weather' },
  { name: 'Projects Map', icon: MapPinIcon, path: '/projects' },
  { name: 'Forecast', icon: CalendarIcon, path: '/forecast' },
  { name: 'Analytics', icon: BarChart3Icon, path: '/analytics' },
  { name: 'Settings', icon: SettingsIcon, path: '/settings' },
];

export const DashboardSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = React.useState('/');
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <CloudRainIcon size={24} className="text-primary" />
            <span className="font-semibold text-lg">RainTrack</span>
          </div>
          <SidebarTrigger className="lg:hidden" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      "group transition-all duration-200",
                      activeItem === item.path ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                    onClick={() => setActiveItem(item.path)}
                  >
                    <a href={item.path} className="flex items-center gap-3">
                      <item.icon 
                        size={20} 
                        className={cn(
                          "transition-all duration-200",
                          activeItem === item.path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )} 
                      />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-muted-foreground hover:text-destructive transition-colors duration-200">
              <button className="flex items-center gap-3">
                <LogOutIcon size={20} />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
