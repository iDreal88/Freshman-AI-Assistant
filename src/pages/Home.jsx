// pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold mb-6 select-none">
        Welcome to <span className="text-indigo-400">Freshman AI Assistant</span> 🎓
      </h1>
      <p className="text-lg mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">Your friendly AI assistant to help new NTU freshmen navigate campus life, find courses, get recommendations, chat anytime, and check in on your emotions.</p>

      <div className="flex flex-wrap justify-center gap-6">
        <Link to="/chat" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition" aria-label="Go to ChatBot">
          Chat with AI 🤖
        </Link>
        <Link to="/recommend" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition" aria-label="Go to Recommendations">
          Get Recommendations 🎯
        </Link>
        <Link to="/emotion" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition" aria-label="Go to Emotion Check">
          Emotion Check 😊
        </Link>
        <Link to="/courses" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition" aria-label="Go to Course Search">
          Course Search 📚
        </Link>
      </div>
    </div>
  );
}
