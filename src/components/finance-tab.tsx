
"use client";

import { ArrowDown, ArrowUp, Landmark, PiggyBank, LineChart, Repeat, Gift, Trophy, TrendingUp, History } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import LoanCard from "./loan-card";
import ManageLoansDialog from "./manage-loans-dialog";
import FundCard from "./fund-card";
import ManageFundsDialog from "./manage-funds-dialog";

export default function FinanceTab() {
  const cards = [
    { cardType: "Credit Card", cardNumber: "1234", balance: "$2,500.00", limit: "$10,000", gradient: "from-primary via-purple-500 to-fuchsia-600" },
    { cardType: "Debit Card", cardNumber: "5678", balance: "$8,230.45", gradient: "from-blue-500 via-sky-500 to-cyan-400" },
    { cardType: "Prepaid Card", cardNumber: "9012", balance: "$500.00", gradient: "from-amber-500 via-orange-500 to-yellow-400" },
  ];

  const deposits = [
    { currency: "USD", principalAmount: "$10,000", maturityAmount: "$10,500", interestRate: "5.00", tenure: "1 Year", startDate: "2023-08-01", endDate: "2024-08-01", gradient: "from-green-500 to-emerald-500" },
    { currency: "EUR", principalAmount: "€5,000", maturityAmount: "€5,200", interestRate: "4.00", tenure: "1 Year", startDate: "2023-09-15", endDate: "2024-09-15", gradient: "from-teal-500 to-cyan-500" },
  ];

  const loans = [
    { currency: "USD", loanAmount: "$25,000", outstandingAmount: "$18,500", interestRate: "7.5", interestType: "Fixed", tenure: "5 Years", installments: "30 of 60", emi: "$500", disbursedDate: "2022-01-10", gradient: "from-rose-500 to-pink-500" },
    { currency: "CAD", loanAmount: "$5,000", outstandingAmount: "$2,100", interestRate: "9.2", interestType: "Floating", tenure: "2 Years", installments: "10 of 24", emi: "$250", disbursedDate: "2023-05-20", gradient: "from-indigo-500 to-purple-500" },
  ];

  const funds = [
    { currency: "USD", fundBalance: "$12,345", pnlAmount: "+1,234", pnlPercentage: "11.11", investedAmount: "$11,111", sipNumber: "12345", startDate: "2023-01-15", gradient: "from-sky-500 to-indigo-500" },
    { currency: "EUR", fundBalance: "€8,500", pnlAmount: "-250", pnlPercentage: "-2.85", investedAmount: "€8,750", swpNumber: "67890", startDate: "2022-11-01", gradient: "from-lime-500 to-green-500" },
  ];


  return (
    <div className="space-y-6 p-4">
      <section className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium font-headline">Cash</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$1,234.56</p>
            <div className="flex gap-2 mt-2">
              <Button size="icon" className="h-8 w-8" aria-label="Send"><ArrowUp/></Button>
              <Button size="icon" variant="secondary" className="h-8 w-8" aria-label="Receive"><ArrowDown/></Button>
              <Button size="icon" variant="secondary" className="h-8 w-8" aria-label="Transactions"><History/></Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium font-headline">Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">1,280</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" className="flex-1 text-xs px-2 h-8"><Gift/>Collect</Button>
              <Button size="sm" variant="secondary" className="flex-1 text-xs px-2 h-8"><Trophy/>Redeem</Button>
            </div>
          </CardContent>
        </Card>
      </section>

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
        <h2 className="text-lg font-headline font-semibold mb-3">Loans</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {loans.map((loan, index) => (
              <CarouselItem key={index}>
                <LoanCard {...loan} />
              </CarouselItem>
            ))}
            <CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <AddAccountCard text="Apply for Loan" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply for a New Loan</DialogTitle>
                      <DialogDescription>
                        Enter the details for your new loan application.
                      </DialogDescription>
                    </DialogHeader>
                    <ManageLoansDialog />
                  </DialogContent>
                </Dialog>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      <section>
        <h2 className="text-lg font-headline font-semibold mb-3">Funds</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {funds.map((fund, index) => (
              <CarouselItem key={index}>
                <FundCard {...fund} />
              </CarouselItem>
            ))}
            <CarouselItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full">
                      <AddAccountCard text="Add New Investment" />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Investment</DialogTitle>
                      <DialogDescription>
                        Enter the details for your new mutual fund investment.
                      </DialogDescription>
                    </DialogHeader>
                    <ManageFundsDialog />
                  </DialogContent>
                </Dialog>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </section>

      <TransactionList />
    </div>
  );
}
