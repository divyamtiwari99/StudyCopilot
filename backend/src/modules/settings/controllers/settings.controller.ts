import type {
  Request,
  Response,
} from "express";

import settingsService from "../services/settings.service.js";



class SettingsController {


  async getSettings(
    req: Request,
    res: Response,
  ) {


    const userId =
      req.user!.id;



    const settings =
      await settingsService.getSettings(
        userId,
      );



    return res.status(200).json({

      success: true,

      settings,

    });


  }





  async updateSettings(
    req: Request,
    res: Response,
  ) {


    const userId =
      req.user!.id;



    const settings =
      await settingsService.updateSettings(

        userId,

        req.body,

      );



    return res.status(200).json({

      success: true,

      settings,

    });


  }


}



export default new SettingsController();