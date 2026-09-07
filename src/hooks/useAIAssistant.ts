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
      content: "Namaste Rajesh! I am **CoopMitra AI**, your 24/7 Cooperative Education & Career Advisor under the **National Council for Cooperative Training (NCCT)** and Ministry of Cooperation. How can I assist your training journey today? I can explain PACS ERP workflows, dairy quality testing protocols, Kisan Credit Card rules, or help prepare for cooperative recruitment boards.",
      timestamp: 'Just now',
      suggestedActions: [
        'Explain PACS Statutory Reserve 25% allocation rules',
        'How does Kisan Credit Card 3% prompt repayment rebate work?',
        'What is the standard protocol for BMC Milk Chilling at 4°C?',
        'Analyze my Skill Passport match for PACS Secretary opening'
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

    setTimeout(() => {
      let aiResponse: Message;
      const lower = userText.toLowerCase();

      if (lower.includes('reserve') || lower.includes('pacs') || lower.includes('bye-law') || lower.includes('accounting') || lower.includes('double entry')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: "### PACS Statutory Reserve & Day-Book Guidelines\n\nUnder standard State Cooperative Societies Acts and NCCT Model Bye-Laws:\n\n1. **Statutory Reserve Fund**: Every cooperative society must transfer **at least 25% of its annual net profit** to the Statutory Reserve Fund *before* declaring any dividend to members.\n2. **Indivisible Reserve**: This fund belongs to the society as an ongoing institution and cannot be divided among individual shareholders.\n3. **Daily Day-Book Balancing**: Total cash receipts minus total disbursements must balance against physical cash in safe before night settlement to the DCCB core banking node.",
          codeSnippet: `// Standard Daily Cash Balance Audit:
Closing_Cash_In_Safe = Opening_Cash + Total_Daily_Receipts - Total_Daily_Disbursements;
Statutory_Reserve_Transfer = Net_Profit * 0.25; // Mandated minimum 25%`,
          suggestedActions: [
            'Test my understanding with a 3-question quiz',
            'Explain Multi-purpose PACS business activities (CSCs, Dawai shops)'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          referenceLinks: [
            { title: 'COOP-102 Course: PACS Accounting & Audit', url: '/student/my-learning' },
            { title: 'EdScroll Reel #5: Double Entry Day-Book', url: '/student/edscroll' }
          ]
        };
      } else if (lower.includes('dairy') || lower.includes('milk') || lower.includes('bmc') || lower.includes('chilling') || lower.includes('somatic')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: "### Dairy Cold-Chain & Quality Control Protocols\n\n1. **4°C Chilling Mandate**: Raw milk must be chilled to **4°C or below within 3 hours of milking** in a Bulk Milk Cooler (BMC). This halts bacterial multiplication and prevents lactic acid souring.\n2. **Adulteration Detection**: Daily tests at the village DCS include Gerber Fat Testing, Lactometer SNF test, Starch (Iodine test), and Urea (DMAB reagent).\n3. **Somatic Cell Count (SCC)**: High SCC (>300,000 cells/ml) indicates sub-clinical bovine mastitis, requiring rapid segregation and teat-dip hygiene intervention.",
          suggestedActions: [
            'Show Milk Fat & SNF calculation formula',
            'Explain Automatic Milk Collection Unit (AMCU) setup'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          referenceLinks: [
            { title: 'DAIRY-402: Milk Quality & Cold Chain', url: '/student/my-learning' }
          ]
        };
      } else if (lower.includes('kcc') || lower.includes('interest') || lower.includes('credit') || lower.includes('subvention') || lower.includes('loan')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: "### Kisan Credit Card (KCC) Interest Subvention Breakdown\n\nFor short-term crop loans up to **₹3,00,000**:\n\n• **Standard Benchmark Interest Rate**: 9% per annum\n• **Central Government Subvention**: -2.0%\n• **Base Applicable Rate**: 7.0%\n• **Prompt Repayment Incentive (PRI)**: -3.0% (for farmers who repay on or before due date)\n• **Effective Net Interest Paid by Farmer**: **4.0% per annum**",
          suggestedActions: [
            'Calculate Scale of Finance for 5-acre paddy crop',
            'How to handle overdue crop loans (NPA provisioning)'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          referenceLinks: [
            { title: 'FIN-203: Credit Management & Recovery', url: '/student/my-learning' },
            { title: 'EdScroll Reel #3: KCC Subvention Math', url: '/student/edscroll' }
          ]
        };
      } else if (lower.includes('career') || lower.includes('job') || lower.includes('match') || lower.includes('pacs secretary')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: "### Cooperative Sector Career Readiness Assessment\n\nBased on your **NCCT Skill Passport**:\n\n• **Top Match**: *PACS Secretary & Business Manager* (**94% Match Score**)\n• **Verified Competencies**: PACS National ERP, Double-Entry Bookkeeping, Model Bye-Laws, Gram Sabha Public Communication.\n\n**Missing Skill to close the 6% gap:**\n• *WDRA Warehouse E-Receipt Trading* (Module AGRI-304).\n\nWould you like to start the 10-minute mock interview for the Cooperative Service Examination Board?",
          suggestedActions: [
            'Open AI Cooperative Mock Interview',
            'View PACS Secretary Job Specs & Apply'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          referenceLinks: [
            { title: 'Explore Job Opportunities', url: '/student/jobs' },
            { title: 'Open AI Career Lab', url: '/student/career-lab' }
          ]
        };
      } else {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'assistant',
          content: `I analyzed your query: "${userText}". In the NCCT Cooperative Training Framework, this directly connects with rural institution building, governance transparency, and farmer-producer welfare. Let's break this down into actionable learning steps!`,
          suggestedActions: [
            'Explain theoretical principles',
            'Show practical village society case study',
            'Generate a quick 3-question diagnostic'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 700);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg_welcome_fresh',
        sender: 'assistant',
        content: "Chat cleared! Ask CoopMitra AI any question on cooperative bye-laws, credit calculations, dairy testing, or career opportunities.",
        timestamp: 'Just now',
        suggestedActions: [
          'PACS Computerization ERP rules',
          'KCC Interest Subvention formula',
          'Dairy 4°C BMC chilling protocols'
        ]
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
