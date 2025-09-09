
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

const billerSchema = z.object({
  billerName: z.string().min(1, "Biller name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  category: z.string().min(1, "Category is required"),
});

type BillerFormValues = z.infer<typeof billerSchema>;

export default function ManageBillersDialog() {
  const { toast } = useToast();

  const form = useForm<BillerFormValues>({
    resolver: zodResolver(billerSchema),
  });

  function onSubmit(data: BillerFormValues) {
    console.log(data);
    form.reset();
    toast({
      title: "Biller Added",
      description: `The biller ${data.billerName} has been added successfully.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="billerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biller Name</FormLabel>
              <FormControl>
                <Input placeholder="E.g., AT&T" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Your account number with the biller" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="internet">Internet</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Biller</Button>
      </form>
    </Form>
  );
}
