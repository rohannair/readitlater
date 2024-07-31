interface SplitOptions {
  chunkSize: number;
  chunkOverlap: number;
  separator?: string;
}

export function splitTextForRAG(text: string, options: SplitOptions): string[] {
  const { chunkSize, chunkOverlap, separator = "\n" } = options;

  // Normalize line breaks and split the text into an array of lines
  const lines = text.replace(/\r\n/g, "\n").split(separator);

  const chunks: string[] = [];
  let currentChunk: string[] = [];
  let currentLength = 0;

  for (const line of lines) {
    if (currentLength + line.length > chunkSize && currentChunk.length > 0) {
      // If adding this line exceeds the chunk size, save the current chunk
      chunks.push(currentChunk.join(separator));

      // Start a new chunk, keeping the overlap
      const overlapSize = Math.min(
        currentChunk.length,
        Math.ceil(chunkOverlap / separator.length)
      );
      currentChunk = currentChunk.slice(-overlapSize);
      currentLength = currentChunk.reduce((sum, line) => sum + line.length, 0);
    }

    currentChunk.push(line);
    currentLength += line.length;
  }

  // Add the last chunk if it's not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(separator));
  }

  return chunks;
}
