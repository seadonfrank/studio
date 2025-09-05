"use client";

import { useState } from "react";
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

const accountSchema = z.object({
  currency: z.string().min(1, "Currency is required"),
  balance: z.string().refine(val => !isNaN(parseFloat(val)), {
    message: "Initial balance must be a number.",
  }),
});

type AccountFormValues = z.infer<typeof accountSchema>;

export default function ManageAccountsDialog() {
  const { toast } = useToast();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      currency: "",
      balance: "",
    },
  });

  function onSubmit(data: AccountFormValues) {
    // Here you would typically handle the form submission,
    // e.g., send the data to your backend to create a new account.
    console.log(data);
    form.reset();
    toast({
      title: "Account Added",
      description: `Your new ${data.currency} account has been added.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                  <SelectItem value="JPY">JPY (Japanese Yen)</SelectItem>
                  <SelectItem value="CAD">CAD (Canadian Dollar)</SelectItem>
                  <SelectItem value="AUD">AUD (Australian Dollar)</SelectItem>
                  <SelectItem value="CHF">CHF (Swiss Franc)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="balance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Balance</FormLabel>
              <FormControl>
                <Input placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Account</Button>
      </form>
    </Form>
  );
}
