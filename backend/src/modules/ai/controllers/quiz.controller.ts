import { Request, Response } from "express";
import { AppError } from "../../../core/errors/app.error.js";

import { quizService } from "../services/quiz.service.js";
import { AIProviderError } from "../providers/provider.error.js";

class QuizController {
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
        await quizService.generate({
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
            : "Failed to generate quiz.",
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

      const quiz =
        await quizService.get(
          contentId,
          req.user.id,
        );

      if (!quiz) {
        return res.status(404).json({
          success: false,
          message:
            "Quiz not found.",
        });
      }

      return res.json({
        success: true,
        data: quiz,
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
          "Failed to fetch quiz.",
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
success: false,
message: "Unauthorized",
});

}


const quizzes =
await quizService.getAll(
req.user.id,
);


return res.json({

success: true,

data: quizzes,

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
"Failed to fetch quizzes.",

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

success:false,

message:
"contentId is required.",

});

}



await quizService.delete(
contentId,
req.user.id,
);



return res.json({

success:true,

message:
"Quiz deleted successfully.",

});



} catch(error) {


if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
      }

      console.error(error);



return res.status(500).json({

success:false,

message:
"Failed to delete quiz.",

});


}


}
}

export const quizController =
  new QuizController();
