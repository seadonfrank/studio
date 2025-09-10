
"use client";

import { ArrowLeft, Send } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface RequestToVerifyViewProps {
  onBack: () => void;
}

export default function RequestToVerifyView({ onBack }: RequestToVerifyViewProps) {
  const { toast } = useToast();
  const [proofType, setProofType] = useState("");

  const handleRequest = () => {
    if (!proofType) {
        toast({
            variant: "destructive",
            title: "Select a Proof Type",
            description: "Please select a type of proof to request."
        });
        return;
    }
    toast({
        title: "Request Sent",
        description: "Your request for proof has been sent."
    })
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Request to Verify</h2>
      </div>

      <div className="flex-grow mt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="recipientId">Recipient's DID</Label>
          <Input id="recipientId" placeholder="did:xidfi:..." />
        </div>

        <div className="space-y-2">
          <Label>Proof to Request</Label>
          <Select onValueChange={setProofType} value={proofType}>
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
          <Label htmlFor="note">Note (Optional)</Label>
          <Textarea id="note" placeholder="E.g., For apartment rental application." />
        </div>

        <Button className="w-full" onClick={handleRequest} disabled={!proofType}>
            <Send className="mr-2 h-4 w-4" />
            Send Request
        </Button>
      </div>
    </div>
  );
}
