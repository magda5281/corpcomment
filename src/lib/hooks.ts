import { useContext } from 'react';
import { FeedbackItemsContext } from '../components/contexts/FeedbackItemsContextProvider';

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw Error(
      'FeedbackItemsContext is not defined in FeedbackList and HashtagList component'
    );
  }
  return context;
}
