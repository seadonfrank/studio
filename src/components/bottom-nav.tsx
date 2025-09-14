"use client";

import type { Dispatch, SetStateAction } from "react";
import { Home, Fingerprint, Repeat, Shield, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tab } from "@/app/page";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: "finance", label: "Finance", icon: Wallet },
    { id: "payments", label: "Payments", icon: Repeat },
    { id: "home", label: "Home", icon: Home },
    { id: "verify", label: "Verify", icon: Shield },
    { id: "identity", label: "Identity", icon: Fingerprint },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)]">
       <div className="flex h-16 items-center justify-around rounded-2xl bg-background/90 shadow-lg backdrop-blur-sm ring-1 ring-black/5">
        {navItems.map((item) => {
          const isHome = item.id === 'home';
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              aria-label={item.label}
              aria-pressed={activeTab === item.id}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-200 gap-1 active:scale-95",
                isHome 
                  ? "h-14 w-14 rounded-full text-primary bg-primary/10 -translate-y-2 shadow-md ring-4 ring-background" 
                  : "h-14 w-14 rounded-lg text-muted-foreground hover:text-foreground",
                activeTab === item.id && !isHome ? "text-primary bg-primary/10" : "",
                activeTab === item.id && isHome ? "text-primary-foreground bg-primary" : ""
              )}
            >
              <item.icon className={cn("h-5 w-5", isHome && "h-6 w-6")} />
              <span className={cn("text-[11px] font-medium", isHome && "text-[10px]")}>{!isHome && item.label}</span>
            </button>
          )
        })}
       </div>
    </div>
  );
}
