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

  const generateCustomPrompt = (userQuery: string, technologies: string[]) => {
    return `You are an AI assistant specialized in providing beginner-friendly information about various technologies. 
    The user has selected the following technologies: ${technologies.join(', ')}.
    Please provide information addressing the following query, focusing only on the selected technologies:
    "${userQuery}"
    Your response should be structured as follows:
    1. A 3-4 line summary on how to use the queried tech or feature, in the context of the selected technologies.
    2. A beginner-friendly code example demonstrating the use of the queried tech or feature, incorporating only the selected technologies where relevant.
    3. 3-5 main points to keep in mind while using this tech or feature, in the context of the selected technologies.
    4. The current version or date of the information you're providing.
    Please ensure all information is up-to-date and beginner-friendly, assuming the reader has little to no prior knowledge.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResponse(null);

    const customPrompt = generateCustomPrompt(query, selectedTech);

    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customPrompt, query, technologies: selectedTech }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setAiResponse({
        summary: 'An error occurred while fetching the information. Please try again.',
        codeExample: '',
        keyPoints: [],
        version: '',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
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
      {aiResponse && (
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">AI Insights:</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Summary:</h3>
            <p className="text-gray-700">{aiResponse.summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Code Example:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{aiResponse.codeExample}</code>
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Key Points:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {aiResponse.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-gray-500 mt-4">
            Version/Date: {aiResponse.version}
          </div>
        </div>
      )}
    </div>
  );
}