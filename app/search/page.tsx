import React from 'react';
import { notFound } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import TechLogo from '@/components/TechLogo';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-start p-4">
      <h1 className="text-4xl font-bold text-white mb-8 mt-20">Technologies</h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg w-full max-w-3xl">
        <div className="flex justify-center items-center flex-wrap gap-4">
          {selectedTech.map((tech) => (
            <div key={tech} className="flex flex-col items-center">
              <TechLogo name={tech} className="w-16 h-16" />
              <span className="mt-2 text-sm text-white">{tech}</span>
            </div>
          ))}
        </div>
      </div>
      <SearchBox selectedTech={selectedTech} />
    </div>
  );
}