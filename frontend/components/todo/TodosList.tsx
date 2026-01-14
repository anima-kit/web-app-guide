import React from "react";
import TodoCard from "@/components/todo/TodoCard";
import { TodosListProps } from "@/types/todo";

// Define TodosList component to take in list of todos and a card for adding todos
const TodosList: React.FC<TodosListProps> = ({ todos, addCard }) => {
  // If no todos found, add a simple loading paragraph
  if (!todos) return <p className="text-gray-500">Loading…</p>;
  // Else return each todo as a TodoCard and tack on an addCard component for adding todos
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
      {addCard && addCard}
    </div>
  );
};

export default TodosList;
