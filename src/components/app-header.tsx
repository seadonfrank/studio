import { Bell, Cog, User, Star, Settings, LogOut, ChevronRight } from "lucide-react";
import NotificationMenu from "./notification-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Tab } from "@/app/page";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function AppHeader({ activeTab, onTransactionsClick }: { activeTab: Tab, onTransactionsClick?: () => void }) {
  const AppLogo = () => (
    <div className="flex items-center gap-1 transition-transform active:scale-95">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/20">
        <span className="font-headline text-base font-bold text-primary-foreground">x</span>
      </div>
      <span className="font-headline text-lg font-bold tracking-tight text-foreground">IDFI</span>
    </div>
  );

  if (activeTab === 'home') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-1.5 px-3 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <AppLogo />
        </div>
        <div className="flex items-center gap-1.5">
           <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 h-8 rounded-full">Earn £50</Button>
          <NotificationMenu />
        </div>
      </header>
    );
  }
  
  if (activeTab === 'finance') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-1.5 px-3 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <AppLogo />
        </div>
        <div className="flex items-center gap-1.5">
          <NotificationMenu />
        </div>
      </header>
    );
  }

  if (activeTab === 'payments') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-1.5 px-3 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <AppLogo />
        </div>
        <div className="flex items-center gap-1.5">
          <Button onClick={onTransactionsClick} size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-200 h-8 rounded-full">Transactions</Button>
          <NotificationMenu />
        </div>
      </header>
    );
  }

  if (activeTab === 'identity') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-1.5 px-3 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <AppLogo />
        </div>
        <div className="flex items-center gap-1.5">
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
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-1.5 px-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5">
        <AppLogo />
      </div>
      <div className="flex items-center gap-1.5">
        <NotificationMenu />
      </div>
    </header>
  );
}
