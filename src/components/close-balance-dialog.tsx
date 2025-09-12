
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { TriangleAlert } from "lucide-react";

interface CloseBalanceDialogProps {
    currency: string;
}

export default function CloseBalanceDialog({ currency }: CloseBalanceDialogProps) {
  const { toast } = useToast();

  function handleClose() {
    toast({
      title: "Balance Closed",
      description: `Your ${currency} balance has been closed.`,
      variant: "destructive"
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Close {currency} Balance</DialogTitle>
        <DialogDescription>
          Are you sure you want to close this currency account? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <Alert variant="destructive">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Any remaining funds in this account will be automatically converted to your primary currency (USD) at the current exchange rate.
        </AlertDescription>
      </Alert>
      <DialogFooter>
        <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" onClick={handleClose}>Confirm & Close</Button>
      </DialogFooter>
    </DialogContent>
  );
}

    