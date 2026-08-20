import { Types } from "mongoose";
import { ContentModel } from "../../content/models/content.model.js";

export class ContentAccessService {
  async getOwnedContent(userId: string, contentId: string) {
    if (!Types.ObjectId.isValid(contentId)) {
      throw new Error("Invalid contentId.");
    }
    const content = await ContentModel.findOne({ _id: contentId, userId });
    if (!content) throw new Error("Content not found.");
    return content;
  }
}

export const contentAccessService = new ContentAccessService();
