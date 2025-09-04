"use client";

import { useState } from "react";
import AppHeader from "@/components/app-header";
import BottomNav from "@/components/bottom-nav";
import FinanceTab from "@/components/finance-tab";
import IdentityTab from "@/components/identity-tab";

export type Tab = "finance" | "identity";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("finance");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 sm:p-8">
      <div className="relative h-[844px] w-full max-w-[390px] overflow-hidden rounded-[40px] border-[8px] border-black bg-background shadow-2xl">
        <AppHeader />
        <div className="h-full overflow-y-auto pb-32 pt-16">
          {activeTab === "finance" && <FinanceTab />}
          {activeTab === "identity" && <IdentityTab />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </main>
  );
}
