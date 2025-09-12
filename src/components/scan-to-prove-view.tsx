
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CameraOff, CheckCircle, XCircle, Loader2, ShieldCheck, FileQuestion } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface ScanToProveViewProps {
  onBack: () => void;
}

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
  const [scanState, setScanState] = useState<"scanning" | "reviewing" | "processing" | "success" | "error">("scanning");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scanState !== "scanning") return;

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
          setScanState("reviewing");
        }, 2000);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this feature.",
        });
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

  useEffect(() => {
    if (scanState === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            const isSuccess = Math.random() > 0.3; // 70% chance of success
            setScanState(isSuccess ? "success" : "error");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [scanState]);

  const handleProvide = () => {
    setScanState("processing");
  }

  const handleDecline = () => {
    toast({
        title: "Request Declined",
        description: "You have declined the proof request.",
        variant: "destructive"
    });
    onBack();
  }

  const resetState = () => {
    setScanState("scanning");
    setProgress(0);
  }

  const renderScanContent = () => {
    switch (scanState) {
      case "scanning":
        return (
          <>
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
              Position the proof request QR code within the frame.
            </p>
            {hasCameraPermission === false && (
              <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access in your browser settings.
                </AlertDescription>
              </Alert>
            )}
          </>
        );
      case "reviewing":
        return (
            <div className="w-full space-y-6">
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

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <FileQuestion className="h-5 w-5 text-primary"/>
                            <p className="font-semibold">Credentials Requested</p>
                        </div>
                        <Separator className="my-3"/>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {requestedProofs.map(proof => (
                                <li key={proof.id} className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-green-500"/>
                                    <span>{proof.label}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={handleDecline}>Decline</Button>
                    <Button className="w-full" onClick={handleProvide}>Provide</Button>
                </div>
            </div>
        );
      case "processing":
        return (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-semibold">Generating Proof...</p>
            <Progress value={progress} className="w-full max-w-xs" />
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-lg font-semibold">Proof Provided</p>
            <p className="text-muted-foreground">The required proof has been provided successfully.</p>
            <Button onClick={resetState}>Scan Another</Button>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
            <XCircle className="h-16 w-16 text-destructive" />
            <p className="text-lg font-semibold">Proof Generation Failed</p>
            <p className="text-muted-foreground">
              Could not provide the proof. The request may be invalid.
            </p>
            <Button onClick={resetState}>Try Again</Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={scanState === 'scanning' ? onBack : resetState}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Scan to Prove</h2>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center mt-4 space-y-4">
        {renderScanContent()}
      </div>
    </div>
  );
}

    
