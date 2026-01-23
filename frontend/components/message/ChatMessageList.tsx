import React from "react";
import ChatMessage from "@/components/message/ChatMessage";
import { ChatMessageListProps } from "@/types/messages";

// Component to display all chat messages in list
const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ messages, onDelete, onRefresh, onEdit }, ref) => {
    return (
      <div className="overflow-y-auto flex-1 min-h-0 p-4 space-y-2" ref={ref}>
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            onDelete={() => onDelete?.(i)}
            onRefresh={() => onRefresh?.(i)}
            onEdit={() => onEdit?.(i)}
          />
        ))}
      </div>
    );
  },
);

ChatMessageList.displayName = "ChatMessageList";
export default ChatMessageList;
