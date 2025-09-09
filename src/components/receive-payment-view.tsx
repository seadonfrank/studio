
"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface ReceivePaymentViewProps {
  onBack: () => void;
}

export default function ReceivePaymentView({ onBack }: ReceivePaymentViewProps) {
  const { toast } = useToast();
  const did = "did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";

  const handleCopy = () => {
    navigator.clipboard.writeText(did);
    toast({
      title: "Copied to clipboard!",
      description: "Your xIDFI has been copied.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Receive Payment</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 py-4 mt-6 text-center">
        <p className="text-muted-foreground">Share your QR code or ID to get paid.</p>
        <div className="p-4 border rounded-lg bg-white">
          <Image src="https://placehold.co/200x200/png?text=Your\nQR+Code" alt="QR Code" width={200} height={200} data-ai-hint="qr code" />
        </div>
        <div className="w-full">
          <p className="font-semibold">Your xIDFI</p>
          <p className="text-sm font-mono break-all bg-muted p-2 rounded-md text-muted-foreground mt-1">
            {did}
          </p>
        </div>
        <Button variant="outline" className="w-full" onClick={handleCopy}>Copy ID</Button>
      </div>
    </div>
  );
}
