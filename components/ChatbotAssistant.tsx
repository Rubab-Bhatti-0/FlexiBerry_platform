'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

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
      text: "Hello there! 👋 It's nice to meet you!", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    },
    { 
      id: 2, 
      text: "What brings you here today? Please use the navigation below or ask me anything about ChatBot product. 🚀", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: "🤖 Build AI chatbot", id: "build" },
    { label: "📚 Using ChatBot", id: "using" },
    { label: "❓ I have questions", id: "questions" },
    { label: "👀 Just browsing", id: "browsing" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickAction = (actionId: string) => {
    const actionMessages: Record<string, string> = {
      build: "Great! I can help you build an AI chatbot. Let me guide you through the process...",
      using: "Perfect! Here are some tips on using ChatBot effectively...",
      questions: "I'm happy to answer your questions! What would you like to know? 😊",
      browsing: "No problem! Feel free to explore and ask me anything when you need help. 👋"
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
          "That's a great question! Let me help you with that. 🤔",
          "I understand. Here's what I can do for you...",
          "Would you like more information about this? 💡",
          "I'm here to assist! Is there anything else? 📞",
          "Thanks for asking! Let me provide more details... ✨",
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
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all border border-white/20">
                <MessageCircle size={28} className="text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <MessageCircle size={24} className="text-white" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">ChatBot</h3>
                  <p className="text-sm text-slate-400">Online</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-slate-400" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#f4f7f9] min-h-[350px] max-h-[500px]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageCircle size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                    }`}
                  >
                    <p className="break-words font-medium">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-start gap-2"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle size={14} className="text-white" />
                  </div>
                  <div className="bg-white text-slate-700 px-5 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Actions - Always visible after initial messages */}
              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-10 space-y-2 pt-2"
                >
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleQuickAction(action.id)}
                      className="w-full px-5 py-2.5 border-2 border-blue-500 text-blue-600 rounded-full text-sm font-bold hover:bg-blue-50 transition-all text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-slate-100 bg-white">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here"
                  disabled={isLoading}
                  className="w-full pl-5 pr-14 py-3.5 border border-slate-200 rounded-full text-[15px] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-50 font-medium"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 p-2.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={20} className="transform rotate-45 -translate-y-0.5 translate-x-0.5" />
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-white border-t border-slate-50 text-center">
              <p className="text-[13px] text-slate-400">Powered by <span className="text-blue-600 font-bold">ChatBot</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
