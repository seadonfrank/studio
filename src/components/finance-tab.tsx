
"use client";

import { ArrowDown, ArrowUp, Landmark, PiggyBank, LineChart, Repeat, Gift, Trophy, TrendingUp, History, CreditCard, Wallet, Banknote, AreaChart, PlusCircle, User } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import LoanCard from "./loan-card";
import ManageLoansDialog from "./manage-loans-dialog";
import FundCard from "./fund-card";
import ManageFundsDialog from "./manage-funds-dialog";
import CryptoCredentialCard from "./crypto-credential-card";
import ManageCryptoCredentialsDialog from "./manage-crypto-credentials-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig } from "@/components/ui/chart"
import AccountCard from "./account-card";
import ConvertBalanceDialog from "./convert-balance-dialog";
import CloseBalanceDialog from "./close-balance-dialog";
import AddBalanceDialog from "./add-balance-dialog";

export default function FinanceTab() {
  const accounts = [
    { currency: "USD", balance: "1,250.00", type: "primary" as const, gradient: "from-blue-500 to-indigo-500" },
    { currency: "EUR", balance: "800.00", type: "secondary" as const, gradient: "from-green-500 to-emerald-500" },
    { currency: "GBP", balance: "500.00", type: "secondary" as const, gradient: "from-purple-500 to-violet-500" },
  ];
  
  const cards = [
    { cardType: "Credit Card", cardNumber: "1234", balance: "$2,500.00", limit: "$10,000", gradient: "from-primary via-purple-500 to-fuchsia-600" },
    { cardType: "Debit Card", cardNumber: "5678", balance: "$8,230.45", gradient: "from-blue-500 via-sky-500 to-cyan-400" },
    { cardType: "Prepaid Card", cardNumber: "9012", balance: "$500.00", gradient: "from-amber-500 via-orange-500 to-yellow-400" },
  ];

  const deposits = [
    { currency: "USD", principalAmount: "$10,000", maturityAmount: "$10,500", interestRate: "5.00", tenure: "1 Year", startDate: "2023-08-01", endDate: "2024-08-01", gradient: "from-green-500 to-emerald-500" },
    { currency: "EUR", principalAmount: "€5,000", maturityAmount: "€5,200", interestRate: "4.00", tenure: "1 Year", startDate: "2023-09-15", endDate: "2024-09-15", gradient: "from-teal-500 to-cyan-500" },
  ];

  const loans = [
    { currency: "USD", loanAmount: "$25,000", outstandingAmount: "$18,500", interestRate: "7.5", interestType: "Fixed", tenure: "5 Years", installments: "30 of 60", emi: "$500", disbursedDate: "2022-01-10", gradient: "from-rose-500 to-pink-500" },
    { currency: "CAD", loanAmount: "$5,000", outstandingAmount: "$2,100", interestRate: "9.2", interestType: "Floating", tenure: "2 Years", installments: "10 of 24", emi: "$250", disbursedDate: "2023-05-20", gradient: "from-indigo-500 to-purple-500" },
  ];

  const funds = [
    { currency: "USD", fundBalance: "$12,345", pnlAmount: "+1,234", pnlPercentage: "11.11", investedAmount: "$11,111", sipNumber: "12345", startDate: "2023-01-15", gradient: "from-sky-500 to-indigo-500" },
    { currency: "EUR", fundBalance: "€8,500", pnlAmount: "-250", pnlPercentage: "-2.85", investedAmount: "€8,750", swpNumber: "67890", startDate: "2022-11-01", gradient: "from-lime-500 to-green-500" },
  ];

  const cryptoCredentials = [
    { walletName: "My ETH Wallet", asset: "ETH", balance: "1.25", network: "Ethereum", walletAddress: "0x123...abc", gradient: "from-gray-700 to-gray-900", status: "active" as const },
    { walletName: "Bitcoin Savings", asset: "BTC", balance: "0.05", network: "Bitcoin", walletAddress: "1A1z...xyz", gradient: "from-amber-500 to-yellow-600", status: "active" as const },
  ];

  const chartData = [
    { month: "Jan", balance: 18600 },
    { month: "Feb", balance: 30500 },
    { month: "Mar", balance: 23700 },
    { month: "Apr", balance: 27800 },
    { month: "May", balance: 18900 },
    { month: "Jun", balance: 23900 },
  ]
  const chartConfig = {
    balance: {
      label: "Balance",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig

  return (
    <div className="space-y-6 p-4">
      <Card>
          <CardHeader>
            <CardDescription>Total Balance</CardDescription>
            <CardTitle className="font-headline text-3xl">$32,845.56</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <ChartContainer config={chartConfig} className="h-20 w-full">
              <AreaChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-balance)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#fillBalance)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardContent className="flex justify-center gap-2 pt-4">
              <Button size="sm"><ArrowUp className="mr-1 h-4 w-4"/> Send</Button>
              <Button size="sm" variant="secondary"><ArrowDown className="mr-1 h-4 w-4"/> Receive</Button>
              <Button size="sm" variant="secondary"><PlusCircle className="mr-1 h-4 w-4"/> Add Money</Button>
          </CardContent>
      </Card>
      

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto">
          <TabsTrigger value="accounts" className="flex-col h-auto p-2 gap-1"><User className="h-5 w-5"/> <span className="text-xs">Accounts</span></TabsTrigger>
          <TabsTrigger value="cards" className="flex-col h-auto p-2 gap-1"><CreditCard className="h-5 w-5"/> <span className="text-xs">Cards</span></TabsTrigger>
          <TabsTrigger value="deposits" className="flex-col h-auto p-2 gap-1"><Landmark className="h-5 w-5"/> <span className="text-xs">Deposits</span></TabsTrigger>
          <TabsTrigger value="loans" className="flex-col h-auto p-2 gap-1"><Banknote className="h-5 w-5"/> <span className="text-xs">Loans</span></TabsTrigger>
          <TabsTrigger value="funds" className="flex-col h-auto p-2 gap-1"><TrendingUp className="h-5 w-5"/> <span className="text-xs">Funds</span></TabsTrigger>
          <TabsTrigger value="crypto" className="flex-col h-auto p-2 gap-1"><Wallet className="h-5 w-5"/> <span className="text-xs">Crypto</span></TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="mt-4">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {accounts.map((account, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <div className="w-[300px]">
                    <AccountCard {...account} />
                  </div>
                </CarouselItem>
              ))}
              <CarouselItem className="basis-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="w-[300px] h-full">
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
        </TabsContent>
        
        <TabsContent value="cards" className="mt-4 space-y-4">
          {cards.map((card, index) => (
            <PaymentCard key={index} {...card} />
          ))}
          <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Card
                </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Card</DialogTitle>
                <DialogDescription>
                  Enter details for your new payment card.
                </DialogDescription>
              </DialogHeader>
              <ManageCardsDialog />
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="deposits" className="mt-4 space-y-4">
            {deposits.map((deposit, index) => (
                <DepositCard key={index} {...deposit} />
            ))}
            <Dialog>
                <DialogTrigger asChild>
                     <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Deposit
                    </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Deposit</DialogTitle>
                    <DialogDescription>
                    Enter details for your new fixed-term deposit.
                    </DialogDescription>
                </DialogHeader>
                <ManageDepositsDialog />
                </DialogContent>
            </Dialog>
        </TabsContent>

        <TabsContent value="loans" className="mt-4 space-y-4">
            {loans.map((loan, index) => (
                <LoanCard key={index} {...loan} />
            ))}
            <Dialog>
                <DialogTrigger asChild>
                     <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Apply for Loan
                    </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply for a New Loan</DialogTitle>
                    <DialogDescription>
                    Enter the details for your new loan application.
                    </DialogDescription>
                </DialogHeader>
                <ManageLoansDialog />
                </DialogContent>
            </Dialog>
        </TabsContent>
        
        <TabsContent value="funds" className="mt-4 space-y-4">
            {funds.map((fund, index) => (
                <FundCard key={index} {...fund} />
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Investment
                    </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Investment</DialogTitle>
                    <DialogDescription>
                    Enter the details for your new mutual fund investment.
                    </DialogDescription>
                </DialogHeader>
                <ManageFundsDialog />
                </DialogContent>
            </Dialog>
        </TabsContent>
        
        <TabsContent value="crypto" className="mt-4 space-y-4">
            {cryptoCredentials.map((cred, index) => (
                <CryptoCredentialCard key={index} {...cred} />
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Wallet
                    </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Crypto Wallet</DialogTitle>
                    <DialogDescription>
                    Add details for a new cryptocurrency wallet.
                    </DialogDescription>
                </DialogHeader>
                <ManageCryptoCredentialsDialog />
                </DialogContent>
            </Dialog>
        </TabsContent>

      </Tabs>

      <TransactionList />
    </div>
  );
}
