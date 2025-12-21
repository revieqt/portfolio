# Firebase Chat Setup Guide

Your chat feature now uses Firebase Firestore to store and sync messages in real-time!

## What Changed

- ✅ **Firebase Firestore**: Real-time message sync across browser and backend
- ✅ **Telegram Webhook**: Receives your replies from Telegram and stores them in Firebase
- ✅ **Real-time Updates**: Uses Firestore `onSnapshot` for live message updates
- ✅ **Anonymous Auth**: Firebase auto-authenticates users anonymously

## Required Setup Steps

### 1. Set Environment Variables in Vercel

Go to Vercel Dashboard → Settings → Environment Variables and add:

```
FIREBASE_API_KEY=AIzaSyCFVbbOAuSjr2Ot-XOYCTITQdalIY1iVJY
FIREBASE_AUTH_DOMAIN=josh-opsima-portfolio.firebaseapp.com
FIREBASE_PROJECT_ID=josh-opsima-portfolio
FIREBASE_STORAGE_BUCKET=josh-opsima-portfolio.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=148674270170
FIREBASE_APP_ID=1:148674270170:web:2ad4dd1e46acf6d17666e3
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 2. Set Telegram Webhook

Run this command to set your webhook on your deployed domain:

```bash
DOMAIN="your-domain.vercel.app"
BOT_TOKEN="your_bot_token"

curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://${DOMAIN}/api/telegram-webhook\"}"
```

Or use the provided script:

```bash
bash setup-webhook.sh your_bot_token your-domain.vercel.app
```

### 3. Verify Webhook is Set

```bash
BOT_TOKEN="your_bot_token"

curl "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo" | jq
```

You should see:
```json
{
  "url": "https://your-domain.vercel.app/api/telegram-webhook",
  "has_custom_certificate": false,
  "pending_update_count": 0,
  "ip_address": "..."
}
```

## How It Works

### User Sends Message
1. User types in Chat → Firebase stores in `messages` collection
2. Browser sends to `/api/send-message` → Telegram receives with session ID prefix
3. All messages sync in real-time via Firestore listener

### You Reply in Telegram
1. You receive: `[session: session_xxx_xxx]\nUser's question`
2. You reply: `[session: session_xxx_xxx]\nYour response`
3. Telegram Webhook receives → `/api/telegram-webhook` parses session ID
4. Backend stores in Firestore → Browser listener detects new message
5. Message appears in chat instantly! ✨

## Firestore Collection Structure

```
messages/
  {docId}: {
    sessionId: "session_1703152000000_a1b2c3d4e",
    text: "The actual message content",
    message: "The actual message content", // For compatibility
    from: "user" | "you",
    timestamp: 1703152000000
  }
```

## Testing Locally

### Option 1: Use ngrok for Local Testing
```bash
# Terminal 1: Run your app
npm run dev

# Terminal 2: Create tunnel
npm install -g ngrok
ngrok http 5173  # or your dev port

# Get the URL (e.g., https://xxxx-xxx-xxx.ngrok.io)
# Update webhook:
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://your-ngrok-url/api/telegram-webhook\"}"
```

### Option 2: Deploy to Vercel and Test
```bash
git push origin main
# Vercel auto-deploys
# Test with your deployed domain
```

## Troubleshooting

### Replies not appearing in chat?

**Step 1: Check browser polling**
```javascript
// Open DevTools → Console, run:
fetch('/api/get-replies?sessionId=your_session_id')
  .then(r => r.json())
  .then(console.log)
```

**Step 2: Verify reply was saved in Firebase**
- Go to Firebase Console
- Firestore Database → `messages` collection
- Filter by your sessionId
- Should see your reply document

**Step 3: Check webhook is active**
```bash
# Get webhook info
curl "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo"
```

Should show your domain with `"pending_update_count": 0` (if 0 = no pending updates)

**Step 4: Test webhook manually**
```bash
curl -X POST "https://your-domain.vercel.app/api/telegram-webhook" \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "text": "[session: test_session_123]\nTest reply from webhook"
    }
  }'
```

Check Firestore to see if document was created.

### Session ID Format
When replying in Telegram, MUST include session ID like:
```
[session: session_1703152000000_a1b2c3d4e]
Your actual reply here
```

The webhook extracts this and routes the message to the correct browser.

## File Structure

```
api/
  ├─ send-message.ts (sends user messages to Telegram)
  ├─ telegram-webhook.ts (receives Telegram replies)
  └─ get-replies.ts (deprecated - kept for compatibility)

lib/
  └─ firebase.ts (Firebase config)

src/components/
  └─ Chat.tsx (React component with Firestore real-time sync)
```

## Security Notes

- ✅ Firebase rules require authenticated users (uses anonymous auth)
- ✅ Session IDs are random per browser
- ✅ Replies are ephemeral (no long-term storage needed)
- ⚠️ Consider adding rate limiting for production

## Next Steps

1. Add environment variables to Vercel
2. Deploy to Vercel
3. Set webhook with your domain
4. Test by sending a message and replying in Telegram
5. Reply should appear in browser within seconds!

Good luck! 🚀
