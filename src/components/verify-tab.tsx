
"use client";

import { useState } from "react";
import { ChevronRight, Scan, QrCode, ArrowUpCircle, ArrowDownCircle, Shield, BookUser, GraduationCap, Wallet, Cake, Car, School, Badge as BadgeIcon, BarChart2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ScanToProveView from "./scan-to-prove-view";
import QrToProveView from "./qr-to-prove-view";
import { Separator } from "./ui/separator";
import SendCredentialsView from "./send-credentials-view";
import RequestCredentialsView from "./request-credentials-view";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import CredentialTypeCard from "./credential-type-card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export default function VerifyTab() {
  const [view, setView] = useState<"main" | "prove" | "qr" | "send" | "request">("main");

  const recentActivity = [
    { action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
  ];

  const credentialTypes = [
    { type: "Date of Birth/Age", count: 1, icon: Cake },
    { type: "Driving License", count: 1, icon: Car },
    { type: "Master's Degree", count: 1, icon: School },
    { type: "Indian National", count: 1, icon: BadgeIcon },
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
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Credibility Score</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-headline font-bold">850</h2>
                   <div className="text-left">
                        <p className="font-semibold text-green-500 text-sm">High</p>
                        <p className="text-xs text-muted-foreground">Based on your credentials</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <BarChart2 className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Toggle visibility">
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

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
            
            <div className="flex justify-start gap-2">
                <Button onClick={() => setView('prove')} size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full h-9 px-4"><Scan className="mr-1 h-4 w-4"/> Scan to Prove</Button>
                <Button onClick={() => setView('qr')} size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full h-9 px-4"><QrCode className="mr-1 h-4 w-4"/> QR to Prove</Button>
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
