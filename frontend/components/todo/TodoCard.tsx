import React from "react";
import Card from "@/components/card/Card";
import { TodoCardProps } from "@/types/todo";

// Card to display todos
const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  return (
    <Card // Display todo text and done status
      title={todo.text}
    >
      <p className="mt-2 text-sm text-gray-800">
        {todo.done ? "Completed" : "Pending"}
      </p>
    </Card>
  );
};

export default TodoCard;
