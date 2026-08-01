import { AIArtifactModel } from "../models/ai-artifact.model.js";

export interface SaveArtifactInput {
  contentId: string;
  userId: string;
  type:
    | "notes"
    | "summary"
    | "flashcards"
    | "quiz"
    | "knowledgeGraph";

  title: string;

  markdown?: string;

  json?: unknown;

  model?: string;

  promptVersion?: string;

  tokens?: number;

  generationTime?: number;
}

export class AIArtifactService {
  async save(
    input: SaveArtifactInput
  ) {
    const existing =
      await AIArtifactModel.findOne({
        contentId: input.contentId,
        type: input.type,
      });

    if (existing) {
      existing.version += 1;

      existing.title = input.title;

      existing.markdown =
        input.markdown ?? "";

      existing.json =
        input.json ?? null;

      const metadata =
        existing.metadata ?? {
          model: "",
          promptVersion: "v1",
          tokens: 0,
          generationTime: 0,
        };

      existing.metadata = {
        model:
          input.model ??
          metadata.model,

        promptVersion:
          input.promptVersion ??
          metadata.promptVersion,

        tokens:
          input.tokens ??
          metadata.tokens,

        generationTime:
          input.generationTime ??
          metadata.generationTime,
      };

      await existing.save();

      return existing;
    }

    return AIArtifactModel.create({
      contentId: input.contentId,

      userId: input.userId,

      type: input.type,

      title: input.title,

      markdown:
        input.markdown ?? "",

      json:
        input.json ?? null,

      metadata: {
        model:
          input.model ??
          "gemini-3.6-flash",

        promptVersion:
          input.promptVersion ??
          "v1",

        tokens:
          input.tokens ?? 0,

        generationTime:
          input.generationTime ?? 0,
      },
    });
  }

  async get(
    contentId: string,
    type: SaveArtifactInput["type"]
  ) {
    return AIArtifactModel.findOne({
      contentId,
      type,
    }).lean();
  }

  async getAll(
    contentId: string
  ) {
    return AIArtifactModel.find({
      contentId,
    })
      .sort({
        updatedAt: -1,
      })
      .lean();
  }

  async delete(
    id: string
  ) {
    return AIArtifactModel.findByIdAndDelete(
      id
    );
  }

  async deleteByContent(
    contentId: string,
    type: SaveArtifactInput["type"]
  ) {
    return AIArtifactModel.findOneAndDelete({
      contentId,
      type,
    });
  }
}

export const aiArtifactService =
  new AIArtifactService();