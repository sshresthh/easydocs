// File: app/api/ai-summary/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { query, technologies } = await request.json();

    const prompt = `
      You are an AI assistant specialized in providing concise, accurate information about various technologies. 
      The user has selected the following technologies: ${technologies.join(', ')}.
      Please provide information addressing the following query, focusing only on the selected technologies:
      "${query}"
      Your response should be structured as follows:
      1. A 3-4 line summary on how to use the queried tech or feature, in the context of the selected technologies.
      2. A beginner-friendly code example demonstrating the use of the queried tech or feature, incorporating only the selected technologies where relevant.
      3. 3-5 main points to keep in mind while using this tech or feature, in the context of the selected technologies.
      4. The current version or date of the information you're providing.
      Please ensure all information is up-to-date and beginner-friendly, assuming the reader has little to no prior knowledge.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    const response = completion.choices[0].message.content;

    // Parse the response
    const [summary, codeExample, keyPointsRaw, version] = response.split('\n\n');
    const keyPoints = keyPointsRaw.split('\n').filter(point => point.trim() !== '');

    return NextResponse.json({
      summary,
      codeExample,
      keyPoints,
      version,
    });
  } catch (error) {
    console.error('Error in AI summary generation:', error);
    return NextResponse.json({ error: 'Failed to generate AI summary' }, { status: 500 });
  }
}