import React from "react";
import MarkdownMessage from "@/components/message/MarkdownMessage";
import { UserMessageProps } from "@/types/messages";
import { MetadataPanel } from "@/components/message/MetadataPanel";

// Component to display user messages
// Can edit messages
// Use Markdown formatting for better visuals
const UserMessage: React.FC<UserMessageProps> = ({
  message,
  bg = "bg-blue-50",
  onEdit,
}) => (
  <div className={`relative p-3 rounded text-gray-800 ${bg}`}>
    <strong>You:</strong>
    <MarkdownMessage content={message.content ?? ""} />
    {message.metadata && <MetadataPanel metadata={message.metadata} />}
    {onEdit && (
      <button
        onClick={onEdit}
        aria-label="Edit message"
        className="absolute bottom-2 right-2 text-gray-500 hover:text-indigo-600 cursor-pointer"
      >
        ✏️
      </button>
    )}
  </div>
);

export default UserMessage;
