interface QueueScrape {
  url: string
}

export async function queueScrape(
  input: QueueScrape,
): Promise<{ id: string; url: string }> {
  return { id: 'fake-id', url: input.url }
}
