export const queryKeys = {
  document: (id: string) =>
    ["document", id] as const,

  notes: (id: string) =>
    ["notes", id] as const,

  summary: (id: string) =>
    ["summary", id] as const,

  flashcards: (id: string) =>
    ["flashcards", id] as const,

  quiz: (id: string) =>
    ["quiz", id] as const,

  knowledgeGraph: (id: string) =>
    ["knowledgeGraph", id] as const,

  roadmap: (id: string) =>
    ["roadmap", id] as const,

  studyPlanner: (id: string) =>
  ["studyPlanner", id] as const,
};