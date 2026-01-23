import { ChatOpenAI } from "@langchain/openai";

// ChatOpenAI models using env variables & LM Studio fallback
export const chatOpenAIModel = new ChatOpenAI({
  apiKey: process.env.LLM_API_KEY ?? "lmstudio",
  temperature: 0.7,
  modelName: process.env.LLM_NAME ?? "openai/gpt-oss-20b",
  configuration: {
    baseURL: process.env.LLM_URL ?? "http://127.0.0.1:1234/v1",
  },
});
