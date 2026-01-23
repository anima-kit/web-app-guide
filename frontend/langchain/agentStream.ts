import { AIMessage, ToolMessage } from "langchain";
import { langchainAgent } from "@/langchain/agent";
import { MessageProps } from "@/types/messages";

const agent = langchainAgent;
// Helpers to get appropriate types of messages
function isAiMessage(msg: unknown): msg is AIMessage {
  return msg instanceof AIMessage;
}
function isToolMessage(msg: unknown): msg is ToolMessage {
  return msg instanceof ToolMessage;
}

// Warm‑up the agent on start‑up
// Send prompt and ignore output
export async function warmUpAgent(): Promise<void> {
  await agent.stream(
    { messages: [{ role: "user", content: "Hello" }] },
    { configurable: { thread_id: "warm-up" }, streamMode: "updates" },
  );
}

// Stream user prompts and agent responses
export async function* runAgentStream(
  userPrompt: string,
  threadId: string,
): AsyncGenerator<MessageProps> {
  // Immediately yield user message
  yield {
    role: "user",
    content: userPrompt,
  };

  for await (const chunk of await agent.stream(
    { messages: [{ role: "user", content: userPrompt }] },
    { configurable: { thread_id: threadId }, streamMode: "updates" },
  )) {
    const [_, payload] = Object.entries(chunk)[0];
    if (!payload?.messages) continue;

    for (const msg of payload.messages) {
      // Can be assistant or tool call message
      if (isAiMessage(msg)) {
        yield {
          role: "assistant",
          content: typeof msg.content === "string" ? msg.content : "",
        };

        yield {
          role: "assistant",
          metadata: msg.response_metadata ?? {},
        };
        const toolCalls = msg.tool_calls ?? [];
        for (const tc of toolCalls) {
          yield {
            role: "assistant",
            toolCallName: tc.name,
            args: tc.args,
          };
        }
      }

      // Tool messages
      if (isToolMessage(msg)) {
        yield {
          role: "assistant",
          toolCallName: msg.name,
          content: typeof msg.content === "string" ? msg.content : "",
        };
      }
    }
  }
}
