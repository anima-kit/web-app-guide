import { useState } from "react";
import { PanelProps } from "@/types/panel";

// Generic panel component
// Used to display metadata/extra info for all messages
// Can hide panel with given message
export const Panel = ({ titleOpen, titleClosed, content }: PanelProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="panel-content"
        className="text-xs text-gray-400 hover:underline focus:outline-none"
      >
        {open ? titleOpen : titleClosed}
      </button>
      {open && content && (
        <pre
          id="panel-content"
          className="bg-gray-200 rounded p-2 mt-1 text-xs overflow-auto max-h-40"
          style={{ fontFamily: "monospace" }}
        >
          {content}
        </pre>
      )}
    </div>
  );
};
