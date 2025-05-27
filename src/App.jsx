// app.jsx
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const ChatBot = lazy(() => import('./pages/ChatBot'));
const Recommend = lazy(() => import('./pages/Recommend'));
const Emotion = lazy(() => import('./pages/Emotion'));
const CourseSearch = lazy(() => import('./pages/CourseSearch'));

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <Router>
      <div className= "min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white font-sans transition-colors duration-500">
        <header className="bg-zinc-950 shadow-md p-4 sticky top-0 z-40">
          <nav className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6" aria-label="Primary Navigation">
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span aria-hidden="true" role="img">
                🎓
              </span>{' '}
              Freshman AI Assistant
            </h1>

            <button aria-label="Toggle menu" className="md:hidden p-2 rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={toggleMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>

            <div className={`flex flex-col md:flex-row md:items-center text-indigo-300 font-medium transition-all duration-300 ease-in-out ${menuOpen ? 'block' : 'hidden'} md:block`}>
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 items-start md:items-center">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/chat', label: 'ChatBot' },
                  { to: '/recommend', label: 'Recommendations' },
                  { to: '/emotion', label: 'Emotion Check' },
                  { to: '/courses', label: 'Course Search' },
                ].map(({ to, label }) => (
                  <NavLink key={to} to={to} end className={({ isActive }) => `hover:text-white transition-colors duration-200 ${isActive ? 'text-white font-bold underline' : ''}`}>
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </header>

        <main className="py-12 px-6 max-w-7xl mx-auto bg-zinc-800 shadow-2xl rounded-xl mt-6 min-h-[70vh]">
          <Suspense fallback={<div className="text-center text-indigo-400">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<ChatBot />} />
              <Route path="/recommend" element={<Recommend />} />
              <Route path="/emotion" element={<Emotion />} />
              <Route path="/courses" element={<CourseSearch />} />
              <Route path="*" element={<p className="text-center text-red-400">404 - Page Not Found</p>} />
            </Routes>
          </Suspense>
        </main>

        <footer className="bg-zinc-950 border-t border-zinc-800 mt-10 py-4 text-center text-sm text-zinc-400 shadow-inner select-none">&copy; {new Date().getFullYear()} Freshman AI Assistant. All rights reserved.</footer>
      </div>
    </Router>
  );
}
