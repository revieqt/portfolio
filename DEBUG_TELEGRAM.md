# Debug: Messages Not Reaching Telegram

Follow these steps to find the issue:

## Step 1: Check Vercel Environment Variables

```bash
vercel env list
```

Make sure you see:
```
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

If missing, add them to Vercel Dashboard → Settings → Environment Variables and redeploy.

## Step 2: Check Vercel Logs

```bash
vercel logs --follow
```

Then send a message from your chat. You should see debug output like:
```
🔍 Send message debug:
  BOT_TOKEN set: true
  CHAT_ID set: true
  SessionId: session_xxx
  Message: Hello

📤 Sending to Telegram...
  URL: https://api.telegram.org/bot***TOKEN***/sendMessage
  Chat ID: 987654321
  Message: [session: session_xxx]
Hello

📨 Telegram response:
  Status: 200
  OK: true
  Data: { ok: true, ... }

✅ Message sent successfully
```

## Step 3: Check Each Variable

If logs show `BOT_TOKEN set: false` or `CHAT_ID set: false`:

```bash
# Check if env vars exist in your local .env.local
cat .env.local

# Should show:
# TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
# TELEGRAM_CHAT_ID=987654321
```

## Step 4: Verify Token and Chat ID Format

Your bot token should look like:
```
123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
```

Your chat ID should be a number like:
```
987654321
```

## Step 5: Test Telegram API Directly

Replace with your actual token and ID:

```bash
BOT_TOKEN="your_token_here"
CHAT_ID="your_chat_id_here"

curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"${CHAT_ID}\",
    \"text\": \"Test message from curl\"
  }"
```

You should get back:
```json
{
  "ok": true,
  "result": { ... }
}
```

If this fails, your token or chat ID is wrong.

## Step 6: Deploy and Test

```bash
# Deploy latest code (with logging)
git add .
git commit -m "Add debug logging"
git push origin main

# Wait for deployment, then:
vercel logs --follow

# Send a message from chat
# Watch logs for debug output
```

## Common Issues & Solutions

### Issue: `BOT_TOKEN set: false` or `CHAT_ID set: false`
**Solution**: 
1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add both variables
4. Redeploy

### Issue: Status 401
**Solution**: Your bot token is wrong. Get it from @BotFather again.

### Issue: Status 400 with `chat_id` error
**Solution**: Your chat ID is wrong. Get it from @userinfobot again.

### Issue: Status 403
**Solution**: Bot is blocked or not started. Send a message to your bot in Telegram, then try again.

## Quick Commands

```bash
# Deploy
git push origin main

# Check logs
vercel logs

# Check env vars
vercel env list

# Test API directly
curl -X POST "https://api.telegram.org/botTOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"ID","text":"Test"}'
```

---

**The logs will tell you exactly what's wrong!** 🔍
