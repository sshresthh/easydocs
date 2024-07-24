// File: app/search/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import SearchBox from "@/components/SearchBox";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { tech: string };
}) {
  const selectedTech = searchParams.tech ? searchParams.tech.split(",") : [];

  if (selectedTech.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-start p-4">
      <h1 className="text-4xl font-bold text-white mb-8 mt-20">
        AI-Powered Tech Insights
      </h1>
      <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Selected Technologies:
        </h2>
        <div className="flex flex-wrap gap-2">
          {selectedTech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <SearchBox selectedTech={selectedTech} />
    </div>
  );
}
