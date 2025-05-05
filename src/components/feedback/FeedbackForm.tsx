import { useState } from 'react';
import { MAX_CHARACTERS } from '../../lib/constants';

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};
export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setStatus('idle');
    setText(newText);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isGood = text.includes('#') && text.length > 5;
    setStatus(isGood ? 'valid' : 'invalid');
    if (!isGood) return;
    onAddToList(text);
    setText('');
    setTimeout(() => {
      setStatus('idle');
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${status === 'valid' ? 'form--valid' : ''} ${
        status === 'invalid' ? 'form--invalid' : ''
      }`}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id='feedback-textarea'
        placeholder='placeholder'
        spellCheck={false}
      />
      <label htmlFor='feedback-textarea'>
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className='u-italic'>{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
