
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Banknote, Landmark, Percent } from "lucide-react";

interface AccountCarouselCardProps {
    currency: string;
    accountType: string;
    balance: string;
    fees: string;
    gradient: string;
}

export default function AccountCarouselCard({ currency, accountType, balance, fees, gradient }: AccountCarouselCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <span className="font-headline text-md">{currency} Account</span>
          <Landmark className="h-7 w-7 opacity-70" />
        </div>
        <div className="mt-4 mb-3">
            <p className="text-xs opacity-80">{accountType}</p>
            <p className="text-2xl font-bold font-headline">{balance}</p>
        </div>
        <div className="flex justify-between items-center text-xs opacity-90 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5">
                <Banknote className="h-4 w-4" />
                <span>Fees: ${fees}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
