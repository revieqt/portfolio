import { redis } from "../lib/redis";

export default async function handler(req: any, res: any) {
  const { sessionId } = req.query;

  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ error: "Missing sessionId" });
  }

  if (req.method === "GET") {
    const reply = await redis.get<string>(`reply:${sessionId}`);

    if (reply) {
      await redis.del(`reply:${sessionId}`); // consume once
      return res.status(200).json({ reply });
    }

    return res.status(200).json({ reply: null });
  }

  if (req.method === "POST") {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ error: "Missing reply" });
    }

    // Auto-expire after 1 hour
    await redis.set(`reply:${sessionId}`, reply, { ex: 3600 });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
