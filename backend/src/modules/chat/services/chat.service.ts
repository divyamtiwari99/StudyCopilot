import { gemini } from "../../ai/providers/gemini.provider.js";

import { retrievalService } from "./retrieval.service.js";

export class ChatService {

  async ask(
    contentId: string,
    question: string
  ) {

    const chunks =
      await retrievalService.retrieve(
        contentId
      );

    const context =
      chunks
        .map(
          (chunk) =>
            chunk.text
        )
        .join("\n\n");

    const response =
      await gemini.models.generateContent({

        model:
          "gemini-2.5-flash",

        contents: `
Context:

${context}

Question:

${question}

Answer ONLY using the provided context.
If the answer is not in the context, say you don't know.
`,

      });

    return response.text;

  }

}

export const chatService =
  new ChatService();