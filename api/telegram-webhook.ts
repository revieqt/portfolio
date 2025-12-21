// /api/telegram-webhook.ts
// Receives replies from Telegram and stores them in Redis

import { redis } from "../lib/redis";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const update = req.body;

    // Telegram sends message updates
    if (update.message) {
      const message = update.message;
      const messageText = message.text || "";

      // Extract session ID from message like: [session: session_xxx_xxx]
      const sessionMatch = messageText.match(/\[session:\s*([^\]]+)\]/);
      
      if (sessionMatch && sessionMatch[1]) {
        const sessionId = sessionMatch[1].trim();
        
        // Extract the actual reply (everything after the session ID line)
        const replyText = messageText
          .replace(/\[session:\s*[^\]]+\]/, "") // Remove session ID line
          .trim();

        if (replyText) {
          // Store reply in Redis with 1 hour expiration
          await redis.set(`reply:${sessionId}`, replyText, { ex: 3600 });
          
          console.log(`Stored reply for session ${sessionId}: ${replyText}`);
          
          return res.status(200).json({ success: true });
        }
      }
    }

    // Acknowledge receipt to Telegram
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
