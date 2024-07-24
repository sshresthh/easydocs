// File: components/TechSelector.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TechLogo from './TechLogo';

interface TechSelectorProps {
  techList: string[];
}

export default function TechSelector({ techList }: TechSelectorProps) {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const router = useRouter();

  const handleTechClick = (tech: string) => {
    setSelectedTech(prev => {
      if (prev.includes(tech)) {
        return prev.filter(t => t !== tech);
      } else if (prev.length < 4) {
        return [...prev, tech];
      }
      return prev;
    });
  };

  const handleProceed = () => {
    if (selectedTech.length > 0) {
      router.push(`/search?tech=${selectedTech.join(',')}`);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mb-8">
        {techList.map((tech) => (
          <button
            key={tech}
            onClick={() => handleTechClick(tech)}
            className={`p-4 rounded-lg transition-all transform hover:scale-105 ${
              selectedTech.includes(tech) 
                ? 'bg-blue-500 shadow-lg' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <TechLogo name={tech} className="w-16 h-16 mx-auto mb-2" />
            <p className="text-white text-center">{tech}</p>
          </button>
        ))}
      </div>
      <button
        onClick={handleProceed}
        disabled={selectedTech.length === 0}
        className={`px-6 py-3 rounded-full text-white font-semibold transition-all ${
          selectedTech.length > 0
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-600 cursor-not-allowed'
        }`}
      >
        Proceed
      </button>
    </div>
  );
}