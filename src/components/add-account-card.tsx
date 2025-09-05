import { Plus } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function AddAccountCard({ text = "Add New Account" }: { text?: string }) {
  return (
    <Card className="h-full flex items-center justify-center border-dashed border-2 hover:border-primary transition-colors cursor-pointer min-h-[178px]">
      <CardContent className="p-6 text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center rounded-full bg-secondary mb-4 h-16 w-16">
            <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="font-semibold text-sm">{text}</p>
      </CardContent>
    </Card>
  );
}
