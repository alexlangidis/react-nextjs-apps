import { useContext } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContext";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      "FeedbackItemsContext is not definied in FeedbackList component",
    );
  }
  return context;
}
