
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog";
import { ArrowRight } from "lucide-react";
import { Label } from "./ui/label";

const convertSchema = z.object({
  fromAmount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number.",
  }),
  toCurrency: z.string().min(1, "Please select a currency to convert to."),
});

type ConvertFormValues = z.infer<typeof convertSchema>;

interface ConvertBalanceDialogProps {
    currentCurrency: string;
}

export default function ConvertBalanceDialog({ currentCurrency }: ConvertBalanceDialogProps) {
  const { toast } = useToast();

  const form = useForm<ConvertFormValues>({
    resolver: zodResolver(convertSchema),
  });

  function onSubmit(data: ConvertFormValues) {
    console.log(data);
    form.reset();
    toast({
      title: "Conversion Successful",
      description: `You have converted ${data.fromAmount} ${currentCurrency} to ${data.toCurrency}.`,
    });
  }

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"].filter(c => c !== currentCurrency);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Move Money</DialogTitle>
        <DialogDescription>
          Exchange funds between your currency accounts.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-5 gap-2 items-end">
            <div className="col-span-2 space-y-2">
                <Label>From</Label>
                <Input placeholder="0.00" {...form.register("fromAmount")} />
            </div>
            <div className="text-center">
                <p className="text-sm text-muted-foreground">{currentCurrency}</p>
                <ArrowRight className="h-4 w-4 mx-auto" />
            </div>
            <div className="col-span-2 space-y-2">
                <Label>To</Label>
                 <FormField
                    control={form.control}
                    name="toCurrency"
                    render={({ field }) => (
                        <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
          </div>
           <FormField
                control={form.control}
                name="fromAmount"
                render={() => <FormMessage />}
              />


          <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
            <p>Exchange Rate: 1 {currentCurrency} = 0.93 EUR (example)</p>
            <p>You will receive approximately: 0.00 EUR</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="submit" className="w-full">Convert</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
