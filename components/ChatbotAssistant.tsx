'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, ChevronRight } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isQuickAction?: boolean;
}

export const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Welcome to FlexiBerry! 👋", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    },
    { 
      id: 2, 
      text: "I'm here to help you find the perfect solution. What can I assist you with today?", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "Build AI Chatbot", id: "build", emoji: "🚀" },
    { label: "Explore Features", id: "features", emoji: "✨" },
    { label: "View Pricing", id: "pricing", emoji: "💎" },
    { label: "Get Support", id: "support", emoji: "🎯" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (actionId: string) => {
    const actionMessages: Record<string, string> = {
      build: "Great choice! I'll guide you through building your AI chatbot. We offer enterprise-grade features with 24/7 support.",
      features: "Our platform includes real-time analytics, advanced automation, seamless integrations, and much more. What interests you?",
      pricing: "We offer flexible pricing plans starting from $29/month. Premium plans include dedicated support and custom features.",
      support: "Our support team is available 24/7. You can also check our documentation or schedule a demo with our specialists."
    };

    const actionLabel = quickActions.find(a => a.id === actionId)?.label || "";
    const userMessage: Message = {
      id: messages.length + 1,
      text: actionLabel,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isQuickAction: true
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: actionMessages[actionId] || "How can I assist you further?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 600);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage: Message = { 
        id: messages.length + 1, 
        text: inputValue, 
        sender: 'user',
        timestamp 
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsLoading(true);

      setTimeout(() => {
        const botResponses = [
          "That's an excellent question! Let me provide you with detailed information.",
          "I completely understand. Here's what I recommend for your needs.",
          "Great thinking! Our team can definitely help with that.",
          "I'm delighted to assist! Let me share some valuable insights.",
          "Perfect! This aligns perfectly with our latest solutions.",
        ];
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: randomResponse, 
          sender: 'bot',
          timestamp: botTimestamp 
        }]);
        setIsLoading(false);
      }, 800);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button - Premium Minimalist */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-40 group"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Main Button */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all border border-blue-300/30 backdrop-blur-xl">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle size={32} className="text-white" />
                </motion.div>
              </div>

              {/* Status Dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-3 border-white shadow-lg"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Premium Modern Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 400 }}
            className="fixed bottom-8 right-8 z-50 w-[440px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden"
          >
            {/* Premium Header */}
            <div className="relative p-6 bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg border border-blue-300/30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <MessageCircle size={28} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">FlexiBerry</h3>
                    <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      Always Online
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 hover:bg-gray-200/50 rounded-full transition-all text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={22} />
                </motion.button>
              </div>
            </div>

            {/* Messages Area - Clean & Spacious */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white min-h-[420px] max-h-[600px]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: idx * 0.1, type: "spring", damping: 22 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
                >
                  {msg.sender === 'bot' && (
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <MessageCircle size={18} className="text-white" />
                    </motion.div>
                  )}
                  <div
                    className={`max-w-xs px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed font-medium transition-all ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-none shadow-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200 shadow-sm'
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator - Modern */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-end gap-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div className="bg-gray-100 text-gray-800 px-5 py-3.5 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center gap-2">
                    <div className="flex gap-2">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2.5 h-2.5 bg-gray-400 rounded-full"
                          animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Actions - Premium Buttons */}
              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 space-y-3"
                >
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleQuickAction(action.id)}
                      className="w-full px-5 py-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-800 rounded-xl text-sm font-semibold border border-blue-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md group"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2.5">
                          <span className="text-lg">{action.emoji}</span>
                          {action.label}
                        </span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-blue-500 group-hover:text-blue-700"
                        >
                          <ChevronRight size={18} />
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Elegant */}
            <div className="p-6 border-t border-gray-100 bg-white">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 pl-5 pr-14 py-3.5 bg-gray-50 border border-gray-200 rounded-full text-[15px] text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-3 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-blue-400/30"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -45, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send size={18} />
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-[13px] text-gray-500">
                Powered by <span className="text-blue-600 font-bold">FlexiBerry AI</span> • Premium Support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
