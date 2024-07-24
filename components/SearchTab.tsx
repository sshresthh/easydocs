// File: components/SearchTab.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaSearch, FaSpinner } from 'react-icons/fa';

interface SearchTabProps {
  initialQuery?: string;
}

interface SearchResult {
  explanation: string;
  keyPoints: string[];
  quickStart: string;
}

export default function SearchTab({ initialQuery = "" }: SearchTabProps) {
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setResult({
        explanation: `Here's a beginner-friendly explanation of ${query}...\n\n[Detailed, simplified explanation would go here]`,
        keyPoints: [
          "Important concept 1",
          "Important concept 2",
          "Important concept 3"
        ],
        quickStart: `// Example usage\nconsole.log("Hello, ${query}!");`
      });
    } catch (err) {
      setError("An error occurred while fetching the results. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery, handleSearch]);

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-100">
        Tech Explorer
      </h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a tech concept..."
            className="w-full px-6 py-4 bg-white text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out placeholder-gray-500"
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
      {result && !isLoading && (
        <div className="space-y-8 bg-gray-800 rounded-lg p-6 shadow-lg">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Explanation</h3>
            <p className="text-gray-300 leading-relaxed">{result.explanation}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3 text-green-400">Key Points</h3>
            <ul className="list-disc pl-6 space-y-2">
              {result.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-300">{point}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">Quick Start</h3>
            <pre className="bg-gray-900 p-4 rounded text-gray-300 overflow-x-auto">
              <code>{result.quickStart}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}