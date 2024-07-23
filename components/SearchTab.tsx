"use client";

import React, { useEffect, useState } from "react";

export default function SearchTab({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    setResult(
      `AI-powered explanation for "${query}":\n\nHere's a beginner-friendly explanation of ${query}...\n\n[Detailed, simplified explanation would go here]\n\nKey Points:\n1. [Important concept 1]\n2. [Important concept 2]\n3. [Important concept 3]\n\nQuick Start:\n\`\`\`code\n// Example usage\n\`\`\``
    );
  };

  return (
    <div>
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
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {result && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <pre className="whitespace-pre-wrap text-white">{result}</pre>
        </div>
      )}
    </div>
  );
}
