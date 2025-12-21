// /api/telegram-webhook.ts
// Vercel serverless function to receive Telegram replies

import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    const messageObj = body.message || body.edited_message;

    if (!messageObj || !messageObj.text) {
      return res.status(200).json({ ok: true }); // Telegram expects 200 OK
    }

    const text = messageObj.text;

    // Extract session ID from message like: [session: session_xxx_xxx]
    const sessionMatch = text.match(/\[session:\s*([^\]]+)\]/);

    if (!sessionMatch || !sessionMatch[1]) {
      // No session ID found, ignore this message
      return res.status(200).json({ ok: true });
    }

    const sessionId = sessionMatch[1].trim();

    // Extract the actual reply (everything after the session ID line)
    const replyText = text
      .replace(/\[session:\s*[^\]]+\]/, "") // Remove session ID line
      .trim();

    if (!replyText) {
      return res.status(200).json({ ok: true });
    }

    // Save to Firestore
    await addDoc(collection(db, "messages"), {
      sessionId,
      text: replyText,
      message: replyText, // Include both for compatibility
      from: "you",
      timestamp: Date.now(),
    });

    console.log(`Stored reply for session ${sessionId}: ${replyText}`);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    // Always return 200 to Telegram so it doesn't retry
    return res.status(200).json({ ok: true });
  }
}
