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
  LogOut
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
  const getActivePillar = (): 'college' | 'learning' | 'ai' => {
    if (['attendance', 'timetable'].includes(currentRoute)) {
      return 'college';
    }
    if (['learning-gaps'].includes(currentRoute)) {
      return 'ai';
    }
    return 'learning'; // batches, students, courses, assessments, reports, dashboard
  };

  const activePillar = getActivePillar();

  // Pillar Sub-Navigation items
  const collegeSubItems: SubNavPillarItem[] = [
    { id: 'attendance', label: '6-Digit Code & Live Roster', icon: Clock, badge: 'Live Key' },
    { id: 'timetable', label: 'Master Schedule & Booking', icon: Calendar }
  ];

  const learningSubItems: SubNavPillarItem[] = [
    { id: 'batches', label: 'Academic Cohorts (Batches)', icon: Layers },
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'courses', label: 'Course Catalog & Curriculum', icon: BookOpen },
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
                  <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-indigo-950 text-indigo-300 rounded-md border border-indigo-800">
                    Faculty Portal
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
                onClick={() => onNavigate('batches')}
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
                onClick={() => onNavigate('learning-gaps')}
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

            {/* Right: Faculty Identity */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <img
                  src={teacherData.avatar}
                  alt={teacherData.name}
                  className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
                />
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-bold text-white leading-tight">{teacherData.name}</p>
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
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300 border border-indigo-800">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Faculty Strategic Inquiries (Quick Questions) */}
              <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Faculty Inquiries:
                </span>
                <button
                  onClick={() => onNavigate('attendance')}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  👥 Who is attending?
                </button>
                <button
                  onClick={() => onNavigate('timetable')}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 transition-colors"
                >
                  🏫 What is happening in my classes?
                </button>
                <button
                  onClick={() => onNavigate('learning-gaps')}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-rose-300 transition-colors"
                >
                  ⚠️ What are students struggling with?
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
        <p>CoLearn Faculty Console • NAAC & NBA Continuous Outcome Attainment Enabled</p>
      </footer>
    </div>
  );
};
