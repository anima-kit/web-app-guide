import React from "react";
import { useAddTodo } from "@/graphql/mutations/useAddTodo";
import { TodoFormModal } from "@/components/todo/TodoFormModal";
import { TodoFormModalProps, AddTodoModalProps } from "@/types/todo";

// Modal component for adding todos
export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  open, // Track open status
  onClose, // Called when closed
}) => {
  // Use GraphQL mutation to add todo
  const { addTodo } = useAddTodo();
  const modalProps: TodoFormModalProps = {
    open,
    onClose,
    // Add new todo when modal submitted
    onSubmit: async (text) => {
      await addTodo({ text });
      onClose();
    },
  };
  return <TodoFormModal {...modalProps} />;
};
