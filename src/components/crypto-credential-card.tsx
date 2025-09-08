
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wallet, Globe, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CryptoCredentialCardProps {
    walletName: string;
    asset: string;
    balance: string;
    network: string;
    walletAddress: string;
    gradient: string;
    status: 'active' | 'expired' | 'revoked';
}

export default function CryptoCredentialCard({ walletName, asset, balance, network, walletAddress, gradient, status }: CryptoCredentialCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <CardTitle className="font-headline text-md">{walletName}</CardTitle>
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
