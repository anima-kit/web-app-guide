// Properties for generic messages
export interface MessageProps {
  role: "assistant" | "user" | "assistant-tool" | "tool";
  content?: string;
  toolCallName?: string;
  args?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

// List of generic messages
export interface MessageListProps {
  messages: MessageProps[];
}

// Interactive chat message
export interface ChatMessageProps {
  message: MessageProps;
  className?: string;
  bgAssistant?: string;
  bgUser?: string;
  bgToolCall?: string;
  bgToolResult?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onRefresh?: () => void;
}

// List of interactive chat messages
export interface ChatMessageListProps {
  messages: MessageProps[];
  onEdit?: (index: number) => void;
  onRefresh?: (index: number) => void;
  onDelete?: (index: number) => void;
}

// Assistant message (w/out tool calls)
// Can be refreshed
export interface AssistantMessageProps {
  message: MessageProps;
  bg?: string;
  onRefresh?: () => void;
}

// Assistant tool call message
export interface ToolCallMessageProps {
  message: MessageProps;
  bg?: string;
}

// Tool result message
export interface ToolResultMessageProps {
  message: MessageProps;
  bg?: string;
}

// User message
// Can be edited
export interface UserMessageProps {
  message: MessageProps;
  bg?: string;
  onEdit?: () => void;
}

// Properties for editing user message
export interface EditMessageModalProps {
  open: boolean;
  editContent: string;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
  setEditContent: (value: string) => void;
}

// Use markdown messages for better visuals
export interface MarkdownMessageProps {
  content: string;
}