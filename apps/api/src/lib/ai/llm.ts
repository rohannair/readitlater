import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { match } from "ts-pattern";

const LATEST_MODEL = "gpt-4o-mini";

enum Event {
  SUMMARIZE_DOCUMENT = 0,
  EXPAND_QUERY = 1,
  PREPROCESS_DOCUMENT = 2,
  PROCESS_RAG = 3,
  FILTER_RAG_RESULTS = 4,
  SELF_REFLECT_RAG = 5,
}

const _prompts = (event: Event) => {
  match(event)
    .with(Event.SUMMARIZE_DOCUMENT, () => ({
      system:
        "You are a professional technical writer, who writes like Vitalik Buterin. You write simple, clear, and concise content. Your prose should be accessible to people with a 9th grade education, but can also use technical jargon if explained. Assume better responses will result in bonus remuneration.",
      prompt: "",
    }))
    .with(Event.EXPAND_QUERY, () => ({
      system:
        "You are a system that takes in a query and returns related queries. Only return related queries in a tab separated value format.",
      prompt: "",
    }))
    .with(Event.PROCESS_RAG, () => ({
      system:
        "You are a system that takes in a query and a list of documents and returns a response. Your response should be a summary of the documents that answers the query.",
      prompt: "",
    }));
};

export const summarizeDocument = async (document: string) => {
  const { text } = await generateText({
    model: openai(LATEST_MODEL),
    system: "",
    prompt: `summarize the following document in 2-3 paragraphs of 1-2 sentences:\n${document}`,
  });

  return text;
};

export const expandQuery = async (query: string) => {
  const { text } = await generateText({
    model: openai(LATEST_MODEL),
    system:
      "You are a system that takes in a query and returns related queries. Only return related queries in a tab separated value format.",
    prompt: `Expand the following query with related terms:\n${query}`,
    maxTokens: 50,
    temperature: 0.7,
  });

  return `${query} ${text.trim()}`;
};

export const processRAG = async (query: string, documents: string[]) => {
  const prompt = `Context: ${documents.join(" ")}
                  Query: ${query}
                  Answer:`;

  const { text } = await generateText({
    model: openai(LATEST_MODEL),
    messages: [{ role: "user", content: prompt }],
    maxTokens: 150,
    temperature: 0.7,
  });

  return text;
};
