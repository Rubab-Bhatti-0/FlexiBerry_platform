'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, ChevronLeft, Package, HelpCircle, Clock, Zap } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isQuickAction?: boolean;
  image?: string;
}

export const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Do you have boots in size 75?", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    },
    { 
      id: 2, 
      text: "Sure thing! Here are a few available now:", 
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
    setShowMainMenu(false);
    
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
          "I completely understand. Here's what I can do for you...",
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

  const handleBack = () => {
    setShowMainMenu(true);
    setMessages([
      { 
        id: 1, 
        text: "Do you have boots in size 75?", 
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      },
      { 
        id: 2, 
        text: "Sure thing! Here are a few available now:", 
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  };

  return (
    <>
      {/* Floating Button - Premium Modern */}
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main Button */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all border border-white/20 backdrop-blur-xl">
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

      {/* Chat Window - Modern Premium Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 400 }}
            className="fixed bottom-8 right-8 z-50 w-[480px] h-[700px] bg-white rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden"
          >
            {/* Premium Header with Navigation */}
            <div className="relative p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-b border-purple-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {!showMainMenu && (
                    <motion.button
                      onClick={handleBack}
                      className="p-2 hover:bg-white/20 rounded-full transition-all text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-lg">Hi, this is Mia!</h3>
                    <p className="text-sm text-white/80 font-medium">Your Personal Assistant</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-all text-white"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
            </div>

            {/* Main Menu View */}
            {showMainMenu ? (
              <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help?</h2>
                  <p className="text-gray-600 text-sm">Select an option below to get started</p>
                </motion.div>

                <div className="w-full space-y-3 max-w-sm">
                  {quickActions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleQuickAction(action.id)}
                        className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-2xl text-sm font-semibold border border-gray-200 hover:border-purple-300 transition-all shadow-sm hover:shadow-md group flex items-center justify-between"
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={20} className="text-purple-600 group-hover:text-purple-700" />
                          {action.label}
                        </span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-purple-600 group-hover:text-purple-700"
                        >
                          →
                        </motion.div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <>
                {/* Messages Area - Chat View */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-gray-50 to-white">
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
                          className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <MessageCircle size={18} className="text-white" />
                        </motion.div>
                      )}
                      <div
                        className={`max-w-xs px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed font-medium transition-all ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-br-none shadow-md'
                            : 'bg-gray-200 text-gray-900 rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="break-words">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start items-end gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                        <MessageCircle size={18} className="text-white" />
                      </div>
                      <div className="bg-gray-200 text-gray-900 px-5 py-3.5 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                        <div className="flex gap-2">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              className="w-2.5 h-2.5 bg-gray-600 rounded-full"
                              animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
                              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Spacious & Modern */}
                <div className="p-6 border-t border-gray-200 bg-white">
                  <div className="relative flex flex-col gap-3">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      rows={3}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-300 rounded-2xl text-[15px] text-gray-800 placeholder-gray-400 outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium resize-none"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="self-end p-3 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-purple-400/30"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -45, 0] }}
                        transition={{ duration: 0.6 }}
                      >
                        <Send size={20} />
                      </motion.div>
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
