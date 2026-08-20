import { performance } from "node:perf_hooks";
import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";
import { ContentModel } from "../../content/models/content.model.js";
import { summaryPromptBuilder } from "../prompts/summary.prompt.js";
import { artifactModel, getOwnedContent, getOwnedDocumentText, withGenerationLock } from "./ai-generation.helpers.js";

export interface GenerateSummaryInput { contentId: string; userId: string; }

export class SummaryService {
  async generate({ contentId, userId }: GenerateSummaryInput) {
    return withGenerationLock(`summary:${userId}:${contentId}`, async () => {
      const content = await getOwnedContent(contentId, userId);
      const document = await getOwnedDocumentText(contentId, userId);
      const prompt = summaryPromptBuilder.build({ title: content.title, content: document });
      const started = performance.now();
      const result = await aiService.generateTextDetailed({ prompt, temperature: 0.2, maxOutputTokens: 1400, userId });
      const generationTime = Math.round(performance.now() - started);
      const artifact = await aiArtifactService.save({
        contentId, userId, type: "summary", title: `${content.title} Summary`, markdown: result.text,
        model: artifactModel(result), generationTime,
      });
      await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.summary": true } });
      return artifact;
    });
  }

  async get(contentId: string, userId: string) {
    await getOwnedContent(contentId, userId);
    return aiArtifactService.get(contentId, "summary", userId);
  }
}

export const summaryService = new SummaryService();
