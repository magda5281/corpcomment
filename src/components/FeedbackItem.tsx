import { TriangleUpIcon } from '@radix-ui/react-icons';
import { type FeedbackItem } from '../types';

type FeedbackItemProps = { feedbackItem: FeedbackItem };

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const { upvoteCount, badgeLetter, company, text } = feedbackItem;
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
        <p>{company}</p>
        <p>{text}</p>
      </div>
      <p>4d</p>
    </li>
  );
}
