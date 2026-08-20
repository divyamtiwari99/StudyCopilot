import { performance } from "node:perf_hooks";
import { ContentModel } from "../../content/models/content.model.js";
import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";
import { studyPlannerPromptBuilder } from "../prompts/study-planner.prompt.js";
import { artifactModel, getOwnedContent, getOwnedDocumentText, parseAiJson, studyPlannerSchema, withGenerationLock } from "./ai-generation.helpers.js";

export interface GenerateStudyPlannerInput { contentId: string; userId: string; }

export class StudyPlannerService {
  async generate({ contentId, userId }: GenerateStudyPlannerInput, force = false) {
    return withGenerationLock(`study-planner:${userId}:${contentId}`, async () => {
      const content = await getOwnedContent(contentId, userId);
      const existing = force ? null : await aiArtifactService.get(contentId, "studyPlanner", userId);
      if (existing) return existing;
      const document = await getOwnedDocumentText(contentId, userId);
      const prompt = studyPlannerPromptBuilder.build({ title: content.title, content: document });
      const started = performance.now();
      const result = await aiService.generateTextDetailed({ prompt, temperature: 0.2, maxOutputTokens: 2200, userId });
      const planner = parseAiJson(result.text, studyPlannerSchema, "Study planner");
      const generationTime = Math.round(performance.now() - started);
      const artifact = await aiArtifactService.save({ contentId, userId, type: "studyPlanner", title: `${content.title} Study Planner`, markdown: result.text, json: planner, model: artifactModel(result), generationTime });
      await ContentModel.findOneAndUpdate({ _id: contentId, userId }, { $set: { "processing.studyPlanner": true } });
      return artifact;
    });
  }

  async regenerate(input: GenerateStudyPlannerInput) {
    await getOwnedContent(input.contentId, input.userId);
    return this.generate(input, true);
  }

  async get(contentId: string, userId: string) {
    await getOwnedContent(contentId, userId);
    return aiArtifactService.get(contentId, "studyPlanner", userId);
  }
}

export const studyPlannerService = new StudyPlannerService();
