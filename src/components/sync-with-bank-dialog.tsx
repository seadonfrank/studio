
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";

const syncSchema = z.object({
  institution: z.string().min(1, "Please select an institution."),
  consent: z.literal<boolean>(true, {
    errorMap: () => ({ message: "You must agree to the terms to proceed." }),
  }),
});

type SyncFormValues = z.infer<typeof syncSchema>;

export default function SyncWithBankDialog() {
  const { toast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState<"initial" | "otp" | "success">("initial");

  const form = useForm<SyncFormValues>({
    resolver: zodResolver(syncSchema),
    defaultValues: {
      consent: false,
    },
  });

  function onSubmit(data: SyncFormValues) {
    setIsSyncing(true);
    // Simulate API call
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStep("otp");
    }, 2000);
  }
  
  function handleOtpSubmit() {
    setIsSyncing(true);
     setTimeout(() => {
      setIsSyncing(false);
      setSyncStep("success");
      toast({
        title: "Sync Successful",
        description: "Your accounts have been synced.",
      });
    }, 2000);
  }

  if (syncStep === "success") {
    return (
        <div className="space-y-4 text-center">
            <p>Your accounts from <strong>Bank of America</strong> have been successfully synced.</p>
            <Alert>
                <AlertTitle>Sync Complete!</AlertTitle>
                <AlertDescription>
                    You can now see your updated balances and transactions across the app.
                </AlertDescription>
            </Alert>
        </div>
    )
  }

  if (syncStep === "otp") {
    return (
        <div className="space-y-4">
            <p>An OTP has been sent to your registered mobile number with Bank of America.</p>
            <Input placeholder="Enter OTP" />
            <Button onClick={handleOtpSubmit} className="w-full" disabled={isSyncing}>
                {isSyncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify & Sync
            </Button>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Financial Institution</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="boa">Bank of America</SelectItem>
                  <SelectItem value="chase">Chase</SelectItem>
                  <SelectItem value="wells">Wells Fargo</SelectItem>
                  <SelectItem value="citi">Citibank</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Alert>
          <AlertTitle>Data Consent</AlertTitle>
          <AlertDescription>
            By proceeding, you agree to allow xIDFI to securely access your financial data for display purposes. We do not store your credentials.
          </AlertDescription>
        </Alert>
        
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                    <input type="checkbox" checked={field.value} onChange={field.onChange} className="mt-1" />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>
                       I agree to the terms and conditions.
                    </FormLabel>
                     <FormMessage />
                </div>
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full" disabled={isSyncing}>
          {isSyncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSyncing ? "Connecting..." : "Connect Securely"}
        </Button>
      </form>
    </Form>
  );
}
