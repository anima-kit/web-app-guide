// Properties for generic panel
export interface PanelProps {
  titleOpen: string;
  titleClosed: string;
  content?: React.ReactNode;
}

// Metadata panel for user and assistant messages
export interface MetadataPanelProps {
  metadata: Record<string, unknown>;
}

// Panel for tool call messages
export interface ToolCallPanelProps {
  args?: Record<string, unknown>;
}

// Panel for tool result messages
export interface ToolResultPanelProps {
  content?: string;
}