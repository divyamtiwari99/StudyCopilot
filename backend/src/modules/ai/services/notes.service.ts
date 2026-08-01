import { performance } from "node:perf_hooks";

import { ContentModel } from "../../content/models/content.model.js";
import { ChunkModel } from "../../content/models/chunk.model.js";

import { aiService } from "./ai.service.js";
import { aiArtifactService } from "./ai-artifact.service.js";

import { notesPromptBuilder } from "../prompts/notes.prompt.js";

export interface GenerateNotesInput {
  contentId: string;
  userId: string;
}

export class NotesService {
  async generate({
    contentId,
    userId,
  }: GenerateNotesInput) {
    const content =
      await ContentModel.findById(contentId);

    if (!content) {
      throw new Error("Content not found.");
    }

    const existing =
      await aiArtifactService.get(
        contentId,
        "notes"
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

    const documentText =
      chunks
        .map((chunk) => chunk.text)
        .join("\n\n");

    const prompt =
      notesPromptBuilder.build({
        title: content.title,
        content: documentText,
      });

    const started =
      performance.now();

    const markdown =
      await aiService.generateText({
        prompt,
        temperature: 0.2,
      });

    const generationTime =
      Math.round(
        performance.now() -
          started
      );

    const artifact =
      await aiArtifactService.save({
        contentId,
        userId,

        type: "notes",

        title: `${content.title} Notes`,

        markdown,

        model: "gemini-3.6-flash",

        generationTime,
      });

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        $set: {
          "processing.notes": true,
        },
      }
    );

    return artifact;
  }

  async regenerate(
    input: GenerateNotesInput
  ) {
    await aiArtifactService.deleteByContent(
      input.contentId,
      "notes"
    );

    return this.generate(input);
  }

  async get(
    contentId: string
  ) {
    return aiArtifactService.get(
      contentId,
      "notes"
    );
  }
}

export const notesService =
  new NotesService();