export interface PromptInput {
  context: string;
  question: string;
}

export class PromptBuilderService {
  build(input: PromptInput): string {
    return `
You are StudyCopilot.

Rules:

- Answer ONLY using the provided context.
- Never hallucinate.
- If the answer is not present, reply:
  "I couldn't find that information in the uploaded material."

Context:

${input.context}

----------------------------------------

Question:

${input.question}

----------------------------------------

Answer:
`;
  }
}

export const promptBuilderService =
  new PromptBuilderService();