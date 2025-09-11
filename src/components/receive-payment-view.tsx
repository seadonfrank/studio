
"use client";

import { ArrowLeft, Copy, Share2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ReceivePaymentViewProps {
  onBack: () => void;
}

export default function ReceivePaymentView({ onBack }: ReceivePaymentViewProps) {
  const { toast } = useToast();
  const did = "did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";
  
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
        <h2 className="text-xl font-bold font-headline">Request Payment</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-6 pt-6">
        <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold text-center">Request a Payment from a user</h3>
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
                <Input id="requestNotes" placeholder="E.g., for dinner last night" />
            </div>
            <Button className="w-full" onClick={handleRequest}>Request Payment</Button>
        </div>
      </div>

    </div>
  );
}
