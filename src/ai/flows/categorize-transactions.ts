'use server';

/**
 * @fileOverview A transaction categorization AI agent.
 *
 * - categorizeTransaction - A function that categorizes a transaction.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTransactionInputSchema = z.object({
  transactionDescription: z
    .string()
    .describe('The description of the transaction.'),
  transactionAmount: z.number().describe('The amount of the transaction.'),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the transaction, e.g., food, transportation, entertainment.'
    ),
  confidence: z
    .number()
    .describe('The confidence level of the categorization, between 0 and 1.'),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {schema: CategorizeTransactionInputSchema},
  output: {schema: CategorizeTransactionOutputSchema},
  prompt: `You are a personal finance expert. Your job is to categorize transactions based on their description and amount.

  The possible categories are: food, transportation, entertainment, utilities, rent, salary, shopping, travel, health, other.

  Transaction Description: {{{transactionDescription}}}
  Transaction Amount: {{{transactionAmount}}}

  Please categorize the transaction and provide a confidence level between 0 and 1.
  `,
});

const categorizeTransactionFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
