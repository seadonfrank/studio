
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getCategory } from "@/app/actions";
import { Utensils, Plane, Film, ShoppingCart, Fuel, HandCoins, Home, HeartPulse, MoreHorizontal } from "lucide-react";
import { format } from 'date-fns';

type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
};

const categoryIcons: { [key: string]: React.ElementType } = {
    food: Utensils,
    travel: Plane,
    entertainment: Film,
    shopping: ShoppingCart,
    transportation: Fuel,
    salary: HandCoins,
    rent: Home,
    utilities: Home,
    health: HeartPulse,
    other: MoreHorizontal
};

export default function TransactionItem({ transaction }: { transaction: Transaction }) {
  const [category, setCategory] = useState<string | null>(null);
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategory() {
      if (transaction.description) {
        const cat = await getCategory({
          transactionDescription: transaction.description,
          transactionAmount: transaction.amount,
        });
        setCategory(cat);
      }
    }
    fetchCategory();
  }, [transaction]);

  useEffect(() => {
    setFormattedDate(format(new Date(transaction.date), "PPp"));
  }, [transaction.date]);

  const isIncome = transaction.amount > 0;
  const CategoryIcon = category ? (categoryIcons[category.toLowerCase()] || MoreHorizontal) : MoreHorizontal;

  return (
    <div className="flex items-center gap-4">
      <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          isIncome ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
      )}>
        <CategoryIcon className="h-5 w-5" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold truncate">{transaction.description}</p>
        <p className="text-xs text-muted-foreground">{formattedDate || ' '}</p>
      </div>
      <div className={cn("text-right font-semibold", isIncome ? "text-primary" : "text-destructive")}>
        {isIncome ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  );
}
