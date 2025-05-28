// pages/CourseSearch.jsx
import React, { useState, useEffect } from 'react';

const allCourses = [
  {
    code: 'ICL101',
    name: 'Introduction to Cross-Strait Relations',
    description: 'Explore the political, economic, and cultural relations between Taiwan and Mainland China.',
  },
  {
    code: 'BUS201',
    name: 'Principles of International Business',
    description: 'Fundamentals of global business operations, trade, and cross-cultural management.',
  },
  {
    code: 'CHN102',
    name: 'Chinese Language for Beginners',
    description: 'Basic Mandarin speaking, listening, reading, and writing skills for non-native speakers.',
  },
  {
    code: 'CULT210',
    name: 'Kinmen Cultural Studies',
    description: 'Examine Kinmen’s unique history, architecture, and local traditions.',
  },
  {
    code: 'ITC205',
    name: 'Introduction to Information Technology',
    description: 'Covers digital literacy, networks, and fundamental computing concepts.',
  },
  {
    code: 'HIS305',
    name: 'History of East Asia',
    description: 'Survey of Chinese, Japanese, and Korean history with a focus on regional influence.',
  },
  {
    code: 'POL310',
    name: 'Global Governance and International Organizations',
    description: 'Study of the UN, WTO, and regional alliances in global politics.',
  },
  {
    code: 'ENV150',
    name: 'Environmental Issues in Taiwan and East Asia',
    description: 'An interdisciplinary look at ecological and sustainability issues in the region.',
  },
];

export default function CourseSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState(null);

  // Debounce search input to avoid excessive filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        setExpanded(null);
        return;
      }
      const q = query.toLowerCase();
      const filtered = allCourses.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
      setResults(filtered);
      setExpanded(null);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const toggleExpand = (code) => {
    setExpanded((prev) => (prev === code ? null : code));
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4 select-none">📚 Course Search</h2>
      <label htmlFor="course-search" className="mb-2 block font-medium">
        Search NQU course names or codes:
      </label>
      <input
        id="course-search"
        type="search"
        className="w-full border border-gray-400 rounded-lg p-3 mb-6 text-white-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="e.g. CS101 or economics"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-describedby="course-search-help"
      />
      <p id="course-search-help" className="mb-4 text-sm text-gray-300">
        Start typing to find courses. Results update automatically.
      </p>

      {results.length > 0 ? (
        <ul className="bg-white border border-gray-300 rounded-lg divide-y divide-gray-200">
          {results.map(({ code, name, description }) => (
            <li key={code} className="p-4 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-indigo-700">
                  {code} - {name}
                </span>
                <button onClick={() => toggleExpand(code)} aria-expanded={expanded === code} aria-controls={`desc-${code}`} className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline">
                  {expanded === code ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              {expanded === code && (
                <p id={`desc-${code}`} className="mt-2 text-gray-700">
                  {description}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : query.trim() ? (
        <p className="text-yellow-400 font-medium">No courses found matching "{query}". Try different keywords.</p>
      ) : (
        <p className="text-gray-400 italic">Please enter a course code or name to search.</p>
      )}
    </div>
  );
}
