
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getCategory } from "@/app/actions";
import { Utensils, Plane, Film, ShoppingCart, Fuel, HandCoins, Home, HeartPulse, MoreHorizontal, FileText } from "lucide-react";
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
    other: FileText
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
    setFormattedDate(format(new Date(transaction.date), "d MMM"));
  }, [transaction.date]);

  const isIncome = transaction.amount > 0;
  const CategoryIcon = category ? (categoryIcons[category.toLowerCase()] || FileText) : FileText;

  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold truncate">{transaction.description}</p>
        <p className="text-sm text-muted-foreground">{formattedDate || ' '}</p>
      </div>
      <div className={cn("text-right font-semibold", isIncome ? "text-primary" : "text-foreground")}>
        {isIncome ? "+" : ""}{transaction.amount.toFixed(2)} {isIncome ? "EUR" : "USD"}
      </div>
    </div>
  );
}
