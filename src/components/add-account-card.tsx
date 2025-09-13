import { Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

export default function AddAccountCard({ text = "Add New Account", className }: { text?: string, className?: string }) {
  return (
    <Card className={cn("h-full flex items-center justify-center border-none bg-muted/50 hover:bg-muted transition-colors cursor-pointer min-h-[164px]", className)}>
      <CardContent className="p-3 text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center rounded-full bg-background mb-2 h-8 w-8">
            <Plus className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="font-semibold text-sm">{text}</p>
      </CardContent>
    </Card>
  );
}
