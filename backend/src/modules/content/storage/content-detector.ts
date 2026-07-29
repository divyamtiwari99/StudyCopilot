import { ContentKind } from "../types/content.types.js";

export function detectContentKind(
  mimeType: string
): ContentKind {

  if (mimeType.includes("pdf")) return "pdf";

  if (mimeType.includes("word")) return "docx";

  if (mimeType.includes("presentation")) return "pptx";

  if (mimeType.includes("spreadsheet")) return "xlsx";

  if (mimeType.startsWith("image/")) return "image";

  if (mimeType.startsWith("audio/")) return "audio";

  if (mimeType.startsWith("video/")) return "video";

  if (mimeType === "text/plain") return "txt";

  if (mimeType === "text/markdown") return "markdown";

  if (mimeType.includes("zip")) return "zip";

  throw new Error(`Unsupported mime type: ${mimeType}`);
}