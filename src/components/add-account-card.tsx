import { Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

export default function AddAccountCard({ text = "Add New Account", className }: { text?: string, className?: string }) {
  return (
    <Card className={cn("h-full flex items-center justify-center border-dashed border-2 hover:border-primary transition-colors cursor-pointer min-h-[164px]", className)}>
      <CardContent className="p-6 text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center rounded-full bg-secondary mb-4 h-12 w-12">
            <Plus className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="font-semibold text-sm">{text}</p>
      </CardContent>
    </Card>
  );
}
