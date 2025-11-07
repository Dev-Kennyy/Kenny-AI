import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyAdS-mF6NOBfuiMyw6W-WvaBisgJiYD_cg";

async function main(prompt: string): Promise<string> {
  if (!API_KEY) {
    console.error("Missing VITE_GOOGLE_API_KEY env.");
    return "Missing API key";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-2.0-flash";

  const stream = await ai.models.generateContentStream({
    model,
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  let aggregatedText = "";
  for await (const chunk of stream) {
    const text = chunk.text || "";
    if (text) {
      aggregatedText += text;
    //   console.log(text);
    }
  }
  console.log(aggregatedText)
  return aggregatedText; 
}

export default main;
