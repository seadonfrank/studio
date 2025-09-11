
"use client";

import { ArrowLeft, Copy, Share2, ShieldCheck, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useState } from "react";

interface QrForPayViewProps {
  onBack: () => void;
}

type ProofStatus = 'pending' | 'verified' | 'failed';

const availableProofs = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 18)' },
    { id: 'accredited', label: 'Proof of Accredited Investor Status' },
];

export default function QrForPayView({ onBack }: QrForPayViewProps) {
  const { toast } = useToast();
  const did = "did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";

  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  const [isProcessingProofs, setIsProcessingProofs] = useState(false);
  const [proofStatuses, setProofStatuses] = useState<Record<string, ProofStatus>>({});

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

  const handleRequestProofs = () => {
    if (selectedProofs.length === 0) {
        toast({
            variant: "destructive",
            title: "No Proofs Selected",
            description: "Please select at least one credential to request."
        });
        return;
    }

    setIsProcessingProofs(true);
    
    const initialStatuses: Record<string, ProofStatus> = {};
    selectedProofs.forEach(p => initialStatuses[p] = 'pending');
    setProofStatuses(initialStatuses);
    
    setTimeout(() => {
        const finalStatuses: Record<string, ProofStatus> = {};
        selectedProofs.forEach(p => {
            const rand = Math.random();
            if (rand < 0.7) finalStatuses[p] = 'verified';
            else finalStatuses[p] = 'failed';
        });
        setProofStatuses(finalStatuses);
        setIsProcessingProofs(false);
        toast({
            title: "Proofs Processed",
            description: "Verification process for the requested credentials has completed."
        });
    }, 2000);
  }

  const handleCheckboxChange = (proofId: string, checked: boolean) => {
    setSelectedProofs(prev => 
        checked ? [...prev, proofId] : prev.filter(id => id !== proofId)
    );
  }

  const proofsRequested = Object.keys(proofStatuses).length > 0;
  const allSelectedProofsVerified = selectedProofs.length > 0 && selectedProofs.every(p => proofStatuses[p] === 'verified');


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
      
       <Card>
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="text-primary h-5 w-5" /> Request Credentials</h3>
                     <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm">{proofsRequested ? "View" : "Request"}</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Request Credentials</SheetTitle>
                                <SheetDescription>
                                    {proofsRequested ? 'Status of the credentials requested from the recipient.' : 'Select credentials to request from the recipient.'}
                                </SheetDescription>
                            </SheetHeader>
                            <div className="space-y-4 py-4">
                                {!proofsRequested ? (
                                    <>
                                        <div className="space-y-2 pt-2">
                                            {availableProofs.map(proof => (
                                                <div key={proof.id} className="flex items-center space-x-2">
                                                    <Checkbox 
                                                        id={proof.id} 
                                                        onCheckedChange={(checked) => handleCheckboxChange(proof.id, !!checked)}
                                                        checked={selectedProofs.includes(proof.id)}
                                                    />
                                                    <Label htmlFor={proof.id} className="font-normal">{proof.label}</Label>
                                                </div>
                                            ))}
                                        </div>
                                        <SheetClose asChild>
                                            <Button className="w-full" onClick={handleRequestProofs} disabled={selectedProofs.length === 0 || isProcessingProofs}>
                                                {isProcessingProofs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                                Request Selected Proofs
                                            </Button>
                                        </SheetClose>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        {selectedProofs.map(proofId => {
                                            const proof = availableProofs.find(p => p.id === proofId);
                                            const status = proofStatuses[proofId];
                                            return (
                                                <div key={proofId} className="flex items-center justify-between p-2 border rounded-md">
                                                    <span className="font-medium text-sm">{proof?.label}</span>
                                                    {status === 'pending' && <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Pending</span>}
                                                    {status === 'verified' && <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle className="h-3 w-3" />Verified</span>}
                                                    {status === 'failed' && <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center gap-1"><XCircle className="h-3 w-3" />Failed</span>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <p className="text-xs text-muted-foreground">Request verified credentials from the recipient before sending the payment.</p>
                    {proofsRequested && allSelectedProofsVerified && (
                    <div className="mt-2 flex items-center gap-2 text-green-600 font-medium text-sm p-2 bg-green-50 rounded-md border border-green-200">
                        <CheckCircle className="h-5 w-5" />
                        <span>All proofs verified.</span>
                    </div>
                )}
                    {proofsRequested && !allSelectedProofsVerified && selectedProofs.some(p => proofStatuses[p] === 'failed') && (
                    <div className="mt-2 flex items-center gap-2 text-destructive font-medium text-sm p-2 bg-red-50 rounded-md border-red-200">
                        <XCircle className="h-5 w-5" />
                        <span>Some proofs failed verification.</span>
                    </div>
                    )}
            </CardContent>
        </Card>
    </div>
  );
}
