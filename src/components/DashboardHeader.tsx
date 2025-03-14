
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { 
  BellIcon, 
  SettingsIcon, 
  SearchIcon,
  UserIcon,
  MenuIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';

export const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();
  const [notificationsCount, setNotificationsCount] = useState(3);
  
  const handleNotificationsClick = () => {
    toast.success("Notifications marked as read");
    setNotificationsCount(0);
  };
  
  const handleProfileClick = (path: string) => {
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6 transition-all duration-200">
      <div className="flex items-center gap-4">
        {state === "collapsed" && (
          <Button variant="ghost" size="icon" className="md:flex" onClick={toggleSidebar}>
            <MenuIcon size={20} className="text-muted-foreground" />
          </Button>
        )}
        <SidebarTrigger className="md:hidden" />
        <div className="relative hidden md:flex items-center">
          <SearchIcon size={18} className="absolute left-3 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-secondary/50 focus:bg-secondary h-9 w-64 pl-10 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationsClick}>
              <BellIcon size={20} className="text-muted-foreground" />
              {notificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">New rainfall data available</p>
                  <span className="text-xs text-muted-foreground">5 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Project status updated</p>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Payment processed successfully</p>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary cursor-pointer" onClick={() => navigate('/notifications')}>
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
          <SettingsIcon size={20} className="text-muted-foreground" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground">
                <UserIcon size={16} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileClick('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileClick('/notifications')}>
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileClick('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => {
              toast.success("Successfully logged out");
              // In a real app, you would have a logout function here
              setTimeout(() => navigate('/'), 1000);
            }}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

