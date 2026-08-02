export interface BuildQuizPromptInput {
  title: string;
  content: string;
}

export class QuizPromptBuilder {
  build({
    title,
    content,
  }: BuildQuizPromptInput): string {
    return `
You are StudyCopilot.

Generate a high-quality multiple-choice quiz from the provided study material.

Rules:

- Use ONLY the provided content.
- Never hallucinate.
- Generate exactly 10 questions.
- Every question must have:
  - question
  - options (exactly 4)
  - correctAnswer (0-based index)
  - explanation
- Keep explanations concise.
- Return ONLY valid JSON.
- Do not wrap JSON inside markdown.

Format:

[
  {
    "question": "...",
    "options": [
      "...",
      "...",
      "...",
      "..."
    ],
    "correctAnswer": 0,
    "explanation": "..."
  }
]

Document Title:

${title}

----------------------------------------

${content}
`;
  }
}

export const quizPromptBuilder =
  new QuizPromptBuilder();