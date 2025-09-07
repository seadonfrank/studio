
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { User, Calendar, FileText, Hash } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LicenseCredentialCardProps {
    licenseType: string;
    issuingAuthority: string;
    name: string;
    issueDate: string;
    expiryDate: string;
    licenseNumber: string;
    details?: string[];
    gradient: string;
}

export default function LicenseCredentialCard({ licenseType, issuingAuthority, name, issueDate, expiryDate, licenseNumber, details, gradient }: LicenseCredentialCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <CardTitle className="font-headline text-md">{licenseType}</CardTitle>
        <FileText className="h-7 w-7 opacity-70" />
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-3">
        <div className="flex items-center gap-3">
            <User className="h-4 w-4 opacity-80" />
            <p className="text-lg font-bold font-headline">{name}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs opacity-90 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5 truncate col-span-2">
                <p className="truncate">Authority: {issuingAuthority}</p>
            </div>
            <div className="flex items-center gap-1.5 truncate">
                <Hash className="h-3 w-3" />
                <span className="truncate">Number: {licenseNumber}</span>
            </div>
            {details && details.length > 0 && (
                <div className="flex items-center gap-1.5 truncate">
                    <span className="truncate">{details.join(', ')}</span>
                </div>
            )}
        </div>

        <div className="flex justify-between items-center text-[10px] opacity-80 pt-1">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Issued: {format(new Date(issueDate), "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Expires: {format(new Date(expiryDate), "MMM d, yyyy")}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
