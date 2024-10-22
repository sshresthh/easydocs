// File: components/TechLogo.tsx
import React from 'react';
import Image from 'next/image';

interface TechLogoProps {
  name: string;
  className?: string;
}

const logoMap: { [key: string]: string } = {
  'React': '/images/logos/react-logo.svg',
  'Next.js': '/images/logos/nextjs-logo.svg',
  'Vue.js': '/images/logos/vue-logo.svg',
  'Angular': '/images/logos/angular-logo.svg',
  'Node.js': '/images/logos/nodejs-logo.svg',
  'Python': '/images/logos/python-logo.svg',
  'Django': '/images/logos/django-logo.svg',
  'JavaScript': '/images/logos/javascript-logo.svg',
  'TypeScript': '/images/logos/typescript-logo.svg',
  'TailwindCSS': '/images/logos/tailwind-logo.svg',
  'PostgreSQL': '/images/logos/postgresql-logo.svg',
  'MongoDB': '/images/logos/mongodb-logo.svg',
  'Spring Boot': '/images/logos/spring-boot-logo.svg',
  'Ruby on Rails': '/images/logos/rails-logo.svg',
  'Flutter': '/images/logos/flutter-logo.svg',
  'Swift': '/images/logos/swift-logo.svg',
  'Kotlin': '/images/logos/kotlin-logo.svg',
  'GraphQL': '/images/logos/graphql-logo.svg',
  'Docker': '/images/logos/docker-logo.svg',
  'Kubernetes': '/images/logos/kubernetes-logo.svg',
  'AWS': '/images/logos/aws-logo.svg',
  'Azure': '/images/logos/azure-logo.svg',
  'Firebase': '/images/logos/firebase-logo.svg',
  'Redux': '/images/logos/redux-logo.svg',
  'Jest': '/images/logos/jest-logo.svg',
};


export default function TechLogo({ name, className = '' }: TechLogoProps) {
  const logoSrc = logoMap[name];

  if (!logoSrc) {
    return null;
  }

  return (
    <Image 
      src={logoSrc} 
      alt={`${name} logo`} 
      width={40} 
      height={40} 
      className={className}
    />
  );
}