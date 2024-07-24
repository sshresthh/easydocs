// app/page.tsx
import React from 'react';
import Link from 'next/link';
import TechLogo from '@/components/TechLogo';

const techCards = [
  { name: 'React', route: '/docs/react' },
  { name: 'Next.js', route: '/docs/nextjs' },
  { name: 'Vue.js', route: '/docs/vue' },
  { name: 'Angular', route: '/docs/angular' },
  { name: 'Node.js', route: '/docs/nodejs' },
  { name: 'Python', route: '/docs/python' },
  { name: 'Django', route: '/docs/django' },
  { name: 'JavaScript', route: '/docs/javascript' },
  { name: 'TypeScript', route: '/docs/typescript' },
  { name: 'TailwindCSS', route: '/docs/tailwindcss' },
  { name: 'PostgreSQL', route: '/docs/postgresql' },
  { name: 'MongoDB', route: '/docs/mongodb' },
  { name: 'Spring Boot', route: '/docs/spring-boot' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto mt-12 p-4">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Ask about any technology..."
            className="w-full p-4 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Browse Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techCards.map((tech) => (
            <Link href={tech.route} key={tech.name} className="block">
              <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <div className="flex items-center space-x-3">
                  <TechLogo name={tech.name} />
                  <span className="text-lg font-medium">{tech.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}