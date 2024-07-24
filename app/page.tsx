// File: app/page.tsx
import React from 'react';
import TechSelector from '@/components/TechSelector';

const techList = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Django',
  'JavaScript', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'MongoDB', 'Spring Boot',
  'Ruby on Rails', 'Flutter', 'Swift', 'Kotlin', 'GraphQL', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'Firebase', 'Redux', 'Jest'
];


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Choose Your Technologies</h1>
      <TechSelector techList={techList} />
    </div>
  );
}