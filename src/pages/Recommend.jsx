// pages/Recommend.jsx
import React, { useState } from 'react';

const data = {
  clubs: [
    { name: 'International Student Club', desc: 'Promotes cultural exchange and supports foreign students.' },
    { name: 'Dance Club', desc: 'Offers regular K-pop, street, and modern dance sessions.' },
    { name: 'Photography Club', desc: 'For those into visual storytelling and media creation.' },
    { name: 'Volunteer Service Club', desc: 'Great for community engagement and social contribution.' },
  ],
  eateries: [
    { name: 'NQU Student Cafeteria', desc: 'Affordable Taiwanese meals, vegetarian options available.' },
    { name: '7-Eleven', desc: 'Quick meals and snacks, with Kinmen local items.' },
    { name: 'JSP (呷尚宝金門店)', desc: 'Affordable, quick, and tasty breakfast options favored by students and locals.' },
    { name: 'Milksha', desc: 'Student favorite. Must-try: Earl Grey Latte with pudding.' },
  ],
  studySpots: [
    { name: 'Main Library', desc: 'Great for quiet individual study or group discussions. Equipped with Wi-Fi, outlets, and AC.' },
    { name: 'Engineering Building Study Area', desc: 'Less crowded, ideal for deep work.' },
    { name: 'Cafeteria Upper Level', desc: 'Can be used during off-peak hours as a casual study zone.' },
  ],
  facilities: [
    { name: 'Sports Complex', desc: 'Includes basketball courts, tennis courts, gym, and badminton courts.' },
    { name: 'Computer Labs', desc: 'Located in the Information Engineering building – useful for coding or printing.' },
    { name: 'Student Activity Center', desc: 'Used for club meetings and campus events.' },
    { name: 'Health Center', desc: 'Basic medical care and counseling services.' },
  ],
  outdoor: [
    { name: 'NQU Lakeside Park', desc: 'Calm and scenic; great for reading or taking a break between classes.' },
    { name: 'Shuangli Wetlands (雙鯉濕地)', desc: 'Near campus, beautiful for bird watching and walking.' },
    { name: 'Houpu Old Street', desc: 'A short bike ride away, perfect for weekend wandering and snacks.' },
    { name: 'Health Center', desc: 'Basic medical care and counseling services.' },
  ],
  transportation: [
    { name: 'Bike Rentals on Campus', desc: 'Easy way to get around campus and into Jincheng town.' },
    { name: 'Bus to Kinmen City', desc: 'Use your EasyCard (悠遊卡) or StudentCard for short-distance public transit.' },
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
        <option value="facilities">Facilities</option>
        <option value="outdoor">Outdoor</option>
        <option value="transportation">Transportation</option>
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
