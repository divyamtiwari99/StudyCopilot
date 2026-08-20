import { performance } from "node:perf_hooks";
import { ContentModel } from "../../content/models/content.model.js";
import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";
import { roadmapPromptBuilder } from "../prompts/roadmap.prompt.js";
import { artifactModel, getOwnedContent, getOwnedDocumentText, parseAiJson, roadmapSchema, withGenerationLock } from "./ai-generation.helpers.js";

export interface GenerateRoadmapInput { contentId: string; userId: string; }

export class RoadmapService {
  async generate({ contentId, userId }: GenerateRoadmapInput, force = false) {
    return withGenerationLock(`roadmap:${userId}:${contentId}`, async () => {
      const content = await getOwnedContent(contentId, userId);
      const existing = force ? null : await aiArtifactService.get(contentId, "roadmap", userId);
      if (existing) return existing;
      const document = await getOwnedDocumentText(contentId, userId);
      const prompt = roadmapPromptBuilder.build({ title: content.title, content: document });
      const started = performance.now();
      const result = await aiService.generateTextDetailed({ prompt, temperature: 0.2, maxOutputTokens: 1800, userId });
      const roadmap = parseAiJson(result.text, roadmapSchema, "Roadmap");
      const generationTime = Math.round(performance.now() - started);
      const artifact = await aiArtifactService.save({ contentId, userId, type: "roadmap", title: `${content.title} Roadmap`, markdown: result.text, json: roadmap, model: artifactModel(result), generationTime });
      await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.roadmap": true } });
      return artifact;
    });
  }

  async regenerate(input: GenerateRoadmapInput) {
    await getOwnedContent(input.contentId, input.userId);
    return this.generate(input, true);
  }

  async get(contentId: string, userId: string) {
    await getOwnedContent(contentId, userId);
    return aiArtifactService.get(contentId, "roadmap", userId);
  }
}

export const roadmapService = new RoadmapService();
