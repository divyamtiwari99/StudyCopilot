export interface BuildRoadmapPromptInput {
  title: string;

  content: string;
}

export class RoadmapPromptBuilder {
  build({
    title,
    content,
  }: BuildRoadmapPromptInput) {
    return `
You are StudyCopilot.

Analyze the uploaded study material.

Create a structured learning roadmap.

Return ONLY valid JSON.

Schema:

{
  "phases":[
    {
      "title":"",

      "description":"",

      "topics":[
        {
          "title":"",

          "description":"",

          "difficulty":"Beginner | Intermediate | Advanced",

          "estimatedTime":"",

          "prerequisites":[]
        }
      ]
    }
  ]
}

Rules:

- Use ONLY document content.
- Do not hallucinate.
- Keep learning order logical.
- Group related concepts.
- Include prerequisites.
- No markdown.
- JSON only.

Document Title:

${title}

Document:

${content}
`;
  }
}

export const roadmapPromptBuilder =
  new RoadmapPromptBuilder();