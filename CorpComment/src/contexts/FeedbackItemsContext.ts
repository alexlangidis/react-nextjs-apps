import { createContext } from "react";
import type { FeedbackItemData } from "../lib/types";

export type FeedbackItemsContextValue = {
  filteredFeedbackItems: FeedbackItemData[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

export const FeedbackItemsContext =
  createContext<FeedbackItemsContextValue | null>(null);
