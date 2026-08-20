import { ContentModel } from "../../content/models/content.model.js";
import { ChunkModel } from "../../content/models/chunk.model.js";
import { EmbeddingModel } from "../../content/models/embedding.model.js";
import { embeddingService } from "../../content/services/embedding.service.js";
import { vectorSearchService } from "../../content/services/vector-search.service.js";
import { aiConfig } from "../../ai/config/ai.config.js";
import type { Types } from "mongoose";
import type { RetrievedChunk } from "../types/chat.types.js";

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_]+/gu, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2)
    .slice(0, 300);
}

function lexicalScore(question: string, text: string): number {
  const query = new Set(tokenize(question));
  if (!query.size) return 0;
  const tokens = tokenize(text);
  if (!tokens.length) return 0;
  let hits = 0;
  for (const token of tokens) if (query.has(token)) hits += 1;
  return hits / Math.sqrt(query.size * tokens.length);
}

type ChunkLean = {
  _id: Types.ObjectId;
  contentId: Types.ObjectId;
  title?: string;
  text: string;
  order: number;
};

type EmbeddingLean = {
  chunkId: Types.ObjectId;
  vector: number[];
};

export class RetrievalService {
  private async loadOwnedChunks(userId: string, contentIds: string[]) {
    const ids = Array.from(new Set(contentIds)).filter(Boolean).slice(0, aiConfig.maxRagDocuments);
    if (!ids.length) return [];

    const owned = await ContentModel.find({ _id: { $in: ids }, userId })
      .select("_id")
      .lean();
    const ownedIds = owned.map((content) => content._id.toString());
    if (!ownedIds.length) return [];

    return ChunkModel.find({ contentId: { $in: ownedIds } })
      .select("_id contentId title text order")
      .limit(aiConfig.maxRagChunks)
      .lean<ChunkLean[]>();
  }

  private lexicalRetrieve(question: string, chunks: ChunkLean[]): RetrievedChunk[] {
    return chunks
      .map((chunk) => ({
        chunkId: chunk._id.toString(),
        contentId: chunk.contentId.toString(),
        text: chunk.text,
        title: chunk.title ?? "",
        order: chunk.order,
        score: lexicalScore(question, chunk.text),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }

  async retrieveMany(userId: string, contentIds: string[], question: string): Promise<RetrievedChunk[]> {
    if (!question.trim()) return [];

    const chunks = await this.loadOwnedChunks(userId, contentIds);
    if (!chunks.length) return [];

    let questionVector: number[] | null = null;
    try {
      questionVector = await embeddingService.generate(question, userId);
    } catch {
      // Gemini embeddings can be rate-limited independently from chat generation.
      // Fall back to lexical retrieval so Groq/Gemini chat remains usable.
      return this.lexicalRetrieve(question, chunks);
    }

    if (!questionVector.length) return this.lexicalRetrieve(question, chunks);

    const embeddings = await EmbeddingModel.find({
      chunkId: { $in: chunks.map((chunk) => chunk._id) },
      model: aiConfig.geminiEmbeddingModel,
    })
      .select("chunkId vector")
      .lean<EmbeddingLean[]>();

    if (!embeddings.length) return this.lexicalRetrieve(question, chunks);

    const chunkMap = new Map(chunks.map((chunk) => [chunk._id.toString(), chunk]));
    const embeddingMap = new Map(embeddings.map((embedding) => [embedding.chunkId.toString(), embedding]));

    const scored: RetrievedChunk[] = embeddings
      .map((embedding) => {
        const chunk = chunkMap.get(embedding.chunkId.toString());
        if (!chunk) return null;
        return {
          chunkId: chunk._id.toString(),
          contentId: chunk.contentId.toString(),
          text: chunk.text,
          title: chunk.title ?? "",
          order: chunk.order,
          score: vectorSearchService.cosineSimilarity(questionVector!, embedding.vector),
        };
      })
      .filter((item): item is RetrievedChunk => item !== null)
      .sort((a, b) => b.score - a.score);

    if (!scored.length) return this.lexicalRetrieve(question, chunks);

    const relevant = scored.filter((item) => item.score >= 0.55);
    const top = (relevant.length ? relevant : scored).slice(0, 5);
    const selected = new Map<string, RetrievedChunk>();

    for (const item of top) {
      for (const neighbour of chunks) {
        if (neighbour.contentId.toString() !== item.contentId || Math.abs(neighbour.order - item.order) > 1) continue;
        const neighbourEmbedding = embeddingMap.get(neighbour._id.toString());
        const score = neighbourEmbedding
          ? vectorSearchService.cosineSimilarity(questionVector!, neighbourEmbedding.vector)
          : item.score;
        selected.set(neighbour._id.toString(), {
          chunkId: neighbour._id.toString(),
          contentId: neighbour.contentId.toString(),
          text: neighbour.text,
          title: neighbour.title ?? "",
          order: neighbour.order,
          score,
        });
      }
    }

    return Array.from(selected.values()).sort((a, b) => b.score - a.score).slice(0, 8);
  }

  async retrieve(userId: string, contentId: string, question: string) {
    return this.retrieveMany(userId, [contentId], question);
  }
}

export const retrievalService = new RetrievalService();
