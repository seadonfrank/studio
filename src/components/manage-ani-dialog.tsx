
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Landmark, Trash2, Copy } from "lucide-react";
import { DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";

export default function ManageAniDialog() {
  const { toast } = useToast();
  const aniId = "johndoe@ani";

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your ANI settings have been updated.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aniId);
    toast({
      title: "Copied to clipboard!",
    });
  };

  const linkedBankAccounts = [
    { name: "Emirates NBD", details: "Account ending in 1234" },
    { name: "Abu Dhabi Commercial Bank", details: "Account ending in 5678" },
  ];

  return (
    <div className="space-y-6">
        <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                    <Label htmlFor="enable-ani" className="font-medium">Enable ANI Payments</Label>
                    <p className="text-xs text-muted-foreground">Allow payments using your ANI.</p>
                </div>
                <Switch id="enable-ani" defaultChecked />
            </div>

            <div className="space-y-2">
                <Label htmlFor="ani-id">Your ANI ID</Label>
                <div className="flex items-center gap-2">
                    <Input id="ani-id" value={aniId} readOnly />
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
            <h3 className="text-md font-medium">Linked Bank Accounts</h3>
            <div className="space-y-3">
                {linkedBankAccounts.map(account => (
                    <div key={account.name} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                            <Landmark className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{account.name}</p>
                                <p className="text-xs text-muted-foreground">{account.details}</p>
                            </div>
                        </div>
                         <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
             <Button variant="outline" className="w-full">Link New Bank Account</Button>
        </div>

        <DialogFooter>
            <DialogClose asChild>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </DialogClose>
        </DialogFooter>
    </div>
  );
}
