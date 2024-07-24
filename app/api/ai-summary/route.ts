// File: app/api/ai-summary/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  let technologies: string[] = [];
  let query: string = '';

  try {
    const body = await request.json();
    query = body.query;
    technologies = body.technologies || [];

    const prompt = `
      You are an AI assistant specialized in providing detailed, accurate information about various technologies. 
      The user has selected the following technologies: ${technologies.join(', ')}.
      Please provide comprehensive information addressing the following query, focusing only on the selected technologies:
      "${query}"
      Your response should be structured as follows:
      1. Summary: A detailed 5-6 line explanation of the concept, its importance, and its relation to the selected technologies.
      2. Key Points: 5-7 important points about the concept, each explained in 1-2 sentences.
      3. Code Example: A substantial, well-commented code example (15-20 lines) demonstrating the concept in action, using the selected technologies where relevant.
      4. Best Practices: 3-5 best practices or tips for using this concept effectively.
      5. Common Pitfalls: 2-3 common mistakes or misconceptions to avoid.
      6. Further Learning: 2-3 suggested resources or topics for deeper understanding.
      7. Version Info: The current version or date of the information you're providing.
      
      Please ensure all information is up-to-date, beginner-friendly, and provides a comprehensive understanding of the topic.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,  // Increased token limit for more detailed response
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error('No response from AI');
    }

    // Parse the response
    const [summary, keyPoints, codeExample, bestPractices, commonPitfalls, furtherLearning, versionInfo] = response.split('\n\n');

    return NextResponse.json({
      summary: summary || 'No summary provided',
      keyPoints: keyPoints ? keyPoints.split('\n').filter(point => point.trim() !== '') : ['No key points provided'],
      codeExample: codeExample || 'No code example provided',
      bestPractices: bestPractices ? bestPractices.split('\n').filter(practice => practice.trim() !== '') : ['No best practices provided'],
      commonPitfalls: commonPitfalls ? commonPitfalls.split('\n').filter(pitfall => pitfall.trim() !== '') : ['No common pitfalls provided'],
      furtherLearning: furtherLearning ? furtherLearning.split('\n').filter(resource => resource.trim() !== '') : ['No further learning resources provided'],
      versionInfo: versionInfo || 'Version information not available',
    });
  } catch (error) {
    console.error('Error in AI summary generation:', error);
    
    // Fallback response
    return NextResponse.json({
      summary: `We're sorry, but we couldn't generate a detailed response at this time. Here's some general information about ${technologies.join(' and ')}:`,
      keyPoints: [
        "Always refer to the official documentation for the most up-to-date information.",
        "Consider joining community forums or discussion groups for additional support.",
        "Practice regularly to improve your skills with these technologies."
      ],
      codeExample: technologies.length > 0 ? `// Example of using ${technologies[0]} (if applicable):\nconsole.log("Hello from ${technologies[0]}!");` : '// No technologies selected',
      bestPractices: ["Regularly update your dependencies", "Follow coding standards and best practices for each technology"],
      commonPitfalls: ["Neglecting to handle errors properly", "Ignoring performance considerations"],
      furtherLearning: ["Official documentation", "Online courses and tutorials"],
      versionInfo: "Fallback information as of July 2024",
    }, { status: 200 });
  }
}