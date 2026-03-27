'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles, Zap, Settings, Phone } from "lucide-react";

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
      text: "Welcome to FlexiBerry AI Assistant ✨", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    },
    { 
      id: 2, 
      text: "I'm here to help you navigate our premium services. What can I assist you with today?", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "🚀 Build AI Solution", id: "build", icon: "⚡" },
    { label: "📱 Explore Features", id: "features", icon: "✨" },
    { label: "💎 Premium Plans", id: "plans", icon: "👑" },
    { label: "🎯 Get Started", id: "started", icon: "🎯" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (actionId: string) => {
    const actionMessages: Record<string, string> = {
      build: "Excellent! Let me guide you through our AI solution builder. We offer cutting-edge technology with enterprise-grade features. 🚀",
      features: "Our platform includes real-time analytics, advanced automation, and seamless integrations. What interests you most? 💡",
      plans: "We have three premium tiers: Starter, Professional, and Enterprise. Each includes exclusive benefits and priority support. 👑",
      started: "Perfect! I'll help you set up your account and get you started in minutes. Let's begin! 🎯"
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
          "That's an excellent question! Let me provide you with detailed insights. 🎯",
          "I completely understand your needs. Here's what I recommend... 💡",
          "Great thinking! Our premium features can help with that. 🌟",
          "I'm delighted to assist! Let me share some valuable information. ✨",
          "Perfect! This aligns with our latest innovations. 🚀",
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
      {/* Floating Button - Enhanced with Luxury Design */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 group"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Luxury Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
              
              {/* Secondary Glow */}
              <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Main Button */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all border border-white/30 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={32} className="text-white drop-shadow-lg" />
                </motion.div>
              </div>

              {/* Status Indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/50"
                animate={{ scale: [1, 1.3], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Premium Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden backdrop-blur-xl"
          >
            {/* Premium Header with Gradient */}
            <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 backdrop-blur-sm">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-xl border border-white/20"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles size={26} className="text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white text-lg">FlexiBerry AI</h3>
                    <p className="text-sm text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Active & Ready
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2.5 hover:bg-white/10 rounded-full transition-all text-slate-300 hover:text-white"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 hover:bg-white/10 rounded-full transition-all text-slate-300 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages Area - Dark Premium */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50 min-h-[380px] max-h-[550px] scrollbar-hide">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: idx * 0.08, type: "spring", damping: 20 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-3`}
                >
                  {msg.sender === 'bot' && (
                    <motion.div
                      className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={16} className="text-white" />
                    </motion.div>
                  )}
                  <div
                    className={`max-w-xs px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed font-medium shadow-lg backdrop-blur-sm transition-all ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-none border border-purple-400/30 shadow-purple-500/20'
                        : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator - Enhanced */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-end gap-3"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="bg-white/10 text-slate-100 px-5 py-3.5 rounded-2xl rounded-bl-none border border-white/20 shadow-lg flex items-center gap-2 backdrop-blur-sm">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                          animate={{ y: [0, -4, 0], scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Actions - Premium Style */}
              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-12 space-y-2.5 pt-4"
                >
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      onClick={() => handleQuickAction(action.id)}
                      className="w-full px-5 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 text-white rounded-xl text-sm font-semibold border border-purple-400/30 hover:border-purple-400/60 transition-all shadow-lg backdrop-blur-sm"
                      whileHover={{ scale: 1.03, x: 5 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="flex items-center justify-between">
                        <span>{action.label}</span>
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Premium */}
            <div className="p-6 border-t border-white/10 bg-gradient-to-t from-slate-900 to-slate-800/50 backdrop-blur-sm">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 pl-5 pr-14 py-3.5 bg-white/10 border border-white/20 rounded-full text-[15px] text-white placeholder-slate-400 outline-none focus:border-purple-400/50 focus:ring-4 focus:ring-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium backdrop-blur-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-white/20"
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

            {/* Premium Footer */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-t border-white/10 text-center backdrop-blur-sm">
              <p className="text-[13px] text-slate-400">
                Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">FlexiBerry AI</span> • Premium Support
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
