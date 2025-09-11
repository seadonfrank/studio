
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CameraOff, CheckCircle, ShieldCheck, User, XCircle, Loader2, Info, FileQuestion } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface ScanToPayViewProps {
  onBack: () => void;
}

type ScanState = 'scanning' | 'scanned' | 'payment_sent' | 'error';
type ProofStatus = 'pending' | 'verified' | 'failed';

const availableProofs = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 18)' },
    { id: 'accredited', label: 'Proof of Accredited Investor Status' },
];

const recipientRequestedProofs = [
    { id: 'age', label: 'Proof of Age (Over 18)', reason: 'Age-restricted product' },
    { id: 'kyc', label: 'Proof of KYC', reason: 'Regulatory requirement' },
];

export default function ScanToPayView({ onBack }: ScanToPayViewProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanState, setScanState] = useState<ScanState>('scanning');
  
  const [selectedProofs, setSelectedProofs] = useState<string[]>([]);
  const [proofsRequested, setProofsRequested] = useState(false);
  const [isProcessingProofs, setIsProcessingProofs] = useState(false);
  const [proofStatuses, setProofStatuses] = useState<Record<string, ProofStatus>>({});

  // New state to simulate if the recipient has requested proofs from the user
  const [recipientHasRequestedProofs, setRecipientHasRequestedProofs] = useState(false);
  const [proofsProvided, setProofsProvided] = useState(false);


  useEffect(() => {
    if (scanState !== 'scanning') return;

    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "Camera Not Supported",
          description: "Your browser does not support camera access.",
        });
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
            setRecipientHasRequestedProofs(true); 
        }, 2000);

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
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
    setProofsRequested(true);
    
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

  const handleProvideProofs = () => {
      setProofsProvided(true);
      toast({
          title: "Proofs Provided",
          description: "You have provided the requested credentials to Jane Doe."
      });
  }

  const handleSendPayment = () => {
    setScanState('payment_sent');
    toast({
        title: "Payment Sent!",
        description: "Your payment of $10.00 has been sent to Jane Doe."
    });
  }
  
  const handleReset = () => {
    setScanState('scanning');
    setProofsRequested(false);
    setIsProcessingProofs(false);
    setSelectedProofs([]);
    setProofStatuses({});
    setRecipientHasRequestedProofs(false);
    setProofsProvided(false);
  }
  
  const handleCheckboxChange = (proofId: string, checked: boolean) => {
    setSelectedProofs(prev => 
        checked ? [...prev, proofId] : prev.filter(id => id !== proofId)
    );
  }

  const allSelectedProofsVerified = selectedProofs.length > 0 && selectedProofs.every(p => proofStatuses[p] === 'verified');

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
                    <Alert variant={proofsProvided ? "default" : "destructive"}>
                        <FileQuestion className="h-4 w-4" />
                        <AlertTitle>{proofsProvided ? "Proofs Provided" : "Action Required"}</AlertTitle>
                        <AlertDescription className="flex justify-between items-center">
                            <span>Recipient requests credentials.</span>
                            {!proofsProvided && (
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button size="sm">Provide</Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Provide Credentials</SheetTitle>
                                            <SheetDescription>
                                                Jane Doe is requesting the following credentials. Review and provide them.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="space-y-4 py-4">
                                            {recipientRequestedProofs.map(proof => (
                                                <div key={proof.id} className="p-3 border rounded-lg">
                                                    <p className="font-semibold">{proof.label}</p>
                                                    <p className="text-xs text-muted-foreground">Reason: {proof.reason}</p>
                                                </div>
                                            ))}
                                            <div className="flex gap-2 !mt-6">
                                                <Button variant="outline" className="w-full">Deny</Button>
                                                <SheetClose asChild>
                                                    <Button className="w-full" onClick={handleProvideProofs}>Provide</Button>
                                                </SheetClose>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            )}
                        </AlertDescription>
                    </Alert>
                )}

                <Card>
                    <CardContent className="p-4 space-y-3">
                        <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="text-primary h-5 w-5" /> Request Credentials</h3>
                        <p className="text-xs text-muted-foreground">Request verified credentials from the recipient before sending the payment.</p>
                        
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
                                <Button variant="outline" className="w-full" onClick={handleRequestProofs} disabled={selectedProofs.length === 0 || isProcessingProofs}>
                                    {isProcessingProofs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Request Selected Proofs
                                </Button>
                            </>
                        ) : (
                             <div>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            View Requested Credentials
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Credential Verification Status</SheetTitle>
                                            <SheetDescription>
                                                Status of the credentials requested from Jane Doe.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="space-y-4 py-4">
                                            {selectedProofs.map(proofId => {
                                                const proof = availableProofs.find(p => p.id === proofId);
                                                const status = proofStatuses[proofId];
                                                return (
                                                    <div key={proofId} className="flex items-center justify-between">
                                                        <span className="font-medium">{proof?.label}</span>
                                                        {status === 'pending' && <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Pending</span>}
                                                        {status === 'verified' && <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle className="h-3 w-3" />Verified</span>}
                                                        {status === 'failed' && <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center gap-1"><XCircle className="h-3 w-3" />Failed</span>}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                                {allSelectedProofsVerified && (
                                    <div className="mt-2 flex items-center gap-2 text-green-600 font-medium text-sm p-2 bg-green-50 rounded-md border border-green-200">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>All proofs verified.</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="flex gap-2">
                            <Input id="amount" type="number" placeholder="0.00" className="flex-grow" defaultValue="10.00" />
                            <Select defaultValue="USD">
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
                        <Input id="note" placeholder="For coffee" />
                    </div>
                    <Button className="w-full" onClick={handleSendPayment}>Send Payment</Button>
                    <Button variant="ghost" className="w-full" onClick={handleReset}>Cancel</Button>
                </div>
            </div>
        );
      case 'payment_sent':
        return (
            <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle className="h-20 w-20 text-green-500" />
                <h3 className="text-2xl font-bold font-headline">Payment Sent!</h3>
                <p className="text-muted-foreground">You sent $10.00 to Jane Doe.</p>
                <Button className="w-full" onClick={onBack}>Done</Button>
                <Button variant="outline" className="w-full" onClick={handleReset}>Scan Another</Button>
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
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={scanState === 'scanning' ? onBack : handleReset}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Scan to Pay</h2>
      </div>

      {renderContent()}
    </div>
  );
}

    
