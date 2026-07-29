const WORDS_PER_TOKEN = 0.75;

export function estimateTokens(text: string): number {
  if (!text.trim()) return 0;

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return Math.ceil(words.length / WORDS_PER_TOKEN);
}