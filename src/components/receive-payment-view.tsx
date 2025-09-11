
"use client";

import { ArrowLeft, Copy, Share2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

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

  const handleShare = () => {
     if (navigator.share) {
      navigator.share({
        title: 'xIDFI Wallet ID',
        text: `My xIDFI is: ${did}`,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Your browser does not support the Web Share API.",
      });
    }
  }
  
  const handleRequest = () => {
    toast({
        title: "Payment Request Sent",
        description: "Your request has been sent successfully."
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Receive Payment</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4 py-4 mt-6 text-center">
            <p className="text-muted-foreground">Your QR code or ID to get paid.</p>
            <div className="p-4 border rounded-lg bg-white">
            <Image src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d" alt="QR Code" width={200} height={200} data-ai-hint="qr code" />
            </div>
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

        <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-2 text-xs text-muted-foreground">OR</span>
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold text-center">Request a Payment</h3>
            <div className="space-y-2">
                <Label htmlFor="requesterId">From (Sender's ID)</Label>
                <Input id="requesterId" placeholder="did:xidfi:... or 0x..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="requestAmount">Amount</Label>
                <div className="flex gap-2">
                    <Input id="requestAmount" type="number" placeholder="0.00" className="flex-grow" />
                    <Select defaultValue="USD">
                        <SelectTrigger className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="SOL">SOL</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="requestNotes">Notes (Optional)</Label>
                <Textarea id="requestNotes" placeholder="E.g., for dinner last night" />
            </div>
            <Button className="w-full" onClick={handleRequest}>Request Payment</Button>
        </div>
      </div>

    </div>
  );
}
