import type {
  StorageProvider,
  UploadFileInput,
  UploadedFile,
} from "./storage.interface.js";

import {
  supabaseStorageProvider,
} from "./supabase.provider.js";

export class StorageManager {

  private provider: StorageProvider;

  constructor() {

    this.provider =
      supabaseStorageProvider;

  }

  async upload(
    input: UploadFileInput,
  ): Promise<UploadedFile> {

    return this.provider.upload(
      input,
    );

  }

  async delete(
    key: string,
  ): Promise<void> {

    return this.provider.delete(
      key,
    );

  }

  async exists(
    key: string,
  ): Promise<boolean> {

    return this.provider.exists(
      key,
    );

  }

  async getSignedUrl(
    key: string,
    expiresIn?: number,
  ): Promise<string> {

    return this.provider.getSignedUrl(
      key,
      expiresIn,
    );

  }

}

export const storageManager =
  new StorageManager();