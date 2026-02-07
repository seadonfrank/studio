
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CameraOff, CheckCircle, XCircle, Loader2, ShieldCheck, FileQuestion, Edit, Share2, Scan } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface ScanToProveViewProps {
  onBack: () => void;
}

type ScanState = "scanning" | "reviewing" | "proof_sent" | "error";


const verifier = {
    name: 'Gov. Department of Verification',
    did: 'did:xidfi:gov:verifier:1234',
    avatar: 'https://picsum.photos/id/101/200/200'
};

const requestedProofs = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 21)' },
];


export default function ScanToProveView({ onBack }: ScanToProveViewProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanState, setScanState] = useState<ScanState>("scanning");
  
  const [providedProofs, setProvidedProofs] = useState<string[]>([]);
  const [selectedProofsToProvide, setSelectedProofsToProvide] = useState<string[]>([]);
  const [note, setNote] = useState('');


  useEffect(() => {
    if (scanState !== "scanning") return;

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
          const allProofIds = requestedProofs.map(p => p.id);
          setScanState("reviewing");
          setSelectedProofsToProvide(allProofIds);
          setProvidedProofs(allProofIds);
        }, 2000);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();

    return () => {
      // Cleanup: stop video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast, scanState]);

  const handleProvideProofs = () => {
    setProvidedProofs(selectedProofsToProvide);
  }
  
  const handleSendProof = () => {
     if (providedProofs.length === 0) {
        toast({
            variant: "destructive",
            title: "Provide Credentials",
            description: "Please provide at least one credential before sending the proof."
        });
        return;
    }
    setScanState('proof_sent');
  }

  const handleReset = () => {
    setScanState("scanning");
    setProvidedProofs([]);
    setSelectedProofsToProvide([]);
    setNote('');
  }

  const handleCheckboxChange = (proofId: string, checked: boolean) => {
    setSelectedProofsToProvide(prev => 
        checked ? [...prev, proofId] : prev.filter(id => id !== proofId)
    );
  }

  const handleShare = () => {
    const receiptText = `Proof provided to ${verifier.name}.`;
    if (navigator.share) {
      navigator
        .share({
          title: "xIDFI Proof Receipt",
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

  const renderContent = () => {
    switch (scanState) {
      case "scanning":
        return (
          <div className="flex-grow flex flex-col items-center justify-center mt-4 space-y-4">
            <div className="w-full aspect-square max-w-[300px] bg-muted rounded-lg overflow-hidden relative">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              <div className="absolute inset-0 border-8 border-background/50 rounded-lg" />
              {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                  <CameraOff className="h-12 w-12 mb-4" />
                  <p className="text-center">Camera access is required.</p>
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
                  Please allow camera access in your browser settings.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );
      case "reviewing":
        return (
            <div className="w-full space-y-6 mt-6">
                <div className="text-center space-y-2">
                    <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src={verifier.avatar} data-ai-hint="logo government" />
                        <AvatarFallback>GDV</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-lg">{verifier.name}</p>
                        <p className="text-muted-foreground text-sm font-mono truncate">{verifier.did}</p>
                    </div>
                </div>

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
                                    const proof = requestedProofs.find(p => p.id === proofId);
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
                               Select which credentials you want to provide for verification.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="space-y-4 py-4">
                            {requestedProofs.map(proof => (
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
                
                <div className="space-y-2">
                    <Label htmlFor="note">Note (Optional)</Label>
                    <Input id="note" placeholder="For verification purposes" value={note} onChange={(e) => setNote(e.target.value)} />
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <Button className="w-full" onClick={handleSendProof}>Complete Verification</Button>
                </div>
            </div>
        );
      case "proof_sent":
        return (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
            <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage src={verifier.avatar} data-ai-hint="logo government" />
                <AvatarFallback>GDV</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="text-2xl font-bold font-headline">{verifier.name}</h3>
                <p className="text-muted-foreground text-sm font-mono truncate">{verifier.did}</p>
            </div>
            <Card className="w-full text-left">
                <CardContent className="p-3 text-sm">
                    {note && <div className="flex justify-between"><span>Note:</span> <span className="font-semibold">{note}</span></div>}
                    
                    {providedProofs.length > 0 && (
                        <>
                            {note && <Separator className="my-2"/>}
                            <div className="flex items-center gap-2 font-semibold">
                                <FileQuestion className="h-4 w-4" />
                                <span>Credentials Provided:</span>
                            </div>
                            <ul className="text-xs text-muted-foreground list-disc pl-5 mt-1">
                                {providedProofs.map(proofId => {
                                    const proof = requestedProofs.find(p => p.id === proofId);
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
      case "error":
        return (
          <div className="flex-grow flex flex-col items-center justify-center h-64 space-y-4 text-center">
            <XCircle className="h-16 w-16 text-destructive" />
            <p className="text-lg font-semibold">Proof Generation Failed</p>
            <p className="text-muted-foreground">
              Could not provide the proof. The request may be invalid.
            </p>
            <Button onClick={handleReset}>Try Again</Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
       <div className={cn(
        "flex items-center gap-2 mb-4",
        scanState === 'proof_sent' && "justify-center"
      )}>
        {scanState !== 'proof_sent' && (
          <Button variant="ghost" size="icon" onClick={scanState === 'scanning' ? onBack : handleReset}>
            <ArrowLeft />
          </Button>
        )}
        <h2 className="text-xl font-bold font-headline">
          {scanState === 'proof_sent' ? 'Proof Sucessful' : 'Scan to Prove'}
        </h2>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center mt-4 space-y-4">
        {renderContent()}
      </div>
    </div>
  );
}
