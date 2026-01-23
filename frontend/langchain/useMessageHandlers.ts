import { useState } from "react";
import {
  addUserMessage,
  addToolCallMessage,
  addToolResultMessage,
  addAssistantMessage,
} from "@/langchain/addMessages";
import { updateCheckpoint } from "@/langchain/updateCheckpoint";
import { MessageProps } from "@/types/messages";

// Hook for all message handling
// Used for sending user input messages, 
// refreshing assistant messages, editing user messages, and deleting messages
export function useMessageHandlers(
  messages: MessageProps[],
  setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>,
  threadId: string,
) {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  // Refresh assistant messages
  const handleRefresh = async (index: number) => {
    let userIdx = -1;
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        userIdx = i;
        break;
      }
    }
    if (userIdx === -1) return;
    const prompt = messages[userIdx].content ?? "";
    // Update UI
    setMessages((prev) => prev.slice(0, userIdx));
    // Update agent memory
    try {
      await updateCheckpoint(threadId, index);
    } catch (e) {
      console.error(e);
    }
    await handleSend(prompt);
  };

  // Delete any given message
  const handleDelete = async (index: number) => {
    // Update UI
    setMessages((prev) => prev.filter((_, i) => i !== index));
    // Update agent memory
    try {
      await updateCheckpoint(threadId, index);
    } catch (e) {
      console.error(e);
    }
  };

  // Sets context for editing user message
  const triggerEdit = (index: number) => {
    const msg = messages[index];
    if (!msg || msg.role !== "user") return;
    setEditIndex(index);
    setEditContent(msg.content ?? "");
  };
  // Cancel editing user message
  const cancelEdit = () => {
    setEditIndex(null);
  };
  // Submit edited user message
  const handleEdit = async () => {
    if (editIndex === null) return;
    // Update UI
    setMessages((prev) => prev.slice(0, editIndex));
    // Update agent memory
    try {
      await updateCheckpoint(threadId, editIndex);
    } catch (e) {
      console.error(e);
    }
    await handleSend(editContent);
    setEditIndex(null);
  };

  // Send user input to assistant using agent-stream endpoint
  const handleSend = async (text: string) => {
    try {
      const res = await fetch("/api/agent-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, thread_id: threadId }),
      });

      // Read result of endpoint post
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n");
        buffer = parts.pop() ?? "";
        for (const line of parts) {
          if (!line.trim()) continue;

          try {
            const token = JSON.parse(line) as MessageProps;
            const validRoles = ["user", "assistant", "tool", "assistant-tool"];
            if (!validRoles.includes(token.role)) continue;
            setMessages((prev) => {
              // Add user messages
              if (token.role === "user") {
                return addUserMessage(prev, token);
              }
              // Add tool call messages
              if (
                token.toolCallName &&
                token.role === "assistant" &&
                token.args
              ) {
                return addToolCallMessage(prev, token);
              }
              // Add tool result messages
              if (
                token.toolCallName &&
                token.role === "assistant" &&
                token.content
              ) {
                return addToolResultMessage(prev, token);
              }
              // Add assistant (w/out tool call) messages
              if (token.role === "assistant") {
                return addAssistantMessage(prev, token);
              }
              return prev;
            });
          } catch {}
        }
      }
    } catch (err) {
      // Fallback to error message from assistant
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error generating response." },
      ]);
    }
  };

  return {
    editIndex,
    editContent,
    setEditContent,
    handleRefresh,
    handleDelete,
    handleEdit,
    triggerEdit,
    cancelEdit,
    handleSend,
  };
}
