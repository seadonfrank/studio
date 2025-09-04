import { ArrowDown, ArrowUp, Banknote, CreditCard, Landmark, LineChart, PiggyBank, Plus, Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TransactionList from "./transaction-list";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import ManageCardsDialog from "./manage-cards-dialog";

export default function FinanceTab() {
  const financialProducts = [
    { name: "Loans", icon: Landmark, href: "#" },
    { name: "Deposits", icon: PiggyBank, href: "#" },
    { name: "Funds", icon: LineChart, href: "#" },
    { name: "Subscriptions", icon: Repeat, href: "#" },
  ];

  return (
    <div className="space-y-6 p-4">
      <Card className="overflow-hidden bg-gradient-to-br from-primary via-purple-500 to-fuchsia-600 text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <span className="font-headline text-lg">xIDFI Pay</span>
            <Banknote className="h-8 w-8 opacity-70" />
          </div>
          <div className="mt-8 mb-4">
            <p className="text-sm opacity-80">Available Balance</p>
            <p className="text-3xl font-bold font-headline">$12,450.78</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-mono text-sm tracking-widest opacity-90">**** **** **** 1234</p>
            <CreditCard className="h-6 w-6"/>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-col h-auto py-3 gap-1">
              <Plus className="h-5 w-5" />
              <span className="text-xs">Add/Remove</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Manage Payment Cards</DialogTitle>
              <DialogDescription>
                Add a new payment card or remove an existing one.
              </DialogDescription>
            </DialogHeader>
            <ManageCardsDialog />
          </DialogContent>
        </Dialog>
        <Button variant="outline" className="flex-col h-auto py-3 gap-1">
          <ArrowUp className="h-5 w-5" />
          <span className="text-xs">Send</span>
        </Button>
        <Button variant="outline" className="flex-col h-auto py-3 gap-1">
          <ArrowDown className="h-5 w-5" />
          <span className="text-xs">Receive</span>
        </Button>
      </div>

      <section>
        <h2 className="text-lg font-headline font-semibold mb-3">Products &amp; Services</h2>
        <div className="grid grid-cols-4 gap-3">
          {financialProducts.map((product) => (
            <a key={product.name} href={product.href} className="flex flex-col items-center gap-2 rounded-lg bg-card p-3 text-center shadow-sm transition-colors hover:bg-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <product.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium">{product.name}</span>
            </a>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium font-headline">Loyalty Points</CardTitle>
          <span className="text-2xl font-bold text-primary">1,280</span>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-4">Redeem points across various merchants.</p>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">Redeem Rewards</Button>
            <Button size="sm" variant="secondary" className="flex-1">Collect Points</Button>
          </div>
        </CardContent>
      </Card>

      <TransactionList />
    </div>
  );
}