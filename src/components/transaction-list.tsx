
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TransactionItem from "./transaction-item";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

const transactions = [
  { id: 1, description: "Starbucks Coffee", amount: -5.75, date: "2024-07-22T08:30:00.000Z" },
  { id: 2, description: "Monthly Salary", amount: 3500.00, date: "2024-07-21T10:00:00.000Z" },
  { id: 3, description: "Netflix Subscription", amount: -15.99, date: "2024-07-20T18:00:00.000Z" },
  { id: 4, description: "Gas Station", amount: -45.30, date: "2024-07-20T12:45:00.000Z" },
  { id: 5, description: "Whole Foods Groceries", amount: -120.50, date: "2024-07-19T17:20:00.000Z" },
  { id: 6, description: "Flight to NYC", amount: -345.00, date: "2024-07-18T14:00:00.000Z" },
];

const categories = ["all", "food", "transportation", "entertainment", "utilities", "rent", "salary", "shopping", "travel", "health", "other"];

export default function TransactionList() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState("all");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredTransactions =
    filterCategory === "all"
      ? sortedTransactions
      : sortedTransactions.filter(
          (tx) => tx.description.toLowerCase().includes(filterCategory) // A simple filter logic
        );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline">Recent Transactions</CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleSortOrder}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 pt-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
