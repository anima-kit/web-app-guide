import React from "react";
import AssistantMessage from "@/components/message/AssistantMessage";
import ToolCallMessage from "@/components/message/ToolCallMessage";
import ToolResultMessage from "@/components/message/ToolResultMessage";
import UserMessage from "@/components/message/UserMessage";
import { ChatMessageProps } from "@/types/messages";

// Component to display any of the allowed messages
// Allowed messages are assistant, tool call, tool result, and user
// All message types can be deleted
const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  (props, ref) => {
    const {
      message,
      className = "",
      bgAssistant = "bg-gray-100",
      bgUser = "bg-blue-50",
      bgToolCall = "bg-blue-100",
      bgToolResult = "bg-green-100",
    } = props;

    const renderContent = () => {
      switch (message.role) {
        // Give appropriate message component for appropriate role
        case "assistant-tool":
          return <ToolCallMessage message={message} bg={bgToolCall} />;
        case "tool":
          return <ToolResultMessage message={message} bg={bgToolResult} />;
        case "assistant":
          return (
            <AssistantMessage
              message={message}
              bg={bgAssistant}
              onRefresh={props.onRefresh}
            />
          );
        default:
          return (
            <UserMessage message={message} bg={bgUser} onEdit={props.onEdit} />
          );
      }
    };

    // Set up HTML area for displaying allowed message
    return (
      <div
        ref={ref}
        className={`relative p-3 rounded text-gray-800 ${className}`}
      >
        {renderContent()}
        {props.onDelete && (
          <button
            onClick={props.onDelete}
            aria-label="Delete message"
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 cursor-pointer"
          >
            ❌
          </button>
        )}
      </div>
    );
  },
);

ChatMessage.displayName = "ChatMessage";
export default ChatMessage;
