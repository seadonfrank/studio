
"use client";

import type { Dispatch, SetStateAction } from "react";
import { CreditCard, Home, Repeat, Users, Fingerprint, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tab } from "@/app/page";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: "finance", label: "Finance", icon: Home },
    { id: "identity", label: "Identity", icon: Fingerprint },
    { id: "payments", label: "Payments", icon: Repeat },
    { id: "verify", label: "Verify", icon: Shield },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 h-20 bg-transparent">
       <div className="flex h-full items-center justify-around rounded-t-3xl bg-background/95 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] backdrop-blur-sm">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            aria-label={item.label}
            aria-pressed={activeTab === item.id}
            className={cn(
              "flex h-16 w-20 flex-col items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 gap-1",
              activeTab === item.id && "text-primary"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
       </div>
    </div>
  );
}
