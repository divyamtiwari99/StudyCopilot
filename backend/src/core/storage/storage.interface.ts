export interface UploadFileInput {
  file: Buffer;

  fileName: string;

  mimeType: string;

  path: string;
}

export interface UploadedFile {
  provider: string;

  bucket: string;

  key: string;

  url: string;

  size: number;

  mimeType: string;
}

export interface StorageProvider {
  upload(
    input: UploadFileInput,
  ): Promise<UploadedFile>;

  delete(
    key: string,
  ): Promise<void>;

  exists(
    key: string,
  ): Promise<boolean>;

  getSignedUrl(
    key: string,
    expiresIn?: number,
  ): Promise<string>;

  download(key: string): Promise<Buffer>;
}