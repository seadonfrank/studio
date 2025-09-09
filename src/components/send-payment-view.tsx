
"use client";

import { ArrowLeft, User, QrCode } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SendPaymentViewProps {
  onBack: () => void;
  onScan: () => void;
}

export default function SendPaymentView({ onBack, onScan }: SendPaymentViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
            </Button>
            <h2 className="text-xl font-bold font-headline">Send Payment</h2>
        </div>
        <Button variant="outline" size="icon" onClick={onScan}>
            <QrCode className="h-5 w-5" />
            <span className="sr-only">Scan to Pay</span>
        </Button>
      </div>

      <div className="flex-grow mt-6 space-y-6">
        <div>
          <h3 className="text-lg font-headline font-semibold mb-3">Recent Payees</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
              {['AB', 'CD', 'EF', 'GH', 'IJ'].map((p, i) => (
                  <div key={i} className="flex flex-col items-center space-y-1.5 flex-shrink-0 w-16 text-center">
                      <Avatar className="h-14 w-14">
                          <AvatarImage src={`https://picsum.photos/id/${100+i}/200/200`} data-ai-hint="person portrait" />
                          <AvatarFallback>{p}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium truncate">Friend {i+1}</span>
                  </div>
              ))}
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipientId">Recipient's ID or Address</Label>
            <Input id="recipientId" placeholder="did:xidfi:... or 0x..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input id="amount" type="number" placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" placeholder="For dinner last night" />
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Button className="w-full">Review & Send</Button>
      </div>
    </div>
  );
}
