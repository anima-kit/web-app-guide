"use client";
import { useRef, useEffect } from "react";
import { ChatInput } from "@/components/agent/ChatInput";
import ChatMessageList from "@/components/message/ChatMessageList";
import { EditMessageModal } from "@/components/message/EditMessageModal";
import { ThreadsList } from "@/components/thread/ThreadsList";
import { useThreadSelection } from "@/context/ThreadContext";
import { useThreadState } from "@/context/ThreadStore";
import { useMessageHandlers } from "@/langchain/useMessageHandlers";
import { AgentWrapperProps } from "@/types/agent";

// A wrapper to handle agent chats
// Handles all user message inputs as well as message refreshes, edits, and deletions
// Tack on sidebar for chat thread management
export const AgentWrapper = ({ onClose }: AgentWrapperProps) => {
  // Set up appropriate thread context
  const { selectedThreadId } = useThreadSelection();
  const [messages, setMessages] = useThreadState(selectedThreadId);
  // Set up automatic scrolling
  const messageListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  // Get all necessary message handlers
  const {
    editIndex,
    editContent,
    setEditContent,
    handleRefresh,
    handleDelete,
    handleEdit,
    triggerEdit,
    cancelEdit,
    handleSend,
  } = useMessageHandlers(messages, setMessages, selectedThreadId);

  return (
    <div className="flex h-full">
      {/* Sidebar for chat threads */}
      <div className="w-1/5">
      <ThreadsList />
      </div>
      {/* Main chat area */}
      <div className="flex flex-col flex-1 relative overflow-hidden">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
        <ChatMessageList
          ref={messageListRef}
          messages={messages}
          onDelete={handleDelete}
          onRefresh={handleRefresh}
          onEdit={triggerEdit}
        />
        <ChatInput onSend={(msg) => handleSend(msg)} />
        <EditMessageModal
          open={editIndex !== null}
          onClose={cancelEdit}
          editContent={editContent}
          setEditContent={setEditContent}
          onSubmit={handleEdit}
        />
      </div>
    </div>
  );
};
