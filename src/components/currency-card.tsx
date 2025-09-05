
import { Banknote, CreditCard } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface CurrencyCardProps {
    currency: string;
    symbol: string;
    balance: string;
    cardNumber: string;
    gradient: string;
}

export default function CurrencyCard({ currency, symbol, balance, cardNumber, gradient }: CurrencyCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <span className="font-headline text-lg">xIDFI Pay ({currency})</span>
          <Banknote className="h-8 w-8 opacity-70" />
        </div>
        <div className="mt-8 mb-4">
          <p className="text-sm opacity-80">Available Balance</p>
          <p className="text-3xl font-bold font-headline">{symbol}{balance}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-mono text-sm tracking-widest opacity-90">**** **** **** {cardNumber}</p>
          <CreditCard className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
