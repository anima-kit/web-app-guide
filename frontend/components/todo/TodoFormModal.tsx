import React from "react";
import { Modal } from "@/components/modal/Modal";
import { useForm } from "@/components/form/useForm";
import TextInput from "@/components/form/TextInput";
import Button from "@/components/form/Button";
import { TodoFormModalProps } from "@/types/todo";

// Reusable pop-up form modal for adding, editing (etc.) todos.
export const TodoFormModal: React.FC<TodoFormModalProps> = ({
  open, // Track open status
  initialText = "", // Initial text for text input form
  onClose, // Called when closed
  onSubmit, // Called when form submitted
}) => {
  // Text input
  const inputRef = React.useRef<HTMLInputElement>(null);
  // Reusable hook for forms
  const { values, setField } = useForm({ text: initialText }, async () => {});
  // Called when form submitted
  const handleSubmit = async () => {
    await onSubmit(values.text.trim());
    setField("text", "");
    onClose();
  };

  // Focus textbox when form opens
  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    // Reusable modal component
    <Modal
      open={open}
      onClose={onClose}
      title={initialText ? "Edit Todo" : "Add New Todo"}
      onSubmit={handleSubmit}
    >
      {/* Text input field */}
      <TextInput
        ref={inputRef}
        type="text"
        value={values.text}
        onChange={(e) => setField("text", e.target.value)}
        placeholder="Todo text"
        required // Alert message if not given
      />
      {/* Cancel and save buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialText ? "Save" : "Add"}
        </Button>
      </div>
    </Modal>
  );
};
