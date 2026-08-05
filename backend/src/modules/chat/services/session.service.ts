import { Types } from "mongoose";

import { ChatSessionModel } from "../models/chat-session.model.js";
import { ChatMessageModel } from "../models/chat-message.model.js";

type MessageRole =
  | "user"
  | "assistant"
  | "system";

interface CreateSessionInput {
  userId: string;
  contentId: string;
  title?: string;
}

interface CreateMessageInput {
  sessionId: string;
  role: MessageRole;
  content: string;

  sources?: Array<{
    chunkId?: string;
    title?: string;
    order?: number;
  }>;
}

export class SessionService {
  // ----------------------------------
  // Create Session
  // ----------------------------------

  async create({
    userId,
    contentId,
    title,
  }: CreateSessionInput) {
    return ChatSessionModel.create({
      userId: new Types.ObjectId(
        userId,
      ),

      contentId: new Types.ObjectId(
        contentId,
      ),

      title:
        title?.trim() ||
        "New Chat",
    });
  }

  // ----------------------------------
  // Get User Sessions
  // ----------------------------------

  async getSessions(
    userId: string,
    contentId?: string,
  ) {
    const filter: {
      userId: Types.ObjectId;
      contentId?: Types.ObjectId;
      archived: boolean;
    } = {
      userId: new Types.ObjectId(
        userId,
      ),

      archived: false,
    };

    if (contentId) {
      filter.contentId =
        new Types.ObjectId(
          contentId,
        );
    }

    return ChatSessionModel.find(
      filter,
    )
      .sort({
        updatedAt: -1,
      })
      .lean();
  }

  // ----------------------------------
  // Get Session
  // ----------------------------------

  async getSession(
    userId: string,
    sessionId: string,
  ) {
    return ChatSessionModel.findOne({
      _id: new Types.ObjectId(
        sessionId,
      ),

      userId: new Types.ObjectId(
        userId,
      ),
    }).lean();
  }

  // ----------------------------------
  // Get Messages
  // ----------------------------------

  async getMessages(
    userId: string,
    sessionId: string,
  ) {
    const session =
      await this.getSession(
        userId,
        sessionId,
      );

    if (!session) {
      return null;
    }

    return ChatMessageModel.find({
      sessionId:
        new Types.ObjectId(
          sessionId,
        ),
    })
      .sort({
        createdAt: 1,
      })
      .lean();
  }

  // ----------------------------------
  // Create Message
  // ----------------------------------

  async createMessage({
    sessionId,
    role,
    content,
    sources = [],
  }: CreateMessageInput) {
    const message =
      await ChatMessageModel.create({
        sessionId:
          new Types.ObjectId(
            sessionId,
          ),

        role,

        content,

        sources: sources.map(
          (source) => ({
            chunkId:
              source.chunkId
                ? new Types.ObjectId(
                    source.chunkId,
                  )
                : undefined,

            title:
              source.title ?? "",

            order:
              source.order ?? 0,
          }),
        ),
      });

    await ChatSessionModel.updateOne(
      {
        _id: new Types.ObjectId(
          sessionId,
        ),
      },
      {
        $set: {
          lastMessage:
            content.slice(0, 240),
        },

        $currentDate: {
          updatedAt: true,
        },
      },
    );

    return message;
  }

  // ----------------------------------
  // Rename Session
  // ----------------------------------

  async rename(
    userId: string,
    sessionId: string,
    title: string,
  ) {
    const cleanTitle =
      title.trim();

    if (!cleanTitle) {
      return null;
    }

    return ChatSessionModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(
          sessionId,
        ),

        userId: new Types.ObjectId(
          userId,
        ),
      },
      {
        $set: {
          title: cleanTitle,
        },
      },
      {
        new: true,
      },
    ).lean();
  }

  // ----------------------------------
  // Archive Session
  // ----------------------------------

  async archive(
    userId: string,
    sessionId: string,
  ) {
    return ChatSessionModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(
          sessionId,
        ),

        userId: new Types.ObjectId(
          userId,
        ),
      },
      {
        $set: {
          archived: true,
        },
      },
      {
        new: true,
      },
    ).lean();
  }

  // ----------------------------------
  // Delete Session
  // ----------------------------------

  async delete(
    userId: string,
    sessionId: string,
  ) {
    const session =
      await ChatSessionModel.findOne({
        _id: new Types.ObjectId(
          sessionId,
        ),

        userId: new Types.ObjectId(
          userId,
        ),
      });

    if (!session) {
      return null;
    }

    await Promise.all([
      ChatMessageModel.deleteMany({
        sessionId: session._id,
      }),

      ChatSessionModel.deleteOne({
        _id: session._id,
      }),
    ]);

    return {
      id: session._id.toString(),
    };
  }
}

export const sessionService =
  new SessionService();