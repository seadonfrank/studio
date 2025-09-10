
"use client";

import { ArrowLeft, Check, ChevronDown, Copy, QrCode, RefreshCw, Share2 } from "lucide-react";
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
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface ShareProofViewProps {
  onBack: () => void;
}

export default function ShareProofView({ onBack }: ShareProofViewProps) {
  const { toast } = useToast();
  const [proofType, setProofType] = useState("");
  const [proofGenerated, setProofGenerated] = useState(false);
  const proofUrl = "https://example.com/zkp/123xyz";

  const handleGenerate = () => {
    if (!proofType) {
        toast({
            variant: "destructive",
            title: "Select a Proof Type",
            description: "Please select a type of proof to generate."
        });
        return;
    }
    setProofGenerated(true);
    toast({
        title: "Proof Generated",
        description: "Your zero-knowledge proof is ready to be shared."
    })
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(proofUrl);
    toast({
      title: "Copied to clipboard!",
    });
  };

  const handleShare = () => {
     if (navigator.share) {
      navigator.share({
        title: 'Zero-Knowledge Proof',
        text: `Here is my proof: ${proofUrl}`,
        url: proofUrl,
      }).catch((error) => console.log('Error sharing', error));
    } else {
       toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Your browser does not support the Web Share API.",
      });
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Generate Proofs</h2>
      </div>

      <div className="flex-grow mt-6 space-y-6">
        <div className="space-y-2">
          <Label>Select Proof Type</Label>
          <Select onValueChange={setProofType} value={proofType}>
            <SelectTrigger>
              <SelectValue placeholder="Select a proof to generate" />
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
        
        <div className="space-y-4">
             <div className="flex items-center space-x-2">
                <Checkbox id="include-did" />
                <Label htmlFor="include-did" className="text-sm font-normal">
                    Include my DID in the proof
                </Label>
            </div>
             <div className="flex items-center space-x-2">
                <Checkbox id="one-time" defaultChecked />
                <Label htmlFor="one-time" className="text-sm font-normal">
                    One-time use proof (expires after first use)
                </Label>
            </div>
        </div>

        <Button className="w-full" onClick={handleGenerate} disabled={!proofType}>
          {proofGenerated ? <><RefreshCw className="mr-2 h-4 w-4" />Regenerate</> : "Generate Proof"}
        </Button>

        {proofGenerated && (
          <div className="space-y-4 pt-4 border-t">
            <Alert>
              <Check className="h-4 w-4" />
              <AlertTitle>Proof Ready!</AlertTitle>
              <AlertDescription>
                Share this QR code or link with the verifier to trust your proof.
              </AlertDescription>
            </Alert>
            <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
                <div className="p-4 border rounded-lg bg-white">
                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${proofUrl}`} alt="Proof QR Code" width={200} height={200} data-ai-hint="qr code" />
                </div>
                <div className="w-full">
                    <p className="text-sm font-mono break-all bg-muted p-2 rounded-md text-muted-foreground mt-1">
                        {proofUrl}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                </Button>
                <Button variant="outline" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Link
                </Button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
