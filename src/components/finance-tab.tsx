import { ArrowDown, ArrowUp, Banknote, CreditCard, Landmark, LineChart, PiggyBank, Plus, Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import ManageCardsDialog from "./manage-cards-dialog";
import TransactionList from "./transaction-list";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import CurrencyCard from "./currency-card";

export default function FinanceTab() {
  const financialProducts = [
    { name: "Loans", icon: Landmark, href: "#" },
    { name: "Deposits", icon: PiggyBank, href: "#" },
    { name: "Funds", icon: LineChart, href: "#" },
    { name: "Subscriptions", icon: Repeat, href: "#" },
  ];

  const accounts = [
    { currency: "USD", symbol: "$", balance: "12,450.78", cardNumber: "1234", gradient: "from-primary via-purple-500 to-fuchsia-600" },
    { currency: "EUR", symbol: "€", balance: "8,230.45", cardNumber: "5678", gradient: "from-blue-500 via-sky-500 to-cyan-400" },
    { currency: "BTC", symbol: "₿", balance: "0.580000", cardNumber: "9012", gradient: "from-amber-500 via-orange-500 to-yellow-400" },
  ];

  return (
    <div className="space-y-6 p-4">
      <section>
        <h2 className="text-lg font-headline font-semibold mb-3">Accounts</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {accounts.map((account, index) => (
              <CarouselItem key={index}>
                <CurrencyCard {...account} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

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

      <TransactionList />
    </div>
  );
}
