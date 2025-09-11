
"use client";

import { ArrowUpCircle, ArrowDownCircle, Landmark, Nfc, ChevronRight, Scan } from "lucide-react";
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
        return <SendPaymentView onBack={() => setView('main')} />;
      case 'receive':
        return <ReceivePaymentView onBack={() => setView('main')} />;
      case 'scan':
        return <ScanToPayView onBack={() => setView('main')} />;
      default:
        return (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-bold font-headline">Payments</h1>
              <p className="text-muted-foreground">Send and receive money securely.</p>
            </div>

            <Card 
              className="bg-gradient-to-br from-primary via-primary to-purple-600 text-primary-foreground cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setView('scan')}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-foreground/20 p-2 rounded-lg">
                            <Scan className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                            <p className="font-bold text-lg">Scan to Pay</p>
                        </div>
                    </div>
                    <ChevronRight className="h-6 w-6 text-primary-foreground/50" />
                </div>
              </CardContent>
            </Card>
            
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
                          <p className="font-semibold">Receive Payment</p>
                          <p className="text-sm text-muted-foreground">Request to pay</p>
                      </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

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
                    <p className="text-xs text-muted-foreground text-center pt-2">
                        Bank-calculated FX rates apply to all incoming and outgoing transfers.
                    </p>
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
