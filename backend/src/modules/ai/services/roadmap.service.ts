import { performance } from "node:perf_hooks";

import { ChunkModel } from "../../content/models/chunk.model.js";
import { ContentModel } from "../../content/models/content.model.js";

import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";

import { roadmapPromptBuilder } from "../prompts/roadmap.prompt.js";

export interface GenerateRoadmapInput {
  contentId: string;
  userId: string;
}

export class RoadmapService {
  async generate({
    contentId,
    userId,
  }: GenerateRoadmapInput) {
    const content =
      await ContentModel.findById(
        contentId,
      );

    if (!content) {
      throw new Error(
        "Content not found.",
      );
    }

    const existing =
      await aiArtifactService.get(
        contentId,
        "roadmap",
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

    if (!chunks.length) {
      throw new Error(
        "Document has not been processed yet.",
      );
    }

    const document =
      chunks
        .map(
          (chunk) => chunk.text,
        )
        .join("\n\n");

    const prompt =
      roadmapPromptBuilder.build({
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
          started,
      );

    let roadmap: unknown = {
      phases: [],
    };

    try {
      roadmap =
        JSON.parse(response);
    } catch {
      roadmap = {
        phases: [],
      };
    }

    const artifact =
      await aiArtifactService.save({
        contentId,
        userId,

        type: "roadmap",

        title: `${content.title} Roadmap`,

        markdown: response,

        json: roadmap,

        model:
          "gemini-3.6-flash",

        generationTime,
      });

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          "processing.roadmap": true,
        },
      },
    );

    return artifact;
  }

  async regenerate(
    input: GenerateRoadmapInput,
  ) {
    await aiArtifactService.deleteByContent(
      input.contentId,
      "roadmap",
    );

    return this.generate(input);
  }

  async get(
    contentId: string,
  ) {
    return aiArtifactService.get(
      contentId,
      "roadmap",
    );
  }
}

export const roadmapService =
  new RoadmapService();