'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Minimize2, Plus, Loader } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export const ChatbotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "👋 Hi there! I'm FlexiBerry Assistant. How can I help you today? Feel free to ask about your orders, installments, or any other questions.", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
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
      const newMessage: Message = { 
        id: messages.length + 1, 
        text: inputValue, 
        sender: 'user',
        timestamp 
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsLoading(true);

      // Simulate bot response
      setTimeout(() => {
        const botResponses = [
          "That's a great question! Let me help you with that. 🤔",
          "I understand. Here's what I can do for you: You can check your orders, track installments, and manage your addresses in the dashboard.",
          "Would you like me to help you with your orders or payment plans? 💳",
          "I'm here to assist! You can also reach our support team for more detailed help. 📞",
          "Thanks for asking! Is there anything else I can help you with today? ✨",
          "I'm processing your request. Please give me a moment... ⏳",
          "Great question! Let me guide you through that step by step. 📝",
          "Your satisfaction is our priority. How else can I assist? 😊",
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
        text: "👋 Hi there! I'm FlexiBerry Assistant. How can I help you today? Feel free to ask about your orders, installments, or any other questions.", 
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }
    ]);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="fixed bottom-6 right-6 z-40 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all border border-white/20">
                <MessageCircle size={28} className="text-white" />
              </div>
              {/* Notification Dot */}
              <motion.div
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                1
              </motion.div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`fixed z-50 right-6 bg-white rounded-3xl shadow-2xl border border-blue-100/50 flex flex-col transition-all duration-300 ${
              isMinimized 
                ? 'bottom-24 w-80 h-16' 
                : 'bottom-24 w-full sm:w-96 h-[600px]'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white p-5 rounded-t-3xl flex items-center justify-between flex-shrink-0 shadow-md">
              <div className="flex-1 flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MessageCircle size={20} />
                </motion.div>
                <motion.div
                  animate={{ opacity: isMinimized ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-bold text-base">FlexiBerry Assistant</h3>
                  <p className="text-xs text-blue-100">Always here to help 🎯</p>
                </motion.div>
              </div>
              <div className="flex items-center gap-1">
                <motion.button 
                  onClick={() => handleNewChat()}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="New Chat"
                >
                  <Plus size={18} />
                </motion.button>
                <motion.button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Minimize"
                >
                  <Minimize2 size={18} />
                </motion.button>
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Close"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50 via-white to-slate-50"
                >
                  {messages.map((msg, idx) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-xs`}>
                        <motion.div 
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.sender === 'user' 
                              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-none' 
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          {msg.text}
                        </motion.div>
                        <span className="text-[10px] text-slate-400 mt-1.5 px-2">{msg.timestamp}</span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map(i => (
                            <motion.div 
                              key={i}
                              className="w-2.5 h-2.5 bg-slate-400 rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 border-t border-slate-200 bg-white rounded-b-3xl flex-shrink-0 space-y-3"
                >
                  <div className="flex gap-2">
                    <textarea
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type your message... (Shift+Enter for new line)"
                      disabled={isLoading}
                      rows={1}
                      className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-50 resize-none max-h-20"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
                    </motion.button>
                  </div>
                  <p className="text-xs text-slate-400 text-center">
                    Press <kbd className="px-2 py-0.5 bg-slate-100 rounded text-xs font-semibold">Enter</kbd> to send
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
