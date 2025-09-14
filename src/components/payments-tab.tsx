
"use client";

import { ArrowUpCircle, ArrowDownCircle, Landmark, Nfc, ChevronRight, Scan, Plus, QrCode, BarChart2, Eye, ArrowUp, ChevronDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "./ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import BillPaymentItem from "./bill-payment-item";
import AddAccountCard from "./add-account-card";
import ManageBillersDialog from "./manage-billers-dialog";
import { useState } from "react";
import SendPaymentView from "./send-payment-view";
import ReceivePaymentView from "./receive-payment-view";
import ScanToPayView from "./scan-to-pay-view";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import QrForPayView from "./qr-for-pay-view";
import TransactionList from "./transaction-list";
import AccountCard from "./account-card";
import ManageAccountsDialog from "./manage-accounts-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function PaymentsTab() {
  const [view, setView] = useState<'main' | 'send' | 'receive' | 'scan' | 'qr'>('main');

  const accounts = [
    { currency: "USD", balance: "1,250.00", type: "primary" as const, gradient: "from-blue-500 to-indigo-500" },
    { currency: "EUR", balance: "800.00", type: "secondary" as const, gradient: "from-green-500 to-emerald-500" },
    { currency: "GBP", balance: "500.00", type: "secondary" as const, gradient: "from-purple-500 to-violet-500" },
  ];

  const bills = [
    { billerName: "ATT", dueDate: "2024-08-01", amount: "$75.00", category: "internet" as const },
    { billerName: "PG&E", dueDate: "2024-08-05", amount: "$120.00", category: "electricity" as const },
    { billerName: "City Water", dueDate: "2024-08-10", amount: "$45.00", category: "water" as const },
    { billerName: "State Farm", dueDate: "2024-08-15", amount: "$150.00", category: "insurance" as const },
  ];

  const renderContent = () => {
    switch(view) {
      case 'send':
        return <SendPaymentView onBack={() => setView('main')} />;
      case 'receive':
        return <ReceivePaymentView onBack={() => setView('main')} />;
      case 'scan':
        return <ScanToPayView onBack={() => setView('main')} />;
      case 'qr':
        return <QrForPayView onBack={() => setView('main')} />;
      default:
        return (
          <>
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
                <Button onClick={() => setView('scan')} size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full h-9 px-4"><Scan className="mr-1 h-4 w-4"/> Scan to Pay</Button>
                <Button onClick={() => setView('qr')} size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full h-9 px-4"><QrCode className="mr-1 h-4 w-4"/> QR for Pay</Button>
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
            
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setView('send')}>
                  <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                          <ArrowUpCircle className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="font-semibold">Send Payment</p>
                          <p className="text-sm text-muted-foreground">Pay for anything</p>
                      </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setView('receive')}>
                  <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                          <ArrowDownCircle className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="font-semibold">Request Payment</p>
                          <p className="text-sm text-muted-foreground">Request to pay</p>
                      </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-lg font-headline font-semibold mb-3">Beneficiaries</h2>
              <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                  {['AB', 'CD', 'EF', 'GH', 'IJ'].map((p, i) => (
                      <div key={i} className="flex flex-col items-center space-y-1.5 flex-shrink-0 w-16 text-center">
                          <Avatar className="h-14 w-14">
                              <AvatarImage src={`https://picsum.photos/id/${100+i}/200/200`} data-ai-hint="person portrait" />
                              <AvatarFallback>{p}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium truncate">Friend {i+1}</span>
                      </div>
                  ))}
                  <div className="flex flex-col items-center space-y-1.5 flex-shrink-0 w-16 text-center cursor-pointer">
                      <Avatar className="h-14 w-14 bg-secondary flex items-center justify-center">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                      </Avatar>
                      <span className="text-xs font-medium truncate">Add New</span>
                  </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-headline font-semibold mb-3">Bill Payments</h2>
              <Carousel
                opts={{
                  align: "start",
                  dragFree: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {bills.map((bill, index) => (
                    <CarouselItem key={index} className="basis-1/3">
                      <BillPaymentItem {...bill} />
                    </CarouselItem>
                  ))}
                  <CarouselItem className="basis-1/3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="h-full">
                            <AddAccountCard text="Add Biller" />
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Biller</DialogTitle>
                            <DialogDescription>
                              Configure a new biller to make easy payments.
                            </DialogDescription>
                          </DialogHeader>
                          <ManageBillersDialog />
                        </DialogContent>
                      </Dialog>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
            <TransactionList />
          </>
        );
    }
  };

  return (
    <div className="p-4 space-y-6">
      {renderContent()}
    </div>
  );
}
