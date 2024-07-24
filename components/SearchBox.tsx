// File: components/SearchBox.tsx
'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';

interface SearchBoxProps {
  selectedTech: string[];
}

interface FormattedResponse {
  summary: string;
  keyPoints: string[];
  codeExample: string;
  bestPractices: string[];
  commonPitfalls: string[];
}

export default function SearchBox({ selectedTech }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<FormattedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  const formatResponse = (text: string): FormattedResponse => {
    const sections = text.split('####').filter(s => s.trim());
    const formatted: FormattedResponse = {
      summary: '',
      keyPoints: [],
      codeExample: '',
      bestPractices: [],
      commonPitfalls: []
    };

    sections.forEach(section => {
      const [title, ...content] = section.split('\n');
      const cleanContent = content.join('\n').replace(/^\s*\d+\.\s*/gm, '').trim();

      switch (title.trim().toLowerCase()) {
        case 'summary':
          formatted.summary = cleanContent;
          break;
        case 'key points':
          formatted.keyPoints = cleanContent.split('\n').map(p => p.replace(/^\*\*.*?\*\*:/, '').trim());
          break;
        case 'code example':
          formatted.codeExample = cleanContent.replace(/```javascript|```/g, '').trim();
          break;
        case 'best practices':
          formatted.bestPractices = cleanContent.split('\n').map(p => p.replace(/^\*\*.*?\*\*:/, '').trim());
          break;
        case 'common pitfalls':
          formatted.commonPitfalls = cleanContent.split('\n').map(p => p.replace(/^\*\*.*?\*\*:/, '').trim());
          break;
      }
    });

    return formatted;
  };

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, technologies: selectedTech }),
      });

      if (!res.ok) throw new Error('Failed to fetch summary');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader available');

      let fullResponse = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = new TextDecoder().decode(value);
        fullResponse += text;
        setResponse(formatResponse(fullResponse));
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      setError('An error occurred while fetching the information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedTech]);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

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
      {response && (
        <div ref={responseRef} className="bg-gray-800 rounded-lg p-6 shadow-lg text-gray-300 space-y-6 max-h-96 overflow-y-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-400">Summary</h3>
            <p>{response.summary}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-green-400">Key Points</h3>
            <ul className="list-disc pl-5 space-y-1">
              {response.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Code Example</h3>
            <pre className="bg-gray-900 p-4 rounded overflow-x-auto">
              <code>{response.codeExample}</code>
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Best Practices</h3>
            <ul className="list-disc pl-5 space-y-1">
              {response.bestPractices.map((practice, index) => (
                <li key={index}>{practice}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-red-400">Common Pitfalls</h3>
            <ul className="list-disc pl-5 space-y-1">
              {response.commonPitfalls.map((pitfall, index) => (
                <li key={index}>{pitfall}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}