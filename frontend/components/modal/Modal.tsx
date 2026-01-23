import React, { useRef, useEffect } from "react";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { ModalProps } from "@/types/modal";

// Reusable modal component showing a pop-up box for addition, updating (etc.) forms
export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  onSubmit,
  onClose,
}) => {
  // Focus first interactive element when modal opens
  useEffect(() => {
    if (open && modalRef.current) {
      const focusable = modalRef.current.querySelector<HTMLElement>(
        "input, textarea, select, button, [tabindex]",
      );
      focusable?.focus();
    }
  }, [open]);

  const modalRef = useRef<HTMLDivElement>(null);

  // Add closing management
  useCloseModal(modalRef as React.RefObject<HTMLElement>, onClose);

  if (!open) return null;

  // Handle form submission via Enter key or submit button
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      {/* Translucent background */}
      <div className="absolute inset-0 bg-black opacity-30" />
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-6 z-10"
      >
        {/* Modal title */}
        {title && (
          <h2
            id="modal-title"
            className="text-xl font-semibold mb-4 text-gray-800"
          >
            {title}
          </h2>
        )}
        {/* Element children wrapped in form */}
        <form
          onSubmit={handleFormSubmit}
          onKeyDown={handleKeyDown}
          className="space-y-3"
        >
          {children}
        </form>
      </div>
    </div>
  );
};
