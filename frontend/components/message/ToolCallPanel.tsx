import { Panel } from "@/components/message/Panel";
import { ToolCallPanelProps } from "@/types/panel";

// Component for tool call panel
// Can show/hide arguments used in tool call
export const ToolCallPanel = ({ args }: ToolCallPanelProps) => {
  return (
    <Panel
      titleOpen="Hide args"
      titleClosed="Show args"
      content={JSON.stringify(args, null, 2)}
    />
  );
};
