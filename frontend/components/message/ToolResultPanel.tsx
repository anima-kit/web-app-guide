import { Panel } from "@/components/message/Panel";
import { ToolResultPanelProps } from "@/types/panel";

// Component for tool result panel
// Can show/hide content of tool result
export const ToolResultPanel = ({ content }: ToolResultPanelProps) => {
  return (
    <Panel
      titleOpen="Hide result"
      titleClosed="Show result"
      content={content}
    />
  );
};
