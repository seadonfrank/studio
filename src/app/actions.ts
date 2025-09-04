"use server";

import { categorizeTransaction, type CategorizeTransactionInput } from "@/ai/flows/categorize-transactions";

export async function getCategory(
  input: CategorizeTransactionInput
): Promise<string> {
  try {
    const result = await categorizeTransaction(input);
    return result.category;
  } catch (error) {
    console.error("Error categorizing transaction:", error);
    return "Other";
  }
}
