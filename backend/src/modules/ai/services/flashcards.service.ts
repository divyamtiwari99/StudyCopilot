import { performance } from "node:perf_hooks";

import { ChunkModel } from "../../content/models/chunk.model.js";
import { ContentModel } from "../../content/models/content.model.js";

import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";

import { flashcardsPromptBuilder } from "../prompts/flashcards.prompt.js";

export interface GenerateFlashcardsInput {
  contentId: string;
  userId: string;
}

export class FlashcardsService {
  async generate({
    contentId,
    userId,
  }: GenerateFlashcardsInput) {
    const content =
      await ContentModel.findById(contentId);

    if (!content) {
      throw new Error("Content not found.");
    }

    const existing =
      await aiArtifactService.get(
        contentId,
        "flashcards"
      );

    if (existing) {
      return existing;
    }

    const chunks =
      await ChunkModel.find({
        contentId,
      })
        .sort({
          order: 1,
        })
        .lean();

    const document =
      chunks
        .map((chunk) => chunk.text)
        .join("\n\n");

    const prompt =
      flashcardsPromptBuilder.build({
        title: content.title,
        content: document,
      });

    const started =
      performance.now();

    const response =
      await aiService.generateText({
        prompt,
        temperature: 0.2,
      });

    const generationTime =
      Math.round(
        performance.now() -
          started
      );

    let cards: unknown = [];

    try {
      cards = JSON.parse(response);
    } catch {
      cards = [];
    }

    const artifact =
      await aiArtifactService.save({
        contentId,
        userId,

        type: "flashcards",

        title: `${content.title} Flashcards`,

        markdown: response,

        json: cards,

        model: "gemini-3.6-flash",

        generationTime,
      });

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          "processing.flashcards": true,
        },
      }
    );

    return artifact;
  }

  async get(
    contentId: string
  ) {
    return aiArtifactService.get(
      contentId,
      "flashcards"
    );
  }
}

export const flashcardsService =
  new FlashcardsService();