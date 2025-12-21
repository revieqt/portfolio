#!/bin/bash
# Debug Firebase Chat Feature

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Firebase Chat Debugger${NC}"
echo "======================="
echo ""

# Check environment variables
echo -e "${YELLOW}1. Checking environment variables...${NC}"
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo -e "${RED}❌ TELEGRAM_BOT_TOKEN not set${NC}"
else
    echo -e "${GREEN}✅ TELEGRAM_BOT_TOKEN set${NC}"
fi

if [ -z "$TELEGRAM_CHAT_ID" ]; then
    echo -e "${RED}❌ TELEGRAM_CHAT_ID not set${NC}"
else
    echo -e "${GREEN}✅ TELEGRAM_CHAT_ID set${NC}"
fi

echo ""

# Check webhook
echo -e "${YELLOW}2. Checking Telegram webhook...${NC}"
read -p "Enter your Telegram bot token: " BOT_TOKEN
read -p "Enter your domain (e.g., your-app.vercel.app): " DOMAIN

if [ -z "$BOT_TOKEN" ] || [ -z "$DOMAIN" ]; then
    echo -e "${RED}❌ Missing bot token or domain${NC}"
    exit 1
fi

WEBHOOK_URL="https://${DOMAIN}/api/telegram-webhook"

echo "Getting webhook info..."
WEBHOOK_INFO=$(curl -s "https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo")
echo "$WEBHOOK_INFO" | jq .

if echo "$WEBHOOK_INFO" | grep -q "$WEBHOOK_URL"; then
    echo -e "${GREEN}✅ Webhook is correctly set${NC}"
else
    echo -e "${YELLOW}⚠️  Webhook might not be set. Setting it now...${NC}"
    SET_RESULT=$(curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook" \
      -H "Content-Type: application/json" \
      -d "{\"url\":\"${WEBHOOK_URL}\"}")
    echo "$SET_RESULT" | jq .
fi

echo ""

# Test webhook endpoint
echo -e "${YELLOW}3. Testing webhook endpoint...${NC}"
TEST_PAYLOAD='{
  "message": {
    "text": "[session: test_session_123]\nTest message"
  }
}'

echo "Sending test request to $WEBHOOK_URL..."
TEST_RESULT=$(curl -s -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "$TEST_PAYLOAD")
echo "$TEST_RESULT" | jq .

echo ""

# Check Firebase Firestore
echo -e "${YELLOW}4. Firebase Firestore Status${NC}"
echo "Visit: https://console.firebase.google.com/u/0/project/josh-opsima-portfolio/firestore"
echo "Check if 'messages' collection exists with documents"
echo ""

# Session ID format guide
echo -e "${YELLOW}5. Telegram Reply Format${NC}"
echo "When replying in Telegram, use this format:"
echo ""
echo "  [session: YOUR_SESSION_ID]"
echo "  Your actual reply here"
echo ""
echo "Example:"
echo "  [session: session_1703152000000_a1b2c3d4e]"
echo "  Thanks for reaching out!"
echo ""

echo -e "${GREEN}Debug complete!${NC}"
