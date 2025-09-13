
"use client";

import { ArrowUp, Plus, ChevronDown, BarChart2, CreditCard, Landmark, TrendingUp, Wallet, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import ManageCardsDialog from "./manage-cards-dialog";
import TransactionList from "./transaction-list";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountCard from "./account-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function FinanceTab() {
  const accounts = [
    { currency: "USD", balance: "1,250.00", type: "primary" as const, gradient: "from-blue-500 to-indigo-500" },
    { currency: "EUR", balance: "800.00", type: "secondary" as const, gradient: "from-green-500 to-emerald-500" },
    { currency: "GBP", balance: "500.00", type: "secondary" as const, gradient: "from-purple-500 to-violet-500" },
  ];

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
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Total balance</p>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <h2 className="text-3xl font-headline font-bold">17.39 EUR</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <BarChart2 className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Toggle visibility">
                <Eye className="h-5 w-5" />
              </Button>
            </div>
        </div>
      </div>
      
      <div className="flex justify-start gap-2">
          <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full h-9 px-4"><ArrowUp className="mr-1 h-4 w-4"/> Send</Button>
          <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full h-9 px-4"><Plus className="mr-1 h-4 w-4"/> Add money</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full h-9 px-4">
                Request
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Request via Link</DropdownMenuItem>
              <DropdownMenuItem>Request from user</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

      <div>
        <Carousel opts={{ align: "start" }} className="w-full -ml-4">
            <CarouselContent className="pl-4">
              {accounts.map((account, index) => (
                <CarouselItem key={index} className="basis-auto pl-2">
                  <div className="w-[150px]">
                    <AccountCard {...account} />
                  </div>
                </CarouselItem>
              ))}
              <CarouselItem className="basis-auto pl-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-[150px] h-full">
                      <AddAccountCard text="Add New Account" className="min-h-[105px]" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Account</DialogTitle>
                        <DialogDescription>
                            Add a new currency account to your wallet.
                        </DialogDescription>
                    </DialogHeader>
                    <ManageAccountsDialog />
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
      </div>
      
      <Tabs defaultValue="cards">
        <TabsList className="grid w-full grid-cols-5 h-auto p-1.5 gap-1.5 rounded-xl bg-muted">
            <TabsTrigger value="cards" className="flex-col h-auto p-2 gap-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg text-xs">
                <CreditCard className="h-5 w-5"/>
                Cards
            </TabsTrigger>
            <TabsTrigger value="deposits" className="flex-col h-auto p-2 gap-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg text-xs">
                <Landmark className="h-5 w-5"/>
                Deposits
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex-col h-auto p-2 gap-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg text-xs">
                <TrendingUp className="h-5 w-5"/>
                Loans
            </TabsTrigger>
            <TabsTrigger value="funds" className="flex-col h-auto p-2 gap-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg text-xs">
                <Wallet className="h-5 w-5"/>
                Funds
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex-col h-auto p-2 gap-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-lg text-xs">
                <Wallet className="h-5 w-5"/>
                Crypto
            </TabsTrigger>
        </TabsList>
        <TabsContent value="cards" className="mt-4">
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {cards.map((card, index) => (
                        <CarouselItem key={index}><PaymentCard {...card} /></CarouselItem>
                    ))}
                    <CarouselItem>
                        <Dialog>
                        <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add New Card" /></div></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Manage Payment Cards</DialogTitle><DialogDescription>Add or remove your debit/credit cards.</DialogDescription></DialogHeader>
                            <ManageCardsDialog />
                        </DialogContent>
                        </Dialog>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </TabsContent>
        <TabsContent value="deposits" className="mt-4">
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {deposits.map((deposit, index) => (
                        <CarouselItem key={index}><DepositCard {...deposit} /></CarouselItem>
                    ))}
                    <CarouselItem>
                        <Dialog>
                        <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add New Deposit" /></div></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add New Deposit</DialogTitle><DialogDescription>Create a new fixed or recurring deposit.</DialogDescription></DialogHeader>
                            <ManageDepositsDialog />
                        </DialogContent>
                        </Dialog>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </TabsContent>
        <TabsContent value="loans" className="mt-4">
             <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {loans.map((loan, index) => (
                        <CarouselItem key={index}><LoanCard {...loan} /></CarouselItem>
                    ))}
                    <CarouselItem>
                        <Dialog>
                        <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Apply for Loan" /></div></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Apply for New Loan</DialogTitle><DialogDescription>Submit an application for a new personal or business loan.</DialogDescription></DialogHeader>
                            <ManageLoansDialog />
                        </DialogContent>
                        </Dialog>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </TabsContent>
        <TabsContent value="funds" className="mt-4">
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {funds.map((fund, index) => (
                        <CarouselItem key={index}><FundCard {...fund} /></CarouselItem>
                    ))}
                    <CarouselItem>
                        <Dialog>
                        <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add New Investment" /></div></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add New Fund Investment</DialogTitle><DialogDescription>Invest in a new mutual fund.</DialogDescription></DialogHeader>
                            <ManageFundsDialog />
                        </DialogContent>
                        </Dialog>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </TabsContent>
        <TabsContent value="crypto" className="mt-4">
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {crypto.map((cred, index) => (
                        <CarouselItem key={index}><CryptoCredentialCard {...cred} /></CarouselItem>
                    ))}
                    <CarouselItem>
                        <Dialog>
                        <DialogTrigger asChild><div className="h-full"><AddAccountCard text="Add Crypto Wallet" /></div></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add Crypto Wallet</DialogTitle><DialogDescription>Add a new crypto wallet to your identity.</DialogDescription></DialogHeader>
                            <ManageCryptoCredentialsDialog />
                        </DialogContent>
                        </Dialog>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </TabsContent>
      </Tabs>


      <TransactionList />
    </div>
  );
}
