# Step-by-Step: Get Your Chat Working NOW

This is the simplest guide to fix your chat. Follow these steps exactly.

## Step 1: Verify Vercel Environment Variables

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables (copy-paste these exact names):

```
FIREBASE_API_KEY=AIzaSyCFVbbOAuSjr2Ot-XOYCTITQdalIY1iVJY
FIREBASE_AUTH_DOMAIN=josh-opsima-portfolio.firebaseapp.com
FIREBASE_PROJECT_ID=josh-opsima-portfolio
FIREBASE_STORAGE_BUCKET=josh-opsima-portfolio.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=148674270170
FIREBASE_APP_ID=1:148674270170:web:2ad4dd1e46acf6d17666e3
TELEGRAM_BOT_TOKEN=[your bot token from @BotFather]
TELEGRAM_CHAT_ID=[your chat id from @userinfobot]
```

After adding them, **Vercel redeploys automatically**.

## Step 2: Deploy Your Fixed Code

```bash
git add .
git commit -m "Fix Firebase chat feature"
git push origin main
```

Wait for Vercel to finish deploying (check your Vercel dashboard).

## Step 3: Set Up Telegram Webhook

This tells Telegram to send replies to your app.

Replace `YOUR_DOMAIN` and `YOUR_BOT_TOKEN`:

```bash
DOMAIN="YOUR_DOMAIN"  # e.g., my-app.vercel.app
TOKEN="YOUR_BOT_TOKEN"  # e.g., 123456:ABC-DEF...

curl -X POST "https://api.telegram.org/bot${TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://${DOMAIN}/api/telegram-webhook\"}"
```

Or if you have the script:
```bash
bash setup-webhook.sh YOUR_BOT_TOKEN YOUR_DOMAIN
```

**Verify it worked:**
```bash
curl "https://api.telegram.org/bot${TOKEN}/getWebhookInfo" | jq
```

You should see:
```json
{
  "ok": true,
  "result": {
    "url": "https://YOUR_DOMAIN/api/telegram-webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

## Step 4: Test It!

1. **Open your portfolio** in browser
2. **Click "Chat with me!"**
3. **Type a message** like "Hello!"
4. **Click Send**
5. **Check Telegram** - you should receive:
   ```
   [session: session_1703152000000_a1b2c3d4e]
   Hello!
   ```

## Step 5: Reply in Telegram

This is the critical part - **the format MUST be exact**:

```
[session: session_1703152000000_a1b2c3d4e]
Thanks for reaching out!
```

**Copy the session ID from the message and paste it back in your reply.**

## Step 6: See Your Reply in Chat

Within 2-5 seconds, your reply should appear in the browser chat! ✨

---

## ⚠️ If It Still Doesn't Work

### Check 1: Is Vercel showing your env vars?
```bash
vercel env list
```

### Check 2: Test the webhook directly
```bash
curl -X POST "https://YOUR_DOMAIN/api/telegram-webhook" \
  -H "Content-Type: application/json" \
  -d '{"message":{"text":"[session: test_123]\nTest"}}'
```

### Check 3: Check Vercel logs
```bash
vercel logs
```

Look for errors about Firebase or session ID.

### Check 4: Verify session ID format
When replying in Telegram, MUST be:
```
[session: SESSION_ID]
Your reply
```

Not:
- `session: SESSION_ID` (no brackets)
- `SESSION_ID\nYour reply` (no [session: ])
- `[session SESSION_ID]` (no colon)

---

## Files That Matter

**Frontend (Browser)**:
- `src/components/Chat.tsx` - Shows messages, sends user messages, listens to Firestore

**Backend (Vercel)**:
- `api/send-message.ts` - Sends user message to Telegram
- `api/telegram-webhook.ts` - Receives reply from Telegram, stores in Firestore

**Firebase**:
- `lib/firebase.ts` - Firebase config
- Firestore `messages` collection - Stores all chat messages

---

## Quick Sanity Check

If you want to test without replying in Telegram:

1. Go to Firebase Console: https://console.firebase.google.com
2. Project: josh-opsima-portfolio → Firestore
3. Add a test document to `messages` collection:
   ```json
   {
     "sessionId": "YOUR_SESSION_ID",
     "text": "Test message from Firebase",
     "from": "you",
     "timestamp": 1703152000000
   }
   ```
   (Replace YOUR_SESSION_ID with the one from localStorage)

4. Go back to browser chat
5. You should see "Test message from Firebase" appear!

This confirms Firestore sync is working. If this works but Telegram replies don't, the issue is with the webhook.

---

**That's it! You should be all set.** 🚀

For more details, see:
- `FIREBASE_CHAT_SETUP.md` - Detailed setup
- `CHAT_FIX_SUMMARY.md` - What was fixed
- `TELEGRAM_REPLY_INSTRUCTIONS.md` - How to reply correctly
