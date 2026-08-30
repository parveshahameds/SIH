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
    <div className="h-[calc(100vh-140px)] flex flex-col cyber-glass rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-fade-in text-slate-100 glow-violet">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white font-sans">CoLearn AI Academic Tutor</h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                NEP 2020 Context Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Personalized to your active syllabus, quiz checkpoints, and skill passport telemetry
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          title="Clear Conversation"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-950/40">
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
                  className="w-8 h-8 rounded-xl object-cover ring-2 ring-cyan-500/50 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                  isUser
                    ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-md'
                    : 'cyber-glass border border-slate-800 text-slate-200 shadow-xl'
                }`}
              >
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>

                {/* Code Snippet if present */}
                {msg.codeSnippet && (
                  <div className="rounded-xl bg-slate-950 p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800">
                    <pre>{msg.codeSnippet}</pre>
                  </div>
                )}

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Suggested Follow-ups:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickPrompt(action)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-medium transition-colors text-left"
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
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 hover:bg-cyan-900 border border-cyan-800 font-semibold transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{ref.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className={`text-[10px] ${isUser ? 'text-slate-200 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-600 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="cyber-glass border border-slate-800 rounded-2xl px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/90 space-y-3">
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
              className="px-2.5 py-1 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium whitespace-nowrap transition-colors"
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about your syllabus, PyTorch bugs, or placement roadmap..."
            className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            type="button"
            onClick={() => handleQuickPrompt("How do I compute Softmax gradients manually?")}
            className="p-3 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800"
            title="Voice Input Mock"
          >
            <Mic className="w-5 h-5" />
          </button>

          <Button
            type="submit"
            variant="glow"
            size="md"
            icon={Send}
            disabled={!inputText.trim()}
            className="text-xs font-bold px-5"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
