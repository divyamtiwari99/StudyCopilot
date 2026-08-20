import { z } from "zod";

const flashcardsSchema = z.array(z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
})).max(100);

const quizSchema = z.array(z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).length(4),
  correctAnswer: z.number().int().min(0).max(3),
  explanation: z.string().min(1),
})).length(10);

const graphSchema = z.object({
  nodes: z.array(z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    category: z.string().min(1),
    description: z.string(),
  })).max(30),
  edges: z.array(z.object({
    source: z.string().min(1),
    target: z.string().min(1),
    relationship: z.string().min(1),
  })),
});

const roadmapSchema = z.object({
  phases: z.array(z.object({
    title: z.string(),
    description: z.string(),
    topics: z.array(z.object({
      title: z.string(),
      description: z.string(),
      difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
      estimatedTime: z.string(),
      prerequisites: z.array(z.string()),
    })),
  })),
});

const plannerSchema = z.object({
  overview: z.object({
    estimatedDays: z.number().int().nonnegative(),
    dailyStudyHours: z.string(),
    totalTopics: z.number().int().nonnegative(),
  }),
  days: z.array(z.object({
    day: z.number().int().positive(),
    title: z.string(),
    estimatedTime: z.string(),
    tasks: z.array(z.object({
      title: z.string(),
      description: z.string(),
      difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
    })),
    revision: z.boolean(),
    quiz: z.boolean(),
  })),
});

export type StructuredType = "flashcards" | "quiz" | "knowledgeGraph" | "roadmap" | "studyPlanner";

export function parseStructuredOutput(type: StructuredType, raw: string): unknown {
  let value: unknown;
  try {
    value = JSON.parse(raw.trim().replace(/^```json\s*/i, "").replace(/\s*```$/i, ""));
  } catch {
    throw new Error(`AI returned invalid JSON for ${type}. Please regenerate.`);
  }

  const parsed = {
    flashcards: flashcardsSchema,
    quiz: quizSchema,
    knowledgeGraph: graphSchema,
    roadmap: roadmapSchema,
    studyPlanner: plannerSchema,
  }[type].safeParse(value);

  if (!parsed.success) {
    throw new Error(`AI returned an invalid ${type} structure. Please regenerate.`);
  }

  if (type === "knowledgeGraph") {
    const graph = parsed.data as z.infer<typeof graphSchema>;
    const ids = new Set(graph.nodes.map((node) => node.id));
    if (graph.edges.some((edge) => !ids.has(edge.source) || !ids.has(edge.target))) {
      throw new Error("AI returned a knowledge graph with invalid edges. Please regenerate.");
    }
  }

  return parsed.data;
}
