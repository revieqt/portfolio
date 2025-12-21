// /api/get-replies.ts
// Polls for replies from Telegram and returns them to the browser

// In-memory store for replies
// Replies are temporarily stored and automatically cleaned up
const replyStore: Record<string, { message: string; consumed: boolean }> = {};

export default async function handler(req: any, res: any) {
  const { sessionId } = req.query;

  if (req.method === "GET") {
    // Client polling for replies
    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ error: "Missing sessionId" });
    }

    const storedReply = replyStore[sessionId];

    if (storedReply && !storedReply.consumed) {
      // Mark as consumed so it's not sent again
      storedReply.consumed = true;
      
      // Clean up after 10 seconds to free memory
      setTimeout(() => {
        delete replyStore[sessionId];
      }, 10000);

      return res.status(200).json({ reply: storedReply.message });
    }

    // No new reply available
    return res.status(200).json({ reply: null });
  } else if (req.method === "POST") {
    // Webhook endpoint for Telegram to post replies
    const { sessionId: bodySessionId, reply } = req.body;

    if (!bodySessionId || !reply) {
      return res.status(400).json({ error: "Missing sessionId or reply" });
    }

    // Store the reply for this session
    replyStore[bodySessionId] = {
      message: reply,
      consumed: false,
    };

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
