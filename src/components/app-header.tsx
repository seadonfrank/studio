import { Bell, Settings, Eye } from "lucide-react";
import { Button } from "./ui/button";
import NotificationMenu from "./notification-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import type { Tab } from "@/app/page";

export default function AppHeader({ activeTab }: { activeTab: Tab }) {
  if (activeTab === 'finance') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
           <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 h-8 rounded-full">Earn £50</Button>
        </div>
        <div className="flex items-center gap-2">
          <NotificationMenu />
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-xl font-headline font-bold text-foreground">xIDFI</h1>
      </div>
      <div className="flex items-center gap-2">
        <NotificationMenu />
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
