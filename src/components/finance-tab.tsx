"use client";

import { 
  ArrowLeft, Sparkles, Filter, Send, RotateCcw, Loader2, Bot, 
  Search, Landmark, CreditCard, TrendingUp, Wallet, Link, Plus, ChevronDown, 
  ArrowUp, BarChart2, Eye, RefreshCw, Info 
} from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import ManageCardsDialog from "./manage-cards-dialog";
import PaymentCard from "./payment-card";
import DepositCard from "./deposit-card";
import AddAccountCard from "./add-account-card";
import ManageAccountsDialog from "./manage-accounts-dialog";
import ManageDepositsDialog from "./manage-deposits-dialog";
import LoanCard from "./loan-card";
import ManageLoansDialog from "./manage-loans-dialog";
import FundCard from "./fund-card";
import ManageFundsDialog from "./manage-funds-dialog";
import CryptoCredentialCard from "./crypto-credential-card";
import ManageCryptoCredentialsDialog from "./manage-crypto-credentials-dialog";
import SyncWithBankDialog from "./sync-with-bank-dialog";
import AccountCarouselCard from "./account-carousel-card";
import SyncCard from "./sync-card";

type ChatMessage = { role: 'user' | 'ai'; content: string };

export default function FinanceTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const carouselAccounts = [
    { currency: "USD", accountType: "Primary Checking", balance: "1,250.00", fees: "0.00", gradient: "from-blue-600 to-indigo-500" },
    { currency: "EUR", accountType: "Secondary Savings", balance: "800.00", fees: "1.00", gradient: "from-green-600 to-emerald-500" },
    { currency: "GBP", accountType: "Travel Account", balance: "500.00", fees: "2.50", gradient: "from-purple-600 to-violet-500" },
  ];

  const cards = [
    { cardType: "Debit Card", balance: "€1,234.56", cardNumber: "1234", gradient: "from-blue-600 to-indigo-500" },
    { cardType: "Credit Card", balance: "€5,000.00", cardNumber: "5678", limit: "€10,000", gradient: "from-purple-600 to-violet-500" },
  ];

  const deposits = [
    { currency: "USD", principalAmount: "$10,000", maturityAmount: "$10,500", interestRate: "5.00", tenure: "1 Year", startDate: "2023-08-01", endDate: "2024-08-01", gradient: "from-green-600 to-emerald-500" },
  ];

  const loans = [
     { currency: "USD", loanAmount: "$50,000", outstandingAmount: "$25,000", interestRate: "8.5", interestType: "Fixed", tenure: "5 Years", installments: "30/60", emi: "$900.50", disbursedDate: "2022-01-15", gradient: "from-red-600 to-orange-500" },
  ];

  const funds = [
    { currency: "USD", fundBalance: "$15,250", pnlAmount: "+$2,250", pnlPercentage: "17.3", investedAmount: "$13,000", startDate: "2021-06-01", gradient: "from-yellow-600 to-amber-500" },
  ];

  const crypto = [
    { walletName: "Metamask", asset: "ETH", balance: "2.5", network: "Ethereum", walletAddress: "0x123...456", gradient: "from-slate-700 to-gray-600", status: "active" as const },
  ];

  const syncItems = [
    { category: "Accounts", lastSynced: "Today 9:41 AM", icon: Landmark },
    { category: "Cards", lastSynced: "Today 9:41 AM", icon: CreditCard },
  ];

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
    
    setTimeout(() => {
      setIsGenerating(false);
      const response = `Your total net worth across all linked accounts is approximately $57,100. You have a well-diversified portfolio with 17.3% returns on your Funds. Your largest liability is a $25,000 USD loan at 8.5% fixed interest.`;
      setChatHistory(prev => [...prev, { role: 'user', content: userQuery }, { role: 'ai', content: response }]);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-4 pb-32">
      {/* AI Search Section */}
      <section className="space-y-4">
        <div className={cn(
          "flex bg-background border border-primary/5 shadow-sm px-4 ring-1 ring-black/5 transition-all duration-300",
          isAiMode ? "rounded-2xl py-3 flex-col gap-4" : "items-center rounded-full h-11"
        )}>
          <div className="flex items-center gap-2 w-full">
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
                placeholder="Search accounts & cards" 
                className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm flex-1 placeholder:text-muted-foreground/40 p-0 ml-1 h-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            
            {isAiMode && (
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Financial Insight Engine</p>
            )}

            {!isAiMode && (
              <>
                <Separator orientation="vertical" className="h-5 mx-1 bg-border/60" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted shrink-0 transition-colors">
                      <Filter className="h-4 w-4 text-muted-foreground/60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Sort by Balance</DropdownMenuItem>
                    <DropdownMenuItem>Filter by Asset Type</DropdownMenuItem>
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
                             {msg.role === 'ai' ? 'AI Analyst' : 'You'}
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

              <div className="space-y-4">
                <Textarea 
                  placeholder="Ask about your assets, debts, or spending..." 
                  className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm flex-1 placeholder:text-muted-foreground/40 min-h-[60px] resize-none p-0"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                
                <div className="flex justify-end gap-2 border-t border-primary/5 pt-4">
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
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sync Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500/80">Connect & Sync</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs font-bold text-primary">Add Connection</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sync Financial Accounts</DialogTitle>
                <DialogDescription>Connect with your bank to sync assets.</DialogDescription>
              </DialogHeader>
              <SyncWithBankDialog />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {syncItems.map((item, index) => (
            <SyncCard key={index} {...item} />
          ))}
        </div>
      </section>

      <Separator />

      {/* Main Financial Sections */}
      <section className="space-y-6">
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500/80 mb-3">Accounts</h3>
          <div className="space-y-3">
            {carouselAccounts.map((account, index) => (
              <AccountCarouselCard key={index} {...account} />
            ))}
             <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs font-semibold">Link New Bank Account</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add New Bank Account</DialogTitle><DialogDescription>Add a new bank account.</DialogDescription></DialogHeader>
                  <ManageAccountsDialog />
                </DialogContent>
              </Dialog>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500/80 mb-3">Cards</h3>
          <div className="space-y-3">
            {cards.map((card, index) => (
              <PaymentCard key={index} {...card} />
            ))}
             <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-dashed border-2 py-8 flex flex-col gap-1 text-muted-foreground hover:text-primary hover:border-primary transition-all rounded-xl">
                    <Plus className="h-5 w-5" />
                    <span className="text-xs font-semibold">Add New Card</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Manage Payment Cards</DialogTitle><DialogDescription>Add or remove cards.</DialogDescription></DialogHeader>
                  <ManageCardsDialog />
                </DialogContent>
              </Dialog>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500/80 mb-3">Deposits & Loans</h3>
          <div className="space-y-3">
            {deposits.map((deposit, index) => <DepositCard key={index} {...deposit} />)}
            {loans.map((loan, index) => <LoanCard key={index} {...loan} />)}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500/80 mb-3">Funds & Crypto</h3>
          <div className="space-y-3">
            {funds.map((fund, index) => <FundCard key={index} {...fund} />)}
            {crypto.map((cred, index) => <CryptoCredentialCard key={index} {...cred} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
