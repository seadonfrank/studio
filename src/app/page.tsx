"use client";

import { useState } from "react";
import AppHeader from "@/components/app-header";
import BottomNav from "@/components/bottom-nav";
import FinanceTab from "@/components/finance-tab";
import IdentityTab from "@/components/identity-tab";
import PaymentsTab from "@/components/payments-tab";
import ScanToProveView from "@/components/scan-to-prove-view";
import QrToProveView from "@/components/qr-to-prove-view";
import NotificationsView from "@/components/notifications-view";

export type Mode = "financial" | "identity";
export type Tab = "finance" | "payments" | "identity" | "prove" | "qr-to-prove" | "notifications";

export default function Home(props: { params: Promise<any>; searchParams: Promise<any> }) {
  const [mode, setMode] = useState<Mode>("financial");
  const [activeTab, setActiveTab] = useState<Tab>("finance");
  const [paymentsView, setPaymentsView] = useState('main');
  const [previousTab, setPreviousTab] = useState<Tab>("finance");

  const handleTransactionsClick = () => {
    if (activeTab === 'payments') {
      setPaymentsView('transactions');
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setPaymentsView('main');
  };

  const handleNotificationClick = () => {
    setPreviousTab(activeTab);
    setActiveTab("notifications");
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    // Set default tab for the selected mode
    if (newMode === "financial") {
      setActiveTab("finance");
    } else {
      setActiveTab("identity");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 sm:p-8">
      <div className="relative h-[844px] w-full max-w-[390px] overflow-hidden rounded-[40px] border-[8px] border-black bg-background shadow-2xl">
        <AppHeader 
          activeTab={activeTab as any} 
          onTransactionsClick={handleTransactionsClick}
          onNotificationClick={handleNotificationClick}
          onBack={() => setActiveTab(previousTab)}
        />
        <div className="h-full overflow-y-auto pb-44 pt-20">
          {activeTab === "finance" && <FinanceTab />}
          {activeTab === "identity" && <IdentityTab />}
          {activeTab === "prove" && <ScanToProveView onBack={() => setActiveTab("identity")} />}
          {activeTab === "qr-to-prove" && <QrToProveView onBack={() => setActiveTab("identity")} />}
          {activeTab === "payments" && <PaymentsTab view={paymentsView} setView={setPaymentsView} />}
          {activeTab === "notifications" && <NotificationsView onBack={() => setActiveTab(previousTab)} />}
        </div>
        {activeTab !== "notifications" && (
          <BottomNav 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            mode={mode}
            setMode={handleModeChange}
          />
        )}
      </div>
    </main>
  );
}
