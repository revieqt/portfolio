# How to Reply in Telegram - Exact Instructions

## The Session ID Format

When you receive a message in Telegram from the webhook, it looks like this:

```
[session: session_1703152000000_a1b2c3d4e]
Hi! Can you tell me about your tech stack?
```

## How to Reply - IMPORTANT!

You MUST include the session ID in your reply, in the exact same format:

```
[session: session_1703152000000_a1b2c3d4e]
Sure! I use React, TypeScript, Tailwind CSS, and Firebase.
```

## Examples

### ✅ CORRECT - Simple Reply
```
[session: session_1703152000000_a1b2c3d4e]
Thanks for reaching out!
```

### ✅ CORRECT - Multi-line Reply
```
[session: session_1703152000000_a1b2c3d4e]
Great question!

My tech stack includes:
- React with TypeScript
- Tailwind CSS for styling
- Firebase Firestore for data
- Vercel for hosting

Let me know if you need more details!
```

### ✅ CORRECT - Long Reply
```
[session: session_1703152000000_a1b2c3d4e]
I'd be happy to discuss your project!

Here's what I can help with:
1. Frontend development (React, Vue, Angular)
2. Backend APIs (Node.js, Python)
3. Database design
4. DevOps and deployment

Feel free to send me your requirements and I'll get back to you soon!
```

### ❌ WRONG - No Session ID
```
Thanks for reaching out!
```
⚠️ This won't work! The message won't be routed to the correct browser.

### ❌ WRONG - Wrong Session ID Format
```
session: session_1703152000000_a1b2c3d4e
Thanks for reaching out!
```
⚠️ Missing brackets! Must be `[session: ...]`

### ❌ WRONG - Session ID in Wrong Position
```
Thanks for reaching out!
[session: session_1703152000000_a1b2c3d4e]
```
⚠️ Session ID must be on first line!

### ❌ WRONG - Typo in Session ID
```
[session: session_1703152000000_a1b2c3d4f]
Thanks for reaching out!
```
⚠️ Even one character off won't work! Copy-paste the exact session ID.

## Where to Find Your Session ID

If you're looking for YOUR session ID to test, check:

1. **In Browser localStorage**:
   - Open DevTools (F12)
   - Go to Application → Storage → localStorage
   - Find the key `chat_sessionId`
   - That's your session ID

2. **Example**:
   ```
   chat_sessionId = "session_1703152000000_a1b2c3d4e"
   ```

3. **Use in Telegram**:
   ```
   [session: session_1703152000000_a1b2c3d4e]
   Your reply here
   ```

## Flow Summary

1. **Browser sends**: `User's message` → Telegram receives `[session: xxx]\nUser's message`
2. **You receive**: `[session: xxx]\nUser's message`
3. **You reply**: `[session: xxx]\nYour response` ← EXACTLY like this
4. **Telegram webhook** receives → Parses session ID → Stores in Firebase
5. **Browser sees** new message → Shows in chat ✨

## Pro Tips

- **Copy-Paste**: Use Telegram's reply feature to quote the original message with session ID, then add your response
- **Keep Format**: The `[session: xxx]` line MUST be first in your message
- **No Spaces**: Use exact spacing: `[session: ` (with space after colon)
- **Brackets**: Square brackets `[` `]` are required, not parentheses or braces

## Quick Test

Send yourself a test message from the portfolio chat, get the session ID from the first line of what you receive, and reply with:

```
[session: COPY_EXACT_ID_FROM_MESSAGE]
This is a test reply!
```

If it appears in the browser within 2-5 seconds, you're all set! 🎉

---

**Questions?** Check `FIREBASE_CHAT_SETUP.md` for more troubleshooting.
