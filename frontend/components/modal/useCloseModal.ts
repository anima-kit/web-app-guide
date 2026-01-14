import { useEffect } from "react";

// Hook to manage closing of reusable modal components
export function useCloseModal<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClose: () => void,
) {
  // Close modal with click outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);

  // Close modal when escape key pressed
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
}
