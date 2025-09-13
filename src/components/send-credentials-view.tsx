
"use client";

import { ArrowLeft, User, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import GovernmentCredentialCard from "./government-credential-card";
import LicenseCredentialCard from "./license-credential-card";
import AcademicCredentialCard from "./academic-credential-card";
import { cn } from "@/lib/utils";

interface SendCredentialsViewProps {
  onBack: () => void;
}

const governmentCredentials = [
    { id: 'gov1', credentialType: "Passport" as const, country: "USA", name: "John Doe", dob: "1990-05-15", issueDate: "2020-01-20", expiryDate: "2030-01-19", passportNumber: "A1B2C3D4", gradient: "from-blue-600 to-sky-500", status: "active" as const },
];

const licenseCredentials = [
    { id: 'lic1', licenseType: "Driver's License", issuingAuthority: "State of CA", name: "John Doe", issueDate: "2021-08-15", expiryDate: "2029-08-15", licenseNumber: "D1234567", details: ["Class: C"], gradient: "from-green-600 to-emerald-500", status: "active" as const },
];

const academicCredentials = [
    { id: 'acad1', credentialType: "Bachelor's Degree", institution: "State University", fieldOfStudy: "Computer Science", graduationDate: "2022-05-20", gradient: "from-purple-600 to-indigo-500", status: "active" as const },
];

export default function SendCredentialsView({ onBack }: SendCredentialsViewProps) {
    const { toast } = useToast();
    const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]);

    const handleSend = () => {
        if (selectedCredentials.length === 0) {
            toast({
                title: "No Credentials Selected",
                description: "Please select at least one credential to send.",
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

    const toggleCredential = (id: string) => {
        setSelectedCredentials(prev => 
            prev.includes(id) ? prev.filter(credId => credId !== id) : [...prev, id]
        );
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
          
          <div className="space-y-4">
            <h3 className="font-semibold px-4">Select Credentials to Send</h3>
            <div className="space-y-4 px-4">
                {governmentCredentials.map(cred => {
                    const isSelected = selectedCredentials.includes(cred.id);
                    return (
                        <div key={cred.id} className="relative cursor-pointer" onClick={() => toggleCredential(cred.id)}>
                            <GovernmentCredentialCard {...cred} />
                            {isSelected && (
                                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-12 w-12 text-white" />
                                </div>
                            )}
                        </div>
                    )
                })}
                 {licenseCredentials.map(cred => {
                    const isSelected = selectedCredentials.includes(cred.id);
                    return (
                        <div key={cred.id} className="relative cursor-pointer" onClick={() => toggleCredential(cred.id)}>
                            <LicenseCredentialCard {...cred} />
                            {isSelected && (
                                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-12 w-12 text-white" />
                                </div>
                            )}
                        </div>
                    )
                })}
                 {academicCredentials.map(cred => {
                    const isSelected = selectedCredentials.includes(cred.id);
                    return (
                        <div key={cred.id} className="relative cursor-pointer" onClick={() => toggleCredential(cred.id)}>
                            <AcademicCredentialCard {...cred} />
                            {isSelected && (
                                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-12 w-12 text-white" />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
          </div>

          <div className="space-y-2 px-4">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" placeholder="For verification" />
          </div>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2 p-4 border-t">
        <Button variant="outline" className="w-full" onClick={onBack}>Cancel</Button>
        <Button className="w-full" onClick={handleSend}>Send ({selectedCredentials.length})</Button>
      </div>
    </div>
  );
}
