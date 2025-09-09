
import { Wifi, Zap, Droplets, Shield, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { format } from 'date-fns';

type BillCategory = 'internet' | 'electricity' | 'water' | 'insurance' | 'other';

interface BillPaymentItemProps {
    billerName: string;
    dueDate: string;
    amount: string;
    category: BillCategory;
}

const categoryIcons: { [key in BillCategory]: React.ElementType } = {
    internet: Wifi,
    electricity: Zap,
    water: Droplets,
    insurance: Shield,
    other: MoreHorizontal
};

export default function BillPaymentItem({ billerName, dueDate, amount, category }: BillPaymentItemProps) {
  const Icon = categoryIcons[category] || MoreHorizontal;
  return (
    <Card className="h-full flex flex-col items-center justify-center p-3 text-center cursor-pointer hover:bg-muted/50 transition-colors min-h-[164px]">
        <div className="flex items-center justify-center rounded-full bg-primary/10 mb-2 h-12 w-12 text-primary">
            <Icon className="h-6 w-6" />
        </div>
        <p className="font-semibold text-sm truncate">{billerName}</p>
        <p className="text-xs text-muted-foreground">Due {format(new Date(dueDate), "MMM d")}</p>
        <p className="font-mono text-sm mt-1">{amount}</p>
        <p className="text-xs text-primary font-medium mt-2 cursor-pointer hover:underline">Pay Now</p>
    </Card>
  );
}
