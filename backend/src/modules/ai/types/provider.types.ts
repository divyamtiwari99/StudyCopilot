export type AIProviderName = "groq" | "gemini";

export interface AIRequestOptions {
  signal?: AbortSignal;
}

export interface AITextInput extends AIRequestOptions {
  prompt: string;
  maxOutputTokens?: number;
  temperature?: number;
  deepReasoning?: boolean;

  /**
   * Request machine-readable JSON when the provider supports JSON mode.
   */
  jsonMode?: boolean;
}

export interface AIImageInput extends AITextInput {
  images: Array<{
    mimeType: string;
    data: Buffer;
    url?: string;
  }>;
}

export interface AIProviderResult {
  text: string;
  provider: AIProviderName;
  model: string;
}

export interface AIProvider {
  readonly name: AIProviderName;
  readonly textModel: string;
  readonly visionModel: string;

  generateText(input: AITextInput): Promise<AIProviderResult>;

  generateWithImage(input: AIImageInput): Promise<AIProviderResult>;

  streamText(input: AITextInput): AsyncGenerator<string>;
}