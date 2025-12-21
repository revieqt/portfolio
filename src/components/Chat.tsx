import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { db } from "../../lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

type Message = {
  id: string;
  text: string;
  from: "user" | "you";
  timestamp: number;
};

type ChatProps = {
  isOpen: boolean;
  onClose: () => void;
};

const STORAGE_KEY = "chat_messages";
const SESSION_KEY = "chat_sessionId";
const RATE_LIMIT_MS = 3000;

const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize sessionId
  useEffect(() => {
    let sId = localStorage.getItem(SESSION_KEY);
    if (!sId) {
      sId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(SESSION_KEY, sId);
    }
    setSessionId(sId);

    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Firestore real-time subscription
  useEffect(() => {
    if (!sessionId || !isOpen) return;

    const q = query(
      collection(db, "messages"),
      where("sessionId", "==", sessionId),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Message));
      setMessages(msgs);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    });

    return () => unsubscribe();
  }, [sessionId, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;

    // Rate limit
    const now = Date.now();
    if (now - lastMessageTime < RATE_LIMIT_MS) {
      alert(
        `Please wait ${Math.ceil(
          (RATE_LIMIT_MS - (now - lastMessageTime)) / 1000
        )}s before sending another message`
      );
      return;
    }

    const newMessage: Message = {
      id: `local-${Date.now()}`,
      text: input,
      from: "user",
      timestamp: now,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLastMessageTime(now);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, newMessage]));

    try {
      // Save to Firestore
      await addDoc(collection(db, "messages"), {
        sessionId,
        text: input,
        message: input,
        from: "user",
        timestamp: Date.now(),
      });

      // Send to Telegram
      await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: input,
        }),
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />
      <div
        className={`fixed z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
        md:bottom-0 md:right-0 md:w-[500px] md:top-0 md:rounded-tl-3xl md:rounded-bl-3xl
        inset-0 md:inset-auto
        bg-white/15 dark:bg-white/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl`}
      >
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

        {/* Messages */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3 bg-white/5 dark:bg-white/3">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-gray-600 dark:text-white/60">Start a conversation! 💬</p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[70%] break-words backdrop-blur-sm transition-all ${
                  msg.from === "user"
                    ? "bg-pink-500/60 dark:bg-pink-600/50 text-white"
                    : "bg-white/30 dark:bg-white/15 text-gray-900 dark:text-white"
                }`}
              >
                {msg.text || (msg as any).message}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 border-t border-white/20 dark:border-white/10 flex items-center gap-2 bg-white/5 dark:bg-white/3 backdrop-blur-sm">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-white/40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/60 transition-all"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={handleSend}
            className="bg-pink-500/60 dark:bg-pink-600/50 hover:bg-pink-500/80 dark:hover:bg-pink-600/70 text-white px-4 py-2 rounded-xl transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
