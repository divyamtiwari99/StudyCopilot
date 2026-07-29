export type BlockType =
  | "heading"
  | "paragraph"
  | "list"
  | "table"
  | "code"
  | "formula"
  | "quote"
  | "image";

export interface ContentBlock {
  id: string;

  page: number;

  type: BlockType;

  text: string;

  level?: number;

  metadata: Record<string, unknown>;
}