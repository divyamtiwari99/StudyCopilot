import { ChunkModel } from "../../content/models/chunk.model.js";
import { contentAccessService } from "./content-access.service.js";

export async function getOwnedDocumentContext(userId: string, contentId: string) {
  const content = await contentAccessService.getOwnedContent(userId, contentId);
  const chunks = await ChunkModel.find({ contentId, }).sort({ order: 1 }).lean();
  if (!chunks.length) throw new Error("Document has not been processed yet.");
  return { content, document: chunks.map((chunk) => chunk.text).join("\n\n") };
}
