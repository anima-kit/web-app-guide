import { MessageProps } from "@/types/messages";

// Find index of last message with given role
const findLastIndex = (arr: MessageProps[], role: string): number => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i].role === role) return i;
  }
  return -1;
};

// Ensure the assistant message always follows after the user message
const ensureAssistant = (msgs: MessageProps[]): MessageProps[] => {
  const lastUserIdx = findLastIndex(msgs, "user");
  const lastAssistantIdx = findLastIndex(msgs, "assistant");
  if (lastAssistantIdx <= lastUserIdx) {
    return [...msgs, { role: "assistant", content: "" }];
  }
  return msgs;
};

// Add user message to list of messages
// Will be added with content and metadata
export const addUserMessage = (
  msgs: MessageProps[],
  msg: MessageProps,
): MessageProps[] => {
  return [
    ...msgs,
    {
      role: "user",
      content: msg.content ?? "",
      metadata: msg.metadata ?? {},
    },
  ];
};

// Add tool call message (from assistant) to list of messages
// Will be added with name of tool and arguments passed
export const addToolCallMessage = (
  msgs: MessageProps[],
  msg: MessageProps,
): MessageProps[] => {
  const idxTool = findLastIndex(msgs, "assistant");
  if (idxTool === -1) {
    return [
      ...msgs,
      {
        role: "assistant-tool",
        toolCallName: msg.toolCallName,
        args: msg.args,
      },
    ];
  }
  return [
    ...msgs.slice(0, idxTool),
    {
      role: "assistant-tool",
      toolCallName: msg.toolCallName,
      args: msg.args,
    },
    ...msgs.slice(idxTool),
  ];
};

// Add tool result message to list of messages
// Will be added with tool call name and resulting content
export const addToolResultMessage = (
  msgs: MessageProps[],
  msg: MessageProps,
): MessageProps[] => {
  const idxTool = findLastIndex(msgs, "assistant");
  if (idxTool === -1) {
    return [
      ...msgs,
      {
        role: "tool",
        toolCallName: msg.toolCallName,
        content: msg.content,
      },
    ];
  }
  return [
    ...msgs.slice(0, idxTool),
    {
      role: "tool",
      toolCallName: msg.toolCallName,
      content: msg.content,
    },
    ...msgs.slice(idxTool),
  ];
};

// Add assistant message to list of messages
// Will be added with content and metadata
export const addAssistantMessage = (
  msgs: MessageProps[],
  msg: MessageProps,
): MessageProps[] => {
  const updated = ensureAssistant(msgs);
  const idx = findLastIndex(updated, "assistant");
  const existingMsg = updated[idx];
  const newContent =
    msg.content !== undefined
      ? (existingMsg.content ?? "") + msg.content
      : existingMsg.content;
  const newMetadata =
    msg.metadata !== undefined ? msg.metadata : existingMsg.metadata;
  const newMsg: MessageProps = {
    ...existingMsg,
    content: newContent,
    metadata: newMetadata,
  };
  return [...updated.slice(0, idx), newMsg, ...updated.slice(idx + 1)];
};
