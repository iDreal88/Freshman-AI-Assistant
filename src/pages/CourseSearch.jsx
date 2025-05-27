// pages/CourseSearch.jsx
import React, { useState, useEffect } from 'react';

const allCourses = [
  { code: 'CS101', name: 'Intro to Computer Science', description: 'Learn the basics of computer science and programming.' },
  { code: 'MATH203', name: 'Linear Algebra', description: 'Matrix theory, vector spaces, eigenvalues and eigenvectors.' },
  { code: 'PHYS110', name: 'Physics I', description: 'Mechanics, waves, and thermodynamics.' },
  { code: 'ECON101', name: 'Principles of Economics', description: 'Introduction to micro and macroeconomics.' },
  { code: 'PSY200', name: 'Developmental Psychology', description: 'Study of human growth and development across lifespan.' },
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
        Search NTU course names or codes:
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
