// File: components/SearchTab.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";

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
      // In a real application, this would be an API call
      // For demonstration, we're simulating an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      setResult({
        explanation: `Here's a beginner-friendly explanation of ${query}...\n\n[Detailed, simplified explanation would go here]`,
        keyPoints: [
          "[Important concept 1]",
          "[Important concept 2]",
          "[Important concept 3]"
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
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 gradient-text">
        Search Documentation
      </h2>
      <form onSubmit={handleSearch} className="flex space-x-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a tech concept"
          className="input input-bordered flex-1 bg-gray-800 text-white"
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {isLoading && (
        <div className="mt-6 text-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-500 text-white rounded-lg">
          {error}
        </div>
      )}
      {result && !isLoading && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Explanation</h3>
          <p className="text-white mb-6">{result.explanation}</p>
          
          <h3 className="text-xl font-semibold mb-4 text-white">Key Points</h3>
          <ul className="list-disc pl-6 mb-6">
            {result.keyPoints.map((point, index) => (
              <li key={index} className="text-white">{point}</li>
            ))}
          </ul>
          
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Start</h3>
          <pre className="bg-gray-900 p-4 rounded text-white overflow-x-auto">
            <code>{result.quickStart}</code>
          </pre>
        </div>
      )}
    </div>
  );
}