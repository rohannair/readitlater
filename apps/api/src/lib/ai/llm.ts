import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export const summarizeDocument = async (document: string) => {
  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    system:
      'You are a professional writer. You write simple, clear, and concise content.',
    prompt: `summarize the following document in 2-3 paragraphs:\n${document}`,
  })

  return text
}

export const expandQuery = async (query: string) => {
  const { text } = await generateText({
    model: openai('gpt-3.5-turbo-instruct'),
    prompt: `Expand the following query with related terms:\n${query}`,
    maxTokens: 50,
    temperature: 0.7,
  })

  return `${query} ${text.trim()}`
}

export const processRAG = async (query: string, documents: string[]) => {
  const prompt = `Context: ${documents.join(' ')}
                  Query: ${query}
                  Answer:`

  const { text } = await generateText({
    model: openai('gpt-3.5-turbo-instruct'),
    messages: [{ role: 'user', content: prompt }],
    maxTokens: 150,
    temperature: 0.7,
  })

  return text
}
