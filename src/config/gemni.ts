import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyAdS-mF6NOBfuiMyw6W-WvaBisgJiYD_cg";
const MODEL = "gemini-2.5-flash";

async function main(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Missing VITE_GOOGLE_API_KEY environment variable");
  }

  const trimmedPrompt = prompt.trim();
  if (!trimmedPrompt) {
    return "";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [{ text: trimmedPrompt }],
        },
      ],
    });

    let aggregatedText = "";

    for await (const chunk of stream) {
      if (chunk.text) {
        aggregatedText += chunk.text;
      }
    }

    return aggregatedText;
  } catch (error) {
    console.error("Gemini request failed", error);
    throw error instanceof Error
      ? error
      : new Error("Unable to generate a response from Gemini");
  }
}

export default main;
