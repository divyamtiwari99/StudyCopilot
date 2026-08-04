import { gemini } from "../providers/gemini.provider.js";

export interface GenerateTextOptions {
  prompt: string;

  temperature?: number;

  maxOutputTokens?: number;
}

export class AIService {
  async generateText({
    prompt,
    temperature = 0.3,
    maxOutputTokens = 8192,
  }: GenerateTextOptions): Promise<string> {
    const response =
      await gemini.models.generateContent({
        model: "gemini-3.6-flash",

        contents: prompt,

        config: {
          temperature,
          maxOutputTokens,
        },
      });

    return response.text?.trim() ?? "";
  }

  async *streamText({
    prompt,
    temperature = 0.3,
    maxOutputTokens = 8192,
  }: GenerateTextOptions): AsyncGenerator<string> {

    const response =
      await gemini.models.generateContentStream({
        model: "gemini-3.6-flash",

        contents: prompt,

        config: {
          temperature,
          maxOutputTokens,
        },
      });

    for await (const chunk of response) {

      const text =
        chunk.text;

      if (!text) {
        continue;
      }

      yield text;

    }
  }
}

export const aiService =
  new AIService();