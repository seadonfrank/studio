import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wallet, Globe, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface CryptoCredentialCardProps {
    walletName: string;
    asset: string;
    balance: string;
    network: string;
    walletAddress: string;
    gradient: string;
    status: 'active' | 'expired' | 'revoked';
}

const statusConfig = {
  active: { label: 'Active', variant: 'accent' as const },
  expired: { label: 'Expired', variant: 'secondary' as const },
  revoked: { label: 'Revoked', variant: 'destructive' as const },
};

export default function CryptoCredentialCard({ walletName, asset, balance, network, walletAddress, gradient, status }: CryptoCredentialCardProps) {
  const config = statusConfig[status];

  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <div className="space-y-1">
          <CardTitle className="font-headline text-md">{walletName}</CardTitle>
          <Badge variant={config.variant} className="bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-sm px-2 py-0 text-[10px] uppercase font-bold">
            {config.label}
          </Badge>
        </div>
        <Wallet className="h-7 w-7 opacity-70" />
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-xs opacity-80">{asset}</p>
                <p className="text-lg font-bold font-headline">{balance}</p>
            </div>
            <div>
                <p className="text-xs opacity-80">Network</p>
                <p className="text-lg font-bold font-headline">{network}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs opacity-90 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5 truncate">
                <LinkIcon className="h-3 w-3" />
                <span className="truncate">{walletAddress}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
