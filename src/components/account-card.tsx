
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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import ConvertBalanceDialog from "./convert-balance-dialog";
import CloseBalanceDialog from "./close-balance-dialog";
import AddBalanceDialog from "./add-balance-dialog";
import { useState } from "react";

interface AccountCardProps {
  currency: string;
  balance: string;
  type: "primary" | "secondary";
  gradient: string;
}

export default function AccountCard({ currency, balance, type, gradient }: AccountCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode | null>(null);

  const openDialog = (content: React.ReactNode) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  return (
    <Card className={cn("overflow-hidden text-card-foreground shadow-sm bg-muted/50 min-h-[105px]")}>
      <CardContent className="p-3 flex flex-col justify-between h-full">
        <div>
          <p className="font-headline text-sm">{currency}</p>
           <p className="text-xl font-bold font-headline">{balance}</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 self-end -mr-2 -mb-2">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openDialog(<AddBalanceDialog currency={currency} />)}>
                Add Money
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDialog(<ConvertBalanceDialog currentCurrency={currency} />)}>
                Move Money
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => openDialog(<CloseBalanceDialog currency={currency} />)}
              >
                Close Account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {dialogContent}
        </Dialog>
      </CardContent>
    </Card>
  );
}
