// File: app/api/ai-summary/route.ts
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { query, technologies } = await req.json();

  const prompt = `
    Act as a professional tech tutor and provide a comprehensive summary about ${query} in the context of ${technologies.join(
    ", "
  )}.
    Format your response exactly as follows:

    Summary:
    [4-5 sentence summary that even a layman can understand]

    Key Points:
    1. [Key point about ${query} 1 in the context of ${technologies.join(", ")}]
    2. [Key point about ${query} 2 in the context of ${technologies.join(", ")}]
    3. [Key point about ${query} 3 in the context of ${technologies.join(", ")}]
    4. [Key point about ${query} 4 in the context of ${technologies.join(", ")}]

    Code Example:
    \`\`\`javascript
    [A good code example with at least 15-20 lines that shows the use of ${query} in the context of ${technologies.join(
    ", "
  )}]
    \`\`\`

    Best Practices:
    1. [Best practice of ${query} 1 in the context of ${technologies.join(
    ", "
  )}]
    2. [Best practice of ${query} 2 in the context of ${technologies.join(
    ", "
  )}]

    Common Pitfalls:
    1. [Common pitfall of ${query} 1]
    2. [Common pitfall of ${query} 2]

    Be concise and focus on the most important information so that any developer from beginner to pro can understand.
  `;

  const response: any = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 2000,
    temperature: 0.7,
  });
  
  const stream = response.stream();
  return new Response(stream);
}
