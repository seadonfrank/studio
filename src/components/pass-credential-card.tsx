import { Card, CardContent } from "./ui/card";
import { Ticket, Calendar, MapPin, Hash } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface PassCredentialCardProps {
    passType: string;
    organizer: string;
    eventName: string;
    eventDate: string;
    venue: string;
    gradient: string;
    status: 'active' | 'expired' | 'revoked';
}

const statusConfig = {
  active: { label: 'Active', variant: 'accent' as const },
  expired: { label: 'Expired', variant: 'secondary' as const },
  revoked: { label: 'Revoked', variant: 'destructive' as const },
};

export default function PassCredentialCard({ 
  passType, organizer, eventName, eventDate, venue, gradient, status 
}: PassCredentialCardProps) {
  const config = statusConfig[status];

  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-md border-none bg-gradient-to-br transition-all hover:scale-[1.01]", gradient)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{passType} • {organizer}</span>
            <p className="text-base font-bold font-headline leading-tight">{eventName}</p>
          </div>
          <Badge variant={config.variant} className="bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-sm px-2 py-0 text-[9px] uppercase font-bold">
            {config.label}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] opacity-90 border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 opacity-70" />
            <span>{format(new Date(eventDate), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate justify-end">
            <MapPin className="h-3 w-3 opacity-70" />
            <span className="truncate">{venue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
