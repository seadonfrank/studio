"use client";

import { Home, Fingerprint, Repeat, Wallet, ShieldCheck, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tab, Mode } from "@/app/page";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function BottomNav({ activeTab, setActiveTab, mode, setMode }: BottomNavProps) {
  const financialTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "finance", label: "Finance", icon: Wallet },
    { id: "payments", label: "Payments", icon: Repeat },
  ];

  const identityTabs = [
    { id: "identity", label: "Identity", icon: Fingerprint },
    { id: "verify", label: "Verify", icon: ShieldCheck },
  ];

  const currentTabs = mode === "financial" ? financialTabs : identityTabs;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2.5rem)] flex flex-col gap-2.5">
      {/* Sub-tabs Icons Row */}
      <div className="flex h-16 items-center justify-around rounded-2xl bg-background/95 shadow-xl backdrop-blur-md ring-1 ring-black/5 p-1.5 transition-all duration-300">
        {currentTabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={cn(
              "flex flex-col items-center justify-center transition-all duration-200 gap-1 active:scale-90 flex-1 h-full rounded-xl",
              activeTab === item.id 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <item.icon className={cn("h-5 w-5", activeTab === item.id && "scale-110")} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Primary Mode Switcher */}
      <div className="flex h-11 items-center justify-center gap-1 rounded-2xl bg-background/90 shadow-lg backdrop-blur-md ring-1 ring-black/5 p-1 transition-all duration-300">
        <button
          onClick={() => setMode("financial")}
          className={cn(
            "flex items-center justify-center gap-2 flex-1 h-full rounded-xl text-[11px] font-bold transition-all duration-200",
            mode === "financial" 
              ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]" 
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <Landmark className="h-3.5 w-3.5" />
          Financial
        </button>
        <button
          onClick={() => setMode("identity")}
          className={cn(
            "flex items-center justify-center gap-2 flex-1 h-full rounded-xl text-[11px] font-bold transition-all duration-200",
            mode === "identity" 
              ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]" 
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          <Fingerprint className="h-3.5 w-3.5" />
          Identity
        </button>
      </div>
    </div>
  );
}
