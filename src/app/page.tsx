"use client";

import { useState } from "react";
import AppHeader from "@/components/app-header";
import BottomNav from "@/components/bottom-nav";
import FinanceTab from "@/components/finance-tab";
import IdentityTab from "@/components/identity-tab";
import PaymentsTab from "@/components/payments-tab";
import VerifyTab from "@/components/verify-tab";

export type Tab = "finance" | "identity" | "payments" | "verify";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("finance");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 sm:p-8">
      <div className="relative h-[844px] w-full max-w-[390px] overflow-hidden rounded-[40px] border-[8px] border-black bg-background shadow-2xl">
        <AppHeader activeTab={activeTab} />
        <div className="h-full overflow-y-auto pb-20 pt-20">
          {activeTab === "finance" && <FinanceTab />}
          {activeTab === "identity" && <IdentityTab />}
          {activeTab === "payments" && <PaymentsTab />}
          {activeTab === "verify" && <VerifyTab />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </main>
  );
}
