import { create } from 'zustand';
import { TFeedbackItem } from '../types';
type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    const items = get().feedbackItems;
    return [...new Set(items.map((item) => item.company))];
  },

  getFilteredFeedbackItems: () => {
    const state = get();
    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
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

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    await fetch(`${API_BASE_URL}/feedbacks`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
  selectCompany: (company: string) => {
    set({ selectedCompany: company });
  },
  fetchFeedbackItems: async () => {
    set(() => ({ errorMessage: '' }));
    set(() => ({ isLoading: true }));

    try {
      const response = await fetch(`${API_BASE_URL}/feedbacks`);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (error) {
      set(() => ({ errorMessage: 'Something went wrong ' }));
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
}));
