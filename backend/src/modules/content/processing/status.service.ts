import { ContentModel } from "../models/content.model.js";

import { ProcessingStage } from "./job.types.js";

export class StatusService {

  async update(
    contentId: string,
    stage: ProcessingStage
  ) {

    await ContentModel.findByIdAndUpdate(
      contentId,
      {
        status: stage,
      }
    );

  }

}

export const statusService =
  new StatusService();