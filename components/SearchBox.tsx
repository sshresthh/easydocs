// File: components/SearchBox.tsx
'use client';

import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

interface SearchBoxProps {
  selectedTech: string[];
}

export default function SearchBox({ selectedTech }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSummary('');

    try {
      // This is a placeholder for the actual API call
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, technologies: selectedTech }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('An error occurred while fetching the summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your selected technologies..."
            className="w-full px-5 py-3 pr-10 text-sm bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition duration-300 ease-in-out"
          >
            <FaRobot size={18} />
          </button>
        </div>
      </form>
      {isLoading && (
        <div className="text-white text-center">
          Generating summary...
        </div>
      )}
      {summary && (
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-2">AI Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}