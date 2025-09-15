
import { Bell, Cog, User } from "lucide-react";
import NotificationMenu from "./notification-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { Tab } from "@/app/page";
import { Button } from "./ui/button";

export default function AppHeader({ activeTab, onTransactionsClick, onActivitiesClick }: { activeTab: Tab, onTransactionsClick?: () => void, onActivitiesClick?: () => void }) {
  if (activeTab === 'home') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
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
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
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
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onTransactionsClick} size="sm" className="bg-blue-100 text-blue-800 hover:bg-blue-200 h-8 rounded-full">Transactions</Button>
          <NotificationMenu />
        </div>
      </header>
    );
  }

  if (activeTab === 'verify') {
    return (
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-background/80 py-2 px-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/id/1005/200/200" data-ai-hint="person portrait" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onActivitiesClick} size="sm" className="bg-purple-100 text-purple-800 hover:bg-purple-200 h-8 rounded-full">Activities</Button>
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
      </div>
      <div className="flex items-center gap-2">
        <NotificationMenu />
      </div>
    </header>
  );
}
