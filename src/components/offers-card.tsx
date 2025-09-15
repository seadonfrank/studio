
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ChevronDown, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type OfferStatus = 'redeem' | 'redeeming' | 'redeemed';
type OfferFilter = OfferStatus | 'all';

const allOffers: { title: string; description: string; category: string; status: OfferStatus }[] = [
  { title: "20% off on your next coffee", description: "Use code COFFEE20 at Starbucks", category: "Food & Drink", status: "redeem" },
  { title: "Flat $50 off on flights", description: "Book via xIDFI Pay on any airline", category: "Travel", status: "redeeming" },
  { title: "1 month free movie streaming", description: "Link your xIDFI account with Netflix", category: "Entertainment", status: "redeemed" },
];

export default function OffersCard() {
  const [filter, setFilter] = useState<OfferFilter>('all');

  const filteredOffers = allOffers.filter(offer => {
    if (filter === 'all') return true;
    return offer.status === filter;
  });

  const filters: { label: string; value: OfferFilter }[] = [
    { label: "All", value: "all" },
    { label: "Redeem", value: "redeem" },
    { label: "Redeeming", value: "redeeming" },
    { label: "Redeemed", value: "redeemed" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle className="font-headline flex items-center gap-2">
                <Ticket className="h-6 w-6 text-primary" />
                Offers
            </CardTitle>
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
        <CardDescription>Exclusive deals for you</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
