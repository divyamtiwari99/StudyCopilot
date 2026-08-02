import { performance } from "node:perf_hooks";

import { ChunkModel } from "../../content/models/chunk.model.js";
import { ContentModel } from "../../content/models/content.model.js";

import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";

import { summaryPromptBuilder } from "../prompts/summary.prompt.js";

export interface GenerateSummaryInput {
  contentId: string;
  userId: string;
}

export class SummaryService {
  async generate({
    contentId,
    userId,
  }: GenerateSummaryInput) {
    const content =
      await ContentModel.findById(contentId);

    if (!content) {
      throw new Error("Content not found.");
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
      summaryPromptBuilder.build({
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
        performance.now() - started
      );

    const artifact =
      await aiArtifactService.save({
        contentId,
        userId,

        type: "summary",

        title: `${content.title} Summary`,

        markdown: response,

        json: null,

        model: "gemini-3.6-flash",

        generationTime,
      });

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          "processing.summary": true,
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
      "summary"
    );
  }
}

export const summaryService =
  new SummaryService();