import { performance } from "node:perf_hooks";
import { ContentModel } from "../../content/models/content.model.js";
import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";
import { flashcardsPromptBuilder } from "../prompts/flashcards.prompt.js";
import { artifactModel, flashcardsSchema, getOwnedContent, getOwnedDocumentText, parseAiJson, withGenerationLock } from "./ai-generation.helpers.js";

export interface GenerateFlashcardsInput { contentId: string; userId: string; }

export class FlashcardsService {
  async generate({ contentId, userId }: GenerateFlashcardsInput) {
    return withGenerationLock(`flashcards:${userId}:${contentId}`, async () => {
      const content = await getOwnedContent(contentId, userId);
      const document = await getOwnedDocumentText(contentId, userId);
      const prompt = flashcardsPromptBuilder.build({ title: content.title, content: document });
      const started = performance.now();
      const result = await aiService.generateTextDetailed({ prompt, temperature: 0.2, maxOutputTokens: 1800, userId });
      const cards = parseAiJson(result.text, flashcardsSchema, "Flashcards");
      const generationTime = Math.round(performance.now() - started);
      const artifact = await aiArtifactService.save({
        contentId, userId, type: "flashcards", title: `${content.title} Flashcards`, markdown: result.text,
        json: cards, model: artifactModel(result), generationTime,
      });
      await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.flashcards": true } });
      return artifact;
    });
  }

  async get(contentId: string, userId: string) { await getOwnedContent(contentId, userId); return aiArtifactService.get(contentId, "flashcards", userId); }
  async getAll(userId: string) { return aiArtifactService.getAllByUser(userId, "flashcards"); }

  async delete(contentId: string, userId: string) {
    await getOwnedContent(contentId, userId);
    await aiArtifactService.deleteByContent(contentId, "flashcards", userId);
    await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.flashcards": false } });
    return { success: true };
  }
}

export const flashcardsService = new FlashcardsService();
