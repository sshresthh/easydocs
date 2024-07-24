// File: app/api/ai-summary/route.ts
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { query, technologies } = await request.json();

  const prompt = `
    Provide a concise summary about ${query} in the context of ${technologies.join(
    ", "
  )}.
    Include:
    1. A brief explanation (2-3 sentences)
    2. 3 key points
    3. A short code example (5-10 lines)
    4. 2 best practices
    5. 2 common pitfalls
    Be concise and focus on the most important information.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "user", content: prompt }],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
