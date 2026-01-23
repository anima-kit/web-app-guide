import React from "react";
import { Modal } from "@/components/modal/Modal";
import { EditMessageModalProps } from "@/types/messages";

// Component for editing user messages
export const EditMessageModal: React.FC<EditMessageModalProps> = ({
  open,
  editContent,
  onClose,
  onSubmit,
  setEditContent,
}) => (
  <Modal
    open={open}
    onClose={onClose}
    title="Edit Message"
    onSubmit={async () => {
      await onSubmit();
      onClose();
    }}
  >
    <textarea
      className="w-full h-32 p-2 border rounded text-gray-800"
      value={editContent}
      onChange={(e) => setEditContent(e.target.value)}
    />
    <div className="mt-4 flex justify-end space-x-2">
      <button
        onClick={onClose}
        className="px-3 py-1 bg-gray-200 rounded text-gray-800"
      >
        Cancel
      </button>
      <button type="submit" className="px-3 py-1 bg-indigo-600 rounded">
        Save
      </button>
    </div>
  </Modal>
);
