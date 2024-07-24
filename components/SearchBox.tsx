"use client";

import React, { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

interface SearchBoxProps {
  selectedTech: string[];
}

interface AIResponse {
  summary: string;
  keyPoints: string[];
  codeExample: string;
  bestPractices: string[];
  commonPitfalls: string[];
  generatedAt: string;
}

export default function SearchBox({ selectedTech }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const response = await fetch("/api/ai-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, technologies: selectedTech }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError(
        "An error occurred while fetching the information. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">Search</h2>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your selected technologies..."
            className="w-full h-14 px-5 pr-16 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300 ease-in-out shadow-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              <FaSearch className="text-xl" />
            )}
          </button>
        </div>
      </form>
      {error && (
        <div className="mb-8 p-4 bg-red-500 text-white rounded-lg text-center">
          {error}
        </div>
      )}
      {aiResponse && (
        <div className="space-y-8 bg-gray-800 rounded-lg p-6 shadow-lg text-white">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Summary
            </h3>
            <p>{aiResponse.summary}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Key Points
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {aiResponse.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">
              Code Example
            </h3>
            <pre className="bg-gray-900 p-4 rounded overflow-x-auto">
              <code>{aiResponse.codeExample}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-purple-400">
              Best Practices
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {aiResponse.bestPractices.map((practice, index) => (
                <li key={index}>{practice}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-red-400">
              Common Pitfalls
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {aiResponse.commonPitfalls.map((pitfall, index) => (
                <li key={index}>{pitfall}</li>
              ))}
            </ul>
          </div>
          <div className="text-sm text-gray-400 text-right">
            Generated at: {new Date(aiResponse.generatedAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
