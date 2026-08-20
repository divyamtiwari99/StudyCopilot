import crypto from "crypto";

import { PROCESSING } from "../../../constants/processing.js";
import { estimateTokens } from "./tokenizer.js";
import { ContentChunk } from "./chunk.types.js";

function buildParagraphs(text: string): string[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
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

    current = current ? `${current} ${line}` : line;

    if (line.endsWith(".") || line.endsWith("?") || line.endsWith("!")) {
      flush();
    }
  }

  flush();
  return paragraphs;
}

function splitOversizedParagraph(paragraph: string): string[] {
  if (estimateTokens(paragraph) <= PROCESSING.MAX_CHUNK_TOKENS) {
    return [paragraph];
  }

  const maxWords = Math.max(1, Math.floor(PROCESSING.MAX_CHUNK_TOKENS * 0.72));
  const words = paragraph.split(/\s+/).filter(Boolean);
  const parts: string[] = [];

  for (let index = 0; index < words.length; index += maxWords) {
    parts.push(words.slice(index, index + maxWords).join(" "));
  }

  return parts;
}

export function createChunks(text: string): ContentChunk[] {
  const paragraphs = buildParagraphs(text).flatMap(splitOversizedParagraph);
  const chunks: ContentChunk[] = [];
  let current = "";
  let order = 0;

  const pushCurrent = () => {
    if (!current.trim()) return;
    chunks.push({
      id: crypto.randomUUID(),
      title: `Chunk ${order + 1}`,
      order,
      text: current,
      tokens: estimateTokens(current),
      blocks: [],
    });
    order += 1;
    current = "";
  };

  for (const paragraph of paragraphs) {
    const candidate = current ? `${current}\n\n${paragraph}` : paragraph;

    if (estimateTokens(candidate) > PROCESSING.MAX_CHUNK_TOKENS) {
      pushCurrent();
      current = paragraph;
    } else {
      current = candidate;
    }
  }

  pushCurrent();
  return chunks;
}
