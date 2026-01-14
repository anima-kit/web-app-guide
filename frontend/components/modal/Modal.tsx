import React, { useRef } from "react";
import { useCloseModal } from "@/components/modal/useCloseModal";
import { ModalProps } from "@/types/modal";

// Reusable modal component showing a pop-up box for addition, updating (etc.) forms
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // Add closing management
  useCloseModal(modalRef as React.RefObject<HTMLElement>, onClose);
  if (!open) return null;
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
        {/* Element children */}
        {children}
      </div>
    </div>
  );
};
