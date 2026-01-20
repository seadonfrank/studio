"use client";

import { useState } from "react";
import type { Tab } from "@/app/page";
import { ChevronRight, Scan, QrCode, ArrowUpCircle, ArrowDownCircle, Shield, BookUser, GraduationCap, Wallet, Cake, Car, School, Badge as BadgeIcon, ArrowLeft } from "lucide-react";
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
import ActivityItem from "./activity-item";

export default function VerifyTab({ view, setView, setActiveTab, activityCaller, sendCaller, setSendCaller }: { view: string; setView: (view: string) => void; setActiveTab: (tab: Tab) => void; activityCaller: 'identity' | 'verify'; sendCaller: 'identity' | 'other'; setSendCaller: (caller: 'identity' | 'other') => void; }) {

  const recentActivity = [
    { id: 1, action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { id: 2, action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { id: 3, action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
    { id: 4, action: "Verified", credential: "Passport", entity: "Airport Security", time: "1d ago" },
    { id: 5, action: "Claimed", credential: "University Degree", entity: "State University", time: "2d ago" },
  ];

  const credentialTypes = [
    { type: "Date of Birth/Age", count: 1, icon: Cake },
    { type: "Driving License", count: 1, icon: Car },
    { type: "Master's Degree", count: 1, icon: School },
    { type: "Indian National", count: 1, icon: BadgeIcon },
  ];

  const handleBackFromActivities = () => {
    if (activityCaller === 'identity') {
      setActiveTab('identity');
    } else {
      setView('main');
    }
  };

  const handleBackFromSend = () => {
    if (sendCaller === 'identity') {
      setActiveTab('identity');
      setSendCaller('other');
    } else {
      setView('main');
    }
  };

  const renderContent = () => {
    switch (view) {
      case "prove":
        return <ScanToProveView onBack={() => setActiveTab('identity')} />;
      case "qr":
        return <QrToProveView onBack={() => setActiveTab('identity')} />;
      case "send":
        return <SendCredentialsView onBack={handleBackFromSend} />;
      case "request":
        return <RequestCredentialsView onBack={() => setView("main")} />;
      case "activities":
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleBackFromActivities}>
                <ArrowLeft />
              </Button>
              <h2 className="text-xl font-bold font-headline">Recent activities</h2>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 pt-6">
              {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
            </div>
          </div>
        );
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
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return <div className="p-4 space-y-6">{renderContent()}</div>;
}
