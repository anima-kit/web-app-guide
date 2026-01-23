import React from "react";
import MarkdownMessage from "@/components/message/MarkdownMessage";
import { MetadataPanel } from "@/components/message/MetadataPanel";
import { AssistantMessageProps } from "@/types/messages";

// Component to display assistant messages (w/out tool calls)
// Can refresh messages
// Use Markdown formatting for better visuals
const AssistantMessage: React.FC<AssistantMessageProps> = ({
  message,
  onRefresh,
  bg = "bg-gray-100",
}) => (
  <div className={`p-3 rounded text-gray-800 ${bg} relative`}>
    <strong>Agent:</strong>
    <MarkdownMessage content={message.content ?? ""} />
    {message.metadata && <MetadataPanel metadata={message.metadata} />}
    {onRefresh && (
      <button
        onClick={onRefresh}
        aria-label="Refresh assistant message"
        className="absolute bottom-2 right-2 text-gray-500 hover:text-blue-600 cursor-pointer"
      >
        🔄
      </button>
    )}
  </div>
);

export default AssistantMessage;
