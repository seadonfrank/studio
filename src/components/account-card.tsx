
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ConvertBalanceDialog from "./convert-balance-dialog";
import CloseBalanceDialog from "./close-balance-dialog";
import AddBalanceDialog from "./add-balance-dialog";

interface AccountCardProps {
  currency: string;
  balance: string;
  type: "primary" | "secondary";
  gradient: string;
}

export default function AccountCard({ currency, balance, type, gradient }: AccountCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardContent className="p-5 flex justify-between items-center">
        <div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold font-headline">{balance}</p>
            <p className="font-headline">{currency}</p>
          </div>
          {type === "primary" && (
            <p className="text-xs opacity-80 mt-1">Primary Account</p>
          )}
        </div>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem>Add Balance</DropdownMenuItem>
              </DialogTrigger>
              <DialogTrigger asChild>
                <DropdownMenuItem>Convert Balance</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="text-destructive focus:text-destructive">Close Balance</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
           <AddBalanceDialog currency={currency} />
           {/* <ConvertBalanceDialog currentCurrency={currency} /> */}
           {/* <CloseBalanceDialog currency={currency} /> */}
        </Dialog>
      </CardContent>
    </Card>
  );
}
