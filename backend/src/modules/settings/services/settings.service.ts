import { Types } from "mongoose";
import Settings from "../models/settings.model.js";

import UserModel from "../../auth/models/user.model.js";

import { ContentModel } from "../../content/models/content.model.js";

import { ChatSessionModel } from "../../chat/models/chat-session.model.js";
import { env } from "../../../config/env.js";



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

            userId: new Types.ObjectId(userId),

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
          env.DEFAULT_PLAN_NAME,



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
          env.STORAGE_LIMIT_GB,



        documents:
          documentCount,



        chats:
          chatCount,


      },



    };


  }









  async updateSettings(
    userId: string,
    data: {
      ai?: { defaultMode?: "study" | "assistant" | "hybrid"; responseLength?: "short" | "balanced" | "detailed"; citations?: boolean; deepReasoning?: boolean };
      appearance?: { theme?: "arctic" | "midnight" | "forest" | "sunset" | "carbon"; glassEffect?: boolean; accentColor?: string; compactMode?: boolean; animations?: boolean };
      notifications?: { studyReminder?: boolean; emailNotifications?: boolean; aiUpdates?: boolean; weeklyReport?: boolean };
    },
  ) {
    const $set: Record<string, unknown> = {};

    if (data.ai) {
      if (data.ai.defaultMode !== undefined) $set["ai.defaultMode"] = data.ai.defaultMode;
      if (data.ai.responseLength !== undefined) $set["ai.responseLength"] = data.ai.responseLength;
      if (data.ai.citations !== undefined) $set["ai.citations"] = data.ai.citations;
      if (data.ai.deepReasoning !== undefined) $set["ai.deepReasoning"] = data.ai.deepReasoning;
    }

    if (data.appearance) {
      if (data.appearance.theme !== undefined) $set["appearance.theme"] = data.appearance.theme;
      if (data.appearance.glassEffect !== undefined) $set["appearance.glassEffect"] = data.appearance.glassEffect;
      if (data.appearance.accentColor !== undefined) $set["appearance.accentColor"] = data.appearance.accentColor;
      if (data.appearance.compactMode !== undefined) $set["appearance.compactMode"] = data.appearance.compactMode;
      if (data.appearance.animations !== undefined) $set["appearance.animations"] = data.appearance.animations;
    }

    if (data.notifications) {
      if (data.notifications.studyReminder !== undefined) $set["notifications.studyReminder"] = data.notifications.studyReminder;
      if (data.notifications.emailNotifications !== undefined) $set["notifications.emailNotifications"] = data.notifications.emailNotifications;
      if (data.notifications.aiUpdates !== undefined) $set["notifications.aiUpdates"] = data.notifications.aiUpdates;
      if (data.notifications.weeklyReport !== undefined) $set["notifications.weeklyReport"] = data.notifications.weeklyReport;
    }

    if (Object.keys($set).length) {
      await Settings.findOneAndUpdate(
        { userId },
        { $set },
        { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
      );
    }

    return this.getSettings(userId);
  }


}

export default new SettingsService();