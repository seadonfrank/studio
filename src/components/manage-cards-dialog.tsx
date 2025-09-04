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
import { CreditCard, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const cardSchema = z.object({
  cardNumber: z.string().refine((value) => /^\d{16}$/.test(value), {
    message: "Card number must be 16 digits.",
  }),
  expiryDate: z.string().refine((value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), {
    message: "Expiry date must be in MM/YY format.",
  }),
  cvv: z.string().refine((value) => /^\d{3,4}$/.test(value), {
    message: "CVV must be 3 or 4 digits.",
  }),
});

type CardFormValues = z.infer<typeof cardSchema>;

interface Card extends CardFormValues {
  id: number;
}

const initialCards: Card[] = [
  {
    id: 1,
    cardNumber: "1234567812345678",
    expiryDate: "12/25",
    cvv: "123",
  },
];

export default function ManageCardsDialog() {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const { toast } = useToast();

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(data: CardFormValues) {
    const newCard = { ...data, id: Date.now() };
    setCards((prev) => [...prev, newCard]);
    form.reset();
    toast({
      title: "Card Added",
      description: "Your new payment card has been added successfully.",
    });
  }

  function handleRemoveCard(cardId: number) {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    toast({
      title: "Card Removed",
      description: "The payment card has been removed.",
      variant: "destructive",
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Add New Card</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="**** **** **** ****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">Add Card</Button>
          </form>
        </Form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Cards</h3>
        {cards.length === 0 ? (
          <p className="text-sm text-muted-foreground">You have no saved cards.</p>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-mono text-sm">**** **** **** {card.cardNumber.slice(-4)}</p>
                    <p className="text-xs text-muted-foreground">Expires {card.expiryDate}</p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove your card.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemoveCard(card.id)}>
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}