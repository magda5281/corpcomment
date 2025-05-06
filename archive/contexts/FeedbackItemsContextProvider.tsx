import { createContext, useMemo, useState } from 'react';
import { TFeedbackItem } from '../../src/types';
import { useFeedbackItems } from '../hooks';

type FeedbackItemsContextProvider = {
  children: React.ReactNode;
};
type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
  setFeedbackItems: React.Dispatch<React.SetStateAction<TFeedbackItem[]>>;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);
export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProvider) {
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems();
  const [selectedCompany, setSelectedCompany] = useState('');

  const companyList = useMemo(() => {
    return [...new Set(feedbackItems.map((item) => item.company))];
  }, [feedbackItems]);

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

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

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  return (
    <FeedbackItemsContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
        setFeedbackItems,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
