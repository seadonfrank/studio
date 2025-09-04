import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import TransactionItem from "./transaction-item";

const transactions = [
  { id: 1, description: "Starbucks Coffee", amount: -5.75, date: "2024-07-22" },
  { id: 2, description: "Monthly Salary", amount: 3500.00, date: "2024-07-21" },
  { id: 3, description: "Netflix Subscription", amount: -15.99, date: "2024-07-20" },
  { id: 4, description: "Gas Station", amount: -45.30, date: "2024-07-20" },
  { id: 5, description: "Whole Foods Groceries", amount: -120.50, date: "2024-07-19" },
  { id: 6, description: "Flight to NYC", amount: -345.00, date: "2024-07-18" },
];

export default function TransactionList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities, categorized by AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
