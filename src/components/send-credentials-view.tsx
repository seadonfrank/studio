
"use client";

import { ArrowLeft, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";

interface SendCredentialsViewProps {
  onBack: () => void;
}

const availableCredentials = [
    { id: 'kyc', label: 'Proof of KYC' },
    { id: 'age', label: 'Proof of Age (Over 21)' },
    { id: 'passport', label: 'Valid Passport' },
];

export default function SendCredentialsView({ onBack }: SendCredentialsViewProps) {
    const { toast } = useToast();
    const handleSend = () => {
        toast({
            title: "Credentials Sent",
            description: "Your credentials have been sent successfully."
        });
        onBack();
    }
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
            </Button>
            <h2 className="text-xl font-bold font-headline">Send Credentials</h2>
        </div>
      </div>

      <div className="flex-grow mt-6 space-y-6">
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="verifierId">To (Verifier's ID)</Label>
            <div className="relative flex items-center">
              <Input id="verifierId" placeholder="did:xidfi:..." className="pr-10" />
              <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8">
                <User className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
                <Label>Credentials to Send</Label>
                <div className="space-y-3 mt-2">
                    {availableCredentials.map((cred) => (
                        <div key={cred.id} className="flex items-center space-x-3">
                            <Checkbox id={`cred-${cred.id}`} />
                            <Label htmlFor={`cred-${cred.id}`} className="font-normal flex-1">
                                {cred.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" placeholder="For verification" />
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2">
        <Button variant="outline" className="w-full" onClick={onBack}>Cancel</Button>
        <Button className="w-full" onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
