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
      You are an AI assistant specialized in providing comprehensive, accurate information about various technologies. 
      The user has selected the following technologies: ${technologies.join(', ')}.
      Please provide detailed information addressing the following query, focusing on the selected technologies:
      "${query}"
      Your response should be structured as follows:
      - A detailed 10-12 line explanation of the concept, its importance, and its relation to the selected technologies.
      - Key Points: 8-10 important points about the concept, each explained in 2-3 sentences.
      - Code Example: A comprehensive, well-commented code example (30-40 lines) demonstrating the concept in action, using ALL the selected technologies where relevant. Ensure the example is practical and showcases real-world usage.
      - Best Practices: 5-7 best practices or tips for using this concept effectively, each with a brief explanation.
      - Common Pitfalls: 4-5 common mistakes or misconceptions to avoid, with explanations on why they occur and how to prevent them.
      6. Further Learning: 4-5 suggested resources or topics for deeper understanding, with a brief description of what each resource offers.
      7. Real-world Applications: 3-4 examples of how this concept is used in real-world applications or projects.
      
      Please ensure all information is up-to-date, provides a comprehensive understanding of the topic, and is tailored to an audience with some programming experience. Do not use any markdown formatting in your response.
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