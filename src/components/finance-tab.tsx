"use client";

import { ArrowDown, ArrowUp, Plus, Landmark, PiggyBank, LineChart, Repeat } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import ManageCardsDialog from "./manage-cards-dialog";
import TransactionList from "./transaction-list";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import PaymentCard from "./payment-card";
import DepositCard from "./deposit-card";
import AddAccountCard from "./add-account-card";
import ManageAccountsDialog from "./manage-accounts-dialog";
import ManageDepositsDialog from "./manage-deposits-dialog";

export default function FinanceTab() {
  const financialProducts = [
    { name: "Loans", icon: Landmark, href: "#" },
    { name: "Deposits", icon: PiggyBank, href: "#" },
    { name: "Funds", icon: LineChart, href: "#" },
    { name: "Subscriptions", icon: Repeat, href: "#" },
  ];

  const cards = [
    { cardType: "Credit Card", cardNumber: "1234", balance: "$2,500.00", limit: "$10,000", gradient: "from-primary via-purple-500 to-fuchsia-600" },
    { cardType: "Debit Card", cardNumber: "5678", balance: "$8,230.45", gradient: "from-blue-500 via-sky-500 to-cyan-400" },
    { cardType: "Prepaid Card", cardNumber: "9012", balance: "$500.00", gradient: "from-amber-500 via-orange-500 to-yellow-400" },
  ];

  const deposits = [
    { currency: "USD", principalAmount: "$10,000", maturityAmount: "$10,500", interestRate: "5.00", tenure: "1 Year", startDate: "2023-08-01", endDate: "2024-08-01", gradient: "from-green-500 to-emerald-500" },
    { currency: "EUR", principalAmount: "€5,000", maturityAmount: "€5,200", interestRate: "4.00", tenure: "1 Year", startDate: "2023-09-15", endDate: "2024-09-15", gradient: "from-teal-500 to-cyan-500" },
  ];

  return (
    <div className="space-y-6 p-4">
      <section>
        <h2 className="text-lg font-headline font-semibold mb-3">Cards</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {cards.map((card, index) => (
              <CarouselItem key={index}>
                <PaymentCard {...card} />
              </CarouselItem>
            ))}
            <CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <AddAccountCard text="Add New Card" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Card</DialogTitle>
                      <DialogDescription>
                        Enter details for your new payment card.
                      </DialogDescription>
                    </DialogHeader>
                    <ManageCardsDialog />
                  </DialogContent>
                </Dialog>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      <section>
        <h2 className="text-lg font-headline font-semibold mb-3">Deposits</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {deposits.map((deposit, index) => (
              <CarouselItem key={index}>
                <DepositCard {...deposit} />
              </CarouselItem>
            ))}
            <CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <AddAccountCard text="Add New Deposit" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Deposit</DialogTitle>
                      <DialogDescription>
                        Enter details for your new fixed-term deposit.
                      </DialogDescription>
                    </DialogHeader>
                    <ManageDepositsDialog />
                  </DialogContent>
                </Dialog>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

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
