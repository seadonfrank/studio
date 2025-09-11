
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CameraOff, CheckCircle, ShieldCheck, User, XCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";

interface ScanToPayViewProps {
  onBack: () => void;
}

type ScanState = 'scanning' | 'scanned' | 'payment_sent' | 'error';

export default function ScanToPayView({ onBack }: ScanToPayViewProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const [isProofRequested, setIsProofRequested] = useState(false);
  const [isProofVerified, setIsProofVerified] = useState(false);
  const [isProcessingProof, setIsProcessingProof] = useState(false);

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

  const handleRequestProof = () => {
    setIsProcessingProof(true);
    setIsProofRequested(true);
    setTimeout(() => {
        setIsProofVerified(true);
        setIsProcessingProof(false);
        toast({
            title: "Proof Verified",
            description: "The recipient's credentials have been verified."
        })
    }, 2000);
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
    setIsProofRequested(false);
    setIsProofVerified(false);
    setIsProcessingProof(false);
  }

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

                <Card>
                    <CardContent className="p-4 space-y-3">
                        <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="text-primary h-5 w-5" /> Proof of Credentials</h3>
                        <p className="text-xs text-muted-foreground">For added security, you can request a proof of credentials from the recipient before sending the payment.</p>
                        {!isProofRequested ? (
                            <Button variant="outline" className="w-full" onClick={handleRequestProof}>Request Proof</Button>
                        ) : (
                            isProcessingProof ? (
                                <Button variant="outline" className="w-full" disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Requesting Proof...
                                </Button>
                            ) : (
                                <div className="flex items-center gap-2 text-green-600 font-medium text-sm p-2 bg-green-50 rounded-md border border-green-200">
                                    <CheckCircle className="h-5 w-5" />
                                    <span>Proof Verified</span>
                                </div>
                            )
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

    