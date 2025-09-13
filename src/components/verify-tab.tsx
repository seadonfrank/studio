
"use client";

import { useState } from "react";
import { ChevronRight, Scan, QrCode, ArrowUpCircle, ArrowDownCircle, Shield, BookUser, GraduationCap, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ScanToProveView from "./scan-to-prove-view";
import QrToProveView from "./qr-to-prove-view";
import { Separator } from "./ui/separator";
import SendCredentialsView from "./send-credentials-view";
import RequestCredentialsView from "./request-credentials-view";
import { Badge } from "./ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import CredentialTypeCard from "./credential-type-card";

export default function VerifyTab() {
  const [view, setView] = useState<"main" | "prove" | "qr" | "send" | "request">("main");

  const recentActivity = [
    { action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
  ];

  const credentialTypes = [
    { type: "Government", count: 3, icon: Shield },
    { type: "Licenses", count: 3, icon: BookUser },
    { type: "Academic", count: 2, icon: GraduationCap },
    { type: "Crypto", count: 2, icon: Wallet },
  ];

  const renderContent = () => {
    switch (view) {
      case "prove":
        return <ScanToProveView onBack={() => setView("main")} />;
      case "qr":
        return <QrToProveView onBack={() => setView("main")} />;
      case "send":
        return <SendCredentialsView onBack={() => setView("main")} />;
      case "request":
        return <RequestCredentialsView onBack={() => setView("main")} />;
      default:
        return (
          <>
            <div>
              <Carousel opts={{ align: "start", dragFree: true }} className="w-full -ml-4">
                  <CarouselContent className="pl-4">
                    {credentialTypes.map((credType, index) => (
                      <CarouselItem key={index} className="basis-auto pl-2">
                        <div className="w-[150px]">
                          <CredentialTypeCard {...credType} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
            </div>

            <Card>
              <CardContent className="p-0">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setView("send")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                      <ArrowUpCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Send Credentials</p>
                      <p className="text-sm text-muted-foreground">
                        Provide your credentials to a verifier
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <Separator />
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setView("request")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                      <ArrowDownCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Request Credentials</p>
                      <p className="text-sm text-muted-foreground">
                        Request credentials from another user
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <Separator />
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setView("prove")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                      <Scan className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Scan to Prove</p>
                      <p className="text-sm text-muted-foreground">
                        Instant scan to provide zero-knowledge credential proofs
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <Separator />
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setView("qr")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                      <QrCode className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">QR to Prove</p>
                      <p className="text-sm text-muted-foreground">
                        Generate QR to request zero-knowledge credential proofs
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="font-medium">
                          <span className="text-primary">{activity.action}</span> {activity.credential}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          For {activity.entity} &bull; {activity.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return <div className="p-4 space-y-6">{renderContent()}</div>;
}
