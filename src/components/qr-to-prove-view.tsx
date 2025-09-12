
"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Share2, QrCode, FileQuestion, PlusCircle, Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface QrToProveViewProps {
  onBack: () => void;
}

const availableProofs = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 21)' },
    { id: 'accredited', label: 'Proof of Accredited Investor Status' },
    { id: 'passport', label: 'Valid Passport Holder' },
    { id: 'drivers_license', label: 'Valid Driver\'s License' },
];

export default function QrToProveView({ onBack }: QrToProveViewProps) {
  const { toast } = useToast();
  const did = "did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";

  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to clipboard!",
    });
  };

  const handleShare = (url: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: "xIDFI Proof Request",
          text: `Please verify my credentials using this QR code. Details: ${url}`,
          url: url
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

  const handleCheckboxChange = (proofId: string, checked: boolean) => {
    setSelectedProofs(prev => 
        checked ? [...prev, proofId] : prev.filter(id => id !== proofId)
    );
  }

  const handleGenerateQr = () => {
    if (selectedProofs.length === 0) {
        toast({
            variant: "destructive",
            title: "No Proofs Selected",
            description: "Please select at least one proof to generate a QR code."
        });
        return;
    }

    const data = {
        did,
        proofs: selectedProofs
    }

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(data))}`;
    setQrCodeUrl(url);
  }

  const handleBack = () => {
    if (qrCodeUrl) {
        setQrCodeUrl('');
    } else {
        onBack();
    }
  }

  const renderContent = () => {
    if (qrCodeUrl) {
        return (
             <div className="flex-grow flex flex-col items-center justify-center space-y-4 text-center">
                <div className="p-4 border rounded-lg bg-white">
                    <Image
                        src={qrCodeUrl}
                        alt="QR Code for proofs"
                        width={200}
                        height={200}
                        data-ai-hint="qr code"
                    />
                </div>
                <p className="text-muted-foreground">
                    Others can scan this QR code to verify your selected credentials.
                </p>
                <Card className="w-full text-left">
                    <CardContent className="p-3 text-sm">
                        <p className="font-semibold">Credentials Requested:</p>
                        <ul className="text-xs text-muted-foreground list-disc pl-5 mt-1">
                            {selectedProofs.map(proofId => {
                                const proof = availableProofs.find(p => p.id === proofId);
                                return <li key={proofId}>{proof?.label}</li>
                            })}
                        </ul>
                    </CardContent>
                </Card>
                 <Button className="w-full" onClick={onBack}>Done</Button>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" onClick={() => handleCopy(qrCodeUrl)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                    <Button variant="outline" onClick={() => handleShare(qrCodeUrl)}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                </div>
            </div>
        )
    }

    return (
      <div className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
            <h3 className="text-lg font-headline font-semibold">Select Proofs</h3>
            <p className="text-sm text-muted-foreground">
                Select which credentials you want to send to the verifier.
            </p>
            <div className="py-2 space-y-3">
            {availableProofs.map((proof) => (
                <div
                key={proof.id}
                className="flex items-center space-x-3 p-3 border rounded-md"
                >
                <Checkbox
                    id={proof.id}
                    onCheckedChange={(checked) =>
                    handleCheckboxChange(proof.id, !!checked)
                    }
                    checked={selectedProofs.includes(proof.id)}
                />
                <Label
                    htmlFor={proof.id}
                    className="font-normal flex-1"
                >
                    {proof.label}
                </Label>
                </div>
            ))}
            </div>
        </div>
        <div className="mt-auto pt-4">
          <Button className="w-full" onClick={handleGenerateQr} disabled={selectedProofs.length === 0}>
            Generate QR Code
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">QR to Prove</h2>
      </div>

      <div className="flex flex-col flex-grow">
        {renderContent()}
      </div>
    </div>
  );
}
