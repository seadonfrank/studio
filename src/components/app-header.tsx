import { Bell, Cog, User, Star, Settings, LogOut, ChevronRight } from "lucide-react";
import NotificationMenu from "./notification-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Tab } from "@/app/page";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export default function AppHeader({ activeTab, onTransactionsClick }: { activeTab: Tab, onTransactionsClick?: () => void }) {
  const { toast } = useToast();

  const handleProfileClick = (item: string) => {
    toast({
      title: item,
      description: `Navigating to ${item.toLowerCase()}...`,
    });
  };

  const AppLogo = () => (
    <div className="flex items-center gap-1.5 transition-transform active:scale-95">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/20">
        <span className="font-headline text-lg font-bold text-primary-foreground">x</span>
      </div>
      <span className="font-headline text-xl font-bold tracking-tight text-foreground">IDFI</span>
    </div>
  );

  const UserMenu = ({ children }: { children: React.ReactNode }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none focus:ring-0">{children}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 rounded-xl p-2 shadow-xl border-primary/10">
        <DropdownMenuLabel className="flex items-center gap-3 px-2 py-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-headline text-sm font-bold">John Doe</span>
            <span className="text-[10px] text-muted-foreground">did:xidfi:1a2b3...</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem onClick={() => handleProfileClick("Profile")} className="rounded-lg py-2.5 focus:bg-primary/5 cursor-pointer">
          <User className="mr-2 h-4 w-4 text-primary" />
          <span>My Profile</span>
          <ChevronRight className="ml-auto h-3 w-3 opacity-30" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleProfileClick("Settings")} className="rounded-lg py-2.5 focus:bg-primary/5 cursor-pointer">
          <Settings className="mr-2 h-4 w-4 text-primary" />
          <span>Settings</span>
          <ChevronRight className="ml-auto h-3 w-3 opacity-30" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-1" />
        <DropdownMenuItem onClick={() => handleProfileClick("Logout")} className="rounded-lg py-2.5 text-destructive focus:text-destructive focus:bg-destructive/5 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (activeTab === 'home') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <UserMenu>
            <AppLogo />
          </UserMenu>
        </div>
        <div className="flex items-center gap-2">
           <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 h-8 rounded-full">Earn £50</Button>
          <NotificationMenu />
        </div>
      </header>
    );
  }
  
  if (activeTab === 'finance') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <UserMenu>
            <AppLogo />
          </UserMenu>
        </div>
        <div className="flex items-center gap-2">
          <NotificationMenu />
        </div>
      </header>
    );
  }

  if (activeTab === 'payments') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <UserMenu>
            <AppLogo />
          </UserMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onTransactionsClick} size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-200 h-8 rounded-full">Transactions</Button>
          <NotificationMenu />
        </div>
      </header>
    );
  }

  if (activeTab === 'identity') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <UserMenu>
            <AppLogo />
          </UserMenu>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 h-10 rounded-full px-4 font-bold flex items-center gap-2 cursor-pointer hover:bg-primary/10 active:scale-95 transition-all">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm">850</span>
          </Badge>
          <NotificationMenu />
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <UserMenu>
          <AppLogo />
        </UserMenu>
      </div>
      <div className="flex items-center gap-2">
        <NotificationMenu />
      </div>
    </header>
  );
}