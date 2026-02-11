import { useEffect, useState } from "react";
import FeedbackItem, { type FeedbackItemData } from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function FeedbackList() {
  const [feedbackItems, setfeedbackItems] = useState<FeedbackItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setfeedbackItems(data.feedbacks);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load feedbacks");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackItems();
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {isLoading && <ErrorMessage message={errorMessage} />}

      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
