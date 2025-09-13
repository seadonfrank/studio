
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface CredentialTypeCardProps {
    icon: React.ElementType;
    type: string;
    count: number;
}

export default function CredentialTypeCard({ icon: Icon, type, count }: CredentialTypeCardProps) {
  return (
    <Card className="h-full flex flex-col justify-between p-3 text-left cursor-pointer hover:bg-muted/50 transition-colors min-h-[105px] bg-muted/50 border-none">
      <div className="flex justify-between items-start">
        <div className="flex items-center justify-center rounded-full bg-background h-8 w-8 text-primary">
            <Icon className="h-5 w-5" />
        </div>
         <Badge variant="secondary">{count}</Badge>
      </div>
      <div>
        <p className="font-semibold text-sm">{type}</p>
      </div>
    </Card>
  );
}
