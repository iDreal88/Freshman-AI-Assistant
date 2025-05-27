// pages/Recommend.jsx
import React, { useState } from 'react';

const data = {
  clubs: [
    { name: 'NQU Basketball Club', desc: 'Join for weekly basketball games and tournaments.' },
    { name: 'Debate Society', desc: 'Sharpen your public speaking and argument skills.' },
    { name: 'Coding Club', desc: 'Hackathons, coding workshops, and project collaboration.' },
  ],
  eateries: [
    { name: 'North Spine Food Court', desc: 'Affordable local meals with a wide variety.' },
    { name: 'Starbucks, Innovation Wing', desc: 'Great spot for coffee and studying.' },
    { name: 'The Deck', desc: 'Casual dining with western and local fusion.' },
  ],
  studySpots: [
    { name: 'LT19 Library', desc: 'Quiet study rooms with great natural light.' },
    { name: 'Innovation Wing Rooftop', desc: 'Outdoor study area with scenic views.' },
    { name: 'Hall 5 Common Room', desc: 'Relaxed atmosphere with couches and snacks.' },
  ],
};

export default function Recommend() {
  const [category, setCategory] = useState('clubs');

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 select-none">🎯 Recommendations</h2>

      <label htmlFor="category-select" className="block mb-2 font-medium">
        Choose a category:
      </label>
      <select
        id="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white-900"
        aria-label="Select recommendation category"
      >
        <option value="clubs">Clubs</option>
        <option value="eateries">Eateries</option>
        <option value="studySpots">Study Spots</option>
      </select>

      <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {data[category].map(({ name, desc }) => (
          <li key={name} className="p-4 hover:bg-indigo-50 transition cursor-default select-none">
            <strong className="text-indigo-700">{name}</strong>
            <p className="text-gray-700 mt-1">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
