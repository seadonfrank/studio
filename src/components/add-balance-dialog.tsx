
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
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog";

const addBalanceSchema = z.object({
  amount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number.",
  }),
});

type AddBalanceFormValues = z.infer<typeof addBalanceSchema>;

interface AddBalanceDialogProps {
    currency: string;
}

export default function AddBalanceDialog({ currency }: AddBalanceDialogProps) {
  const { toast } = useToast();

  const form = useForm<AddBalanceFormValues>({
    resolver: zodResolver(addBalanceSchema),
  });

  function onSubmit(data: AddBalanceFormValues) {
    console.log(data);
    form.reset();
    toast({
      title: "Balance Added",
      description: `You have added ${data.amount} ${currency} to your account.`,
    });
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Balance to {currency}</DialogTitle>
        <DialogDescription>
          Top up your account balance.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                    <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          <DialogFooter>
            <DialogClose asChild>
                <Button type="submit" className="w-full">Add Balance</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
