
"use client";

import { useState } from "react";
import TransactionItem from "./transaction-item";
import { Button } from "./ui/button";

const transactions = [
  { id: 1, description: "Starbucks Coffee", amount: -5.75, date: "2024-07-22T08:30:00.000Z" },
  { id: 2, description: "Monthly Salary", amount: 3500.00, date: "2024-07-21T10:00:00.000Z" },
  { id: 3, description: "Netflix Subscription", amount: -15.99, date: "2024-07-20T18:00:00.000Z" },
  { id: 4, description: "Gas Station", amount: -45.30, date: "2024-07-20T12:45:00.000Z" },
  { id: 5, description: "Whole Foods Groceries", amount: -120.50, date: "2024-07-19T17:20:00.000Z" },
  { id: 6, description: "Flight to NYC", amount: -345.00, date: "2024-07-18T14:00:00.000Z" },
];

export default function TransactionList() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - a.date;
  });

  return (
    <div>
      <div className="space-y-4">
        {sortedTransactions.map((tx) => (
          <TransactionItem key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
}
