import { NextResponse } from "next/server";
import {
  Checkpoint,
  CheckpointTuple,
  CheckpointMetadata,
  LangGraphRunnableConfig,
} from "@langchain/langgraph";
import { agentCheckpointer } from "@/langchain/agent";
import { UpdateCheckpointRequest } from "@/types/memory";

// Get agent checkpointer
const checkpointer = agentCheckpointer;
// Create API endpoint to update agent checkpointer
// Updates will always just delete appropriate messages
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UpdateCheckpointRequest;
    const { threadId, index } = body;
    // Get current checkpoint tuple (config, checkpoint, metadata)
    // Error if not available
    const tuple = await checkpointer.getTuple({
      configurable: { thread_id: threadId },
    } as unknown as CheckpointTuple);
    if (!tuple) {
      return NextResponse.json(
        { success: false, error: "no checkpoint" },
        { status: 404 },
      );
    }

    // Extract info from checkpointer tuple
    // Error if no checkpoint available
    const config = tuple?.config as LangGraphRunnableConfig;
    const checkpoint = tuple?.checkpoint as Checkpoint;
    const metadata = tuple?.metadata as CheckpointMetadata;
    if (!checkpoint) {
      return NextResponse.json(
        { success: false, error: "no checkpoint data" },
        { status: 404 },
      );
    }

    // Get current checkpoint messages
    const msgs = Array.isArray(checkpoint.channel_values?.messages)
      ? [...checkpoint.channel_values.messages]
      : [];
    // Delete all messages from end to index
    const start = index;
    let end = start + 1;
    while (end < msgs.length) {
      end++;
    }
    msgs.splice(start, end - start);

    // Update checkpoint messages
    checkpoint.channel_values.messages = msgs;
    await checkpointer.put(config, checkpoint, metadata);

    // Return appropriate response
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("update-checkpoint error", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
