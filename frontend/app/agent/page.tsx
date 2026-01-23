"use client";
import { AgentWrapper } from "@/components/agent/AgentWrapper";
import SideNav from "@/components/nav/SideNav";
import { useWarmUpAgent } from "@/langchain/useWarmUpAgent";

// Page to chat with agent
export default function AgentPage() {
  // Warm up agent if not already warmed
  useWarmUpAgent();
  // Allow navigation to these links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/agent", label: "Agent" },
    { href: "/todos", label: "Todo"},
  ];
  return (
    <div className="flex">
      <SideNav links={navLinks} />
      <main className="ml-64 flex-1 flex-col h-screen p-4 pb-12">
        <AgentWrapper />
      </main>
    </div>
  );
}
