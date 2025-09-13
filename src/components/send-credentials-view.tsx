
"use client";

import { ArrowLeft, User, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SendCredentialsViewProps {
  onBack: () => void;
}

const availableCredentials = [
    "Passport (USA)",
    "National ID (Canada)",
    "Driver's License",
    "Boating License",
    "Medical License",
    "Bachelor's Degree",
    "Professional Certificate",
    "Proof of KYC",
];

export default function SendCredentialsView({ onBack }: SendCredentialsViewProps) {
    const { toast } = useToast();
    const [credentials, setCredentials] = useState<string[]>(['']);

    const handleSend = () => {
        if (credentials.length === 0 || credentials.some(c => c.trim() === '')) {
            toast({
                title: "Invalid Credentials",
                description: "Please specify which credentials you want to send.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Credentials Sent",
            description: "Your credentials have been sent successfully."
        });
        onBack();
    }

    const addCredentialField = () => {
        setCredentials([...credentials, '']);
    }

    const removeCredentialField = (index: number) => {
        const newCredentials = credentials.filter((_, i) => i !== index);
        setCredentials(newCredentials);
    }

    const handleCredentialChange = (index: number, value: string) => {
        const newCredentials = [...credentials];
        newCredentials[index] = value;
        setCredentials(newCredentials);
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

      <div className="flex-grow mt-6 space-y-6 overflow-y-auto">
        <div className="space-y-4 py-4">
          <div className="space-y-2 px-4">
            <Label htmlFor="verifierId">To (Verifier's ID)</Label>
            <div className="relative flex items-center">
              <Input id="verifierId" placeholder="did:xidfi:..." className="pr-10" />
              <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8">
                <User className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          
           <div className="px-4">
            <Card>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <Label>Credentials to Send</Label>
                        <Button variant="ghost" size="sm" onClick={addCredentialField}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {credentials.map((cred, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Select value={cred} onValueChange={(value) => handleCredentialChange(index, value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a credential" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableCredentials.map(item => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button variant="ghost" size="icon" onClick={() => removeCredentialField(index)} disabled={credentials.length <= 1}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
           </div>


          <div className="space-y-2 px-4">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" placeholder="For verification" />
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2 p-4 border-t">
        <Button variant="outline" className="w-full" onClick={onBack}>Cancel</Button>
        <Button className="w-full" onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
