import mongoose, {
  Schema,
  Document,
} from "mongoose";


export interface ISettings extends Document {

  userId: mongoose.Types.ObjectId;


  ai: {

    defaultMode:
      | "study"
      | "assistant"
      | "hybrid";


    responseLength:
      | "short"
      | "balanced"
      | "detailed";


    citations: boolean;


    deepReasoning: boolean;

  };



  appearance: {

    theme:
      | "dark"
      | "oled";


    glassEffect: boolean;


    accentColor: string;


    compactMode: boolean;


    animations: boolean;

  };



  notifications: {

    studyReminder: boolean;


    emailNotifications: boolean;


    aiUpdates: boolean;


    weeklyReport: boolean;

  };


  createdAt: Date;


  updatedAt: Date;

}



const settingsSchema =
  new Schema<ISettings>(
    {


      userId: {

        type: Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,

      },



      ai: {

        defaultMode: {

          type: String,

          enum: [
            "study",
            "assistant",
            "hybrid",
          ],

          default: "hybrid",

        },


        responseLength: {

          type: String,

          enum: [
            "short",
            "balanced",
            "detailed",
          ],

          default: "balanced",

        },


        citations: {

          type: Boolean,

          default: true,

        },


        deepReasoning: {

          type: Boolean,

          default: true,

        },

      },



      appearance: {

        theme: {

          type: String,

          enum: [
            "dark",
            "oled",
          ],

          default: "dark",

        },


        glassEffect: {

          type: Boolean,

          default: true,

        },


        accentColor: {

          type: String,

          default: "#06b6d4",

        },


        compactMode: {

          type: Boolean,

          default: false,

        },


        animations: {

          type: Boolean,

          default: true,

        },

      },



      notifications: {

        studyReminder: {

          type: Boolean,

          default: true,

        },


        emailNotifications: {

          type: Boolean,

          default: false,

        },


        aiUpdates: {

          type: Boolean,

          default: true,

        },


        weeklyReport: {

          type: Boolean,

          default: true,

        },

      },


    },

    {
      timestamps: true,
    }

  );



export default mongoose.model<ISettings>(
  "Settings",
  settingsSchema,
);