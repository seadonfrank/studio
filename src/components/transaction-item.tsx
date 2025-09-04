"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getCategory } from "@/app/actions";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Utensils, Plane, Film, ShoppingCart, Fuel, HandCoins, Home, HeartPulse, MoreHorizontal } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      if (transaction.description) {
        setIsLoading(true);
        const cat = await getCategory({
          transactionDescription: transaction.description,
          transactionAmount: transaction.amount,
        });
        setCategory(cat);
        setIsLoading(false);
      }
    }
    fetchCategory();
  }, [transaction]);

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
        <div className="text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-5 w-20 mt-1" />
          ) : (
            <Badge variant="secondary" className="capitalize">{category}</Badge>
          )}
        </div>
      </div>
      <div className={cn("text-right font-semibold", isIncome ? "text-primary" : "text-destructive")}>
        {isIncome ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  );
}
