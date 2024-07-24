// File: components/SearchBox.tsx
'use client';

import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

interface SearchBoxProps {
  selectedTech: string[];
}

interface AIResponse {
  summary: string;
  codeExample: string;
  keyPoints: string[];
  version: string;
}

export default function SearchBox({ selectedTech }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResponse(null);
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
          Generating insights...
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}
      {aiResponse && (
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-2">AI Insights:</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Summary:</h3>
            <p>{aiResponse.summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Code Example:</h3>
            <pre className="bg-gray-100 p-2 rounded">{aiResponse.codeExample}</pre>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Key Points:</h3>
            <ul className="list-disc list-inside">
              {aiResponse.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-gray-500">
            Version: {aiResponse.version}
          </div>
        </div>
      )}
    </div>
  );
}