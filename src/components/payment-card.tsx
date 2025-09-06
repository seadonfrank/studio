
import { CreditCard } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface PaymentCardProps {
    cardType: string;
    balance: string;
    cardNumber: string;
    gradient: string;
    limit?: string;
}

export default function PaymentCard({ cardType, balance, cardNumber, gradient, limit }: PaymentCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br min-h-[178px]", gradient)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <span className="font-headline text-lg">{cardType}</span>
          <CreditCard className="h-8 w-8 opacity-70" />
        </div>
        <div className="mt-8 mb-4">
          <p className="text-sm opacity-80">{limit ? "Available Credit" : "Available Balance"}</p>
          <p className="text-3xl font-bold font-headline">{balance}</p>
          {limit && <p className="text-xs opacity-80">Limit: {limit}</p>}
        </div>
        <div className="flex justify-between items-center">
          <p className="font-mono text-sm tracking-widest opacity-90">**** **** **** {cardNumber}</p>
          <span className="font-headline text-md">xIDFI Pay</span>
        </div>
      </CardContent>
    </Card>
  );
}
