
"use client";

import { Home, Fingerprint, Repeat, Wallet, Landmark, Scan } from "lucide-react";
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
    { id: "prove", label: "Prove", icon: Scan },
  ];

  const currentTabs = mode === "financial" ? financialTabs : identityTabs;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)]">
      <nav className="flex items-center bg-background/95 shadow-2xl backdrop-blur-lg rounded-[24px] p-2 ring-1 ring-black/5 border border-white/10 h-16">
        {/* Mode Switcher Segment */}
        <div className="flex items-center bg-muted/50 rounded-[18px] p-1 gap-1">
          <button
            onClick={() => setMode("financial")}
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-[14px] transition-all duration-300",
              mode === "financial" 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title="Financial Mode"
          >
            <Landmark className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMode("identity")}
            className={cn(
              "flex items-center justify-center h-10 w-10 rounded-[14px] transition-all duration-300",
              mode === "identity" 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title="Identity Mode"
          >
            <Fingerprint className="h-5 w-5" />
          </button>
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-border/60 mx-3 shrink-0" />

        {/* Contextual Navigation Tabs */}
        <div className="flex flex-1 items-center justify-around pr-1">
          {currentTabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "flex flex-col items-center justify-center transition-all duration-200 gap-1 active:scale-90 h-12 min-w-[56px] rounded-xl px-2",
                activeTab === item.id 
                  ? "text-primary font-bold" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-transform", activeTab === item.id && "scale-110")} />
              <span className="text-[10px] uppercase tracking-tighter font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
