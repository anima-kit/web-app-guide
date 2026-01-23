import React from "react";
import { ToolCallPanel } from "@/components/message/ToolCallPanel";
import { ToolCallMessageProps } from "@/types/messages";

// Component to display assistant tool calls
const ToolCallMessage: React.FC<ToolCallMessageProps> = ({
  message,
  bg = "bg-blue-100",
}) => (
  <div className={`p-3 rounded text-gray-800 ${bg}`}>
    <p className="flex items-center gap-1">
      ⚙️ <strong>Calling {message.toolCallName}</strong>
    </p>
    {message.args && <ToolCallPanel args={message.args} />}
  </div>
);

export default ToolCallMessage;
