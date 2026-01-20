"use client";

import { useState } from "react";
import AppHeader from "@/components/app-header";
import BottomNav from "@/components/bottom-nav";
import FinanceTab from "@/components/finance-tab";
import IdentityTab from "@/components/identity-tab";
import PaymentsTab from "@/components/payments-tab";
import VerifyTab from "@/components/verify-tab";
import HomeTab from "@/components/home-tab";

export type Tab = "home" | "finance" | "identity" | "payments" | "verify";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [paymentsView, setPaymentsView] = useState('main');
  const [verifyView, setVerifyView] = useState('main');
  const [activityCaller, setActivityCaller] = useState<'identity' | 'verify'>('verify');
  const [sendCaller, setSendCaller] = useState<'identity' | 'other'>('other');

  const handleTransactionsClick = () => {
    if (activeTab === 'payments') {
      setPaymentsView('transactions');
    }
  };

  const handleHistoryClick = () => {
    setActiveTab('verify');
    setVerifyView('activities');
    setActivityCaller('identity');
  };

  const handleShareClick = () => {
    setActiveTab('verify');
    setVerifyView('send');
    setSendCaller('identity');
  };

  const handleScanToProveClick = () => {
    setActiveTab('verify');
    setVerifyView('prove');
  };

  const handleQrToProveClick = () => {
    setActiveTab('verify');
    setVerifyView('qr');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setVerifyView('main');
    setPaymentsView('main');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 sm:p-8">
      <div className="relative h-[844px] w-full max-w-[390px] overflow-hidden rounded-[40px] border-[8px] border-black bg-background shadow-2xl">
        <AppHeader 
          activeTab={activeTab} 
          onTransactionsClick={handleTransactionsClick}
        />
        <div className="h-full overflow-y-auto pb-32 pt-20">
          {activeTab === "home" && <HomeTab />}
          {activeTab === "finance" && <FinanceTab />}
          {activeTab === "identity" && <IdentityTab onHistoryClick={handleHistoryClick} onShareClick={handleShareClick} onScanToProveClick={handleScanToProveClick} onQrToProveClick={handleQrToProveClick} />}
          {activeTab === "payments" && <PaymentsTab view={paymentsView} setView={setPaymentsView} />}
          {activeTab === "verify" && <VerifyTab view={verifyView} setView={setVerifyView} setActiveTab={setActiveTab} activityCaller={activityCaller} sendCaller={sendCaller} setSendCaller={setSendCaller} />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>
    </main>
  );
}
