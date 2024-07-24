// File: app/api/ai-summary/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  let technologies: string[] = [];
  let query: string = "";

  try {
    const body = await request.json();
    query = body.query;
    technologies = body.technologies || [];

    console.log(
      `Received request for query: "${query}" with technologies: ${technologies.join(
        ", "
      )}`
    );

    const prompt = `
      Act as a professional tech tutor and provide a comprehensive summary about ${query} in the context of ${technologies.join(
      ", "
    )}.
      Format your response exactly as follows:

      Summary:
      [4-5 sentence summary that even a layman can understand]

      Key Points:
      1. [Key point about ${query} 1 in the context of ${technologies.join(
      ", "
    )}]
      2. [Key point about ${query} 2 in the context of ${technologies.join(
      ", "
    )}]
      3. [Key point about ${query} 3 in the context of ${technologies.join(
      ", "
    )}]
      4. [Key point about ${query} 4 in the context of ${technologies.join(
      ", "
    )}]

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

    console.log("Sending request to OpenAI API...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 3000,
    });

    const response = completion.choices[0].message.content;

    if (!response) {
      throw new Error("No response from AI");
    }

    console.log("Received response from OpenAI API. Parsing response...");

    // Parse the response and remove any markdown artifacts
    const [summary, keyPoints, codeExample, bestPractices, commonPitfalls] =
      response
        .split("\n\n")
        .map((section) => section.replace(/^[#\s*`]+|[#\s*`]+$/g, "").trim());

    const result = {
      summary,
      keyPoints: keyPoints
        .split("\n")
        .map((point) => point.replace(/^\d+\.\s*/, "").trim()),
      codeExample,
      bestPractices: bestPractices
        .split("\n")
        .map((practice) => practice.replace(/^\d+\.\s*/, "").trim()),
      commonPitfalls: commonPitfalls
        .split("\n")
        .map((pitfall) => pitfall.replace(/^\d+\.\s*/, "").trim()),
      generatedAt: new Date().toISOString(),
    };

    console.log("Sending response to client...");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in AI summary generation:", error);

    // Fallback response
    return NextResponse.json(
      {
        summary: `We're sorry, but we couldn't generate a detailed response at this time. Here's some general information about ${technologies.join(
          " and "
        )}:`,
        keyPoints: [
          "Always refer to the official documentation for the most up-to-date information.",
          "Consider joining community forums or discussion groups for additional support.",
          "Practice regularly to improve your skills with these technologies.",
        ],
        codeExample:
          technologies.length > 0
            ? `// Example of using ${technologies[0]} (if applicable):\nconsole.log("Hello from ${technologies[0]}!");`
            : "// No technologies selected",
        bestPractices: [
          "Regularly update your dependencies",
          "Follow coding standards and best practices for each technology",
        ],
        commonPitfalls: [
          "Neglecting to handle errors properly",
          "Ignoring performance considerations",
        ],
        generatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
