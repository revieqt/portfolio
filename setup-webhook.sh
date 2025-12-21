#!/bin/bash
# Setup Telegram Webhook

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Telegram Webhook Setup${NC}"
echo "======================="
echo ""

# Check if bot token is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Bot token not provided${NC}"
    echo "Usage: ./setup-webhook.sh <TELEGRAM_BOT_TOKEN> <YOUR_DOMAIN>"
    echo ""
    echo "Example:"
    echo "  ./setup-webhook.sh 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11 your-portfolio.vercel.app"
    exit 1
fi

BOT_TOKEN=$1
DOMAIN=${2:-"localhost"}

# Build webhook URL
if [ "$DOMAIN" = "localhost" ]; then
    WEBHOOK_URL="http://localhost:3000/api/telegram-webhook"
    echo -e "${YELLOW}⚠️  Using localhost URL. Only works with ngrok or similar tunnel.${NC}"
    echo ""
else
    WEBHOOK_URL="https://$DOMAIN/api/telegram-webhook"
fi

echo "Bot Token: $BOT_TOKEN"
echo "Webhook URL: $WEBHOOK_URL"
echo ""

# Set webhook
echo -e "${YELLOW}Setting webhook...${NC}"
RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot$BOT_TOKEN/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"$WEBHOOK_URL\"}")

echo "Response: $RESPONSE"
echo ""

# Check if successful
if echo "$RESPONSE" | grep -q '"ok":true'; then
    echo -e "${GREEN}✅ Webhook set successfully!${NC}"
    echo ""
    echo "Details:"
    echo "  Endpoint: $WEBHOOK_URL"
    echo "  Token: $BOT_TOKEN"
    echo ""
    echo "Next steps:"
    echo "  1. Verify webhook is active:"
    echo "     curl -s 'https://api.telegram.org/bot$BOT_TOKEN/getWebhookInfo' | jq"
    echo ""
    echo "  2. Test by replying in Telegram with session ID format:"
    echo "     [session: session_xxx_xxx]"
    echo "     Your reply here"
    echo ""
else
    echo -e "${RED}❌ Failed to set webhook${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Check bot token is correct"
    echo "  2. Verify domain is accessible"
    echo "  3. Check webhook endpoint returns 200 OK"
    echo ""
fi
