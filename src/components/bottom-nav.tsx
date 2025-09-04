import type { Dispatch, SetStateAction } from "react";
import { Landmark, Fingerprint, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Tab } from "@/app/page";

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const navItems = [
    { id: "finance", label: "Finance", icon: Landmark },
    { id: "scan", label: "Scan QR", icon: QrCode },
    { id: "identity", label: "Identity", icon: Fingerprint },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 flex h-20 items-end justify-center">
       <div className="flex h-16 w-full items-center justify-around rounded-t-2xl bg-background/80 backdrop-blur-sm">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id !== 'scan') {
                setActiveTab(item.id as Tab)
              }
              // Potentially handle QR scan action here
            }}
            aria-pressed={activeTab === item.id}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg px-6 py-2 text-muted-foreground transition-colors duration-200",
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
