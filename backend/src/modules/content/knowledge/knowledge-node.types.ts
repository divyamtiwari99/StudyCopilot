export interface KnowledgeNode {

  id: string;

  name: string;

  type:
    | "concept"
    | "definition"
    | "formula"
    | "algorithm"
    | "example";

  confidence: number;

}

export interface KnowledgeEdge {

  from: string;

  to: string;

  relation:
    | "contains"
    | "depends_on"
    | "explains"
    | "uses"
    | "example_of";

}