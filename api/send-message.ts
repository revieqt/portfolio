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

    console.log("🔍 Send message debug:");
    console.log("  BOT_TOKEN set:", !!TELEGRAM_BOT_TOKEN);
    console.log("  CHAT_ID set:", !!TELEGRAM_CHAT_ID);
    console.log("  SessionId:", sessionId);
    console.log("  Message:", message);

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("❌ Missing Telegram environment variables");
      return res.status(500).json({ error: "Server configuration error - missing env vars" });
    }

    // Format message with session ID prefix
    const formattedMessage = `[session: ${sessionId}]\n${message}`;
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    console.log("📤 Sending to Telegram...");
    console.log("  URL:", telegramUrl.replace(TELEGRAM_BOT_TOKEN, "***TOKEN***"));
    console.log("  Chat ID:", TELEGRAM_CHAT_ID);
    console.log("  Message:", formattedMessage);

    // Send to Telegram
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formattedMessage,
        parse_mode: "HTML",
      }),
    });

    const responseData = await response.json();

    console.log("📨 Telegram response:");
    console.log("  Status:", response.status);
    console.log("  OK:", response.ok);
    console.log("  Data:", responseData);

    if (!response.ok) {
      console.error("❌ Telegram API error:", responseData);
      return res.status(500).json({ error: "Failed to send message to Telegram", details: responseData });
    }

    console.log("✅ Message sent successfully");
    return res.status(200).json({ success: true, message: "Message sent" });
  } catch (error) {
    console.error("❌ Error in send-message handler:", error);
    return res.status(500).json({ error: "Internal server error", details: String(error) });
  }
}
