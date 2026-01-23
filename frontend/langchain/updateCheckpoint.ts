// Use update-checkpoint endpoint to update agent checkpointer
// Used during message refresh, delete, edit calls to update agent's memory with appropriate content
export async function updateCheckpoint(threadId: string, idx: number) {
  const res = await fetch("/api/update-checkpoint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ threadId, index: idx }),
  });
  const errText = await res.text();
  if (!res.ok) throw new Error(`Failed to update checkpoint: ${errText}`);
}
