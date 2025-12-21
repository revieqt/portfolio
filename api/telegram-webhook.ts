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
    
    console.log("🔔 Webhook received:");
    console.log("  Body:", JSON.stringify(body, null, 2));

    const messageObj = body.message || body.edited_message;

    if (!messageObj || !messageObj.text) {
      console.log("⚠️  No message text found");
      return res.status(200).json({ ok: true });
    }

    const text = messageObj.text;
    console.log("📝 Message text:", text);

    // Extract session ID from message like: [session: session_xxx_xxx]
    const sessionMatch = text.match(/\[session:\s*([^\]]+)\]/);

    console.log("🔍 Session ID extraction:");
    console.log("  Regex match:", sessionMatch);
    console.log("  Extracted:", sessionMatch?.[1]);

    if (!sessionMatch || !sessionMatch[1]) {
      console.log("⚠️  No session ID found in message");
      return res.status(200).json({ ok: true });
    }

    const sessionId = sessionMatch[1].trim();
    console.log("✅ Session ID:", sessionId);

    // Extract the actual reply (everything after the session ID line)
    const replyText = text
      .replace(/\[session:\s*[^\]]+\]/, "") // Remove session ID line
      .trim();

    console.log("📄 Reply text:", replyText);

    if (!replyText) {
      console.log("⚠️  No reply text after session ID");
      return res.status(200).json({ ok: true });
    }

    // Save to Firestore
    console.log("💾 Saving to Firestore...");
    console.log("  Collection: messages");
    console.log("  Document data:", {
      sessionId,
      text: replyText,
      message: replyText,
      from: "you",
      timestamp: Date.now(),
    });

    const docRef = await addDoc(collection(db, "messages"), {
      sessionId,
      text: replyText,
      message: replyText,
      from: "you",
      timestamp: Date.now(),
    });

    console.log("✅ Saved to Firestore!");
    console.log("  Document ID:", docRef.id);
    console.log(`✅ Stored reply for session ${sessionId}: ${replyText}`);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    console.error("  Stack:", (err as any).stack);
    // Always return 200 to Telegram so it doesn't retry
    return res.status(200).json({ ok: true, error: String(err) });
  }
}
