import crypto from "crypto";

import { PROCESSING } from "../../../constants/processing.js";
import { estimateTokens } from "./tokenizer.js";
import { ContentChunk } from "./chunk.types.js";

function buildParagraphs(text: string): string[] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  let current = "";

  const flush = () => {
    if (current.trim()) {
      paragraphs.push(current.trim());
      current = "";
    }
  };

  for (const line of lines) {
    const isHeading =
      line.length < 80 &&
      !line.endsWith(".") &&
      !line.endsWith(",") &&
      !line.startsWith("•") &&
      !/^\d+\./.test(line);

    const isBullet =
      line.startsWith("•") ||
      line.startsWith("-") ||
      /^\d+\./.test(line);

    if (isHeading) {
      flush();
      paragraphs.push(line);
      continue;
    }

    if (isBullet) {
      flush();
      paragraphs.push(line);
      continue;
    }

    if (!current) {
      current = line;
    } else {
      current += " " + line;
    }

    if (
      line.endsWith(".") ||
      line.endsWith("?") ||
      line.endsWith("!")
    ) {
      flush();
    }
  }

  flush();

  return paragraphs;
}

export function createChunks(
  text: string
): ContentChunk[] {
  const paragraphs = buildParagraphs(text);

  console.log("Paragraphs Found:", paragraphs.length);

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
      if (current.trim()) {
        chunks.push({
          id: crypto.randomUUID(),
          title: `Chunk ${order + 1}`,
          order,
          text: current,
          tokens: estimateTokens(current),
          blocks: [],
        });

        order++;
      }

      current = paragraph;
    } else {
      current = candidate;
    }
  }

  if (current.trim()) {
    chunks.push({
      id: crypto.randomUUID(),
      title: `Chunk ${order + 1}`,
      order,
      text: current,
      tokens: estimateTokens(current),
      blocks: [],
    });
  }

  console.log("Chunks Generated:", chunks.length);

  return chunks;
}