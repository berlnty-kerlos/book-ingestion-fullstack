import { GoogleGenerativeAI } from "@google/generative-ai";
import pLimit from "p-limit";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model:  "gemini-2.5-flash"
});

const MAX_CHARS = 12_000; // safe chunk size

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;
    await new Promise(res => setTimeout(res, delayMs));
    return withRetry(fn, retries - 1, delayMs);
  }
}


function chunkText(text: string, maxChars: number): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    chunks.push(text.slice(start, start + maxChars));
    start += maxChars;
  }

  return chunks;
}

async function summarizeChunk(chunk: string): Promise<string> {
  const prompt = `
Summarize the following section in a single concise paragraph.
Write it like a short story or narrative, connecting events, ideas, or arguments naturally.
Do NOT exceed 50 words.
Do NOT include any introductory sentences like "Here is a summary."
Do NOT mention the author personally or discuss their intentions.
Focus strictly on the events, ideas, arguments, or key points present in the text.
Avoid repeating ideas across bullets.
Each bullet should be concise, self-contained, and easy to read.
Do NOT add external context, interpretations, or opinions.
Do NOT include stylistic or rhetorical commentary unless it is part of the chapter content.

SECTION:
${chunk}
  `.trim();

  return withRetry(async () => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    if (!text) {
      throw new Error("Empty chunk summary returned from Gemini");
    }

    return text;
  });
}

export async function summarizeChapter(content: string): Promise<string> {
  const chunks = chunkText(content, MAX_CHARS);

  if (chunks.length === 1) {
    return summarizeChunk(chunks[0]);
  }

  // const partialSummaries: string[] = [];

  // for (const chunk of chunks) {
  //   partialSummaries.push(await summarizeChunk(chunk));
  // }

  const limit = pLimit(3); 

  const partialSummaries = await Promise.all(
  chunks.map(chunk => limit(() => summarizeChunk(chunk)))
);
  const combinedSummary = partialSummaries.join("\n");

  const maxWords =chunks.length*30
  const finalPrompt = `
  Combine the following section summaries into a single coherent paragraph summarizing the full chapter.
  Write it like a short story, connecting events, ideas, or arguments naturally.
  Do NOT exceed ${maxWords} words.
  Do NOT include any introductory sentences like "Here is a summary."
  Do NOT mention the author personally or discuss their intentions.
  Focus strictly on the events, ideas, arguments, or key points present in the text.
  Avoid repeating ideas across bullets.
  Remove redundancy and keep only essential content.
  Do NOT add any external context, interpretations, or opinions.
  Do NOT include stylistic or rhetorical commentary unless it is part of the chapter content.
  Each bullet should be concise, clear, self-contained, and easy to read.


SUMMARIES:
${combinedSummary}
  `.trim();

  return withRetry(async () => {
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text().trim();

    if (!text) {
      throw new Error("Empty final summary returned from Gemini");
    }
  
    return text;
  });
}
