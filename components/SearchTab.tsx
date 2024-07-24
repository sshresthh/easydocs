// File: components/SearchTab.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { FaSearch, FaLightbulb, FaCode } from 'react-icons/fa';

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
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Explore Tech Concepts
      </h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a tech concept"
            className="w-full px-6 py-4 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <FaSearch className="mr-2" /> Search
              </span>
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="mb-8 p-4 bg-red-500 text-white rounded-lg">
          {error}
        </div>
      )}
      {result && !isLoading && (
        <div className="space-y-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-inner">
            <h3 className="text-2xl font-semibold mb-4 text-blue-400 flex items-center">
              <FaLightbulb className="mr-2" /> Explanation
            </h3>
            <p className="text-gray-300 leading-relaxed">{result.explanation}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-inner">
            <h3 className="text-2xl font-semibold mb-4 text-green-400 flex items-center">
              <FaLightbulb className="mr-2" /> Key Points
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              {result.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-300">{point}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 shadow-inner">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400 flex items-center">
              <FaCode className="mr-2" /> Quick Start
            </h3>
            <pre className="bg-gray-900 p-4 rounded text-gray-300 overflow-x-auto">
              <code>{result.quickStart}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}