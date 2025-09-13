
"use client";

import { ArrowLeft, User, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

interface RequestCredentialsViewProps {
  onBack: () => void;
}

export default function RequestCredentialsView({ onBack }: RequestCredentialsViewProps) {
    const { toast } = useToast();
    const [credentials, setCredentials] = useState<string[]>(['']);

    const handleRequest = () => {
        toast({
            title: "Credentials Requested",
            description: "Your request has been sent."
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
            <h2 className="text-xl font-bold font-headline">Request Credentials</h2>
        </div>
      </div>

      <div className="flex-grow mt-6 space-y-6">
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="requesterId">From (User's ID)</Label>
            <div className="relative flex items-center">
              <Input id="requesterId" placeholder="did:xidfi:..." className="pr-10" />
              <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8">
                <User className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <Label>Credentials to Request</Label>
                    <Button variant="ghost" size="sm" onClick={addCredentialField}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                    </Button>
                </div>
                <div className="space-y-2">
                    {credentials.map((cred, index) => (
                         <div key={index} className="flex items-center gap-2">
                            <Input 
                                placeholder="e.g., Proof of KYC" 
                                value={cred}
                                onChange={(e) => handleCredentialChange(index, e.target.value)}
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeCredentialField(index)} disabled={credentials.length <= 1}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" placeholder="For account opening" />
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2">
        <Button variant="outline" className="w-full" onClick={onBack}>Cancel</Button>
        <Button className="w-full" onClick={handleRequest}>Request</Button>
      </div>
    </div>
  );
}
