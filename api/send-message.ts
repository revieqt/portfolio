// /api/send-message.ts
// Sends user messages to Telegram with session ID prefix

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: "Missing sessionId or message" });
  }

  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Format message with session ID prefix
    const formattedMessage = `[session: ${sessionId}]\n${message}`;

    // Send to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: formattedMessage,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return res.status(500).json({ error: "Failed to send message to Telegram" });
    }

    return res.status(200).json({ success: true, message: "Message sent" });
  } catch (error) {
    console.error("Error in send-message handler:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
