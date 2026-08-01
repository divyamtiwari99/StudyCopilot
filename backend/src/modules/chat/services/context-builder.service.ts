export class ContextBuilderService {
  build(
    chunks: { text: string }[]
  ) {
    return chunks
      .map((chunk) => chunk.text)
      .join(
        "\n\n----------------------\n\n"
      );
  }
}

export const contextBuilderService =
  new ContextBuilderService();