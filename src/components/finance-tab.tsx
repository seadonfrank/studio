
"use client";

import { ArrowDown, ArrowUp, Landmark, PiggyBank, LineChart, Repeat, Gift, Trophy, TrendingUp, History, CreditCard, Wallet, Banknote, AreaChart, PlusCircle, User, ChevronDown, Plus, BarChart2 } from "lucide-react";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function FinanceTab() {
  const accounts = [
    { currency: "USD", balance: "1,250.00", type: "primary" as const, gradient: "from-blue-500 to-indigo-500" },
    { currency: "EUR", balance: "800.00", type: "secondary" as const, gradient: "from-green-500 to-emerald-500" },
    { currency: "GBP", balance: "500.00", type: "secondary" as const, gradient: "from-purple-500 to-violet-500" },
  ];
  
  return (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Total balance</p>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <h2 className="text-3xl font-headline font-bold">17.39 EUR</h2>
            </div>
            <Button variant="ghost" size="icon">
              <BarChart2 className="h-6 w-6" />
            </Button>
        </div>
      </div>
      
      <div className="flex justify-start gap-2">
          <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full h-9 px-4"><ArrowUp className="mr-1 h-4 w-4"/> Send</Button>
          <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full h-9 px-4"><Plus className="mr-1 h-4 w-4"/> Add money</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 rounded-full h-9 px-4">
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

      <TransactionList />
    </div>
  );
}
