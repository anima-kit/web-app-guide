"use client";
import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { threads } from "@/context/ThreadStore";
import { ThreadContextValue } from "@/types/thread";

// Create React context for chat threads
const ThreadContext = createContext<ThreadContextValue | undefined>(undefined);
// Helper to use selected thread
export function useThreadSelection() {
  const ctx = useContext(ThreadContext);
  if (!ctx)
    throw new Error("useThreadSelection must be used within ThreadProvider");
  return ctx;
}

// Thread provider to supply to root
// All pages will have same thread context
export const ThreadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Always have at least a default thread
  if (!threads.has("default")) {
    threads.set("default", []);
  }
  // Initialize default thread as selected
  const [selectedThreadId, setSelectedThreadId] = useState("default");
  return (
    <ThreadContext.Provider value={{ selectedThreadId, setSelectedThreadId }}>
      {children}
    </ThreadContext.Provider>
  );
};
