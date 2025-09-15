
import { Bell } from "lucide-react";
import NotificationMenu from "./notification-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Tab } from "@/app/page";
import { Button } from "./ui/button";

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
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-headline font-bold text-foreground">xIDFI</h1>
      </div>
      <div className="flex items-center gap-2">
        <NotificationMenu />
      </div>
    </header>
  );
}
