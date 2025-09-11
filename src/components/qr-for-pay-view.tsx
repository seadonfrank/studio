
"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Share2, FileQuestion, PlusCircle, Edit } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface QrForPayViewProps {
  onBack: () => void;
}

const availableProofs = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 18)' },
    { id: 'accredited', label: 'Proof of Accredited Investor Status' },
];

export default function QrForPayView({ onBack }: QrForPayViewProps) {
  const { toast } = useToast();
  const did = "did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";

  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  const [paymentDetails, setPaymentDetails] = useState({ amount: '', currency: 'USD', note: '' });
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
          title: "xIDFI Payment Request",
          text: `Please pay me using this QR code. Details: ${url}`,
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
  
  const handleDetailsChange = (field: keyof typeof paymentDetails, value: string) => {
    setPaymentDetails(prev => ({...prev, [field]: value}));
  }

  const handleGenerateQr = () => {
    if (!paymentDetails.amount || parseFloat(paymentDetails.amount) <= 0) {
        toast({
            variant: "destructive",
            title: "Invalid Amount",
            description: "Please enter a valid amount."
        });
        return;
    }

    const data = {
        did,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        note: paymentDetails.note,
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
                        alt="QR Code"
                        width={200}
                        height={200}
                        data-ai-hint="qr code"
                    />
                </div>
                <p className="text-muted-foreground">
                    Share this QR code to get paid.
                </p>
                <Card className="w-full text-left">
                    <CardContent className="p-3 text-sm">
                        <div className="flex justify-between"><span>Amount:</span> <span className="font-semibold">{paymentDetails.amount} {paymentDetails.currency}</span></div>
                        {paymentDetails.note && <div className="flex justify-between"><span>Note:</span> <span className="font-semibold">{paymentDetails.note}</span></div>}
                        {selectedProofs.length > 0 && <Separator className="my-2"/>}
                        {selectedProofs.length > 0 && <p className="font-semibold">Credentials Requested:</p>}
                        <ul className="text-xs text-muted-foreground list-disc pl-5">
                            {selectedProofs.map(proofId => {
                                const proof = availableProofs.find(p => p.id === proofId);
                                return <li key={proofId}>{proof?.label}</li>
                            })}
                        </ul>
                    </CardContent>
                </Card>
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
          <div className="space-y-2">
            <Label htmlFor="requestAmount">Amount</Label>
            <div className="flex gap-2">
              <Input
                id="requestAmount"
                type="number"
                placeholder="0.00"
                className="flex-grow"
                value={paymentDetails.amount}
                onChange={(e) => handleDetailsChange("amount", e.target.value)}
              />
              <Select
                value={paymentDetails.currency}
                onValueChange={(value) => handleDetailsChange("currency", value)}
              >
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
            <Input
              id="requestNotes"
              placeholder="E.g., for dinner last night"
              value={paymentDetails.note}
              onChange={(e) => handleDetailsChange("note", e.target.value)}
            />
          </div>
          <Separator />

          <Sheet>
            <Card>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <FileQuestion className="h-5 w-5" />
                    <div>
                      <p className="font-semibold">Request Credentials</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedProofs.length > 0
                          ? `${selectedProofs.length} selected`
                          : "Optional"}
                      </p>
                    </div>
                  </div>
                  <SheetTrigger asChild>
                    <Button
                      variant={selectedProofs.length > 0 ? "ghost" : "outline"}
                      size="sm"
                    >
                      {selectedProofs.length > 0 ? (
                        <Edit className="h-4 w-4" />
                      ) : (
                        <PlusCircle className="mr-2 h-4 w-4" />
                      )}
                      {selectedProofs.length > 0 ? "Edit" : "Add"}
                    </Button>
                  </SheetTrigger>
                </div>
                {selectedProofs.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <ul className="text-xs text-muted-foreground list-disc pl-5">
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
                  Select which credentials you want to request from the payer.
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
        </div>
        <div className="mt-auto pt-4">
          <Button className="w-full" onClick={handleGenerateQr}>
            Generate QR Code
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">QR for Pay</h2>
      </div>

      {renderContent()}
    </div>
  );
}
