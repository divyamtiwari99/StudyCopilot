import { ChunkModel } from "../../content/models/chunk.model.js";

export class RetrievalService {

  async retrieve(
    contentId: string
  ) {

    return ChunkModel.find({
      contentId,
    })
      .sort({
        order: 1,
      })
      .limit(5);

  }

}

export const retrievalService =
  new RetrievalService();