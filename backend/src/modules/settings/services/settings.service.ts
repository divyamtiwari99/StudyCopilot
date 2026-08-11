import Settings from "../models/settings.model.js";

import UserModel from "../../auth/models/user.model.js";

import { ContentModel } from "../../content/models/content.model.js";

import { ChatSessionModel } from "../../chat/models/chat-session.model.js";



class SettingsService {


  async getSettings(
    userId: string,
  ) {


    let settings =
      await Settings.findOne({

        userId,

      });





    if (!settings) {


      settings =
        await Settings.create({

          userId,

        });


    }







    const user =
      await UserModel.findById(
        userId,
      ).select(
        "name email avatar createdAt",
      );







    const documentCount =
      await ContentModel.countDocuments({

        userId,

      });







    const storageResult =
      await ContentModel.aggregate([


        {

          $match: {

            userId,

          },

        },


        {

          $group: {

            _id: null,


            totalSize: {

              $sum:
                "$storage.size",

            },

          },

        },


      ]);







    const chatCount =
      await ChatSessionModel.countDocuments({

        userId,

      });







    const totalBytes =
      storageResult[0]?.totalSize ?? 0;







    const storageGB =
      Number(

        (

          totalBytes /

          (1024 * 1024 * 1024)

        ).toFixed(2)

      );







    return {


      user: {


        name:
          user?.name ?? "",



        email:
          user?.email ?? "",



        avatar:
          user?.avatar ?? "",



        plan:
          "Premium",



        joinedAt:
          user?.createdAt ?? new Date(),


      },





      ai:
        settings.ai,





      appearance:
        settings.appearance,





      notifications:
        settings.notifications,





      storage: {


        used:
          storageGB,



        total:
          5,



        documents:
          documentCount,



        chats:
          chatCount,


      },



    };


  }









  async updateSettings(

    userId: string,

    data: Record<string, any>,

  ) {




    const allowedData = {



      ...(data.ai && {

        ai:
          data.ai,

      }),






      ...(data.appearance && {

        appearance:
          data.appearance,

      }),






      ...(data.notifications && {

        notifications:
          data.notifications,

      }),



    };







    await Settings.findOneAndUpdate(


      {

        userId,

      },


      {

        $set:
          allowedData,

      },


      {

        new: true,

        upsert: true,

      },


    );







    return await this.getSettings(

      userId,

    );


  }



}



export default new SettingsService();