import { useEffect, useState } from 'react';
import Container from './layout/Container';
import Footer from './layout/Footer';
import HashtagList from './HashtagList';
import { TFeedbackItem } from '../types';

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToList = async (text: string) => {
    const company = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1);

    const badgeLetter = company?.substring(0, 1).toUpperCase();

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: badgeLetter,
      company: company,
      text: text,
      daysAgo: 0,
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  };
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
    <div className='app'>
      <Footer />
      <Container
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />
      <HashtagList />
    </div>
  );
}

export default App;
