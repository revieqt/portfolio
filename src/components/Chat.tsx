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
  sessionId: string;
};

const Chat: React.FC<ChatProps> = ({ isOpen, onClose, sessionId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Polling placeholder (to integrate with serverless API)
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      // Example: fetch messages from serverless endpoint
      // fetch(`/api/get-messages?sessionId=${sessionId}`)
      //   .then(res => res.json())
      //   .then(data => setMessages(data.messages));
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen, sessionId]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      from: "user",
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");

    // TODO: call your serverless function to send to Telegram
    // fetch("/api/send-message", { method: "POST", body: JSON.stringify({ sessionId, message: input }) });
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
            className="flex-1 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-white/40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:bg-white/30 dark:focus:bg-white/15 transition-all"
            onKeyDown={e => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-pink-500/60 dark:bg-pink-600/50 hover:bg-pink-500/80 dark:hover:bg-pink-600/70 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
          >
            Send
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
