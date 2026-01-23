import { useState, useEffect } from "react";
import { MessageProps } from "@/types/messages";

// Use in-memory map to store threads
export const threads = new Map<string, MessageProps[]>();
export function getThread(id: string): MessageProps[] {
  return threads.get(id) ?? [];
}
export function setThread(id: string, msgs: MessageProps[]): void {
  threads.set(id, msgs);
}

// Helper to get and set appropriate thread context
export function useThreadState(threadId: string) {
  // Get all messages for given thread id
  const [messages, setMessages] = useState<MessageProps[]>(() =>
    getThread(threadId),
  );
  // When thread id changes - switch to appropriate messages
  useEffect(() => {
    setMessages(getThread(threadId));
  }, [threadId]);
  // Update thread when thread id or messages change
  useEffect(() => {
    setThread(threadId, messages);
  }, [threadId, messages]);

  return [messages, setMessages] as const;
}
