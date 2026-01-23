// Passed to wrapper for agent chats
export interface AgentWrapperProps {
  onClose?: () => void;
}

// Passed to chat input
export interface ChatInputProps {
  onSend: (text: string) => void;
}
