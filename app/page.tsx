import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const techCards = [
  { name: 'React', logo: '/react-logo.png', route: '/docs/react' },
  { name: 'Next.js', logo: '/nextjs-logo.png', route: '/docs/nextjs' },
  { name: 'Supabase', logo: '/supabase-logo.png', route: '/docs/supabase' },
  { name: 'TailwindCSS', logo: '/tailwind-logo.png', route: '/docs/tailwindcss' },
  { name: 'Laravel', logo: '/laravel-logo.png', route: '/docs/laravel' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold gradient-text">EasyDocs</h1>
      </header>
      <main className="max-w-4xl mx-auto mt-12 p-4">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Ask about any technology..."
            className="w-full p-4 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Recent Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {techCards.map((tech) => (
            <Link href={tech.route} key={tech.name} className="block">
              <div className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-200">
                <div className="flex items-center space-x-3">
                  <Image src={tech.logo} alt={`${tech.name} logo`} width={40} height={40} />
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