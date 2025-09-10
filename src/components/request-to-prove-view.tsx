
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CameraOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

interface RequestToProveViewProps {
  onBack: () => void;
}

export default function RequestToProveView({ onBack }: RequestToProveViewProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [step, setStep] = useState<"scan" | "select" | "processing" | "success" | "error">("scan");
  const [progress, setProgress] = useState(0);
  const [proofType, setProofType] = useState("");
  const [scannedId, setScannedId] = useState("");

  useEffect(() => {
    if (step !== "scan") return;

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
          setScannedId("did:xidfi:requester-id-scanned");
          setStep("select");
        }, 2000);
      } catch (error) {
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [step]);
  
  useEffect(() => {
    if (step === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            const isSuccess = Math.random() > 0.3;
            setStep(isSuccess ? "success" : "error");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [step]);
  
  const handleRequestProof = () => {
    if (!proofType) {
        toast({
            variant: "destructive",
            title: "Select a Proof Type",
            description: "Please select a type of proof to request."
        });
        return;
    }
    setStep("processing");
  }

  const resetFlow = () => {
    setStep('scan');
    setProgress(0);
    setProofType('');
    setScannedId('');
  }

  const renderContent = () => {
    switch (step) {
      case "scan":
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
              Scan the user's QR code to request a proof.
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
      case "select":
        return (
            <div className="w-full max-w-[300px] space-y-4 text-left">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>User Scanned!</AlertTitle>
                  <AlertDescription className="truncate text-xs">
                    Requesting proof from: <span className="font-mono">{scannedId}</span>
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Label>Select Proof Type to Request</Label>
                  <Select onValueChange={setProofType} value={proofType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a proof" />
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
                <Button className="w-full" onClick={handleRequestProof} disabled={!proofType}>
                    Request Proof
                </Button>
                 <Button className="w-full" variant="outline" onClick={resetFlow}>
                    Scan Again
                </Button>
            </div>
        );
      case "processing":
        return (
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-semibold">Sending Proof Request...</p>
            <Progress value={progress} className="w-full" />
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-lg font-semibold">Request Sent</p>
            <p className="text-muted-foreground">The user has been notified of your proof request.</p>
            <Button onClick={resetFlow}>Request Another</Button>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
            <XCircle className="h-16 w-16 text-destructive" />
            <p className="text-lg font-semibold">Request Failed</p>
            <p className="text-muted-foreground">
              Could not send the request. Please try again.
            </p>
            <Button onClick={resetFlow}>Try Again</Button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-xl font-bold font-headline">Request a Proof</h2>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center mt-4 space-y-4">
        {renderContent()}
      </div>
    </div>
  );
}
