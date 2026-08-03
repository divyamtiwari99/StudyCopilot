import { performance } from "node:perf_hooks";

import { ChunkModel } from "../../content/models/chunk.model.js";
import { ContentModel } from "../../content/models/content.model.js";

import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";

import { knowledgeGraphPromptBuilder } from "../prompts/knowledge-graph.prompt.js";

export interface GenerateKnowledgeGraphInput {
  contentId: string;
  userId: string;
}

export class KnowledgeGraphService {
  async generate({
    contentId,
    userId,
  }: GenerateKnowledgeGraphInput) {
    const content =
      await ContentModel.findById(contentId);

    if (!content) {
      throw new Error(
        "Content not found."
      );
    }

    const existing =
      await aiArtifactService.get(
        contentId,
        "knowledgeGraph"
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

    if (chunks.length === 0) {
      throw new Error(
        "Document has not been processed yet."
      );
    }

    const document =
      chunks
        .map((chunk) => chunk.text)
        .join("\n\n");

    const prompt =
      knowledgeGraphPromptBuilder.build({
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

    let graph: unknown = {
      nodes: [],
      edges: [],
    };

    try {
      graph =
        JSON.parse(response);
    } catch {
      graph = {
        nodes: [],
        edges: [],
      };
    }

    const artifact =
      await aiArtifactService.save({
        contentId,
        userId,

        type:
          "knowledgeGraph",

        title: `${content.title} Knowledge Graph`,

        markdown: response,

        json: graph,

        model:
          "gemini-3.6-flash",

        generationTime,
      });

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          "processing.knowledgeGraph": true,
        },
      }
    );

    return artifact;
  }

  async regenerate(
    input: GenerateKnowledgeGraphInput
  ) {
    await aiArtifactService.deleteByContent(
      input.contentId,
      "knowledgeGraph"
    );

    return this.generate(input);
  }

  async get(
    contentId: string
  ) {
    return aiArtifactService.get(
      contentId,
      "knowledgeGraph"
    );
  }
}

export const knowledgeGraphService =
  new KnowledgeGraphService();