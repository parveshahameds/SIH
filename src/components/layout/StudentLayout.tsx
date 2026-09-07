import React from 'react';
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
  LayoutDashboard,
  LogOut,
  Bell,
  Sparkles,
  Compass,
  ClipboardList,
  Building2
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
  const getActivePillar = (): 'dashboard' | 'college' | 'learning' | 'ai' => {
    if (currentRoute === 'dashboard') {
      return 'dashboard';
    }
    if (['attendance', 'timetable', 'registration', 'hostel'].includes(currentRoute)) {
      return 'college';
    }
    if (['ai-assistant'].includes(currentRoute)) {
      return 'ai';
    }
    return 'learning'; // edscroll, my-learning, jobs, gd, career-lab, skill-passport, notifications, profile
  };

  const activePillar = getActivePillar();

  // Pillar Sub-Navigation items
  const collegeSubItems = [
    { id: 'attendance', label: 'Attendance & Smart Check-in', icon: Clock, badge: 'Active Token' },
    { id: 'timetable', label: 'Schedule & Timetable', icon: Calendar },
    { id: 'registration', label: 'Programme Registration', icon: ClipboardList, badge: 'NEP 2020' },
    { id: 'hostel', label: 'Hostel & Logistics', icon: Building2 }
  ];

  const learningSubItems = [
    { id: 'edscroll', label: 'EdScroll Micro-Feed', icon: Smartphone, badge: 'Reels & Quizzes' },
    { id: 'my-learning', label: 'My Courses & Syllabus', icon: BookOpen },
    { id: 'jobs', label: 'Jobs & Internships', icon: Compass, badge: 'Career' },
    { id: 'gd', label: 'GD Arena (Debates)', icon: Users, badge: 'Live Room' },
    { id: 'career-lab', label: 'AI Career Lab & Interviews', icon: Briefcase },
    { id: 'skill-passport', label: 'Skill Passport & Credits', icon: Award }
  ];

  const aiSubItems = [
    { id: 'ai-assistant', label: '24/7 AI Tutor & Doubt Solver', icon: Bot, badge: 'Interactive' }
  ];

  const currentSubItems =
    activePillar === 'college'
      ? collegeSubItems
      : activePillar === 'ai'
      ? aiSubItems
      : activePillar === 'dashboard'
      ? [
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'jobs', label: 'Jobs & Internships', icon: Compass },
          { id: 'attendance', label: 'Attendance', icon: Clock },
          { id: 'edscroll', label: 'EdScroll', icon: Smartphone },
          { id: 'ai-assistant', label: 'AI Tutor', icon: Bot },
        ]
      : learningSubItems;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Left: Brand Identity & Quick Dashboard */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2.5 cursor-pointer group"
                title="Go to Student Dashboard"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-brand-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-base tracking-tight text-slate-900">
                    Co<span className="text-indigo-600">Learn</span>
                  </span>
                  <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200 uppercase">
                    Student
                  </span>
                </div>
              </div>

              {/* Home / Dashboard Direct Pill */}
              <button
                onClick={() => onNavigate('dashboard')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentRoute === 'dashboard'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Center: The 3 Core Pillars Segment Controller */}
            <nav
              aria-label="Core Pillars"
              className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-xs"
            >
              <button
                onClick={() => onNavigate('attendance')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activePillar === 'college'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>College</span>
              </button>

              <button
                onClick={() => onNavigate('edscroll')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activePillar === 'learning'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Learning</span>
              </button>

              <button
                onClick={() => onNavigate('ai-assistant')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activePillar === 'ai'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Assistant</span>
              </button>
            </nav>

            {/* Right: Profile & Action Strip */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onNavigate('notifications')}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              <div
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-100 transition-all group"
                title="View Profile"
              >
                <img
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-300 group-hover:ring-indigo-500 transition-all"
                />
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                    {studentData.name}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">Roll: {studentData.rollNumber}</p>
                </div>
              </div>

              <button
                onClick={logout}
                title="Log out"
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Sub-Pillar Tab Strip */}
        <div className="bg-white/90 border-t border-slate-200/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto py-2.5 gap-4 no-scrollbar">
              {/* Sub-Pillar Tabs */}
              <div className="flex items-center gap-1.5 shrink-0">
                {currentSubItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                        isCurrent
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-indigo-600' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
        {children}
      </main>

      {/* Clean Minimal Institutional Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>CoLearn Ecosystem • Academic Bank of Credits (ABC) & NEP 2020 Compliant</p>
      </footer>
    </div>
  );
};
