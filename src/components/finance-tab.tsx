
"use client";

import { ArrowUp, Plus, ChevronDown, BarChart2, CreditCard, Landmark, TrendingUp, Wallet, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import ManageCardsDialog from "./manage-cards-dialog";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
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
import AccountCard from "./account-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";

export default function FinanceTab() {
  const cards = [
    { cardType: "Debit Card", balance: "€1,234.56", cardNumber: "1234", gradient: "from-blue-500 to-indigo-600" },
    { cardType: "Credit Card", balance: "€5,000.00", cardNumber: "5678", limit: "€10,000", gradient: "from-purple-500 to-violet-600" },
  ];

  const deposits = [
    { currency: "USD", principalAmount: "$10,000", maturityAmount: "$10,500", interestRate: "5.00", tenure: "1 Year", startDate: "2023-08-01", endDate: "2024-08-01", gradient: "from-green-500 to-emerald-600" },
    { currency: "EUR", principalAmount: "€5,000", maturityAmount: "€5,150", interestRate: "3.00", tenure: "6 Months", startDate: "2024-02-15", endDate: "2024-08-15", gradient: "from-teal-500 to-cyan-600" },
  ];

  const loans = [
     { currency: "USD", loanAmount: "$50,000", outstandingAmount: "$25,000", interestRate: "8.5", interestType: "Fixed", tenure: "5 Years", installments: "30/60", emi: "$900.50", disbursedDate: "2022-01-15", gradient: "from-red-500 to-orange-600" },
  ];

  const funds = [
    { currency: "USD", fundBalance: "$15,250", pnlAmount: "+$2,250", pnlPercentage: "17.3", investedAmount: "$13,000", sipNumber: "12345", startDate: "2021-06-01", gradient: "from-yellow-500 to-amber-600" },
  ];

  const crypto = [
    { walletName: "Metamask", asset: "ETH", balance: "2.5", network: "Ethereum", walletAddress: "0x123...456", gradient: "from-slate-600 to-gray-700", status: "active" as const },
    { walletName: "Phantom", asset: "SOL", balance: "105.2", network: "Solana", walletAddress: "So1...xyz", gradient: "from-fuchsia-600 to-purple-700", status: "active" as const },
  ];

  return (
    <div className="space-y-6 p-4">
      <Accordion type="single" collapsible className="w-full space-y-2">
        <AccordionItem value="cards" className="border-none">
          <AccordionTrigger className="p-3 bg-muted rounded-lg hover:no-underline">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary"/>
              <span className="font-semibold text-base">Cards</span>
              <Badge variant="secondary">{cards.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
              {cards.map((card, index) => (
                  <PaymentCard key={index} {...card} />
              ))}
              <Dialog>
              <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add New Card" /></div></DialogTrigger>
              <DialogContent>
                  <DialogHeader><DialogTitle>Manage Payment Cards</DialogTitle><DialogDescription>Add or remove your debit/credit cards.</DialogDescription></DialogHeader>
                  <ManageCardsDialog />
              </DialogContent>
              </Dialog>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="deposits" className="border-none">
           <AccordionTrigger className="p-3 bg-muted rounded-lg hover:no-underline">
            <div className="flex items-center gap-3">
              <Landmark className="h-5 w-5 text-primary"/>
              <span className="font-semibold text-base">Deposits</span>
              <Badge variant="secondary">{deposits.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
              {deposits.map((deposit, index) => (
                  <DepositCard key={index} {...deposit} />
              ))}
              <Dialog>
              <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add New Deposit" /></div></DialogTrigger>
              <DialogContent>
                  <DialogHeader><DialogTitle>Add New Deposit</DialogTitle><DialogDescription>Create a new fixed or recurring deposit.</DialogDescription></DialogHeader>
                  <ManageDepositsDialog />
              </DialogContent>
              </Dialog>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="loans" className="border-none">
           <AccordionTrigger className="p-3 bg-muted rounded-lg hover:no-underline">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary"/>
              <span className="font-semibold text-base">Loans</span>
              <Badge variant="secondary">{loans.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
              {loans.map((loan, index) => (
                  <LoanCard key={index} {...loan} />
              ))}
              <Dialog>
              <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Apply for Loan" /></div></DialogTrigger>
              <DialogContent>
                  <DialogHeader><DialogTitle>Apply for New Loan</DialogTitle><DialogDescription>Submit an application for a new personal or business loan.</DialogDescription></DialogHeader>
                  <ManageLoansDialog />
              </DialogContent>
              </Dialog>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="funds" className="border-none">
           <AccordionTrigger className="p-3 bg-muted rounded-lg hover:no-underline">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary"/>
              <span className="font-semibold text-base">Funds</span>
              <Badge variant="secondary">{funds.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
              {funds.map((fund, index) => (
                  <FundCard key={index} {...fund} />
              ))}
              <Dialog>
              <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add New Investment" /></div></DialogTrigger>
              <DialogContent>
                  <DialogHeader><DialogTitle>Add New Fund Investment</DialogTitle><DialogDescription>Invest in a new mutual fund.</DialogDescription></DialogHeader>
                  <ManageFundsDialog />
              </DialogContent>
              </Dialog>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="crypto" className="border-none">
           <AccordionTrigger className="p-3 bg-muted rounded-lg hover:no-underline">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary"/>
              <span className="font-semibold text-base">Crypto</span>
              <Badge variant="secondary">{crypto.length}</Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
              {crypto.map((cred, index) => (
                  <CryptoCredentialCard key={index} {...cred} />
              ))}
              <Dialog>
              <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add Crypto Wallet" /></div></DialogTrigger>
              <DialogContent>
                  <DialogHeader><DialogTitle>Add Crypto Wallet</DialogTitle><DialogDescription>Add a new crypto wallet to your identity.</DialogDescription></DialogHeader>
                  <ManageCryptoCredentialsDialog />
              </DialogContent>
              </Dialog>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
