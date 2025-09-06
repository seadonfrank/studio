import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Landmark, Calendar, Percent, Hash, Repeat, Wallet } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LoanCardProps {
    currency: string;
    loanAmount: string;
    outstandingAmount: string;
    interestRate: string;
    interestType: string;
    tenure: string;
    installments: string;
    emi: string;
    disbursedDate: string;
    gradient: string;
}

export default function LoanCard({ currency, loanAmount, outstandingAmount, interestRate, interestType, tenure, installments, emi, disbursedDate, gradient }: LoanCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <CardTitle className="font-headline text-md">Loan ({currency})</CardTitle>
        <Landmark className="h-7 w-7 opacity-70" />
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-80">Loan Amount</p>
            <p className="text-lg font-bold font-headline">{loanAmount}</p>
          </div>
          <div>
            <p className="text-xs opacity-80">Outstanding</p>
            <p className="text-lg font-bold font-headline">{outstandingAmount}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs opacity-90 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5">
                <Percent className="h-3 w-3" />
                <span>{interestRate}% ({interestType})</span>
            </div>
             <div className="flex items-center gap-1.5">
                <Wallet className="h-3 w-3" />
                <span>EMI: {emi}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Repeat className="h-3 w-3" />
                <span>{tenure}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                <span>{installments}</span>
            </div>
        </div>
        <div className="flex justify-start items-center text-[10px] opacity-80 pt-2">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Disbursed: {format(new Date(disbursedDate), "MMM d, yyyy")}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
