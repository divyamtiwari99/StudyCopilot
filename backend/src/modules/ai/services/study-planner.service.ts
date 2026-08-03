import { performance } from "node:perf_hooks";

import { ChunkModel } from "../../content/models/chunk.model.js";
import { ContentModel } from "../../content/models/content.model.js";

import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";

import { studyPlannerPromptBuilder } from "../prompts/study-planner.prompt.js";

export interface GenerateStudyPlannerInput {
  contentId: string;
  userId: string;
}

export class StudyPlannerService {
  async generate({
    contentId,
    userId,
  }: GenerateStudyPlannerInput) {
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
        "studyPlanner",
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
      studyPlannerPromptBuilder.build({
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

    let planner: unknown = {
      overview: {
        estimatedDays: 0,
        dailyStudyHours: "",
        totalTopics: 0,
      },
      days: [],
    };

    try {
      planner =
        JSON.parse(response);
    } catch {
      planner = {
        overview: {
          estimatedDays: 0,
          dailyStudyHours: "",
          totalTopics: 0,
        },
        days: [],
      };
    }

    const artifact =
      await aiArtifactService.save({
        contentId,
        userId,

        type: "studyPlanner",

        title: `${content.title} Study Planner`,

        markdown: response,

        json: planner,

        model:
          "gemini-3.6-flash",

        generationTime,
      });

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          "processing.studyPlanner": true,
        },
      },
    );

    return artifact;
  }

  async regenerate(
    input: GenerateStudyPlannerInput,
  ) {
    await aiArtifactService.deleteByContent(
      input.contentId,
      "studyPlanner",
    );

    return this.generate(input);
  }

  async get(
    contentId: string,
  ) {
    return aiArtifactService.get(
      contentId,
      "studyPlanner",
    );
  }
}

export const studyPlannerService =
  new StudyPlannerService();