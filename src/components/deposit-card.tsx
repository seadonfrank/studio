import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Banknote, Calendar, Percent, Landmark } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DepositCardProps {
    currency: string;
    principalAmount: string;
    maturityAmount: string;
    interestRate: string;
    tenure: string;
    startDate: string;
    endDate: string;
    gradient: string;
}

export default function DepositCard({ currency, principalAmount, maturityAmount, interestRate, tenure, startDate, endDate, gradient }: DepositCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <CardTitle className="font-headline text-md">Deposit ({currency})</CardTitle>
        <Landmark className="h-7 w-7 opacity-70" />
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-80">Principal</p>
            <p className="text-lg font-bold font-headline">{principalAmount}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Maturity</p>
            <p className="text-lg font-bold font-headline">{maturityAmount}</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs opacity-90 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5">
                <Percent className="h-3 w-3" />
                <span>{interestRate}% p.a.</span>
            </div>
            <span>{tenure}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] opacity-80">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Start: {format(new Date(startDate), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>End: {format(new Date(endDate), "MMM d, yyyy")}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
