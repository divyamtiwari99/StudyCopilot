import crypto from "crypto";

import { PROCESSING } from "../../../constants/processing.js";

import { estimateTokens } from "./tokenizer.js";

import { ContentChunk } from "./chunk.types.js";

export function createChunks(
  text: string
): ContentChunk[] {

  const paragraphs = text
    .split("\n\n")
    .map((x) => x.trim())
    .filter(Boolean);

  const chunks: ContentChunk[] = [];

  let current = "";

  let order = 0;

  for (const paragraph of paragraphs) {

    const candidate =
      current === ""
        ? paragraph
        : current + "\n\n" + paragraph;

    if (
      estimateTokens(candidate) >
      PROCESSING.MAX_CHUNK_TOKENS
    ) {

      chunks.push({
        id: crypto.randomUUID(),
        title: `Chunk ${order + 1}`,
        order,
        text: current,
        tokens: estimateTokens(current),
        blocks: [],
      });

      order++;

      current = paragraph;

      continue;

    }

    current = candidate;

  }

  if (current) {

    chunks.push({

      id: crypto.randomUUID(),

      title: `Chunk ${order + 1}`,

      order,

      text: current,

      tokens: estimateTokens(current),

      blocks: [],

    });

  }

  return chunks;

}