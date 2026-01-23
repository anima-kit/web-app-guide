"use client";
import { useState } from "react";
import AddCard from "@/components/card/AddCard";
import TodosList from "@/components/todo/TodosList";
import { AddTodoModal } from "@/components/todo/AddTodoModal";
import { useTodos } from "@/graphql/queries/useTodos";
import { useWarmUpAgent } from "@/langchain/useWarmUpAgent";
import SideNav from "@/components/nav/SideNav";

// Page where we can view and manage our todos
export default function TodosPage() {
  useWarmUpAgent();  
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/agent", label: "Agent" },
    { href: "/todos", label: "Todo"},
  ];
  // Use the GraphQL query to get our todos
  const { data, loading, error } = useTodos();
  // Track state for showing add todo form
  const [showAddTodo, setShowAddTodo] = useState(false);
  // Loading and error messages
  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">Error loading todos.</p>;
  return (
    <div className="flex">
      <SideNav links={navLinks} />
      <main className="ml-64 flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Todos</h2>
        {/* Component for pop-up form to add todos */}
        <AddTodoModal open={showAddTodo} onClose={() => setShowAddTodo(false)} />
        {/* Component to list all our todos */}
        <TodosList
          todos={data?.todos}
          addCard={
            // Card button to trigger pop-up of add todos form
            <AddCard
              onClick={() => setShowAddTodo(true)}
              aria-label="Add Todo"
              className="mb-4"
            >
              + New Todo
            </AddCard>
          }
        />
      </main>
    </div>
  );
}
