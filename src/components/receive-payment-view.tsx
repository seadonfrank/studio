"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";

interface ReceivePaymentViewProps {
  onBack: () => void;
}

const availableProofs = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 18)' },
    { id: 'accredited', label: 'Proof of Accredited Investor Status' },
];

export default function ReceivePaymentView({ onBack }: ReceivePaymentViewProps) {
  const { toast } = useToast();
  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  
  const handleRequest = () => {
    toast({
        title: "Payment Request Sent",
        description: "Your request has been sent successfully."
    });
  }

  const handleCheckboxChange = (proofId: string, checked: boolean) => {
    setSelectedProofs(prev => 
        checked ? [...prev, proofId] : prev.filter(id => id !== proofId)
    );
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
            <h3 className="text-lg font-headline font-semibold text-center">Request Payment</h3>
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

             <Card>
                <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold flex items-center gap-2 text-base"><ShieldCheck className="text-primary h-5 w-5" /> Request Credentials <span className="text-muted-foreground font-normal text-sm">(Optional)</span></h3>
                    <p className="text-xs text-muted-foreground">Request verified credentials from the sender along with the payment.</p>
                    
                    <div className="space-y-2 pt-2">
                        {availableProofs.map(proof => (
                            <div key={proof.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={`req-${proof.id}`} 
                                    onCheckedChange={(checked) => handleCheckboxChange(proof.id, !!checked)}
                                    checked={selectedProofs.includes(proof.id)}
                                />
                                <Label htmlFor={`req-${proof.id}`} className="font-normal">{proof.label}</Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Button className="w-full" onClick={handleRequest}>Request Payment</Button>
        </div>
      </div>

    </div>
  );
}
