import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function LoyaltyTab() {
  return (
    <div className="space-y-6 p-4">
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
    </div>
  );
}
