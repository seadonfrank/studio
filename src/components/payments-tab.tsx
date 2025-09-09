
"use client";

import { ArrowUpCircle, ArrowDownCircle, QrCode, User, DollarSign, NotebookPen } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import BillPaymentItem from "./bill-payment-item";
import AddAccountCard from "./add-account-card";
import ManageBillersDialog from "./manage-billers-dialog";

export default function PaymentsTab() {
   const bills = [
    { billerName: "ATT", dueDate: "2024-08-01", amount: "$75.00", category: "internet" as const },
    { billerName: "PG&E", dueDate: "2024-08-05", amount: "$120.00", category: "electricity" as const },
    { billerName: "City Water", dueDate: "2024-08-10", amount: "$45.00", category: "water" as const },
    { billerName: "State Farm", dueDate: "2024-08-15", amount: "$150.00", category: "insurance" as const },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold font-headline">Payments</h1>
        <p className="text-muted-foreground">Send and receive money securely.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Send Payment Card */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <ArrowUpCircle className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="font-headline">Send Payment</CardTitle>
                  <CardDescription>Send money to a friend.</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Payment</DialogTitle>
              <DialogDescription>
                Enter the recipient's details and the amount to send.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipientId">Recipient's ID</Label>
                <Input id="recipientId" placeholder="did:xidfi:..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input id="amount" type="number" placeholder="0.00" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Input id="note" placeholder="For dinner last night" />
              </div>
            </div>
            <Button className="w-full">Review & Send</Button>
          </DialogContent>
        </Dialog>

        {/* Receive Payment Card */}
        <Dialog>
          <DialogTrigger asChild>
            <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <ArrowDownCircle className="h-10 w-10 text-primary" />
                <div>
                  <CardTitle className="font-headline">Receive Payment</CardTitle>
                  <CardDescription>Request money or share your ID.</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Receive Payment</DialogTitle>
              <DialogDescription>
                Share your QR code or ID to get paid.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center space-y-4 py-4">
               <div className="p-4 border rounded-lg bg-white">
                 <Image src="https://placehold.co/200x200/png?text=Your\nQR+Code" alt="QR Code" width={200} height={200} data-ai-hint="qr code" />
               </div>
               <div className="text-center">
                <p className="font-semibold">Your xIDFI</p>
                <p className="text-sm font-mono break-all bg-muted p-2 rounded-md text-muted-foreground">did:xidfi:1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d</p>
               </div>
               <Button variant="outline" className="w-full">Copy ID</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

       <div>
        <h2 className="text-lg font-headline font-semibold mb-3">Recent Payees</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
            {['AB', 'CD', 'EF', 'GH', 'IJ'].map((p, i) => (
                <div key={i} className="flex flex-col items-center space-y-1.5 flex-shrink-0">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={`https://picsum.photos/id/${100+i}/200/200`} data-ai-hint="person portrait" />
                        <AvatarFallback>{p}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-center">Friend {i+1}</span>
                </div>
            ))}
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
    </div>
  );
}
