import { createClient } from "@supabase/supabase-js";

import { env } from "../../config/env.js";

import type {
  StorageProvider,
  UploadFileInput,
  UploadedFile,
} from "./storage.interface.js";

const client = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
);

export class SupabaseStorageProvider
  implements StorageProvider
{
  async upload(
    input: UploadFileInput,
  ): Promise<UploadedFile> {
    const bucket =
      env.SUPABASE_BUCKET;

    const { error } =
      await client.storage
        .from(bucket)
        .upload(input.path, input.file, {
          contentType:
            input.mimeType,

          upsert: false,
        });

    if (error) {
      throw error;
    }

    return {
      provider: "supabase",

      bucket,

      key: input.path,

      url: "",

      size: input.file.length,

      mimeType: input.mimeType,
    };
  }

  async delete(
    key: string,
  ): Promise<void> {
    const { error } =
      await client.storage
        .from(env.SUPABASE_BUCKET)
        .remove([key]);

    if (error) {
      throw error;
    }
  }

  async exists(
    key: string,
  ): Promise<boolean> {
    const folder =
      key.includes("/")
        ? key.substring(
            0,
            key.lastIndexOf("/"),
          )
        : "";

    const filename =
      key.split("/").pop() ?? key;

    const { data, error } =
      await client.storage
        .from(env.SUPABASE_BUCKET)
        .list(folder);

    if (error) {
      return false;
    }

    return data.some(
      (file) =>
        file.name === filename,
    );
  }

  async getSignedUrl(
    key: string,
    expiresIn = 3600,
  ): Promise<string> {
    const { data, error } =
      await client.storage
        .from(env.SUPABASE_BUCKET)
        .createSignedUrl(
          key,
          expiresIn,
        );

    if (error) {
      throw error;
    }

    return data.signedUrl;
  }
}

export const supabaseStorageProvider =
  new SupabaseStorageProvider();