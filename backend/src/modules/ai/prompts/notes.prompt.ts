export interface BuildNotesPromptInput {
  title: string;
  content: string;
}

export class NotesPromptBuilder {
  build({
    title,
    content,
  }: BuildNotesPromptInput): string {
    return `
You are StudyCopilot.

You are an expert teacher.

Your task is to create premium study notes from the uploaded material.

Rules:

- Use ONLY the provided content.
- Never hallucinate.
- Keep the original meaning.
- Use clean Markdown.
- Organize everything into logical sections.
- Add headings and subheadings.
- Convert long paragraphs into bullet points where appropriate.
- Highlight important keywords in **bold**.
- Include definitions.
- Include formulas if present.
- Include important facts.
- Include examples only if they exist in the document.
- Do not invent examples.
- End with a short revision summary.

Document Title:

${title}

----------------------------------------

Document Content:

${content}

----------------------------------------

Generate comprehensive study notes.
`;
  }
}

export const notesPromptBuilder =
  new NotesPromptBuilder();