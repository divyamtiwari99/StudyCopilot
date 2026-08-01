import { ChatIntent } from "./intent.service.js";

export interface PromptInput {
  context: string;
  question: string;
  intent: ChatIntent;
}

export class PromptBuilderService {
  build(input: PromptInput): string {
    switch (input.intent) {
      case "SUMMARY":
        return this.summaryPrompt(input);

      case "NOTES":
        return this.notesPrompt(input);

      case "FLASHCARDS":
        return this.flashcardPrompt(input);

      case "QUIZ":
        return this.quizPrompt(input);

      case "COMPARE":
        return this.comparePrompt(input);

      case "LIST":
        return this.listPrompt(input);

      case "EXPLAIN":
        return this.explainPrompt(input);

      default:
        return this.questionPrompt(input);
    }
  }

  private baseRules() {
    return `
You are StudyCopilot.

STRICT RULES

- Answer ONLY from the provided context.
- Never hallucinate.
- Never invent information.
- If the answer isn't available in the context, reply exactly:

"I couldn't find that information in the uploaded material."

- Keep formatting clean.
- Use markdown.
`;
  }

  private summaryPrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

Create a complete study summary.

Include:

# Summary

## Main Topics

## Important Concepts

## Key Points

## Final Revision Notes

CONTEXT

${input.context}
`;
  }

  private notesPrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

Convert the document into clean study notes.

Requirements:

- Headings
- Bullet points
- Important definitions
- Key facts
- Revision friendly

CONTEXT

${input.context}
`;
  }

  private flashcardPrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

Generate study flashcards.

Format:

Q:
A:

Create as many useful flashcards as possible.

CONTEXT

${input.context}
`;
  }

  private quizPrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

Generate 10 MCQs.

Format

Question

A)

B)

C)

D)

Correct Answer:

Explanation:

CONTEXT

${input.context}
`;
  }

  private comparePrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

Answer the comparison question.

Use a markdown table whenever possible.

Question

${input.question}

CONTEXT

${input.context}
`;
  }

  private listPrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

List all important topics from the provided material.

Organize by importance.

Question

${input.question}

CONTEXT

${input.context}
`;
  }

  private explainPrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

Explain the answer in a teaching style.

Include:

Definition

Why it matters

Key concepts

Examples (only if present in context)

Question

${input.question}

CONTEXT

${input.context}
`;
  }

  private questionPrompt(
    input: PromptInput
  ) {
    return `
${this.baseRules()}

TASK

Answer the user's question clearly.

Question

${input.question}

CONTEXT

${input.context}
`;
  }
}

export const promptBuilderService =
  new PromptBuilderService();