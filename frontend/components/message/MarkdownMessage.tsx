import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import components from "@/components/message/componentsMap";
import { MarkdownMessageProps } from "@/types/messages";

// Component for Markdown messages
// Used for user and assistant messages for better visuals
const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => (
  <ReactMarkdown
    components={components}
    remarkPlugins={[remarkGfm, remarkBreaks]}
    rehypePlugins={[rehypeHighlight]}
  >
    {content}
  </ReactMarkdown>
);
export default MarkdownMessage;
