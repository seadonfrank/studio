
"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import SyncWithBankDialog from "./sync-with-bank-dialog";

interface SyncCardProps {
  category: string;
  lastSynced: string;
  icon: React.ElementType;
}

export default function SyncCard({
  category,
  lastSynced,
  icon: Icon,
}: SyncCardProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const handleSync = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast({
        title: `${category} Sync Successful`,
        description: `Your ${category.toLowerCase()} have been updated.`,
      });
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
          <CardContent className="p-3 flex flex-col justify-between h-full text-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <p className="font-semibold">{category}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleSync}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last synced:</p>
              <p className="text-xs font-medium">{lastSynced}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sync Financial Accounts</DialogTitle>
          <DialogDescription>
            Connect with your bank to sync all your assets.
          </DialogDescription>
        </DialogHeader>
        <SyncWithBankDialog />
      </DialogContent>
    </Dialog>
  );
}

    