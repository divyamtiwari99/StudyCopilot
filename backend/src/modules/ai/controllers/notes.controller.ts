import { Request, Response } from "express";

import { notesService } from "../services/notes.service.js";


class NotesController {


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


const { contentId } =
req.body;


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
await notesService.generate({

contentId,

userId:
req.user.id,

});


return res.status(200).json({

success: true,

data: artifact,

});


} catch (error) {


console.error(error);


return res.status(500).json({

success: false,

message:
error instanceof Error
? error.message
: "Failed to generate notes.",

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

message:
"contentId is required.",

});


}



const notes =
await notesService.get(
contentId,
);



if (!notes) {


return res.status(404).json({

success: false,

message:
"Notes not found.",

});


}



return res.json({

success: true,

data: notes,

});



} catch (error) {


console.error(error);



return res.status(500).json({

success: false,

message:
"Failed to fetch notes.",

});


}

}





// ==========================
// Get All Notes
// ==========================

async getAll(
req: Request,
res: Response
) {


try {


if (!req.user) {


return res.status(401).json({

success: false,

message:
"Unauthorized",

});


}



const notes =
await notesService.getAll(
req.user.id,
);



return res.json({

success: true,

data: notes,

});



} catch (error) {


console.error(error);



return res.status(500).json({

success: false,

message:
"Failed to fetch notes.",

});


}


}
// ==========================
// Delete Notes
// ==========================

async delete(
req: Request,
res: Response
) {

try {


if (!req.user) {

return res.status(401).json({

success: false,

message:
"Unauthorized",

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

message:
"contentId is required.",

});

}



await notesService.delete(
contentId,
req.user.id,
);



return res.json({

success: true,

message:
"Notes deleted successfully.",

});



} catch (error) {


console.error(error);



return res.status(500).json({

success: false,

message:
error instanceof Error
? error.message
: "Failed to delete notes.",

});


}

}


}



export const notesController =
new NotesController();