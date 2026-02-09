import { Bell, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Tab } from "@/app/page";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function AppHeader({ 
  activeTab, 
  onTransactionsClick, 
  onNotificationClick,
  onBack 
}: { 
  activeTab: Tab, 
  onTransactionsClick?: () => void,
  onNotificationClick?: () => void,
  onBack?: () => void
}) {
  const AppLogo = () => (
    <div className="flex items-center gap-1 transition-transform active:scale-95">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary shadow-sm shadow-primary/20">
        <span className="font-headline text-base font-bold text-primary-foreground">x</span>
      </div>
    </div>
  );

  const NotificationButton = () => (
    <Button 
      variant="ghost" 
      size="icon" 
      aria-label="Notifications" 
      className="relative h-10 w-10 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors text-primary"
      onClick={onNotificationClick}
    >
      <Bell className="h-5 w-5" />
      <Badge 
        variant="accent" 
        className="absolute -top-0.5 -right-0.5 h-4.5 min-w-[18px] justify-center px-1 py-0 text-[10px] font-bold border-2 border-background shadow-sm"
      >
        4
      </Badge>
    </Button>
  );

  if (activeTab === 'notifications') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center gap-3 bg-background/80 py-1.5 px-3 backdrop-blur-sm">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10 rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-headline text-lg font-bold">Inbox</h1>
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
          <NotificationButton />
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
          <NotificationButton />
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
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 h-10 rounded-full px-4 font-bold flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="text-sm">850</span>
          </Badge>
          <NotificationButton />
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
        <NotificationButton />
      </div>
    </header>
  );
}
