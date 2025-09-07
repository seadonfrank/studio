
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap, Calendar, BookOpen, Building } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AcademicCredentialCardProps {
    credentialType: string;
    institution: string;
    fieldOfStudy: string;
    graduationDate: string;
    gradient: string;
    status: 'active' | 'expired' | 'revoked';
}

export default function AcademicCredentialCard({ credentialType, institution, fieldOfStudy, graduationDate, gradient, status }: AcademicCredentialCardProps) {
  return (
    <Card className={cn("overflow-hidden text-primary-foreground shadow-lg bg-gradient-to-br", gradient)}>
      <CardHeader className="flex flex-row justify-between items-start pb-2 p-5">
        <CardTitle className="font-headline text-md">{credentialType}</CardTitle>
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
