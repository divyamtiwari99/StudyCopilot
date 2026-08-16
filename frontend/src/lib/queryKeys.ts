export const queryKeys = {
  documents: () => ["documents"] as const,
  documentRoot: () => ["document"] as const,
  document: (id: string) => ["document", id] as const,

  notesRoot: () => ["notes"] as const,
  notes: (id: string) => ["notes", id] as const,
  allNotes: () => ["all-notes"] as const,

  summaryRoot: () => ["summary"] as const,
  summary: (id: string) => ["summary", id] as const,

  flashcardsRoot: () => ["flashcards"] as const,
  flashcards: (id: string) => ["flashcards", id] as const,
  allFlashcards: () => ["flashcards", "all"] as const,

  quizRoot: () => ["quiz"] as const,
  quiz: (id: string) => ["quiz", id] as const,
  allQuiz: () => ["quiz", "all"] as const,

  knowledgeGraphRoot: () => ["knowledgeGraph"] as const,
  knowledgeGraph: (id: string) => ["knowledgeGraph", id] as const,
  roadmapRoot: () => ["roadmap"] as const,
  roadmap: (id: string) => ["roadmap", id] as const,
  studyPlannerRoot: () => ["studyPlanner"] as const,
  studyPlanner: (id: string) => ["studyPlanner", id] as const,
} as const;
