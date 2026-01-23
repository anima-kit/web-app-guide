import React, { useState } from "react";
import { ChatInputProps } from "@/types/agent";

// Chat input components for agent chats
export const ChatInput = ({ onSend }: ChatInputProps) => {
  // Initialize chat input as empty
  const [value, setValue] = useState("");
  // Handle submission of chat input, then clear
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };
  // Allow submission with enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as React.KeyboardEvent<HTMLTextAreaElement>);
    }
  };
  // Set up HTML area for components
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Type your message..."
        className="w-full p-2 rounded border"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Send
      </button>
    </form>
  );
};
