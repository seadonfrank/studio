
"use client";

import { ArrowLeft, User, QrCode, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

interface SendPaymentViewProps {
  onBack: () => void;
}

export default function SendPaymentView({ onBack }: SendPaymentViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft />
            </Button>
            <h2 className="text-xl font-bold font-headline">Send Payment</h2>
        </div>
      </div>

      <div className="flex-grow mt-6 space-y-6">
        <div>
          <h3 className="text-lg font-headline font-semibold mb-3">Beneficiaries</h3>
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

        <Separator />

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">From</Label>
            <Select>
                <SelectTrigger id="fromAccount">
                    <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="cash">Cash Balance - $1,234.56</SelectItem>
                    <SelectItem value="card1">Debit Card **** 5678</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientId">To</Label>
            <div className="relative flex items-center">
              <Input id="recipientId" placeholder="did:xidfi:... or 0x..." className="pr-10" />
              <Button variant="ghost" size="icon" className="absolute right-1 h-8 w-8">
                <User className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="flex gap-2">
                <Input id="amount" type="number" placeholder="0.00" className="flex-grow" />
                <Select defaultValue="USD">
                    <SelectTrigger className="w-[120px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="BTC">BTC</SelectItem>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="SOL">SOL</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
          <Card className="bg-muted/50">
            <CardContent className="text-sm p-4 space-y-2">
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee:</span>
                    <span>$0.50</span>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>$0.50</span>
                </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input id="note" placeholder="For dinner last night" />
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Button className="w-full">Review & Send</Button>
      </div>
    </div>
  );
}
