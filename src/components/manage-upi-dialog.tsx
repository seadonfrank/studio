
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Landmark, Trash2 } from "lucide-react";
import { DialogFooter, DialogClose } from "./ui/dialog";

export default function ManageUpiDialog() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your UPI settings have been updated.",
    });
  };

  const linkedAccounts = [
    { name: "Bank of America", last4: "4321" },
    { name: "Chase", last4: "8765" },
  ];

  return (
    <div className="space-y-6">
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                    <Label htmlFor="enable-upi" className="font-medium">Enable UPI</Label>
                    <p className="text-xs text-muted-foreground">Allow payments using UPI.</p>
                </div>
                <Switch id="enable-upi" defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                    <Label htmlFor="enable-upi-lite" className="font-medium">Enable UPI Lite</Label>
                    <p className="text-xs text-muted-foreground">For faster, smaller payments up to $50.</p>
                </div>
                <Switch id="enable-upi-lite" />
            </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
            <h3 className="text-md font-medium">Linked Bank Accounts</h3>
            <div className="space-y-3">
                {linkedAccounts.map(account => (
                    <div key={account.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                            <Landmark className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{account.name}</p>
                                <p className="text-xs text-muted-foreground">Account ending in {account.last4}</p>
                            </div>
                        </div>
                         <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
             <Button variant="outline" className="w-full">Link New Account</Button>
        </div>

        <Separator />

        <div className="space-y-2">
             <Button variant="outline" className="w-full">Change UPI PIN</Button>
             <p className="text-xs text-muted-foreground text-center">You will be redirected to your bank's page.</p>
        </div>

        <DialogFooter>
            <DialogClose asChild>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </DialogClose>
        </DialogFooter>
    </div>
  );
}
