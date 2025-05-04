import { TriangleUpIcon } from '@radix-ui/react-icons';

type FeedbackItem = {
  upvoteCount: number;
  badgeLetter: string;
  companyName: string;
  text: string;
  daysAgo: number;
};
type FeedbackItemProps = { feedbackItem: FeedbackItem };

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const { upvoteCount, badgeLetter, companyName, text } = feedbackItem;
  return (
    <li className='feedback'>
      <button>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>
      <div>
        <p>{badgeLetter}</p>
      </div>
      <div>
        <p>{companyName}</p>
        <p>{text}</p>
      </div>
      <p>4d</p>
    </li>
  );
}
