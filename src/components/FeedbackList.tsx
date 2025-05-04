import FeedbackItem from './FeedbackItem';

const feedbackItems = [
  {
    upvoteCount: 593,
    badgeLetter: 'B',
    companyName: 'ByteGrad',
    text: 'test test test',
    daysAgo: 4,
  },
  {
    upvoteCount: 500,
    badgeLetter: 'S',
    companyName: 'Sturbucks',
    text: 'blb blb blb',
    daysAgo: 3,
  },
];
export default function FeedbackList() {
  return (
    <ol className='feedback-list'>
      {feedbackItems.map((feedbackItem, i) => (
        <FeedbackItem
          key={`${feedbackItem.companyName}-${i}`}
          feedbackItem={feedbackItem}
        />
      ))}
    </ol>
  );
}
