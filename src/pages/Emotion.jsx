// pages/Emotion.jsx
import React, { useState, useEffect } from 'react';

const emotionMap = [
  {
    keywords: ['happy', 'excited', 'joy', 'great', 'awesome', 'good', 'fine', 'fantastic'],
    message: '😊 You seem happy! Keep that positive energy going!',
    color: 'bg-green-100 text-green-800',
  },
  {
    keywords: ['sad', 'tired', 'down', 'unhappy', 'depressed', 'blue'],
    message: "😔 It's okay to feel down sometimes. Remember to rest and reach out if needed.",
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    keywords: ['stressed', 'anxious', 'worried', 'nervous', 'tense'],
    message: "😟 Take deep breaths and don't hesitate to talk to a counselor or a friend.",
    color: 'bg-red-100 text-red-800',
  },
];

function analyzeEmotion(text) {
  const lower = text.toLowerCase();
  for (const { keywords, message, color } of emotionMap) {
    if (keywords.some((k) => lower.includes(k))) return { message, color };
  }
  return {
    message: "🙂 Thanks for sharing. Emotions can be complex — you're not alone.",
    color: 'bg-gray-100 text-gray-800',
  };
}

export default function Emotion() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  // Update result live
  useEffect(() => {
    if (text.trim() === '') setResult(null);
    else setResult(analyzeEmotion(text));
  }, [text]);

  const clearText = () => {
    setText('');
    setResult(null);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4 select-none">😊 Emotion Check</h2>
      <label htmlFor="emotion-input" className="mb-2 block font-medium">
        Tell us how you're feeling today:
      </label>
      <textarea
        id="emotion-input"
        rows={5}
        className="w-full border border-gray-400 rounded-lg p-3 mb-4 text-white-900 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="e.g. I feel really tired and homesick..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-describedby="emotion-hint"
      />
      <p id="emotion-hint" className="mb-4 text-sm text-gray-300">
        Type a few words about how you feel. Results update live.
      </p>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setResult(analyzeEmotion(text))} disabled={!text.trim()} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition">
          Check Emotion
        </button>
        <button onClick={clearText} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition" aria-label="Clear text input">
          Clear
        </button>
      </div>

      {result && (
        <div className={`${result.color} p-4 rounded-lg shadow-md border border-gray-300`} role="alert" aria-live="polite">
          <p className="text-lg font-medium">{result.message}</p>
        </div>
      )}
    </div>
  );
}
