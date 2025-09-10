
"use client";

import { useState } from "react";
import { QrCode, Share2, ChevronRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import ScanToVerifyView from "./scan-to-verify-view";
import ShareProofView from "./share-proof-view";
import { Separator } from "./ui/separator";

export default function VerifyTab() {
  const [view, setView] = useState<"main" | "scan" | "share">("main");

  const renderContent = () => {
    switch (view) {
      case "scan":
        return <ScanToVerifyView onBack={() => setView("main")} />;
      case "share":
        return <ShareProofView onBack={() => setView("main")} />;
      default:
        return (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold font-headline">Verify</h1>
              <p className="text-muted-foreground">
                Verify credentials and share proofs
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setView("scan")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                      <QrCode className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Scan to Prove</p>
                      <p className="text-sm text-muted-foreground">
                        Provide instant zero knowledge proofs
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <Separator />
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setView("share")}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                      <Share2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Generate Proofs</p>
                      <p className="text-sm text-muted-foreground">
                        Create and share zero-knowledge proofs
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
