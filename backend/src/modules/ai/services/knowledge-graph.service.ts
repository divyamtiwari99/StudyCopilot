import { performance } from "node:perf_hooks";

import { ContentModel } from "../../content/models/content.model.js";

import { aiService } from "./ai.service.js";

import { aiArtifactService } from "./ai-artifact.service.js";

import { knowledgeGraphPromptBuilder } from "../prompts/knowledge-graph.prompt.js";

import {
  artifactModel,
  getOwnedContent,
  getOwnedDocumentText,
  knowledgeGraphSchema,
  parseAiJson,
  withGenerationLock,
} from "./ai-generation.helpers.js";

export interface GenerateKnowledgeGraphInput {
  contentId: string;
  userId: string;
}

export class KnowledgeGraphService {
  async generate(
    {
      contentId,
      userId,
    }: GenerateKnowledgeGraphInput,
    force = false,
  ) {
    return withGenerationLock(
      `knowledge-graph:${userId}:${contentId}`,
      async () => {
        const content =
          await getOwnedContent(
            contentId,
            userId,
          );

        const existing = force
          ? null
          : await aiArtifactService.get(
              contentId,
              "knowledgeGraph",
              userId,
            );

        if (existing) {
          return existing;
        }

        const document =
          await getOwnedDocumentText(
            contentId,
            userId,
          );

        /*
         * Keep the knowledge graph request
         * bounded.
         *
         * The graph only needs representative
         * concepts and relationships. Sending
         * the complete document can create
         * unnecessarily large AI requests.
         */
        const graphContext =
          document.slice(0, 16_000);

        const prompt =
          knowledgeGraphPromptBuilder.build({
            title: content.title,
            content: graphContext,
          });

        const started =
          performance.now();

        const result =
          await aiService.generateTextDetailed(
            {
              prompt,

              temperature: 0.2,

              maxOutputTokens: 1600,

              userId,

              /*
               * IMPORTANT:
               *
               * Tell the provider that this
               * request MUST return JSON.
               *
               * Groq:
               * response_format:
               * { type: "json_object" }
               *
               * Gemini:
               * responseMimeType:
               * "application/json"
               */
              jsonMode: true,
            },
          );

        const graph =
          parseAiJson(
            result.text,
            knowledgeGraphSchema,
            "Knowledge graph",
          );

        const generationTime =
          Math.round(
            performance.now() - started,
          );

        const artifact =
          await aiArtifactService.save({
            contentId,

            userId,

            type: "knowledgeGraph",

            title: `${content.title} Knowledge Graph`,

            markdown: result.text,

            json: graph,

            model: artifactModel(result),

            generationTime,
          });

        await ContentModel.findOneAndUpdate(
          {
            _id: contentId,
            userId,
          },
          {
            $set: {
              "processing.knowledgeGraph":
                true,
            },
          },
        );

        return artifact;
      },
    );
  }

  async regenerate(
    input: GenerateKnowledgeGraphInput,
  ) {
    await getOwnedContent(
      input.contentId,
      input.userId,
    );

    return this.generate(
      input,
      true,
    );
  }

  async get(
    contentId: string,
    userId: string,
  ) {
    await getOwnedContent(
      contentId,
      userId,
    );

    return aiArtifactService.get(
      contentId,
      "knowledgeGraph",
      userId,
    );
  }
}

export const knowledgeGraphService =
  new KnowledgeGraphService();