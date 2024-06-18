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
