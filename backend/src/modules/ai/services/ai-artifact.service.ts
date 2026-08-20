import { Types } from "mongoose";
import { AIArtifactModel } from "../models/ai-artifact.model.js";
import { ValidationError } from "../../../core/errors/validation.error.js";

export interface SaveArtifactInput {
  contentId: string;
  userId: string;
  type: "notes" | "summary" | "flashcards" | "quiz" | "knowledgeGraph" | "roadmap" | "studyPlanner";
  title: string;
  markdown?: string;
  json?: unknown;
  model?: string;
  promptVersion?: string;
  tokens?: number;
  generationTime?: number;
}

export class AIArtifactService {
  async save(input: SaveArtifactInput) {
    if (!Types.ObjectId.isValid(input.contentId)) throw new ValidationError("Invalid content ID.");
    const filter = { contentId: input.contentId, userId: input.userId, type: input.type };
    const values = {
      title: input.title.slice(0, 200),
      markdown: input.markdown ?? "",
      json: input.json ?? null,
      metadata: {
        model: input.model ?? "",
        promptVersion: input.promptVersion ?? "v1",
        tokens: input.tokens ?? 0,
        generationTime: input.generationTime ?? 0,
      },
    };

    const existing = await AIArtifactModel.exists(filter);
    if (existing) {
      return AIArtifactModel.findOneAndUpdate(
        filter,
        { $set: values, $inc: { version: 1 } },
        { new: true, runValidators: true },
      );
    }

    try {
      return await AIArtifactModel.create({ ...filter, ...values, version: 1 });
    } catch (error) {
      if (!(typeof error === "object" && error !== null && "code" in error && error.code === 11000)) throw error;
      return AIArtifactModel.findOneAndUpdate(
        filter,
        { $set: values, $inc: { version: 1 } },
        { new: true, runValidators: true },
      );
    }
  }

  async get(contentId: string, type: SaveArtifactInput["type"], userId: string) {
    return AIArtifactModel.findOne({ contentId, userId, type }).lean();
  }

  async getAll(contentId: string, userId: string) {
    return AIArtifactModel.find({ contentId, userId }).sort({ updatedAt: -1 }).lean();
  }

  async getAllByUser(userId: string, type: SaveArtifactInput["type"]) {
    return AIArtifactModel.find({ userId, type }).sort({ updatedAt: -1 }).lean();
  }

  async delete(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) throw new ValidationError("Invalid artifact ID.");
    return AIArtifactModel.findOneAndDelete({ _id: id, userId });
  }

  async deleteByContent(contentId: string, type: SaveArtifactInput["type"], userId: string) {
    return AIArtifactModel.findOneAndDelete({ contentId, userId, type });
  }

  async deleteAllByContent(userId: string, contentId: string) {
    return AIArtifactModel.deleteMany({ contentId, userId });
  }
}

export const aiArtifactService = new AIArtifactService();
