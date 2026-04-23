import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
export const embedder = async (chunk: string[]) => {
  const api_Key = process.env.GEN_AI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: api_Key });
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: chunk,
  });
  if (!response.embeddings) {
    console.log("error");
    return;
  }
  const expo = response.embeddings;
  return expo;
};
export default embedder;
