import { performance } from "node:perf_hooks";
import { ContentModel } from "../../content/models/content.model.js";
import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";
import { quizPromptBuilder } from "../prompts/quiz.prompt.js";
import { artifactModel, getOwnedContent, getOwnedDocumentText, parseAiJson, quizSchema, withGenerationLock } from "./ai-generation.helpers.js";

export interface GenerateQuizInput { contentId: string; userId: string; }

export class QuizService {
  async generate({ contentId, userId }: GenerateQuizInput) {
    return withGenerationLock(`quiz:${userId}:${contentId}`, async () => {
      const content = await getOwnedContent(contentId, userId);
      const document = await getOwnedDocumentText(contentId, userId);
      const prompt = quizPromptBuilder.build({ title: content.title, content: document });
      const started = performance.now();
      const result = await aiService.generateTextDetailed({ prompt, temperature: 0.2, maxOutputTokens: 2200, userId });
      const questions = parseAiJson(result.text, quizSchema, "Quiz");
      const generationTime = Math.round(performance.now() - started);
      const artifact = await aiArtifactService.save({
        contentId, userId, type: "quiz", title: `${content.title} Quiz`, markdown: result.text,
        json: questions, model: artifactModel(result), generationTime,
      });
      await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.quiz": true } });
      return artifact;
    });
  }

  async get(contentId: string, userId: string) { await getOwnedContent(contentId, userId); return aiArtifactService.get(contentId, "quiz", userId); }
  async getAll(userId: string) { return aiArtifactService.getAllByUser(userId, "quiz"); }

  async delete(contentId: string, userId: string) {
    await getOwnedContent(contentId, userId);
    await aiArtifactService.deleteByContent(contentId, "quiz", userId);
    await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.quiz": false } });
    return { success: true };
  }
}

export const quizService = new QuizService();
