// File: components/SearchBox.tsx
'use client';

import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

interface SearchBoxProps {
  selectedTech: string[];
}

interface AIResponse {
  summary: string;
  codeExample: string;
  keyPoints: string[];
  version: string;
}

export default function SearchBox({ selectedTech }: SearchBoxProps) {
  // ... (rest of the component code remains the same)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiResponse(null);

    const customPrompt = generateCustomPrompt(query, selectedTech);

    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customPrompt, query, technologies: selectedTech }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setAiResponse({
        summary: 'An error occurred while fetching the information. Please try again.',
        codeExample: '',
        keyPoints: [],
        version: '',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ... (rest of the component code remains the same)
}