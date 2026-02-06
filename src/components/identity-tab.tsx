
"use client";

import { Shield, BookUser, GraduationCap, Plus, Scan, ArrowLeft, Copy, Share2, History, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import GovernmentCredentialCard from "./government-credential-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import LicenseCredentialCard from "./license-credential-card";
import ManageLicensesDialog from "./manage-licenses-dialog";
import AcademicCredentialCard from "./academic-credential-card";
import ManageAcademicCredentialsDialog from "./manage-academic-credentials-dialog";
import { useState, useMemo } from "react";
import ScanAndClaim from "./scan-and-claim";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import SendCredentialsView from "./send-credentials-view";
import ActivityItem from "./activity-item";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "./ui/input";

type IdentityView = 'main' | 'qr' | 'send' | 'activities';

export default function IdentityTab() {
  const [view, setView] = useState<IdentityView>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { toast } = useToast();
  const did = "did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d";

  const handleCopy = () => {
    navigator.clipboard.writeText(did);
    toast({
      title: "Copied to clipboard!",
    });
  };

  const governmentCredentials = [
    { credentialType: "Passport", country: "USA", name: "John Doe", dob: "1990-05-15", issueDate: "2020-01-20", expiryDate: "2030-01-19", passportNumber: "A1B2C3D4", gradient: "from-blue-600 to-sky-500", status: "active" as const },
    { credentialType: "National ID", country: "Canada", name: "Jane Smith", dob: "1988-09-22", issueDate: "2017-03-10", expiryDate: "2022-03-09", nationalIdNumber: "123-456-789", gradient: "from-red-600 to-rose-500", status: "expired" as const },
    { credentialType: "Passport", country: "UK", name: "Peter Jones", dob: "1985-11-02", issueDate: "2015-06-01", expiryDate: "2020-05-31", passportNumber: "X9Y8Z7W6", gradient: "from-gray-600 to-slate-500", status: "revoked" as const },
  ];

  const licenseCredentials = [
    { licenseType: "Driver's License", issuingAuthority: "State of CA", name: "John Doe", issueDate: "2021-08-15", expiryDate: "2029-08-15", licenseNumber: "D1234567", details: ["Class: C"], gradient: "from-green-600 to-emerald-500", status: "active" as const },
    { licenseType: "Boating License", issuingAuthority: "Maritime Authority", name: "Jane Smith", issueDate: "2018-06-01", expiryDate: "2023-06-01", licenseNumber: "B9876543", gradient: "from-cyan-600 to-teal-500", status: "expired" as const },
    { licenseType: "Medical License", issuingAuthority: "Medical Board", name: "Dr. Emily White", issueDate: "2019-07-20", expiryDate: "2025-07-20", licenseNumber: "M555444", gradient: "from-rose-600 to-pink-500", status: "revoked" as const },
  ];

  const academicCredentials = [
    { credentialType: "Bachelor's Degree", institution: "State University", fieldOfStudy: "Computer Science", graduationDate: "2022-05-20", gradient: "from-purple-600 to-indigo-500", status: "active" as const },
    { credentialType: "Professional Certificate", institution: "Tech Institute", fieldOfStudy: "Project Management", graduationDate: "2019-05-20", gradient: "from-fuchsia-600 to-pink-500", status: "active" as const },
  ];

  const filteredGov = useMemo(() => 
    governmentCredentials.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.credentialType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredLicenses = useMemo(() => 
    licenseCredentials.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.licenseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const filteredAcademic = useMemo(() => 
    academicCredentials.filter(c => 
      c.institution.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.credentialType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fieldOfStudy.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const recentActivity = [
    { id: 1, action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { id: 2, action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { id: 3, action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
    { id: 4, action: "Verified", credential: "Passport", entity: "Airport Security", time: "1d ago" },
    { id: 5, action: "Claimed", credential: "University Degree", entity: "State University", time: "2d ago" },
  ];

  const toggleAll = () => {
    if (expandedItems.length > 0) {
      setExpandedItems([]);
    } else {
      setExpandedItems(['government', 'licenses', 'academic']);
    }
  };

  if (view === 'send') {
    return <SendCredentialsView onBack={() => setView('main')} />;
  }
  if (view === 'activities') {
    return (
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setView('main')}>
            <ArrowLeft />
          </Button>
          <h2 className="text-xl font-bold font-headline">Recent activities</h2>
        </div>
        <div className="flex-grow overflow-y-auto space-y-4 pt-6">
          {recentActivity.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <section>
        <Card className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground shadow-lg border-none">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-white p-1.5 rounded-md shrink-0">
                 <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=${did}`}
                    alt="DID QR Code"
                    width={64}
                    height={64}
                    data-ai-hint="qr code"
                 />
            </div>
            <div className="flex-1 space-y-1 overflow-hidden">
                <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold">Your Sovereign Digital Identity</p>
                <p className="font-mono text-xs break-all leading-tight opacity-90">
                    {did}
                </p>
                <div className="flex items-center gap-1 pt-1.5 -ml-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy DID</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setView('send')}>
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share DID</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setView('activities')}>
                        <History className="h-4 w-4" />
                        <span className="sr-only">View history</span>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Add Credentials</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Claim Credentials</DialogTitle>
                          <DialogDescription>
                            Position the QR code within the frame to claim your credential.
                          </DialogDescription>
                        </DialogHeader>
                        <ScanAndClaim />
                      </DialogContent>
                    </Dialog>
                </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search cards..." 
              className="pl-9 bg-background h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 shrink-0" 
            onClick={toggleAll}
            title={expandedItems.length > 0 ? "Collapse all" : "Expand all"}
          >
            {expandedItems.length > 0 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </Button>
        </div>
      </section>

      <Accordion 
        type="multiple" 
        className="w-full space-y-4" 
        value={expandedItems} 
        onValueChange={setExpandedItems}
      >
        <AccordionItem value="government" className="border-none bg-background rounded-xl shadow-sm border overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-4 px-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-base font-headline font-semibold">Government</span>
              </div>
              <Badge variant="secondary" className="mr-2 h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                {filteredGov.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3">
              {filteredGov.map((cred, index) => (
                <GovernmentCredentialCard key={index} {...cred} />
              ))}
              {filteredGov.length === 0 && searchQuery && (
                <p className="text-center text-sm text-muted-foreground py-4">No matching government credentials.</p>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs font-semibold">Add Government Credential</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Government Credential</DialogTitle>
                    <DialogDescription>
                      Securely add your government-issued credentials.
                    </DialogDescription>
                  </DialogHeader>
                  <ScanAndClaim />
                </DialogContent>
              </Dialog>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="licenses" className="border-none bg-background rounded-xl shadow-sm border overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-4 px-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <BookUser className="h-5 w-5 text-primary" />
                <span className="text-base font-headline font-semibold">Licenses</span>
              </div>
              <Badge variant="secondary" className="mr-2 h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                {filteredLicenses.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3">
              {filteredLicenses.map((cred, index) => (
                <LicenseCredentialCard key={index} {...cred} />
              ))}
              {filteredLicenses.length === 0 && searchQuery && (
                <p className="text-center text-sm text-muted-foreground py-4">No matching licenses.</p>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs font-semibold">Add License</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New License</DialogTitle>
                    <DialogDescription>
                      Add details for your new license credential.
                    </DialogDescription>
                  </DialogHeader>
                  <ManageLicensesDialog />
                </DialogContent>
              </Dialog>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="academic" className="border-none bg-background rounded-xl shadow-sm border overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-4 px-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-base font-headline font-semibold">Academic</span>
              </div>
              <Badge variant="secondary" className="mr-2 h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                {filteredAcademic.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3">
              {filteredAcademic.map((cred, index) => (
                <AcademicCredentialCard key={index} {...cred} />
              ))}
              {filteredAcademic.length === 0 && searchQuery && (
                <p className="text-center text-sm text-muted-foreground py-4">No matching academic credentials.</p>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs font-semibold">Add Academic Credential</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Academic Credential</DialogTitle>
                    <DialogDescription>
                      Add details for your new academic credential.
                    </DialogDescription>
                  </DialogHeader>
                  <ManageAcademicCredentialsDialog />
                </DialogContent>
              </Dialog>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
    </div>
  );
}
