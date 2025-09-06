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
  FormLabel,
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

const loanSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  loanAmount: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Loan amount must be a positive number.",
  }),
  interestType: z.string().min(1, "Interest type is required"),
  tenure: z.string().min(1, "Tenure is required"),
});

type LoanFormValues = z.infer<typeof loanSchema>;

export default function ManageLoansDialog() {
  const { toast } = useToast();

  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanSchema),
  });

  function onSubmit(data: LoanFormValues) {
    console.log(data);
    form.reset();
    toast({
      title: "Loan Application Submitted",
      description: `Your loan application for ${data.loanAmount} ${data.currency} has been submitted for review.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="loanAmount"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Loan Amount</FormLabel>
                <FormControl>
                    <Input placeholder="25000" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="tenure"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tenure</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="1 Year">1 Year</SelectItem>
                            <SelectItem value="2 Years">2 Years</SelectItem>
                            <SelectItem value="3 Years">3 Years</SelectItem>
                            <SelectItem value="5 Years">5 Years</SelectItem>
                            <SelectItem value="10 Years">10 Years</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="interestType"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Interest Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Fixed">Fixed</SelectItem>
                        <SelectItem value="Floating">Floating</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <p className="text-xs text-muted-foreground pt-2">
            Your application will be subject to credit approval. Interest rate and EMI will be determined upon approval.
        </p>
        
        <Button type="submit" className="w-full">Apply for Loan</Button>
      </form>
    </Form>
  );
}
