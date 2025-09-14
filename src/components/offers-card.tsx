import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Ticket, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";

const offers = [
  { title: "20% off on your next coffee", description: "Use code COFFEE20 at Starbucks", category: "Food & Drink" },
  { title: "Flat $50 off on flights", description: "Book via xIDFI Pay on any airline", category: "Travel" },
  { title: "1 month free movie streaming", description: "Link your xIDFI account with Netflix", category: "Entertainment" },
];

export default function OffersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            Offers & Discounts
        </CardTitle>
        <CardDescription>Exclusive deals for you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {offers.map((offer, index) => (
            <div key={index} className="flex items-center gap-4 cursor-pointer group">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold group-hover:text-primary transition-colors">{offer.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">{offer.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
