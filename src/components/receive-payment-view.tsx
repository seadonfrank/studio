
"use client";

import { useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ReceivePaymentViewProps {
  onBack: () => void;
}

export default function ReceivePaymentView({ onBack }: ReceivePaymentViewProps) {
  const { toast } = useToast();
  
  const handleRequest = () => {
    toast({
        title: "Payment Requested",
        description: "Your payment has been requested successfully."
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
            <div className="space-y-2">
                <Label htmlFor="requesterId">From (Sender's ID)</Label>
                <div className="relative flex items-center">
                    <Input id="requesterId" placeholder="did:xidfi:... or 0x..." className="pr-10" />
                    <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8">
                        <User className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
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
                <Label htmlFor="requestNotes">Note (Optional)</Label>
                <Input id="requestNotes" placeholder="E.g., for dinner last night" />
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="w-full" onClick={onBack}>Cancel</Button>
              <Button className="w-full" onClick={handleRequest}>Request Payment</Button>
            </div>
        </div>
      </div>

    </div>
  );
}
