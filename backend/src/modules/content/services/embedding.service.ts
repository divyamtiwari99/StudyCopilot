import { gemini } from "../../ai/providers/gemini.provider.js";

export class EmbeddingService {

  async generate(text: string): Promise<number[]> {

    const response =
      await gemini.models.embedContent({

        model: "text-embedding-004",

        contents: text,

      });

    return response.embeddings?.[0]?.values ?? [];

  }

}

export const embeddingService =
  new EmbeddingService();