import { useEffect, useState } from 'react';
import FeedbackItem from './FeedbackItem';
import { type FeedbackItem as feedbackItem } from '../types';
import Spinner from './Spinner';
import { ThickArrowDownIcon } from '@radix-ui/react-icons';
import ErrorMessage from './ErrorMessage';
export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setErrorMessage('');
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        );
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage('Something went wrong ');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbackItems();
  }, []);
  return (
    <ol className='feedback-list'>
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedbackItem: feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
