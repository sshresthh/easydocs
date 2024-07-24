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
      Give me a summary of ${technologies.join(', ')}.
      Please provide me detailed explainition of:
      "${query}"
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,  // Increased token limit for more detailed response
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error('No response from AI');
    }

    // Parse the response and remove any markdown artifacts
    const [summary, keyPoints, codeExample, bestPractices, commonPitfalls, furtherLearning, realWorldApplications] = response.split('\n\n')
      .map(section => section.replace(/^[#\s*`]+|[#\s*`]+$/g, '').trim());

    return NextResponse.json({
      summary,
      keyPoints: keyPoints.split('\n').map(point => point.replace(/^\d+\.\s*/, '').trim()),
      codeExample,
      bestPractices: bestPractices.split('\n').map(practice => practice.replace(/^\d+\.\s*/, '').trim()),
      commonPitfalls: commonPitfalls.split('\n').map(pitfall => pitfall.replace(/^\d+\.\s*/, '').trim()),
      furtherLearning: furtherLearning.split('\n').map(resource => resource.replace(/^\d+\.\s*/, '').trim()),
      realWorldApplications: realWorldApplications.split('\n').map(app => app.replace(/^\d+\.\s*/, '').trim()),
      generatedAt: new Date().toISOString(),
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
      realWorldApplications: ["Web applications", "Mobile app development", "Data analysis projects"],
      generatedAt: new Date().toISOString(),
    }, { status: 200 });
  }
}