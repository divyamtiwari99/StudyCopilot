export class VectorSearchService {
  cosineSimilarity(
    a: number[],
    b: number[]
  ) {
    if (
      a.length === 0 ||
      b.length === 0 ||
      a.length !== b.length
    ) {
      return -1;
    }

    let dot = 0;

    let magA = 0;

    let magB = 0;

    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];

      magA += a[i] * a[i];

      magB += b[i] * b[i];
    }

    const denominator =
      Math.sqrt(magA) *
      Math.sqrt(magB);

    if (denominator === 0) {
      return -1;
    }

    return dot / denominator;
  }
}

export const vectorSearchService =
  new VectorSearchService();