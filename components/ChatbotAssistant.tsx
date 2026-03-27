'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Minimize2, Plus } from "lucide-react";

export const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ id: number; text: string; sender: 'user' | 'bot'; timestamp: string }[]>([
    { id: 1, text: "Hello! 👋 How can I assist you today? Feel free to ask about your orders, installments, or any other questions.", sender: 'bot', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = { 
        id: messages.length + 1, 
        text: inputValue, 
        sender: 'user' as const,
        timestamp 
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsLoading(true);

      // Simulate bot response
      setTimeout(() => {
        const botResponses = [
          "I'm here to help! Can you tell me more about your question?",
          "That's a great question! Let me assist you with that.",
          "I understand. How can I help you further?",
          "Thanks for reaching out! Is there anything else I can help with?",
          "I'm happy to help! Please provide more details.",
          "Let me look into that for you.",
          "Great! I'm ready to assist you with that.",
          "Feel free to ask me anything about your orders or account.",
          "I'm here 24/7 to support you! What else can I help with?",
          "Your satisfaction is our priority. How else can I assist?"
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

  const handleNewChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "Hello! 👋 How can I assist you today? Feel free to ask about your orders, installments, or any other questions.", 
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setIsMinimized(false);
        }}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white shadow-2xl hover:shadow-3xl flex items-center justify-center z-40 hover:scale-110 transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isOpen ? { rotate: 180, scale: 0 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle size={24} />
        </motion.div>
        <motion.div
          animate={isOpen ? { rotate: 0, scale: 1 } : { rotate: 180, scale: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <X size={24} />
        </motion.div>
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
          1
        </div>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`fixed z-40 right-6 bg-white rounded-3xl shadow-2xl border border-blue-100 flex flex-col transition-all duration-300 ${
              isMinimized 
                ? 'bottom-24 w-80 h-16' 
                : 'bottom-24 w-96 h-[600px] lg:w-96 lg:h-[600px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-t-3xl flex items-center justify-between flex-shrink-0">
              <div className="flex-1">
                <motion.h3 
                  className="font-bold text-base"
                  animate={{ opacity: isMinimized ? 0 : 1 }}
                >
                  FlexiBerry Assistant
                </motion.h3>
                <motion.p 
                  className="text-xs opacity-90"
                  animate={{ opacity: isMinimized ? 0 : 1 }}
                >
                  Online • Always ready to help
                </motion.p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Minimize2 size={18} />
                </motion.button>
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50 to-white"
                style={{
                  scrollBehavior: 'smooth',
                }}
              >
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none' 
                          : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-2">{msg.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div 
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>
            )}

            {/* Input Area */}
            {!isMinimized && (
              <div className="p-4 border-t border-slate-200 bg-white rounded-b-3xl flex-shrink-0 space-y-3">
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleNewChat}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={14} /> New Chat
                  </motion.button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={18} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
