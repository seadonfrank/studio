
"use client";

import { ArrowLeft, Copy, Share2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface QrForPayViewProps {
  onBack: () => void;
}

export default function QrForPayView({ onBack }: QrForPayViewProps) {
  const { toast } = useToast();
  const did = "did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";

  const handleCopy = () => {
    navigator.clipboard.writeText(did);
    toast({
      title: "Copied to clipboard!",
      description: "Your xIDFI has been copied.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "xIDFI Wallet ID",
          text: `My xIDFI is: ${did}`,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Your browser does not support the Web Share API.",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">QR for Pay</h2>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center space-y-4 py-4 text-center">
        <div className="p-4 border rounded-lg bg-white">
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d"
            alt="QR Code"
            width={200}
            height={200}
            data-ai-hint="qr code"
          />
        </div>
        <p className="text-muted-foreground">
            Share this QR code or ID to get paid.
        </p>
        <div className="w-full">
          <p className="text-sm font-mono break-all bg-muted p-2 rounded-md text-muted-foreground mt-1">
            {did}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share ID
          </Button>
        </div>
      </div>
    </div>
  );
}
