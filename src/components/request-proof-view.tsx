
"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface RequestProofViewProps {
  onBack: () => void;
}

export default function RequestProofView({ onBack }: RequestProofViewProps) {
  const { toast } = useToast();

  const handleRequest = () => {
    toast({
        title: "Proof Request Sent",
        description: "Your request for has been sent."
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Request Proof</h2>
      </div>

      <div className="flex-grow mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipientId">Recipient's ID</Label>
            <Input id="recipientId" placeholder="did:xidfi:... or 0x..." />
          </div>
           <div className="space-y-2">
            <Label>Proof Type</Label>
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a proof to request" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="kyc">Proof of KYC/AML</SelectItem>
                    <SelectItem value="age">Proof of Age (Over 18)</SelectItem>
                    <SelectItem value="credit">Proof of Credit Score (Over 700)</SelectItem>
                    <SelectItem value="income">Proof of Income (Over $50k/yr)</SelectItem>
                    <SelectItem value="identity">Proof of Identity</SelectItem>
                </SelectContent>
            </Select>
           </div>
          <div className="space-y-2">
            <Label htmlFor="note">Reason for Request (Optional)</Label>
            <Textarea id="note" placeholder="E.g., For apartment rental application" />
          </div>
      </div>
      
      <div className="mt-auto">
        <Button className="w-full" onClick={handleRequest}>Send Request</Button>
      </div>
    </div>
  );
}
