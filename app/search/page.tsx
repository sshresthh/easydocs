// File: app/search/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';

export default function SearchPage({
  searchParams
}: {
  searchParams: { tech: string }
}) {
  const selectedTech = searchParams.tech ? searchParams.tech.split(',') : [];

  if (selectedTech.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Search Results</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Selected Technologies:</h2>
        <ul className="list-disc list-inside text-white">
          {selectedTech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}