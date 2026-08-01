import { aiService } from "../../ai/services/ai.service.js";

import { retrievalService } from "./retrieval.service.js";
import { contextBuilderService } from "./context-builder.service.js";
import { promptBuilderService } from "./prompt-builder.service.js";
import { intentService } from "./intent.service.js";

export class ChatService {
  async ask(
    contentId: string,
    question: string
  ): Promise<string> {

    console.time("⚡ Total Chat");

    // ----------------------------------
    // Retrieval
    // ----------------------------------

    console.time("📚 Retrieval");

    const retrieved =
      await retrievalService.retrieve(
        contentId,
        question
      );

    console.timeEnd("📚 Retrieval");

    const chunks = retrieved
      .filter(
        (
          chunk
        ): chunk is NonNullable<
          (typeof retrieved)[number]
        > => chunk !== undefined
      )
      .map((chunk) => ({
        text: chunk.text,
      }));

    console.log(
      "📄 Chunks Found:",
      chunks.length
    );

    if (chunks.length === 0) {
      console.timeEnd("⚡ Total Chat");

      return "I couldn't find that information in the uploaded material.";
    }

    // ----------------------------------
    // Context
    // ----------------------------------

    const context =
      contextBuilderService.build(
        chunks
      );

    console.log(
      "📦 Context Length:",
      context.length
    );

    // ----------------------------------
    // Intent
    // ----------------------------------

    const intent =
      intentService.detect(
        question
      );

    console.log(
      "🧠 Intent:",
      intent
    );

    // ----------------------------------
    // Prompt
    // ----------------------------------

    const prompt =
      promptBuilderService.build({
        context,
        question,
        intent,
      });

    console.log(
      "📝 Prompt Length:",
      prompt.length
    );

    // ----------------------------------
    // AI
    // ----------------------------------

    console.time("🤖 AI");

    const answer =
      await aiService.generateText({
        prompt,
        temperature: 0.3,
      });

    console.timeEnd("🤖 AI");

    console.timeEnd("⚡ Total Chat");

    return (
      answer ||
      "I couldn't generate an answer."
    );
  }
}

export const chatService =
  new ChatService();