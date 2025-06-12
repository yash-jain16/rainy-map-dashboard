
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
    if (path === '/profile') {
      toast.info("Profile page coming soon");
      return;
    }
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-6 transition-all duration-200">
      <div className="flex items-center gap-4">
        {state === "collapsed" && (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:flex hover:scale-110 transition-transform" onClick={toggleSidebar}>
              <MenuIcon size={20} className="text-muted-foreground" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-sm"></div>
                  <div className="absolute top-1 left-1 w-2 h-1 bg-blue-600 rounded-sm"></div>
                </div>
              </div>
              <span className="font-semibold text-lg hidden md:block">Harbour</span>
            </div>
          </div>
        )}
        {state === "expanded" && (
          <SidebarTrigger className="md:hidden" />
        )}
        <div className="relative hidden md:flex items-center ml-auto md:ml-0">
          <SearchIcon size={18} className="absolute left-3 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-secondary/50 focus:bg-secondary h-9 w-64 pl-10 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-ring hover:bg-secondary/70 transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-all duration-200 hover:bg-secondary/80" onClick={handleNotificationsClick}>
              <BellIcon size={20} className="text-muted-foreground transition-colors hover:text-foreground" />
              {notificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">New rainfall data available</p>
                  <span className="text-xs text-muted-foreground">5 minutes ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Project status updated</p>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Payment processed successfully</p>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => toast.info("All notifications viewed")}>
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform" onClick={() => navigate('/settings')}>
          <SettingsIcon size={20} className="text-muted-foreground" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:scale-110 transition-transform">
              <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground">
                <UserIcon size={16} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors" onClick={() => handleProfileClick('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors" onClick={() => toast.info("All notifications viewed")}>
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary/50 transition-colors" onClick={() => handleProfileClick('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer hover:bg-destructive/10 transition-colors" onClick={() => {
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
