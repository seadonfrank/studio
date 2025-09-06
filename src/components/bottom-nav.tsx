"use client";

import type { Dispatch, SetStateAction } from "react";
import { Landmark, Fingerprint, ScanLine, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tab } from "@/app/page";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: "finance", label: "Finance", icon: Landmark },
    { id: "pay", label: "Pay", icon: ScanLine },
    { id: "verify", label: "Verify", icon: ShieldCheck },
    { id: "identity", label: "Identity", icon: Fingerprint },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 h-20 bg-transparent">
       <div className="flex h-full items-center justify-around rounded-t-3xl bg-background/80 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] backdrop-blur-sm">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id !== 'pay' && item.id !== 'verify') {
                setActiveTab(item.id as Tab)
              }
              // Potentially handle QR scan action here
            }}
            aria-label={item.label}
            aria-pressed={activeTab === item.id}
            className={cn(
              "flex h-12 w-16 flex-col items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200",
              activeTab === item.id && "text-primary bg-primary/10"
            )}
          >
            <item.icon className="h-6 w-6" />
          </button>
        ))}
       </div>
    </div>
  );
}
