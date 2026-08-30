import { useState } from 'react';

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  codeSnippet?: string;
  suggestedActions?: string[];
  referenceLinks?: { title: string; url: string }[];
}

export const useAIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      content: "Hello Ananya! 👋 I'm your CoLearn AI Tutor & Career Advisor. How can I assist you today? I can explain challenging concepts, debug code, analyze your learning gaps, or help prep for interviews.",
      timestamp: 'Just now',
      suggestedActions: [
        'Explain Multi-Head Self-Attention with a real-world analogy',
        'Debug my PyTorch DataLoader GPU OOM error',
        'Review my readiness for AI/ML Research Internships',
        'Summarize today\'s Distributed Systems lecture'
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking and contextual response
    setTimeout(() => {
      let aiResponse: Message;

      const lower = userText.toLowerCase();
      if (lower.includes('attention') || lower.includes('transformer') || lower.includes('deep learning')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: "Great question! Let's break down **Multi-Head Self-Attention**:\n\nImagine you are reading a mystery novel. When you encounter the word *'he'*, your brain simultaneously checks:\n1. **Syntactic relationship**: Which noun was mentioned 3 words ago?\n2. **Semantic context**: Who holds the weapon in this chapter?\n3. **Tone**: Is the tone tense or reflective?\n\nA single attention head might focus only on syntax. By having multiple heads (e.g., 8 or 16), each head projects Q, K, V into different subspace representations, allowing the model to attend to information from different representation subspaces simultaneously.",
          codeSnippet: `# PyTorch Multihead Attention Example
import torch.nn as nn
multihead_attn = nn.MultiheadAttention(embed_dim=512, num_heads=8, batch_first=True)
attn_output, attn_weights = multihead_attn(query, key, value)`,
          suggestedActions: ['Show mathematical derivation of Softmax(QK^T / sqrt(d_k))', 'Create a 3-question mini quiz on this'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          referenceLinks: [
            { title: 'CS602 Lecture 4 Slides: Transformers', url: '/student/my-learning' },
            { title: 'EdScroll #01: Attention Complexity', url: '/student/edscroll' }
          ]
        };
      } else if (lower.includes('career') || lower.includes('resume') || lower.includes('job') || lower.includes('interview')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: "Based on your current **Skill Passport**, your technical profile has a **94% match** for NeuralScale Technologies' AI/ML Intern position. \n\n**Key Strengths Detected:**\n• Verified PyTorch & CNN credential (Score: 94%)\n• High CGPA (8.94) in core CS\n\n**Recommendation to boost to 100%:**\n• Review Triton GPU Kernel basics in Career Lab before applying.",
          suggestedActions: ['Open AI Resume Scorer', 'Start 10-minute Mock AI Interview'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          referenceLinks: [{ title: 'Explore NeuralScale Job Spec', url: '/student/career-lab' }]
        };
      } else {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: `I analyzed your query regarding "${userText}". In CoLearn's NEP-aligned knowledge graph, this connects directly to your current semester learning goals. Let's explore step-by-step or test your understanding with a diagnostic drill!`,
          suggestedActions: ['Break this into foundational steps', 'Show practice problem', 'Summarize key takeaways'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 900);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg_welcome_fresh',
        sender: 'assistant',
        content: "Chat cleared! How can I assist your learning or teaching goals right now?",
        timestamp: 'Just now',
        suggestedActions: ['Explain a topic', 'Help me prep an assignment', 'Review attendance stats']
      }
    ]);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat
  };
};
