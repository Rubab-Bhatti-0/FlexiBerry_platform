'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, HelpCircle, MessageSquare, Zap } from "lucide-react";

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
                className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full border-2 border-white"
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
            className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">ChatBot</h3>
                  <p className="text-xs text-slate-500">Online</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} className="text-slate-600" />
              </motion.button>
            </div>

            {/* Divider */}
            <div className="h-1 bg-gradient-to-r from-slate-100 to-slate-200" />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
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
                  <div className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-slate-400 rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-3 bg-slate-50 border-t border-slate-200 space-y-2"
              >
                {quickActions.map((action, idx) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleQuickAction(action.id)}
                    className="w-full px-4 py-2.5 border-2 border-blue-500 text-blue-600 rounded-full text-sm font-semibold hover:bg-blue-50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-slate-200 bg-white flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-full text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-slate-50"
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500">Powered by <span className="text-blue-600 font-semibold">ChatBot</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
