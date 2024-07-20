import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

const LATEST_MODEL = 'gpt-4o-mini'

export const summarizeDocument = async (document: string) => {
  const { text } = await generateText({
    model: openai(LATEST_MODEL),
    system:
      'You are a professional technical writer, who writes like Vitalik Buterin. You write simple, clear, and concise content. Your prose should be accessible to people with a 9th grade education, but can also use technical jargon if explained. Assume better responses will result in bonus remuneration.',
    prompt: `summarize the following document in 1-2 paragraphs:\n${document}`,
  })

  return text
}

export const expandQuery = async (query: string) => {
  const { text } = await generateText({
    model: openai(LATEST_MODEL),
    system:
      'You are a system that takes in a query and returns related queries. Only return related queries in a tab separated value format.',
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
    model: openai(LATEST_MODEL),
    messages: [{ role: 'user', content: prompt }],
    maxTokens: 150,
    temperature: 0.7,
  })

  return text
}
