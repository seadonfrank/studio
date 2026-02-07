import { Card, CardContent } from "./ui/card";
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

export default function CryptoCredentialCard({ 
  walletName, asset, balance, network, walletAddress, gradient, status 
}: CryptoCredentialCardProps) {
  const config = statusConfig[status];

  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-md border-none bg-gradient-to-br transition-all hover:scale-[1.01]", gradient)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{network} Wallet</span>
            <p className="text-base font-bold font-headline leading-tight">{walletName}</p>
          </div>
          <Badge variant={config.variant} className="bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-sm px-2 py-0 text-[9px] uppercase font-bold">
            {config.label}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] opacity-90 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5">
            <LinkIcon className="h-3 w-3 opacity-70" />
            <span className="truncate font-mono">{walletAddress}</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end font-bold text-sm">
            <span>{balance} {asset}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
