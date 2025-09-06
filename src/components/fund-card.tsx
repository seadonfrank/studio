import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, Calendar, PiggyBank, Repeat, FileStack, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FundCardProps {
    currency: string;
    fundBalance: string;
    pnlAmount: string;
    pnlPercentage: string;
    investedAmount: string;
    sipNumber?: string;
    swpNumber?: string;
    startDate: string;
    gradient: string;
}

export default function FundCard({ currency, fundBalance, pnlAmount, pnlPercentage, investedAmount, sipNumber, swpNumber, startDate, gradient }: FundCardProps) {
  const isProfit = parseFloat(pnlAmount) >= 0;

  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <CardTitle className="font-headline text-md">Fund ({currency})</CardTitle>
        <TrendingUp className="h-7 w-7 opacity-70" />
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-80">Fund Balance</p>
            <p className="text-lg font-bold font-headline">{fundBalance}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">P&L</p>
            <p className={cn("text-lg font-bold font-headline", isProfit ? "text-green-300" : "text-red-300")}>
                {pnlAmount} ({pnlPercentage}%)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs opacity-90 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5">
                <PiggyBank className="h-3 w-3" />
                <span>Invested: {investedAmount}</span>
            </div>
             {sipNumber && (
                <div className="flex items-center gap-1.5">
                    <Repeat className="h-3 w-3" />
                    <span>SIP: {sipNumber}</span>
                </div>
            )}
            {swpNumber && (
                <div className="flex items-center gap-1.5">
                    <FileStack className="h-3 w-3" />
                    <span>SWP: {swpNumber}</span>
                </div>
            )}
        </div>
        <div className="flex justify-start items-center text-[10px] opacity-80 pt-2">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Start Date: {format(new Date(startDate), "MMM d, yyyy")}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
