// File: app/api/ai-summary/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { customPrompt } = req.body;

      const completion = await openai.createCompletion({
        model: "gpt-4o-mini",
        prompt: customPrompt,
        max_tokens: 500, // Adjust as needed
      });

      const response = completion.data.choices[0].text.trim();

      // Parse the response into structured data
      const [summary, codeExample, keyPointsRaw, version] = response.split('\n\n');

      const keyPoints = keyPointsRaw.split('\n').filter(point => point.trim() !== '');

      res.status(200).json({
        summary,
        codeExample,
        keyPoints,
        version,
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while generating the summary.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}