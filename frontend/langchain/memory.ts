import { MemorySaver } from "@langchain/langgraph";

// Give agent simple short term memory for chat thread context
export const checkpointerMemorySaver = new MemorySaver();
