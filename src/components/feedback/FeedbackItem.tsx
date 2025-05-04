import { TriangleUpIcon } from '@radix-ui/react-icons';
import { type TFeedbackItem } from '../../types';
import { useState } from 'react';

type FeedbackItemProps = { feedbackItem: TFeedbackItem };

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;
  const [open, setOpen] = useState(false);
  const [upvote, setUpvote] = useState(upvoteCount);

  const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpvote((prev) => ++prev);
    e.currentTarget.disabled = true;
    e.stopPropagation();
  };
  return (
    <li
      onClick={() => {
        setOpen((prev) => !prev);
      }}
      className={`feedback ${open ? 'feedback--expand' : ''}`}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvote}</span>
      </button>
      <div>
        <p>{badgeLetter}</p>
      </div>
      <div>
        <p>{company}</p>
        <p>{text}</p>
      </div>
      <p>{daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
    </li>
  );
}
