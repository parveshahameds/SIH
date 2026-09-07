import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
  Mic,
  Code2,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

interface AIAssistantProps {
  onNavigate: (route: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigate }) => {
  const { messages, isTyping, sendMessage, clearChat } = useAIAssistant();
  const { studentData } = useAuth();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleQuickPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 font-sans">CoopMitra AI • NCCT Cooperative Advisor</h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                Ministry of Cooperation
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Multilingual advisory on PACS computerization, credit management, dairy technology, and board interviews
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          title="Clear Conversation"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              {isUser ? (
                <img
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-300 shrink-0 shadow-xs"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                  isUser
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-800 shadow-xs'
                }`}
              >
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>

                {/* Code Snippet if present */}
                {msg.codeSnippet && (
                  <div className="rounded-xl bg-slate-900 p-3.5 font-mono text-xs text-sky-300 overflow-x-auto border border-slate-800">
                    <pre>{msg.codeSnippet}</pre>
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Suggested Follow-ups:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickPrompt(action)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-indigo-700 border border-slate-200 text-xs font-medium transition-colors text-left"
                        >
                          → {action}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reference Links */}
                {msg.referenceLinks && msg.referenceLinks.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2 text-xs">
                    {msg.referenceLinks.map((ref, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const target = ref.url.replace('/student/', '');
                          onNavigate(target);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 font-semibold transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{ref.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className={`text-[10px] ${isUser ? 'text-indigo-200 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input Area */}
      <div className="p-4 border-t border-slate-200 bg-white space-y-3">
        {/* Quick Question Shortcut Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            'Explain Multi-Head Attention with pizza analogy',
            'Debug PyTorch DataLoader CUDA OOM',
            'Check my placement match score'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPrompt(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-medium whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about your syllabus, PyTorch bugs, or placement roadmap..."
            className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => handleQuickPrompt("How do I compute Softmax gradients manually?")}
            className="p-3 rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Voice Input Mock"
          >
            <Mic className="w-5 h-5" />
          </button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Send}
            disabled={!inputText.trim()}
            className="text-xs font-bold px-5 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
