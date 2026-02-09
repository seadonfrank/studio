
import { CreditCard, MoreHorizontal } from "lucide-react";
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
    <Card className={cn("overflow-hidden text-primary-foreground shadow-md border-none bg-gradient-to-br transition-all hover:scale-[1.01]", gradient)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{cardType}</span>
            <p className="text-base font-bold font-headline leading-tight">**** **** **** {cardNumber}</p>
          </div>
          <CreditCard className="h-5 w-5 opacity-70" />
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] opacity-90 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <span>{balance}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end text-[10px] opacity-70">
            <span>{limit ? `Limit: ${limit}` : 'Available'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
