
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
import { Input } from "./ui/input";

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
  const [note, setNote] = useState('');
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
        proofs: selectedProofs,
        note: note,
    }

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(data))}`;
    setQrCodeUrl(url);
  }

  const handleBack = () => {
    if (qrCodeUrl) {
        setQrCodeUrl('');
        setNote('');
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
                    Position the QR code within the frame to scan.
                </p>
                <Card className="w-full text-left">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <FileQuestion className="h-5 w-5 text-primary"/>
                            <p className="font-semibold">Provide Credentials</p>
                        </div>
                        <Separator className="my-3"/>
                        <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                            {selectedProofs.map(proofId => {
                                const proof = availableProofs.find(p => p.id === proofId);
                                return <li key={proofId}>{proof?.label}</li>
                            })}
                        </ul>
                         {note && (
                            <>
                                <Separator className="my-2"/>
                                <div className="flex justify-between"><span>Note:</span> <span className="font-semibold">{note}</span></div>
                            </>
                        )}
                    </CardContent>
                </Card>
                 <Button className="w-full" onClick={handleBack}>Done</Button>
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
          <Sheet>
              <Card>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileQuestion className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Request Credentials</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedProofs.length > 0 ? `${selectedProofs.length} selected` : 'Required'}
                        </p>
                      </div>
                    </div>
                    <SheetTrigger asChild>
                      <Button
                        variant={selectedProofs.length > 0 ? "ghost" : "outline"}
                        size="sm"
                      >
                        {selectedProofs.length > 0 ? (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </>
                        ) : (
                          <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add
                          </>
                        )}
                      </Button>
                    </SheetTrigger>
                  </div>
                  {selectedProofs.length > 0 && (
                    <>
                      <Separator className="my-2" />
                      <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                        {selectedProofs.map((proofId) => {
                          const proof = availableProofs.find(
                            (p) => p.id === proofId
                          );
                          return <li key={proofId}>{proof?.label}</li>;
                        })}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
              <SheetContent>
                <SheetHeader className="text-left">
                  <SheetTitle>Request Credentials</SheetTitle>
                  <SheetDescription>
                    Select which credentials you want to request from the verifier.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-3">
                  {availableProofs.map((proof) => (
                    <div
                      key={proof.id}
                      className="flex items-center space-x-3 p-3 border rounded-md"
                    >
                      <Checkbox
                        id={`sheet-${proof.id}`}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(proof.id, !!checked)
                        }
                        checked={selectedProofs.includes(proof.id)}
                      />
                      <Label
                        htmlFor={`sheet-${proof.id}`}
                        className="font-normal flex-1"
                      >
                        {proof.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="w-full">Request Selected</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
            <div className="space-y-2">
                <Label htmlFor="proveNotes">Note (Optional)</Label>
                <Input
                id="proveNotes"
                placeholder="E.g., for venue entry"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                />
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
