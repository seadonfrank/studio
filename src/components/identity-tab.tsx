"use client";

import { Shield, BookUser, GraduationCap, Plus, ArrowLeft, Copy, Share2, History, Filter, Sparkles, Send, Ticket, Bot, Loader2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import GovernmentCredentialCard from "./government-credential-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import LicenseCredentialCard from "./license-credential-card";
import ManageLicensesDialog from "./manage-licenses-dialog";
import AcademicCredentialCard from "./academic-credential-card";
import PassCredentialCard from "./pass-credential-card";
import ManageAcademicCredentialsDialog from "./manage-academic-credentials-dialog";
import { useState, useMemo } from "react";
import ScanAndClaim from "./scan-and-claim";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import SendCredentialsView from "./send-credentials-view";
import ActivityItem from "./activity-item";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

type IdentityView = 'main' | 'qr' | 'share' | 'activities';
type CredentialStatus = 'all' | 'active' | 'expired' | 'revoked';
type ChatMessage = { role: 'user' | 'ai'; content: string };

export default function IdentityTab() {
  const [view, setView] = useState<IdentityView>('main');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<CredentialStatus>('all');
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
  ];

  const licenseCredentials = [
    { licenseType: "Driver's License", issuingAuthority: "State of CA", name: "John Doe", issueDate: "2021-08-15", expiryDate: "2029-08-15", licenseNumber: "D1234567", details: ["Class: C"], gradient: "from-green-600 to-emerald-500", status: "active" as const },
  ];

  const academicCredentials = [
    { credentialType: "Bachelor's Degree", institution: "State University", fieldOfStudy: "Computer Science", graduationDate: "2022-05-20", gradient: "from-purple-600 to-indigo-500", status: "active" as const },
  ];

  const passCredentials = [
    { passType: "VIP Ticket", organizer: "TechSummit", eventName: "Global Tech Summit 2024", eventDate: "2024-11-15", venue: "Grand Convention Center", gradient: "from-amber-600 to-orange-500", status: "active" as const },
    { passType: "Membership", organizer: "FitLife Gym", eventName: "Premium Annual Member", eventDate: "2024-12-31", venue: "Downtown Branch", gradient: "from-teal-600 to-emerald-500", status: "active" as const },
  ];

  const filteredGov = useMemo(() => 
    governmentCredentials.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.credentialType.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    }), [searchQuery, filterStatus]);

  const filteredLicenses = useMemo(() => 
    licenseCredentials.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.licenseType.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    }), [searchQuery, filterStatus]);

  const filteredAcademic = useMemo(() => 
    academicCredentials.filter(c => {
      const matchesSearch = c.institution.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.credentialType.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.fieldOfStudy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    }), [searchQuery, filterStatus]);

  const filteredPasses = useMemo(() => 
    passCredentials.filter(c => {
      const matchesSearch = c.eventName.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.passType.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.venue.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    }), [searchQuery, filterStatus]);

  const recentActivity = [
    { id: 1, action: "Verified", credential: "Proof of Age", entity: "Online Store", time: "2m ago" },
    { id: 2, action: "Claimed", credential: "Conference Pass", entity: "Tech Summit '24", time: "1h ago" },
    { id: 3, action: "Generated", credential: "ZK Proof for KYC", entity: "Crypto Exchange", time: "3h ago" },
  ];

  const toggleAll = () => {
    if (expandedItems.length > 0) {
      setExpandedItems([]);
    } else {
      setExpandedItems(['government', 'licenses', 'academic', 'leisure']);
    }
  };

  const handleAiModeToggle = () => {
    setIsAiMode(!isAiMode);
    if (!isAiMode) {
      setSearchQuery('');
    } else {
      setAiPrompt('');
    }
  };

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    const userQuery = aiPrompt;
    setAiPrompt('');
    setIsGenerating(true);
    
    // Simulate AI logic
    setTimeout(() => {
      setIsGenerating(false);
      const response = `Based on your secured credentials, you have ${governmentCredentials.length} active government documents, including a USA Passport. You also hold a Bachelor's Degree in Computer Science. You currently have ${passCredentials.length} upcoming events.`;
      setChatHistory(prev => [...prev, { role: 'user', content: userQuery }, { role: 'ai', content: response }]);
    }, 1500);
  };

  if (view === 'share') {
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setView('share')}>
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share DID</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={() => setView('activities')}>
                        <History className="h-4 w-4" />
                        <span className="sr-only">View history</span>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 bg-white/10 hover:bg-white/20 text-white rounded-full px-3 flex items-center gap-1.5 border border-white/10">
                          <Plus className="h-3.5 w-3.5" />
                          <span className="text-xs font-bold whitespace-nowrap">Add Credential</span>
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
        <div className={cn(
          "flex transition-all duration-300",
          isAiMode 
            ? "flex-col gap-4 bg-transparent border-none shadow-none ring-0" 
            : "bg-background border border-primary/5 shadow-sm px-4 ring-1 ring-black/5 items-center rounded-full h-11"
        )}>
          <div className={cn(
            "flex items-center gap-2 w-full",
            isAiMode && "border-b border-primary/10 pb-3 px-1"
          )}>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "h-8 px-2 rounded-full shrink-0 transition-colors flex items-center gap-1", 
                isAiMode ? "text-primary bg-primary/10 hover:bg-primary/20" : "text-muted-foreground/60 hover:text-primary hover:bg-primary/5"
              )}
              onClick={handleAiModeToggle}
            >
              {isAiMode ? <ArrowLeft className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
              <span className="text-[10px] font-bold">{isAiMode ? 'Back' : 'AI'}</span>
            </Button>
            
            {!isAiMode && (
              <Input 
                placeholder="Search credentials" 
                className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm flex-1 placeholder:text-muted-foreground/40 p-0 ml-1 h-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            
            {isAiMode && (
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">AI Insight Engine</p>
            )}

            {!isAiMode && (
              <>
                <Separator orientation="vertical" className="h-5 mx-1 bg-border/60" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted shrink-0 transition-colors" title="Sort by status">
                      <Filter className="h-4 w-4 text-muted-foreground/60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterStatus('all')}>All</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('active')}>Active</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('expired')}>Expired</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus('revoked')}>Revoked</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {isAiMode && (
            <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-top-2 duration-300">
              {chatHistory.length > 0 && (
                <ScrollArea className="h-48 w-full px-1">
                  <div className="space-y-6 pb-2">
                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className={cn(
                        "flex flex-col gap-1.5",
                        msg.role === 'user' ? "items-end" : "items-start"
                      )}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                           {msg.role === 'ai' && (
                             <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                               <Bot className="h-2.5 w-2.5 text-primary" />
                             </div>
                           )}
                           <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
                             {msg.role === 'ai' ? 'AI Assistant' : 'You'}
                           </span>
                        </div>
                        <div className={cn(
                          "text-xs p-2.5 rounded-xl max-w-[90%] leading-relaxed",
                          msg.role === 'user' 
                            ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm" 
                            : "bg-muted/50 border border-primary/5 rounded-tl-none text-foreground/90 font-medium italic"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              <div className="space-y-4 border-t border-primary/10 pt-4 px-1">
                <Textarea 
                  placeholder="Ask AI about your identity..." 
                  className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm flex-1 placeholder:text-muted-foreground/40 min-h-[60px] resize-none p-0"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                
                <Separator className="bg-primary/10" />
                <div className="flex justify-end gap-2 py-1">
                  {chatHistory.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 rounded-full text-xs font-bold text-muted-foreground hover:text-primary hover:bg-primary/5"
                      onClick={() => { setChatHistory([]); }}
                    >
                      <RotateCcw className="h-3 w-3 mr-1.5" />
                      Clear History
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="h-8 rounded-full gap-2 text-xs font-bold min-w-[100px]" 
                    disabled={!aiPrompt.trim() || isGenerating}
                    onClick={handleGenerate}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Thinking...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
                <Separator className="bg-primary/10" />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="flex items-center justify-between px-2">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500/80">
          Your Secured Credentials
        </h3>
        <button 
          onClick={toggleAll}
          className="text-primary text-xs font-semibold hover:underline"
        >
          {expandedItems.length > 0 ? 'Hide All' : 'View All'}
        </button>
      </div>

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
              {filteredGov.length === 0 && (searchQuery || filterStatus !== 'all') && (
                <p className="text-center text-sm text-muted-foreground py-4">No matching government credentials.</p>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl">
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
              {filteredLicenses.length === 0 && (searchQuery || filterStatus !== 'all') && (
                <p className="text-center text-sm text-muted-foreground py-4">No matching licenses.</p>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl">
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
              {filteredAcademic.length === 0 && (searchQuery || filterStatus !== 'all') && (
                <p className="text-center text-sm text-muted-foreground py-4">No matching academic credentials.</p>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl">
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

        <AccordionItem value="leisure" className="border-none bg-background rounded-xl shadow-sm border overflow-hidden">
          <AccordionTrigger className="hover:no-underline py-4 px-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                <span className="text-base font-headline font-semibold">Leisure &amp; Events</span>
              </div>
              <Badge variant="secondary" className="mr-2 h-5 min-w-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                {filteredPasses.length}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-0">
            <div className="space-y-3">
              {filteredPasses.map((cred, index) => (
                <PassCredentialCard key={index} {...cred} />
              ))}
              {filteredPasses.length === 0 && (searchQuery || filterStatus !== 'all') && (
                <p className="text-center text-sm text-muted-foreground py-4">No matching leisure passes.</p>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs font-semibold">Add Leisure Pass</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Leisure Pass</DialogTitle>
                    <DialogDescription>
                      Add details for your new event ticket or membership pass.
                    </DialogDescription>
                  </DialogHeader>
                  <ScanAndClaim />
                </DialogContent>
              </Dialog>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
    </div>
  );
}
