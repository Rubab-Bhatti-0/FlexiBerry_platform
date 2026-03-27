'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Package, Zap, HelpCircle, Clock } from "lucide-react";

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
      text: "Hello! 👋 Welcome to FlexiBerry Support", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    },
    { 
      id: 2, 
      text: "How can I help you today? Select an option below or type your question.", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "Track Order", id: "track", icon: Package },
    { label: "Product Help", id: "product", icon: HelpCircle },
    { label: "Delivery Status", id: "delivery", icon: Clock },
    { label: "Quick Issues", id: "issues", icon: Zap }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (actionId: string) => {
    const actionMessages: Record<string, string> = {
      track: "I can help you track your order! Please provide your order number, and I'll show you the real-time tracking information.",
      product: "I'm here to help with product questions. What would you like to know about your purchase?",
      delivery: "Let me check your delivery status. What's your order ID?",
      issues: "I can quickly resolve common issues. What's the problem you're facing?"
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
          "Thank you for reaching out! Let me assist you with that right away.",
          "I understand your concern. Here's what I can do for you...",
          "Great question! Let me provide you with the best solution.",
          "I'm here to help! Let me look into that for you.",
          "Perfect! I'll get you the information you need.",
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
      {/* Floating Button - Ultra Modern */}
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
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main Button */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all border border-white/20 backdrop-blur-xl">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle size={32} className="text-white" />
                </motion.div>
              </div>

              {/* Status Indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full border-3 border-white shadow-lg"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Futuristic 2026 Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 400 }}
            className="fixed bottom-8 right-8 z-50 w-[460px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden backdrop-blur-2xl"
          >
            {/* Futuristic Header */}
            <div className="relative p-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10 border-b border-white/10 backdrop-blur-xl">
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl border border-white/20"
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <MessageCircle size={28} className="text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/20"
                      animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Support Center</h3>
                    <p className="text-sm text-cyan-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
                      Instant Help
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 hover:bg-white/10 rounded-full transition-all text-slate-300 hover:text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={22} />
                </motion.button>
              </div>
            </div>

            {/* Messages Area - Dark Premium */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-slate-900/50 to-slate-950/50 min-h-[420px] max-h-[600px]">
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
                      className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <MessageCircle size={18} className="text-white" />
                    </motion.div>
                  )}
                  <div
                    className={`max-w-xs px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed font-medium transition-all ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-none shadow-lg border border-cyan-400/30'
                        : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/20 backdrop-blur-sm hover:bg-white/15'
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
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div className="bg-white/10 text-slate-100 px-5 py-3.5 rounded-2xl rounded-bl-none border border-white/20 shadow-lg flex items-center gap-2 backdrop-blur-sm">
                    <div className="flex gap-2">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full"
                          animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Actions - Modern Cards */}
              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 space-y-3"
                >
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleQuickAction(action.id)}
                        className="w-full px-5 py-3.5 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 text-white rounded-xl text-sm font-semibold border border-white/20 hover:border-white/40 transition-all shadow-lg hover:shadow-xl backdrop-blur-sm group"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-3">
                            <Icon size={18} className="text-cyan-400 group-hover:text-cyan-300" />
                            {action.label}
                          </span>
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-cyan-400 group-hover:text-cyan-300"
                          >
                            →
                          </motion.div>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Sleek */}
            <div className="p-6 border-t border-white/10 bg-gradient-to-t from-slate-950 to-slate-900/50 backdrop-blur-xl">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  disabled={isLoading}
                  className="flex-1 pl-5 pr-14 py-3.5 bg-white/10 border border-white/20 rounded-full text-[15px] text-white placeholder-slate-400 outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium backdrop-blur-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-3 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 text-white rounded-full hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/20"
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

            {/* Footer - Modern */}
            <div className="px-6 py-4 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-t border-white/10 text-center backdrop-blur-sm">
              <p className="text-[13px] text-slate-400">
                Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">FlexiBerry AI</span> • 24/7 Support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
