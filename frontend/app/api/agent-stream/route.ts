import { runAgentStream } from "@/langchain/agentStream";

// Create API endpoint to stream chat messages
export async function POST(req: Request) {
  // Need to supply prompt and selected thread id
  const { prompt, thread_id }: { prompt: string; thread_id?: string } =
    await req.json();
  // Encoder to binary
  const encoder = new TextEncoder();
  // Queue each response as NDJSON line
  const stream = new ReadableStream({
    async start(controller) {
      for await (const token of runAgentStream(
        prompt,
        thread_id ?? "default",
      )) {
        const line = JSON.stringify(token);
        controller.enqueue(encoder.encode(line + "\n"));
      }
      controller.close();
    },
  });
  // Return response body
  return new Response(stream, {
    headers: { "Content-Type": "application/x-ndjson" },
  });
}
