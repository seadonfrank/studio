
"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight, MessageSquareQuote, Scan } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import ScanToProveView from "./scan-to-prove-view";
import RequestProofView from "./request-proof-view";

interface VerifyOthersViewProps {
  onBack: () => void;
}

export default function VerifyOthersView({ onBack }: VerifyOthersViewProps) {
  const [view, setView] = useState<"main" | "scan" | "request">("main");

  const renderContent = () => {
    switch (view) {
      case "scan":
        return <ScanToProveView onBack={() => setView("main")} />;
      case "request":
        return <RequestProofView onBack={() => setView("main")} />;
      default:
        return (
          <>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft />
              </Button>
              <h2 className="text-xl font-bold font-headline">Verify Others</h2>
            </div>

            <Card className="mt-6">
              <CardContent className="p-0">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setView("scan")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                      <Scan className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Scan Proof</p>
                      <p className="text-sm text-muted-foreground">
                        Scan a QR code to verify a proof
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
                      <MessageSquareQuote className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Request Proof</p>
                      <p className="text-sm text-muted-foreground">
                        Request a specific proof from a user
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

  return <div className="flex flex-col h-full">{renderContent()}</div>;
}
