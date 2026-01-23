import { warmUpAgent } from "@/langchain/agentStream";

// Create endpoint to warm up agent
// Return status reponse
export async function GET() {
  try {
    await warmUpAgent();
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error("Warm-up failed", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
}
