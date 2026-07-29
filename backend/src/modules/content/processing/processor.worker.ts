import { queueService } from "../../../core/queue/queue.service.js";

import { pipelineService } from "./pipeline.service.js";

queueService.register(
  "content.process",
  async (payload: any) => {
    await pipelineService.process(payload);
  }
);