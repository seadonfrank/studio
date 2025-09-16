
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CameraOff, CheckCircle, ShieldCheck, User, XCircle, Loader2, Info, FileQuestion, PlusCircle, Edit, Share2, Scan, CircleCheckBig, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ScanToPayViewProps {
  onBack: () => void;
}

type ScanState = 'scanning' | 'scanned' | 'payment_sent' | 'error';

const recipientRequestedProofs = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 18)' },
];

const availableOffers = [
    { id: 'offer1', title: '10% off on this purchase', description: 'Capped at $5. Best Offer!' },
    { id: 'offer2', title: '5% cashback', description: 'Cashback credited within 24 hours' },
    { id: 'offer3', title: 'Flat $2 discount', description: 'For payments above $10' },
];

export default function ScanToPayView({ onBack }: ScanToPayViewProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanState, setScanState] = useState<ScanState>('scanning');
  
  // New state to simulate if the recipient has requested proofs from the user
  const [recipientHasRequestedProofs, setRecipientHasRequestedProofs] = useState(false);
  const [providedProofs, setProvidedProofs] = useState<string[]>([]);
  const [selectedProofsToProvide, setSelectedProofsToProvide] = useState<string[]>([]);
  const [paymentDetails, setPaymentDetails] = useState({ amount: '10.00', currency: 'USD', note: 'For coffee' });
  const [appliedOffer, setAppliedOffer] = useState<string>('offer1');


  useEffect(() => {
    if (scanState !== 'scanning') return;

    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Simulate scanning a QR code after 2 seconds
        setTimeout(() => {
            setScanState('scanned');
            // Simulate that the scanned recipient is requesting proofs
            const allProofIds = recipientRequestedProofs.map(p => p.id);
            setRecipientHasRequestedProofs(true); 
            setSelectedProofsToProvide(allProofIds);
            setProvidedProofs(allProofIds);
        }, 2000);

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();

    return () => {
        // Cleanup: stop video stream when component unmounts
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast, scanState]);

  const handleProvideProofs = () => {
    setProvidedProofs(selectedProofsToProvide);
  }

  const handleSendPayment = () => {
    if (recipientHasRequestedProofs && providedProofs.length !== recipientRequestedProofs.length) {
        toast({
            variant: "destructive",
            title: "Provide Credentials",
            description: "Please provide all the requested credentials before sending the payment."
        });
        return;
    }
    setScanState('payment_sent');
  }
  
  const handleReset = () => {
    setScanState('scanning');
    setRecipientHasRequestedProofs(false);
    setProvidedProofs([]);
    setSelectedProofsToProvide([]);
  }

  const handleCheckboxChange = (proofId: string, checked: boolean) => {
    setSelectedProofsToProvide(prev => 
        checked ? [...prev, proofId] : prev.filter(id => id !== proofId)
    );
  }

  const handleDetailsChange = (field: keyof typeof paymentDetails, value: string) => {
    setPaymentDetails(prev => ({...prev, [field]: value}));
  }

  const handleShare = () => {
    const receiptText = `Payment of ${paymentDetails.amount} ${paymentDetails.currency} to Jane Doe.`;
    if (navigator.share) {
      navigator
        .share({
          title: "xIDFI Payment Receipt",
          text: receiptText,
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
  
  const selectedOfferDetails = availableOffers.find(o => o.id === appliedOffer);

  const renderContent = () => {
    switch (scanState) {
      case 'scanning':
        return (
            <div className="flex-grow flex flex-col items-center justify-center mt-4 space-y-4">
                <div className="w-full aspect-square max-w-[300px] bg-muted rounded-lg overflow-hidden relative">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                    <div className="absolute inset-0 border-8 border-background/50 rounded-lg" />
                    {hasCameraPermission === false && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                            <CameraOff className="h-12 w-12 mb-4" />
                            <p className="text-center">Camera access is required to scan QR codes.</p>
                        </div>
                    )}
                </div>
                <p className="text-muted-foreground text-center">
                    Position the QR code within the frame to scan.
                </p>
                {hasCameraPermission === false && (
                    <Alert variant="destructive">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access in your browser settings to use this feature.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        );
      case 'scanned':
        return (
            <div className="flex-grow mt-6 space-y-6">
                <div className="text-center space-y-2">
                    <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src="https://picsum.photos/id/1027/200/200" data-ai-hint="person portrait" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-lg">Jane Doe</p>
                        <p className="text-muted-foreground text-sm font-mono">did:xidfi:...</p>
                    </div>
                </div>

                {recipientHasRequestedProofs && (
                  <Sheet>
                    <Card>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-start gap-3">
                              <FileQuestion className="h-5 w-5 mt-0.5" />
                              <div>
                                <p className="font-semibold">Provide Credentials</p>
                                <p className="text-xs text-muted-foreground">Required</p>
                              </div>
                            </div>
                            <SheetTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                          </SheetTrigger>
                          </div>
                          {providedProofs.length > 0 && (
                            <>
                                <Separator className="my-2" />
                                <ul className="text-xs text-muted-foreground list-disc pl-5">
                                  {providedProofs.map((proofId) => {
                                    const proof = recipientRequestedProofs.find(
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
                            <SheetTitle>Provide Credentials</SheetTitle>
                            <SheetDescription>
                               Select which credentials you want to provide to the payee.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-4 py-4">
                            {recipientRequestedProofs.map(proof => (
                                <div key={proof.id} className="flex items-center space-x-3 p-3 border rounded-md">
                                    <Checkbox 
                                        id={`sheet-${proof.id}`} 
                                        onCheckedChange={(checked) => handleCheckboxChange(proof.id, !!checked)}
                                        checked={selectedProofsToProvide.includes(proof.id)}
                                    />
                                    <div className="flex-1">
                                        <Label htmlFor={`sheet-${proof.id}`} className="font-normal">{proof.label}</Label>
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-2 !mt-6">
                                <SheetClose asChild>
                                    <Button variant="outline" className="w-full">Cancel</Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button className="w-full" onClick={handleProvideProofs}>Provide Selected</Button>
                                </SheetClose>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                 )}

                <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fromAccount">From</Label>
                      <Select defaultValue="usd-balance">
                          <SelectTrigger id="fromAccount">
                              <SelectValue placeholder="Select a payment method" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="usd-balance">USD Balance - $1,250.00</SelectItem>
                              <SelectItem value="eur-balance">EUR Balance - €800.00</SelectItem>
                              <SelectItem value="debit-card">Debit Card **** 1234</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="flex gap-2">
                            <Input id="amount" type="number" placeholder="0.00" className="flex-grow" value={paymentDetails.amount} onChange={(e) => handleDetailsChange('amount', e.target.value)} />
                            <Select value={paymentDetails.currency} onValueChange={(value) => handleDetailsChange('currency', value)}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USD">USD</SelectItem>
                                    <SelectItem value="EUR">EUR</SelectItem>
                                    <SelectItem value="GBP">GBP</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Input id="note" placeholder="For coffee" value={paymentDetails.note} onChange={(e) => handleDetailsChange('note', e.target.value)} />
                    </div>
                    
                    <Sheet>
                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Ticket className="h-5 w-5 text-green-700" />
                                        <div>
                                            <p className="font-semibold text-green-800">Applied Offer</p>
                                            <p className="text-xs text-green-700">{selectedOfferDetails?.title}</p>
                                        </div>
                                    </div>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-green-800 hover:text-green-900 hover:bg-green-100">
                                            Change
                                        </Button>
                                    </SheetTrigger>
                                </div>
                            </CardContent>
                        </Card>
                        <SheetContent>
                            <SheetHeader className="text-left">
                                <SheetTitle>Available Offers</SheetTitle>
                                <SheetDescription>Select an offer to apply to this payment.</SheetDescription>
                            </SheetHeader>
                             <RadioGroup value={appliedOffer} onValueChange={setAppliedOffer} className="space-y-3 py-4">
                                {availableOffers.map(offer => (
                                    <Label key={offer.id} htmlFor={offer.id} className="flex items-start space-x-3 p-3 border rounded-md has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer">
                                        <RadioGroupItem value={offer.id} id={offer.id} className="mt-1" />
                                        <div className="flex-1">
                                            <p className="font-semibold leading-tight">{offer.title}</p>
                                            <p className="text-xs text-muted-foreground">{offer.description}</p>
                                        </div>
                                    </Label>
                                ))}
                            </RadioGroup>
                            <SheetClose asChild>
                                <Button className="w-full">Apply Offer</Button>
                            </SheetClose>
                        </SheetContent>
                    </Sheet>

                    <div className="flex flex-col gap-2 pt-2">
                        <Button className="w-full" onClick={handleSendPayment}>Complete Payment</Button>
                    </div>
                </div>
            </div>
        );
      case 'payment_sent':
        return (
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src="https://picsum.photos/id/1027/200/200" data-ai-hint="person portrait" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-2xl font-bold font-headline">Jane Doe</h3>
                    <p className="text-muted-foreground text-sm font-mono">did:xidfi:...</p>
                </div>
                <Card className="w-full text-left">
                    <CardContent className="p-3 text-sm">
                        <div className="flex justify-between"><span>Amount:</span> <span className="font-semibold">{paymentDetails.amount} {paymentDetails.currency}</span></div>
                        {paymentDetails.note && <div className="flex justify-between"><span>Note:</span> <span className="font-semibold">{paymentDetails.note}</span></div>}
                        
                        {appliedOffer && selectedOfferDetails && (
                             <>
                                <Separator className="my-2"/>
                                <div className="flex justify-between text-green-700">
                                    <span>Offer Applied:</span>
                                    <span className="font-semibold">{selectedOfferDetails.title}</span>
                                </div>
                            </>
                        )}
                        {providedProofs.length > 0 && (
                            <>
                                <Separator className="my-2"/>
                                <div className="flex items-center gap-2 font-semibold">
                                    <FileQuestion className="h-4 w-4" />
                                    <span>Credentials Provided:</span>
                                </div>
                                <ul className="text-xs text-muted-foreground list-disc pl-5 mt-1">
                                    {providedProofs.map(proofId => {
                                        const proof = recipientRequestedProofs.find(p => p.id === proofId);
                                        return <li key={proofId}>{proof?.label}</li>
                                    })}
                                </ul>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Button className="w-full" onClick={onBack}>Done</Button>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Receipt
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <Scan className="mr-2 h-4 w-4" />
                        Scan Another
                    </Button>
                </div>
            </div>
        );
      case 'error':
         return (
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                <XCircle className="h-20 w-20 text-destructive" />
                <h3 className="text-2xl font-bold font-headline">Scan Failed</h3>
                <p className="text-muted-foreground">The QR code is invalid or expired. Please try again.</p>
                <Button className="w-full" onClick={handleReset}>Try Again</Button>
            </div>
        );
    }
  }


  return (
    <div className="flex flex-col h-full p-4">
      <div className={cn(
        "flex items-center gap-2 mb-4",
        scanState === 'payment_sent' && "justify-center"
      )}>
        {scanState !== 'payment_sent' && (
          <Button variant="ghost" size="icon" onClick={scanState === 'scanning' ? onBack : handleReset}>
            <ArrowLeft />
          </Button>
        )}
        <h2 className="text-xl font-bold font-headline">
          {scanState === 'payment_sent' ? 'Payment Successful' : 'Scan to Pay'}
        </h2>
      </div>

      {renderContent()}
    </div>
  );
}

    