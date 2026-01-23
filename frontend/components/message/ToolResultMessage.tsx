import React from "react";
import { ToolResultPanel } from "@/components/message/ToolResultPanel";
import { ToolResultMessageProps } from "@/types/messages";

// Component to display tool result messages
const ToolResultMessage: React.FC<ToolResultMessageProps> = ({
  message,
  bg = "bg-green-100",
}) => (
  <div className={`p-3 rounded text-gray-800 ${bg}`}>
    <p className="flex items-center gap-1">
      🔧 <strong>Result from {message.toolCallName}</strong>
    </p>
    {message.content && <ToolResultPanel content={message.content} />}
  </div>
);

export default ToolResultMessage;
