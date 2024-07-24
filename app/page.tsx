// File: app/page.tsx
import React from 'react';
import TechSelector from '@/components/TechSelector';

const techList = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Django',
  'JavaScript', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'MongoDB', 'Spring Boot'
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Choose Your Technologies</h1>
      <TechSelector techList={techList} />
    </div>
  );
}