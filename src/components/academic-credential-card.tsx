import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap, Calendar, BookOpen, Building } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

interface AcademicCredentialCardProps {
    credentialType: string;
    institution: string;
    fieldOfStudy: string;
    graduationDate: string;
    gradient: string;
    status: 'active' | 'expired' | 'revoked';
}

const statusConfig = {
  active: { label: 'Active', variant: 'accent' as const },
  expired: { label: 'Expired', variant: 'secondary' as const },
  revoked: { label: 'Revoked', variant: 'destructive' as const },
};

export default function AcademicCredentialCard({ credentialType, institution, fieldOfStudy, graduationDate, gradient, status }: AcademicCredentialCardProps) {
  const config = statusConfig[status];

  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <div className="space-y-1">
          <CardTitle className="font-headline text-md">{credentialType}</CardTitle>
          <Badge variant={config.variant} className="bg-white/20 hover:bg-white/30 text-white border-white/40 backdrop-blur-sm px-2 py-0 text-[10px] uppercase font-bold">
            {config.label}
          </Badge>
        </div>
        <GraduationCap className="h-7 w-7 opacity-70" />
      </CardHeader>
      <CardContent className="p-5 pt-0 space-y-3">
        <div className="flex items-center gap-3">
            <Building className="h-4 w-4 opacity-80" />
            <p className="text-lg font-bold font-headline">{institution}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-2 text-xs opacity-90 border-t border-white/20 pt-3">
            <div className="flex items-center gap-1.5">
                <BookOpen className="h-3 w-3" />
                <span>{fieldOfStudy}</span>
            </div>
        </div>

        <div className="flex justify-start items-center text-[10px] opacity-80 pt-1">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>Graduated: {format(new Date(graduationDate), "MMM yyyy")}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
