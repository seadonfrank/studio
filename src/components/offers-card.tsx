
"use client";

import { useState } from "react";
import { ChevronDown, Ticket, Award } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";

type OfferStatus = 'redeem' | 'redeeming' | 'redeemed';
type OfferFilter = OfferStatus | 'all';

const allOffers: { title: string; description: string; category: string; status: OfferStatus, value: number }[] = [
  { title: "20% off on your next coffee", description: "Use code COFFEE20 at Starbucks", category: "Food & Drink", status: "redeem", value: 0 },
  { title: "Flat $50 off on flights", description: "Book via xIDFI Pay on any airline", category: "Travel", status: "redeeming", value: 0 },
  { title: "1 month free movie streaming", description: "Link your xIDFI account with Netflix", category: "Entertainment", status: "redeemed", value: 15 },
  { title: "$5 off on groceries", description: "On purchases above $50", category: "Shopping", status: "redeemed", value: 5 },
];

export default function OffersCard() {
  const [filter, setFilter] = useState<OfferFilter>('all');

  const filteredOffers = allOffers.filter(offer => {
    if (filter === 'all') return true;
    return offer.status === filter;
  });

  const totalSavings = allOffers.reduce((total, offer) => {
    if (offer.status === 'redeemed') {
      return total + offer.value;
    }
    return total;
  }, 0);

  const filters: { label: string; value: OfferFilter }[] = [
    { label: "All", value: "all" },
    { label: "Redeem", value: "redeem" },
    { label: "Redeeming", value: "redeeming" },
    { label: "Redeemed", value: "redeemed" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-headline font-semibold flex items-center gap-2">
            <Ticket className="h-5 w-5 text-primary" />
            Offers
        </h2>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="capitalize">
                    {filter}
                    <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {filters.map(f => (
                    <DropdownMenuItem key={f.value} onClick={() => setFilter(f.value)} className="capitalize">
                        {f.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

       <Card className="mb-4 bg-muted/50 border-none">
        <CardContent className="p-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-background h-8 w-8 text-primary">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Total Savings</p>
              <p className="text-xs text-muted-foreground">From redeemed offers</p>
            </div>
          </div>
          <p className="text-xl font-bold font-headline text-primary">${totalSavings.toFixed(2)}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
          {filteredOffers.length > 0 ? filteredOffers.map((offer, index) => (
            <div key={index} className="flex items-center gap-4 cursor-pointer group">
              <div className="flex-1">
                <p className="font-semibold group-hover:text-primary transition-colors">{offer.title}</p>
                <p className="text-sm text-muted-foreground">{offer.description}</p>
              </div>
              <Button 
                size="sm" 
                variant={offer.status === 'redeem' ? 'default' : 'outline'}
                className={cn(
                  "capitalize h-7 text-xs",
                  offer.status === 'redeeming' && "text-yellow-600 border-yellow-300 bg-yellow-50",
                  offer.status === 'redeemed' && "text-gray-500 border-gray-300 bg-gray-50 cursor-not-allowed"
                )}
                disabled={offer.status === 'redeemed'}
              >
                {offer.status}
              </Button>
            </div>
          )) : <p className="text-sm text-muted-foreground text-center py-4">No offers match the filter.</p>}
        </div>
    </div>
  );
}
