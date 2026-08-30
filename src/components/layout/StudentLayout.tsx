import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Bot,
  Calendar,
  Clock,
  Briefcase,
  Award,
  Smartphone,
  Users,
  Bell,
  Sparkles,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface StudentLayoutProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({
  currentRoute,
  onNavigate,
  children,
}) => {
  const { studentData, logout } = useAuth();

  // Determine active pillar based on route
  const getActivePillar = (): 'college' | 'learning' | 'ai' => {
    if (['attendance', 'timetable'].includes(currentRoute)) {
      return 'college';
    }
    if (['ai-assistant'].includes(currentRoute)) {
      return 'ai';
    }
    return 'learning'; // edscroll, my-learning, gd, career-lab, skill-passport, dashboard
  };

  const activePillar = getActivePillar();

  // Pillar Sub-Navigation items
  const collegeSubItems = [
    { id: 'attendance', label: 'Attendance & Verification', icon: Clock, badge: 'Smart Check-in' },
    { id: 'timetable', label: 'Schedule & Timetable', icon: Calendar, badge: 'Live Today' }
  ];

  const learningSubItems = [
    { id: 'edscroll', label: 'EdScroll (Reels & Quizzes)', icon: Smartphone, badge: 'Checkpoint' },
    { id: 'my-learning', label: 'Courses & Progress', icon: BookOpen },
    { id: 'gd', label: 'GD Arena (Live Debates)', icon: Users, badge: 'Live' },
    { id: 'career-lab', label: 'AI Mock Interviews', icon: Briefcase },
    { id: 'skill-passport', label: 'Skill Passport & Credits', icon: Award, badge: 'NEP 2020' }
  ];

  const aiSubItems = [
    { id: 'ai-assistant', label: 'AI Doubt Assistant & Planner', icon: Bot, badge: 'Active' }
  ];

  const currentSubItems =
    activePillar === 'college'
      ? collegeSubItems
      : activePillar === 'ai'
      ? aiSubItems
      : learningSubItems;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-base tracking-tight text-white">
                    Co<span className="text-indigo-400">Learn</span>
                  </span>
                  <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 rounded-md border border-slate-700">
                    Student Portal
                  </span>
                </div>
              </div>
            </div>

            {/* Center: The 3 Core Pillars Segment Controller */}
            <div className="flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                onClick={() => onNavigate('attendance')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold pillar-pill ${
                  activePillar === 'college'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>College</span>
              </button>

              <button
                onClick={() => onNavigate('edscroll')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold pillar-pill ${
                  activePillar === 'learning'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Learning</span>
              </button>

              <button
                onClick={() => onNavigate('ai-assistant')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold pillar-pill ${
                  activePillar === 'ai'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Assistant</span>
              </button>
            </div>

            {/* Right: Quick Inquiries & Profile Deck */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <img
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
                />
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-bold text-white leading-tight">{studentData.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Roll: {studentData.rollNumber}</p>
                </div>
              </div>

              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Sub-Pillar Tab Strip */}
        <div className="bg-slate-950/90 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto py-2 gap-3">
              {/* Sub-Pillar Tabs */}
              <div className="flex items-center gap-1.5 shrink-0">
                {currentSubItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        isCurrent
                          ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Student Strategic Inquiries (Quick Questions) */}
              <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Quick Inquiries:
                </span>
                <button
                  onClick={() => onNavigate('timetable')}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  📅 What do I need to attend today?
                </button>
                <button
                  onClick={() => onNavigate('edscroll')}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  🎯 What should I learn next?
                </button>
                <button
                  onClick={() => onNavigate('ai-assistant')}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-indigo-300 transition-colors"
                >
                  💡 What should I improve?
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>CoLearn Ecosystem • Academic Bank of Credits (ABC) & NEP 2020 Compliant</p>
      </footer>
    </div>
  );
};
