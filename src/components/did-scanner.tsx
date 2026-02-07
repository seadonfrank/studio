
'use client';

import { useEffect, useRef, useState } from "react";
import { CameraOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface DidScannerProps {
  onScan: (did: string) => void;
}

export default function DidScanner({ onScan }: DidScannerProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Simulate finding a DID after 1.5 seconds
        setTimeout(() => {
            const mockDid = "did:xidfi:" + Math.random().toString(36).substring(2, 10) + "-" + Math.random().toString(36).substring(2, 6);
            onScan(mockDid);
        }, 1500);

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [onScan, toast]);

  return (
    <div className="flex flex-col items-center justify-center mt-4 space-y-4">
        <div className="w-full aspect-square max-w-[300px] bg-muted rounded-lg overflow-hidden relative border-2 border-primary/20">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            <div className="absolute inset-0 border-[16px] border-background/20 rounded-lg" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/50 animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
            
            {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
                    <CameraOff className="h-12 w-12 mb-4" />
                    <p className="text-center font-medium">Camera access is required.</p>
                </div>
            )}
        </div>
        <div className="flex items-center gap-3 text-primary font-semibold py-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Searching for DID QR Code...</span>
        </div>
        {hasCameraPermission === false && (
            <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                    Please allow camera access in your browser settings to scan QR codes.
                </AlertDescription>
            </Alert>
        )}
    </div>
  );
}
