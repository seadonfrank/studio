"use client";

import { ShieldCheck, Scan, ArrowLeft, History, FileCheck, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useState } from "react";
import ScanAndClaim from "./scan-and-claim";

export default function VerifyTab() {
  const [showScanner, setShowScanner] = useState(false);

  if (showScanner) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setShowScanner(false)}>
            <ArrowLeft />
          </Button>
          <h2 className="text-xl font-bold font-headline">Scan for Verification</h2>
        </div>
        <div className="bg-background rounded-3xl overflow-hidden shadow-sm border border-border">
          <ScanAndClaim />
        </div>
        <div className="text-center space-y-2 px-4">
          <p className="text-sm font-medium">Verify Identity or Claims</p>
          <p className="text-xs text-muted-foreground">
            Point the camera at an xIDFI QR code to instantly verify credentials without accessing private data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold font-headline">Verify Credentials</h2>
        <p className="text-muted-foreground text-sm">Trustless peer-to-peer verification.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card 
          className="bg-primary text-primary-foreground overflow-hidden border-none shadow-xl group cursor-pointer active:scale-95 transition-all duration-200"
          onClick={() => setShowScanner(true)}
        >
          <CardContent className="p-6 flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
              <Scan className="h-9 w-9" />
            </div>
            <div>
              <p className="text-xl font-bold font-headline">Launch Verifier</p>
              <p className="text-sm opacity-90 leading-tight">Securely scan and validate xIDFI claims</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background border-border/60 shadow-sm rounded-3xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              History
            </CardTitle>
            <CardDescription>Recently verified identities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4">
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
              <div className="h-11 w-11 rounded-full bg-green-100 flex items-center justify-center text-green-700 shadow-inner">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">Merchant Age Proof</p>
                <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-tighter">Verified &bull; 45m ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors">
              <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 shadow-inner">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm truncate">Employee KYC Status</p>
                <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-tighter">Verified &bull; yesterday</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full text-xs font-bold text-primary hover:bg-primary/5 rounded-xl h-10 mt-2">
              View Detailed Log
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 px-1">Common Trust Queries</h3>
        <div className="grid grid-cols-2 gap-3">
          {['Proof of Age', 'Accreditation', 'Employment', 'ID Validity'].map((req) => (
            <div 
              key={req} 
              className="p-3.5 bg-background border border-border/60 rounded-2xl flex items-center gap-3 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer shadow-sm group"
            >
              <div className="h-7 w-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold">{req}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
