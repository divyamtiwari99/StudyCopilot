export interface BuildKnowledgeGraphPromptInput {
  title: string;
  content: string;
}

export class KnowledgeGraphPromptBuilder {
  build({
    title,
    content,
  }: BuildKnowledgeGraphPromptInput): string {
    return `
You are StudyCopilot AI.

Your task is to analyze the uploaded study material and build a knowledge graph.

Return ONLY valid JSON.

Do NOT wrap inside markdown.

Do NOT explain anything.

JSON format:

{
  "nodes":[
    {
      "id":"unique-id",
      "label":"Topic Name",
      "category":"Concept",
      "description":"Short description"
    }
  ],

  "edges":[
    {
      "source":"node-id",
      "target":"node-id",
      "relationship":"related"
    }
  ]
}

Rules:

- Extract only important concepts.
- Maximum 30 nodes.
- Every node id must be unique.
- Every edge source/target must exist.
- Description maximum 20 words.
- Relationship examples:
  - contains
  - depends_on
  - uses
  - extends
  - related

Document Title:

${title}

-----------------------

Document:

${content}

-----------------------

Return JSON only.
`;
  }
}

export const knowledgeGraphPromptBuilder =
  new KnowledgeGraphPromptBuilder();