// Chat.tsx
import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

type Message = {
  id: string;
  text: string;
  from: "user" | "you";
  timestamp?: number;
};

type ChatProps = {
  isOpen: boolean;
  onClose: () => void;
};

const STORAGE_KEY = "chat_messages";
const SESSION_KEY = "chat_sessionId";
const RATE_LIMIT_MS = 3000; // 3 seconds between messages

const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize sessionId and load messages from localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem(SESSION_KEY);
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(SESSION_KEY, newSessionId);
      setSessionId(newSessionId);
    }

    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse saved messages", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Polling for replies from Telegram
  useEffect(() => {
    if (!isOpen || !sessionId) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/get-replies?sessionId=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            const newMessage: Message = {
              id: crypto.randomUUID(),
              text: data.reply,
              from: "you",
              timestamp: Date.now(),
            };
            setMessages(prev => [...prev, newMessage]);
          }
        }
      } catch (error) {
        console.error("Failed to poll for replies:", error);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [isOpen, sessionId]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    // Rate limiting check
    const now = Date.now();
    if (now - lastMessageTime < RATE_LIMIT_MS) {
      alert(`Please wait ${Math.ceil((RATE_LIMIT_MS - (now - lastMessageTime)) / 1000)}s before sending another message`);
      return;
    }

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      from: "user",
      timestamp: now,
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLastMessageTime(now);
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: input,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send message");
        // Optionally show error to user
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !messages.length) return null;

  return (
    <>
      {/* Mobile overlay - only visible on small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Chat Container */}
      <div
        className={`fixed z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          md:bottom-0 md:right-0 md:w-[500px] md:top-0 md:rounded-tl-3xl md:rounded-bl-3xl
          inset-0 md:inset-auto
          bg-white/15 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl
          ${
            isOpen
              ? "translate-x-0 md:translate-x-0"
              : "translate-x-full md:translate-x-[calc(100%+24px)]"
          }
        `}
      >
        {/* Mobile: Full screen glassmorphism background */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/3 dark:to-transparent backdrop-blur-xl -z-10" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20 dark:border-white/10 bg-white/5 dark:bg-white/3 backdrop-blur-sm">
          <h2 className="text-gray-900 dark:text-white font-semibold text-lg">Chat with Me</h2>
          <button
            onClick={onClose}
            className="text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3 bg-white/5 dark:bg-white/3">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-gray-600 dark:text-white/60">Start a conversation! 💬</p>
            </div>
          )}
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[70%] break-words backdrop-blur-sm transition-all ${
                  msg.from === "user"
                    ? "bg-pink-500/60 dark:bg-pink-600/50 text-white shadow-lg hover:shadow-xl hover:bg-pink-500/80 dark:hover:bg-pink-600/70"
                    : "bg-white/30 dark:bg-white/15 text-gray-900 dark:text-white shadow-lg hover:shadow-xl hover:bg-white/40 dark:hover:bg-white/20"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 md:p-6 border-t border-white/20 dark:border-white/10 flex items-center gap-2 bg-white/5 dark:bg-white/3 backdrop-blur-sm">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-white/40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:bg-white/30 dark:focus:bg-white/15 transition-all disabled:opacity-50"
            onKeyDown={e => {
              if (e.key === "Enter" && !isLoading) handleSend();
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-pink-500/60 dark:bg-pink-600/50 hover:bg-pink-500/80 dark:hover:bg-pink-600/70 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Chat;
