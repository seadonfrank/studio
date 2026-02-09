
import { Card, CardContent } from "./ui/card";
import { Calendar, Percent, Landmark } from "lucide-react";
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
    <Card className={cn("overflow-hidden text-primary-foreground shadow-md border-none bg-gradient-to-br transition-all hover:scale-[1.01]", gradient)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Fixed Deposit &bull; {tenure}</span>
            <p className="text-base font-bold font-headline leading-tight">{currency} Deposit</p>
          </div>
          <Landmark className="h-5 w-5 opacity-70" />
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] opacity-90 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <span>{principalAmount}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end text-[10px] opacity-70">
            <Percent className="h-3 w-3" />
            <span>{interestRate}% p.a.</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 text-[10px] opacity-70">
            <Calendar className="h-3 w-3" />
            <span>Matures: {format(new Date(endDate), "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
