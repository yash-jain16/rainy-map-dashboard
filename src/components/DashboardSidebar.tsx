
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  LogOutIcon,
  ShieldIcon,
  UsersIcon,
  Database
} from "lucide-react";
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Weather Perils', icon: CloudRainIcon, path: '/weather' },
  { name: 'Projects Map', icon: MapPinIcon, path: '/projects' },
  { name: 'Risk Management', icon: ShieldIcon, path: '/risk-management' },
  { name: 'Forecast', icon: CalendarIcon, path: '/forecast' },
  { name: 'Analytics', icon: BarChart3Icon, path: '/analytics' },
  { name: 'Settings', icon: SettingsIcon, path: '/settings' },
];

const adminMenuItems = [
  { name: 'Admin Dashboard', icon: Database, path: '/admin' },
  { name: 'Actuarial Workspace', icon: UsersIcon, path: '/actuarial' },
];

export const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const activeItem = location.pathname;
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-sm"></div>
                <div className="absolute top-1 left-1 w-2 h-1 bg-blue-600 rounded-sm"></div>
              </div>
            </div>
            <span className="font-semibold text-lg">Harbour</span>
          </div>
          <SidebarTrigger className="lg:hidden" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
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
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon 
                        size={20} 
                        className={cn(
                          "transition-all duration-200",
                          activeItem === item.path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )} 
                      />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Internal Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      "group transition-all duration-200",
                      activeItem === item.path ? "text-primary font-medium" : "text-muted-foreground"
                    )}
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon 
                        size={20} 
                        className={cn(
                          "transition-all duration-200",
                          activeItem === item.path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )} 
                      />
                      <span>{item.name}</span>
                    </Link>
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
