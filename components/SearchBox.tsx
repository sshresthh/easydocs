// File: components/SearchBox.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';

interface SearchBoxProps {
  selectedTech: string[];
}

interface AIResponse {
  summary: string;
  keyPoints: string[];
  codeExample: string;
  bestPractices: string[];
  commonPitfalls: string[];
  furtherLearning: string[];
  versionInfo: string;
}

export default function SearchBox({ selectedTech }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
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
      setAiResponse(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setError('An error occurred while fetching the information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedTech]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">
        Tech Explorer
      </h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your selected technologies..."
            className="w-full px-5 py-3 pr-10 text-sm text-black bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
          </button>
        </div>
      </form>
      {error && (
        <div className="mb-8 p-4 bg-red-500 text-white rounded-lg text-center">
          {error}
        </div>
      )}
      {aiResponse && (
        <div className="space-y-8 bg-gray-800 rounded-lg p-6 shadow-lg">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Summary</h3>
            <p className="text-gray-300 leading-relaxed">{aiResponse.summary}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3 text-green-400">Key Points</h3>
            <ul className="list-disc pl-6 space-y-2">
              {aiResponse.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-300">{point}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Code Example</h3>
            <pre className="bg-gray-900 p-4 rounded text-gray-300 overflow-x-auto">
              <code>{aiResponse.codeExample}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">Best Practices</h3>
            <ul className="list-disc pl-6 space-y-2">
              {aiResponse.bestPractices.map((practice, index) => (
                <li key={index} className="text-gray-300">{practice}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-red-400">Common Pitfalls</h3>
            <ul className="list-disc pl-6 space-y-2">
              {aiResponse.commonPitfalls.map((pitfall, index) => (
                <li key={index} className="text-gray-300">{pitfall}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">Further Learning</h3>
            <ul className="list-disc pl-6 space-y-2">
              {aiResponse.furtherLearning.map((resource, index) => (
                <li key={index} className="text-gray-300">{resource}</li>
              ))}
            </ul>
          </div>

          <div className="text-sm text-gray-400">
            Version: {aiResponse.versionInfo}
          </div>
        </div>
      )}
    </div>
  );
}