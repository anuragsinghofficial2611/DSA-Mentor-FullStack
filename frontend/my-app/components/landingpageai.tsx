"use client";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Menu,
  Plus,
  Send,
  User,
  Sparkles,
  Trash2,
  MessageSquare,
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! 👋 I'm your AI assistant. Ask me anything and I'll do my best to help.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try{
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: text,
            }),
        });
        
        const data = await response.json();
        console.log(data);
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                role: "assistant",
                content: data.response,
            },
        ]);
    } catch(error){
        console.log(error)
    } finally{
        setLoading(false);
        setIsTyping(false)
    }

    // // Temporary AI response
    // setTimeout(() => {
    //   const aiMessage: Message = {
    //     id: Date.now() + 1,
    //     role: "assistant",
    //     content:
    //       "I received your message. Connect this function to your backend AI API to generate real responses.",
    //   };

    //   setMessages((prev) => [...prev, aiMessage]);
    //   setIsTyping(false);
    // }, 1200);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content:
          "Chat cleared. What would you like to talk about?",
      },
    ]);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#070b14] text-white">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          ${
            sidebarOpen ? "w-[270px]" : "w-0"
          }
          shrink-0 overflow-hidden border-r border-white/10
          bg-[#0b101c] transition-all duration-300
        `}
      >
        <div className="flex h-full w-[270px] flex-col">

          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-white/10 p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles size={18} />
            </div>

            <div>
              <h1 className="font-semibold">AI Assistant</h1>
              <p className="text-xs text-gray-500">Your intelligent helper</p>
            </div>
          </div>

          {/* New Chat */}
          <div className="p-4">
            <button
              onClick={clearChat}
              className="
                flex w-full items-center justify-center gap-2
                rounded-xl border border-white/10
                bg-white/5 px-4 py-3
                text-sm font-medium
                transition hover:bg-white/10
              "
            >
              <Plus size={17} />
              New Chat
            </button>
          </div>

          {/* Conversations */}
          <div className="flex-1 px-3">
            <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              Conversations
            </p>

            <button
              className="
                flex w-full items-center gap-3 rounded-lg
                bg-white/10 px-3 py-3 text-left
              "
            >
              <MessageSquare size={16} className="text-gray-400" />

              <div className="min-w-0">
                <p className="truncate text-sm">
                  New conversation
                </p>
                <p className="text-xs text-gray-500">
                  Just now
                </p>
              </div>
            </button>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 p-4">
            <button
              onClick={clearChat}
              className="
                flex w-full items-center gap-3 rounded-lg
                px-3 py-2 text-sm text-gray-400
                transition hover:bg-white/5 hover:text-white
              "
            >
              <Trash2 size={16} />
              Clear conversation
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header
          className="
            flex h-[70px] shrink-0 items-center
            justify-between border-b border-white/10
            bg-[#080d18]/80 px-5 backdrop-blur-xl
          "
        >
          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="
                rounded-lg p-2 text-gray-400
                transition hover:bg-white/10 hover:text-white
              "
            >
              <Menu size={21} />
            </button>

            <div>
              <h2 className="font-semibold">
                AI Assistant
              </h2>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-gray-500">
                  Online
                </span>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:flex">
            <Bot size={15} className="text-blue-400" />
            <span className="text-xs text-gray-400">
              AI Model
            </span>
          </div>
        </header>

        {/* ================= MESSAGES ================= */}
        <div className="flex-1 overflow-y-auto">

          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">

            {messages.map((message) => (
              <div
                key={message.id}
                className={`
                  mb-8 flex gap-4
                  ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }
                `}
              >

                {/* AI Avatar */}
                {message.role === "assistant" && (
                  <div
                    className="
                      flex h-9 w-9 shrink-0 items-center
                      justify-center rounded-xl
                      bg-gradient-to-br from-blue-500 to-purple-600
                    "
                  >
                    <Bot size={18} />
                  </div>
                )}

                {/* Message */}
                <div
                  className={`
                    max-w-[80%]
                    ${
                      message.role === "user"
                        ? "rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3"
                        : "rounded-2xl rounded-tl-sm border border-white/10 bg-[#101724] px-4 py-3"
                    }
                  `}
                >
                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-100">
                    {message.content}
                  </p>
                </div>

                {/* User Avatar */}
                {message.role === "user" && (
                  <div
                    className="
                      flex h-9 w-9 shrink-0 items-center
                      justify-center rounded-xl
                      bg-white/10
                    "
                  >
                    <User size={18} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="mb-8 flex gap-4">

                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center
                    justify-center rounded-xl
                    bg-gradient-to-br from-blue-500 to-purple-600
                  "
                >
                  <Bot size={18} />
                </div>

                <div
                  className="
                    flex items-center gap-1 rounded-2xl
                    rounded-tl-sm border border-white/10
                    bg-[#101724] px-5 py-4
                  "
                >
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ================= INPUT ================= */}
        <div className="border-t border-white/10 bg-[#080d18] p-4">

          <div className="mx-auto max-w-4xl">

            <div
              className="
                relative flex items-end rounded-2xl
                border border-white/10
                bg-[#101724]
                p-2
                transition
                focus-within:border-blue-500/50
                focus-within:ring-1
                focus-within:ring-blue-500/20
              "
            >

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AI..."
                rows={1}
                className="
                  max-h-32 min-h-[44px] flex-1
                  resize-none bg-transparent
                  px-3 py-2.5
                  text-sm text-white
                  outline-none
                  placeholder:text-gray-500
                "
              />

              <button
                onClick={sendMessage}
                // disabled={!input.trim() || isTyping}
                disabled={loading}
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-blue-600
                  text-white
                  transition
                  hover:bg-blue-500
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                "
              >
                <Send size={17} />
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-gray-600">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}