
"use client";

import { ArrowUpCircle, ArrowDownCircle, Landmark, Nfc, ChevronRight } from "lucide-react";
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

export default function PaymentsTab() {
  const [view, setView] = useState<'main' | 'send' | 'receive' | 'scan'>('main');

  const bills = [
    { billerName: "ATT", dueDate: "2024-08-01", amount: "$75.00", category: "internet" as const },
    { billerName: "PG&E", dueDate: "2024-08-05", amount: "$120.00", category: "electricity" as const },
    { billerName: "City Water", dueDate: "2024-08-10", amount: "$45.00", category: "water" as const },
    { billerName: "State Farm", dueDate: "2024-08-15", amount: "$150.00", category: "insurance" as const },
  ];

  const renderContent = () => {
    switch(view) {
      case 'send':
        return <SendPaymentView onBack={() => setView('main')} onScan={() => setView('scan')} />;
      case 'receive':
        return <ReceivePaymentView onBack={() => setView('main')} />;
      case 'scan':
        return <ScanToPayView onBack={() => setView('send')} />;
      default:
        return (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold font-headline">Payments</h1>
              <p className="text-muted-foreground">Send and receive money securely.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => setView('send')}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <ArrowUpCircle className="h-10 w-10 text-primary" />
                  <div>
                    <CardTitle className="font-headline">Send Payment</CardTitle>
                    <CardDescription>Send money to a friend.</CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => setView('receive')}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <ArrowDownCircle className="h-10 w-10 text-primary" />
                  <div>
                    <CardTitle className="font-headline">Receive Payment</CardTitle>
                    <CardDescription>Request money or share your ID.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Payment Defaults</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-10 w-10 bg-secondary rounded-lg">
                                <Landmark className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Receiving Account</p>
                                <p className="text-xs text-muted-foreground">Bank of America ••••1234</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-10 w-10 bg-secondary rounded-lg">
                                <Nfc className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div>
                                <p className="font-medium text-sm">Tap & Pay</p>
                                <p className="text-xs text-muted-foreground">Visa Debit ••••5678</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
            
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
