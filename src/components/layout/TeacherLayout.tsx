import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Bot,
  Calendar,
  Clock,
  Users,
  Award,
  Layers,
  BarChart3,
  LayoutDashboard,
  LogOut,
  AlertOctagon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TeacherLayoutProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

interface SubNavPillarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const TeacherLayout: React.FC<TeacherLayoutProps> = ({
  currentRoute,
  onNavigate,
  children,
}) => {
  const { teacherData, logout } = useAuth();

  // Determine active pillar based on route
  const getActivePillar = (): 'dashboard' | 'college' | 'learning' | 'ai' => {
    if (currentRoute === 'dashboard') {
      return 'dashboard';
    }
    if (['attendance', 'timetable'].includes(currentRoute)) {
      return 'college';
    }
    if (['learning-gaps'].includes(currentRoute)) {
      return 'ai';
    }
    return 'learning'; // batches, students, courses, assessments, reports
  };

  const activePillar = getActivePillar();

  // Pillar Sub-Navigation items
  const collegeSubItems: SubNavPillarItem[] = [
    { id: 'attendance', label: '6-Digit Code & Live Attendance', icon: Clock, badge: 'Live Key' },
    { id: 'timetable', label: 'Master Schedule & Timetable', icon: Calendar }
  ];

  const learningSubItems: SubNavPillarItem[] = [
    { id: 'batches', label: 'Academic Cohorts (Batches)', icon: Layers },
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'courses', label: 'Course Catalog & Syllabi', icon: BookOpen },
    { id: 'assessments', label: 'Evaluations & Grading', icon: Award },
    { id: 'reports', label: 'Analytics & OBE Dossiers', icon: BarChart3 }
  ];

  const aiSubItems: SubNavPillarItem[] = [
    { id: 'learning-gaps', label: 'Student Learning Gap Telemetry', icon: Bot, badge: 'AI Radar' }
  ];

  const currentSubItems: SubNavPillarItem[] =
    activePillar === 'college'
      ? collegeSubItems
      : activePillar === 'ai'
      ? aiSubItems
      : activePillar === 'dashboard'
      ? [
          { id: 'dashboard', label: 'Faculty Overview', icon: LayoutDashboard },
          { id: 'attendance', label: 'Log Attendance', icon: Clock },
          { id: 'batches', label: 'Batches', icon: Layers },
          { id: 'learning-gaps', label: 'AI Gap Alerts', icon: AlertOctagon },
        ]
      : learningSubItems;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/80 shadow-md shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Left: Brand Identity & Direct Dashboard */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2.5 cursor-pointer group"
                title="Go to Faculty Dashboard"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-base tracking-tight text-white">
                    Co<span className="text-indigo-400">Learn</span>
                  </span>
                  <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold bg-indigo-950/80 text-indigo-300 rounded-md border border-indigo-800/60 uppercase">
                    Faculty
                  </span>
                </div>
              </div>

              {/* Direct Dashboard Link */}
              <button
                onClick={() => onNavigate('dashboard')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentRoute === 'dashboard'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            </div>

            {/* Center: The 3 Core Pillars Segment Controller (Simple & Elegant) */}
            <nav
              aria-label="Faculty Pillars"
              className="flex items-center p-1 bg-slate-950/90 rounded-2xl border border-slate-800/90 shadow-inner"
            >
              <button
                onClick={() => onNavigate('attendance')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activePillar === 'college'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>College</span>
              </button>

              <button
                onClick={() => onNavigate('batches')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activePillar === 'learning'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Learning</span>
              </button>

              <button
                onClick={() => onNavigate('learning-gaps')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activePillar === 'ai'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Assistant</span>
              </button>
            </nav>

            {/* Right: Faculty Identity */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-800/60 transition-all group"
                title="Faculty Profile"
              >
                <img
                  src={teacherData.avatar}
                  alt={teacherData.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500 transition-all"
                />
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors">
                    {teacherData.name}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">{teacherData.designation.split('&')[0]}</p>
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

        {/* Secondary Sub-Pillar Tab Strip (Clean & Elegant) */}
        <div className="bg-slate-950/90 border-t border-slate-800/70 backdrop-blur-md">
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
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-xs'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-800/80 text-indigo-300 border border-indigo-800/60">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Faculty Strategic Inquiries (Quick Actions) */}
              <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  Faculty Inquiries:
                </span>
                <button
                  onClick={() => onNavigate('attendance')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  👥 Who is attending?
                </button>
                <button
                  onClick={() => onNavigate('timetable')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  🏫 My classes today
                </button>
                <button
                  onClick={() => onNavigate('learning-gaps')}
                  className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 text-[11px] text-rose-300 transition-colors"
                >
                  ⚠️ Learning gaps
                </button>
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
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>CoLearn Faculty Console • Outcome-Based Education (OBE) & NAAC/NBA Aligned</p>
      </footer>
    </div>
  );
};
