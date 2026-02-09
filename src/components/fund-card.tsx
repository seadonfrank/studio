
import { Card, CardContent } from "./ui/card";
import { TrendingUp, Calendar, PiggyBank } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FundCardProps {
    currency: string;
    fundBalance: string;
    pnlAmount: string;
    pnlPercentage: string;
    investedAmount: string;
    startDate: string;
    gradient: string;
}

export default function FundCard({ currency, fundBalance, pnlAmount, pnlPercentage, investedAmount, startDate, gradient }: FundCardProps) {
  const isProfit = parseFloat(pnlAmount) >= 0 || pnlAmount.includes('+');

  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-md border-none bg-gradient-to-br transition-all hover:scale-[1.01]", gradient)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Mutual Fund &bull; Invested {investedAmount}</span>
            <p className="text-base font-bold font-headline leading-tight">{currency} Portfolio</p>
          </div>
          <TrendingUp className="h-5 w-5 opacity-70" />
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] opacity-90 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <span>{fundBalance}</span>
          </div>
          <div className={cn("flex items-center gap-1.5 justify-end font-bold", isProfit ? "text-green-300" : "text-red-300")}>
            <span>{pnlAmount} ({pnlPercentage}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
