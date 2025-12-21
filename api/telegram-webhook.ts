import { redis } from "../lib/redis";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const update = req.body;

  // Only handle text messages
  const message = update?.message;
  if (!message?.text) {
    return res.status(200).json({ ok: true });
  }

  const text: string = message.text;

  // Extract session ID: [session: xxxx]
  const match = text.match(/\[session:\s*(.+?)\]/i);
  if (!match) {
    // No session tag → ignore safely
    return res.status(200).json({ ok: true });
  }

  const sessionId = match[1];

  // Remove session tag from message
  const cleanedText = text.replace(match[0], "").trim();

  if (!cleanedText) {
    return res.status(200).json({ ok: true });
  }

  // Store reply for browser polling
  await redis.set(`reply:${sessionId}`, cleanedText, {
    ex: 3600, // expire after 1 hour
  });

  return res.status(200).json({ ok: true });
}
