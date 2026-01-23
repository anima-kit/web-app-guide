import { createAgent } from "langchain";
import { checkpointerMemorySaver } from "@/langchain/memory";
import { chatOpenAIModel } from "@/langchain/models";
import { getWeather } from "@/langchain/tools";

// Use ChatOpenAI model with placeholder weather tool
// User MemorySaver checkpointer
const model = chatOpenAIModel;
const tools = [getWeather];
export const agentCheckpointer = checkpointerMemorySaver;

export const langchainAgent = createAgent({
  model: model,
  tools: tools,
  checkpointer: agentCheckpointer,
});
