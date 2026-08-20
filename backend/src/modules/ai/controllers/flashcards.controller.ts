import { Request, Response } from "express";
import { AppError } from "../../../core/errors/app.error.js";

import { flashcardsService } from "../services/flashcards.service.js";
import { AIProviderError } from "../providers/provider.error.js";

class FlashcardsController {
  async generate(
    req: Request,
    res: Response
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { contentId } = req.body;

      if (
        typeof contentId !== "string" ||
        !contentId.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "contentId is required.",
        });
      }

      const artifact =
        await flashcardsService.generate({
          contentId,
          userId: req.user.id,
        });

      return res.status(200).json({
        success: true,
        data: artifact,
      });
    } catch (error) {
      if (error instanceof AIProviderError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code,
          provider: error.provider,
          attemptedProviders: error.attemptedProviders,
        });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to generate flashcards.",
      });
    }
  }

  async get(
    req: Request,
    res: Response
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const rawContentId =
        req.params.contentId;

      const contentId =
        Array.isArray(rawContentId)
          ? rawContentId[0]
          : rawContentId;

      if (!contentId) {
        return res.status(400).json({
          success: false,
          message: "contentId is required.",
        });
      }

      const flashcards =
        await flashcardsService.get(
          contentId,
          req.user.id,
        );

      if (!flashcards) {
        return res.status(404).json({
          success: false,
          message:
            "Flashcards not found.",
        });
      }

      return res.json({
        success: true,
        data: flashcards,
      });
    } catch (error) {
      if (error instanceof AIProviderError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          code: error.code,
          provider: error.provider,
          attemptedProviders: error.attemptedProviders,
        });
      }
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch flashcards.",
      });
    }
  }
  async getAll(
req: Request,
res: Response
) {

try {

if (!req.user) {

return res.status(401).json({
success:false,
message:"Unauthorized",
});

}


const flashcards =
await flashcardsService.getAll(
req.user.id,
);


return res.json({

success:true,

data:flashcards,

});


} catch(error) {

if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);


return res.status(500).json({

success:false,

message:
"Failed to fetch flashcards.",

});

}

}



async delete(
req: Request,
res: Response
) {

try {

if (!req.user) {

return res.status(401).json({
success:false,
message:"Unauthorized",
});

}



const rawContentId =
req.params.contentId;



const contentId =
Array.isArray(rawContentId)
?
rawContentId[0]
:
rawContentId;



if(!contentId){

return res.status(400).json({

success:false,

message:
"contentId is required.",

});

}



await flashcardsService.delete(
contentId,
req.user.id,
);



return res.json({

success:true,

message:
"Flashcards deleted successfully.",

});


}catch(error){

if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);



return res.status(500).json({

success:false,

message:
"Failed to delete flashcards.",

});


}

}
}

export const flashcardsController =
  new FlashcardsController();
