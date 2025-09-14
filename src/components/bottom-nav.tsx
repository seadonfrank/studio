
"use client";

import type { Dispatch, SetStateAction } from "react";
import { Home, Fingerprint, Repeat, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tab } from "@/app/page";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: "finance", label: "Finance", icon: Home },
    { id: "payments", label: "Payments", icon: Repeat },
    { id: "verify", label: "Verify", icon: Shield },
    { id: "identity", label: "Identity", icon: Fingerprint },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)]">
       <div className="flex h-16 items-center justify-around rounded-2xl bg-background/90 shadow-lg backdrop-blur-sm ring-1 ring-black/5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            aria-label={item.label}
            aria-pressed={activeTab === item.id}
            className={cn(
              "flex h-14 w-16 flex-col items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 gap-1 active:scale-95",
              activeTab === item.id ? "text-primary bg-primary/10" : "hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[11px] font-medium">{item.label}</span>
          </button>
        ))}
       </div>
    </div>
  );
}
