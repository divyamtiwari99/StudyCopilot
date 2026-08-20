import { performance } from "node:perf_hooks";
import { ContentModel } from "../../content/models/content.model.js";
import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";
import { notesPromptBuilder } from "../prompts/notes.prompt.js";
import { artifactModel, getOwnedContent, getOwnedDocumentText, withGenerationLock } from "./ai-generation.helpers.js";

export interface GenerateNotesInput { contentId: string; userId: string; }

export class NotesService {
  async generate({ contentId, userId }: GenerateNotesInput) {
    return withGenerationLock(`notes:${userId}:${contentId}`, async () => {
      const content = await getOwnedContent(contentId, userId);
      const documentText = await getOwnedDocumentText(contentId, userId);
      const prompt = notesPromptBuilder.build({ title: content.title, content: documentText });
      const started = performance.now();
      const result = await aiService.generateTextDetailed({ prompt, temperature: 0.2, maxOutputTokens: 2000, userId });
      const generationTime = Math.round(performance.now() - started);
      const artifact = await aiArtifactService.save({
        contentId, userId, type: "notes", title: `${content.title} Notes`, markdown: result.text,
        model: artifactModel(result), generationTime,
      });
      await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.notes": true } });
      return artifact;
    });
  }

  async get(contentId: string, userId: string) {
    await getOwnedContent(contentId, userId);
    return aiArtifactService.get(contentId, "notes", userId);
  }

  async getAll(userId: string) { return aiArtifactService.getAllByUser(userId, "notes"); }

  async delete(contentId: string, userId: string) {
    await getOwnedContent(contentId, userId);
    await aiArtifactService.deleteByContent(contentId, "notes", userId);
    await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.notes": false } });
    return { success: true };
  }
}

export const notesService = new NotesService();
