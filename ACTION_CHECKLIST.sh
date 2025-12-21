#!/bin/bash
# ACTION CHECKLIST - Complete These Steps

echo "================================"
echo "Chat Feature Fix - Action Items"
echo "================================"
echo ""

# Checklist function
check() {
  echo "☐ $1"
}

# Step 1
echo "STEP 1: Environment Variables (Vercel)"
echo "-----------------------------------"
check "Go to Vercel Dashboard"
check "Select your portfolio project"
check "Go to Settings → Environment Variables"
check "Add FIREBASE_API_KEY"
check "Add FIREBASE_AUTH_DOMAIN"
check "Add FIREBASE_PROJECT_ID"
check "Add FIREBASE_STORAGE_BUCKET"
check "Add FIREBASE_MESSAGING_SENDER_ID"
check "Add FIREBASE_APP_ID"
check "Add TELEGRAM_BOT_TOKEN"
check "Add TELEGRAM_CHAT_ID"
echo ""

# Step 2
echo "STEP 2: Deploy Code"
echo "-------------------"
check "git add ."
check "git commit -m 'Fix Firebase chat'"
check "git push origin main"
check "Wait for Vercel deployment to complete"
echo ""

# Step 3
echo "STEP 3: Set Telegram Webhook"
echo "-----------------------------"
check "Replace YOUR_DOMAIN with your Vercel domain"
check "Replace YOUR_BOT_TOKEN with your Telegram bot token"
echo ""
echo "Run this command:"
echo "DOMAIN=\"your-domain.vercel.app\""
echo "TOKEN=\"your_bot_token\""
echo "curl -X POST \"https://api.telegram.org/bot\${TOKEN}/setWebhook\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d \"{\\\"url\\\":\\\"https://\${DOMAIN}/api/telegram-webhook\\\"}\""
echo ""

# Step 4
echo "STEP 4: Verify Webhook"
echo "----------------------"
check "Run: curl \"https://api.telegram.org/bot{TOKEN}/getWebhookInfo\" | jq"
check "Check that url is set to your domain"
check "Check that pending_update_count is 0 (or low)"
echo ""

# Step 5
echo "STEP 5: Test"
echo "------------"
check "Open your portfolio in browser"
check "Click 'Chat with me!'"
check "Type a message and send"
check "Check Telegram for the message (should have [session: xxx])"
check "Reply in Telegram with [session: xxx]\\nYour reply"
check "Check browser - reply should appear in 2-5 seconds"
echo ""

# Summary
echo "================================"
echo "After these steps, your chat will work!"
echo "================================"
echo ""
echo "📚 Read these for help:"
echo "  - TLDR.md - Quick reference"
echo "  - QUICK_FIX_GUIDE.md - Detailed walkthrough"
echo "  - TELEGRAM_REPLY_INSTRUCTIONS.md - How to reply"
echo "  - CODE_CHANGES.md - What changed"
echo ""

# Copy paste sections
echo "================================"
echo "COPY-PASTE READY COMMANDS"
echo "================================"
echo ""

echo "1. Deploy code:"
echo "   git add . && git commit -m 'Fix Firebase chat' && git push origin main"
echo ""

echo "2. To get your webhook info:"
echo "   curl \"https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getWebhookInfo\" | jq"
echo ""

echo "3. To verify webhook setup:"
echo "   curl -X POST \"https://api.telegram.org/bot{TOKEN}/setWebhook\" \\"
echo "   -H \"Content-Type: application/json\" \\"
echo "   -d '{\"url\":\"https://{DOMAIN}/api/telegram-webhook\"}'"
echo ""

echo "================================"
