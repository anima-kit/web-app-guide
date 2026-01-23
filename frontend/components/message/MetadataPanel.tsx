import { Panel } from "@/components/message/Panel";
import { MetadataPanelProps } from "@/types/panel";

// Generic metadata panel for user and assistant messages
// Can show/hide metadata fields
export const MetadataPanel = ({ metadata }: MetadataPanelProps) => {
  return (
    <Panel
      titleOpen="Hide metadata"
      titleClosed={`Show ${Object.keys(metadata).length} field(s)`}
      content={JSON.stringify(metadata, null, 2)}
    />
  );
};
