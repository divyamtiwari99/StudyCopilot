import { ContentBlock } from "./content-block.types.js";

export interface ContentChunk {

  id: string;

  title: string;

  order: number;

  tokens: number;

  text: string;

  blocks: ContentBlock[];

}