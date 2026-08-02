import { performance } from "node:perf_hooks";

import { ChunkModel } from "../../content/models/chunk.model.js";
import { ContentModel } from "../../content/models/content.model.js";

import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";

import { quizPromptBuilder } from "../prompts/quiz.prompt.js";

export interface GenerateQuizInput {
  contentId: string;
  userId: string;
}

export class QuizService {
  async generate({
    contentId,
    userId,
  }: GenerateQuizInput) {
    const content =
      await ContentModel.findById(contentId);

    if (!content) {
      throw new Error("Content not found.");
    }

    const existing =
      await aiArtifactService.get(
        contentId,
        "quiz"
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

    const document =
      chunks
        .map((chunk) => chunk.text)
        .join("\n\n");

    const prompt =
      quizPromptBuilder.build({
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
          started
      );

    let questions: unknown = [];

    try {
      questions = JSON.parse(
        response
      );
    } catch {
      questions = [];
    }

    const artifact =
      await aiArtifactService.save({
        contentId,
        userId,

        type: "quiz",

        title: `${content.title} Quiz`,

        markdown: response,

        json: questions,

        model: "gemini-3.6-flash",

        generationTime,
      });

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          "processing.quiz": true,
        },
      }
    );

    return artifact;
  }

  async get(
    contentId: string
  ) {
    return aiArtifactService.get(
      contentId,
      "quiz"
    );
  }
}

export const quizService =
  new QuizService();