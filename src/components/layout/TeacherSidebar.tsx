import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  CheckSquare,
  AlertOctagon,
  BookOpen,
  FileCheck2,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockLearningGaps } from '../../data/mockData';

interface TeacherSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({
  currentRoute,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { teacherData, logout } = useAuth();
  const activeGapsCount = mockLearningGaps.filter(g => g.status === 'flagged').length;

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, badge: undefined },
    { id: 'batches', name: 'Batches', icon: Users, badge: `${teacherData.batches.length}` },
    { id: 'students', name: 'Students', icon: GraduationCap, badge: `${teacherData.totalStudents}` },
    { id: 'timetable', name: 'Timetable', icon: Calendar, badge: 'Today' },
    { id: 'attendance', name: 'Attendance', icon: CheckSquare, badge: 'Log' },
    { id: 'learning-gaps', name: 'Learning Gaps', icon: AlertOctagon, badge: `${activeGapsCount} AI Alert` },
    { id: 'courses', name: 'Courses', icon: BookOpen, badge: `${teacherData.subjects.length}` },
    { id: 'assessments', name: 'Assessments', icon: FileCheck2, badge: '2 Pending' },
    { id: 'reports', name: 'Reports', icon: BarChart3, badge: 'Analytics' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-18 flex items-center justify-between px-4 border-b border-slate-800">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <span className="text-lg font-bold text-white font-sans tracking-tight">
                  Co<span className="text-sky-400">Learn</span>
                </span>
                <span className="ml-2 text-[10px] font-bold text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded-full border border-sky-800/60 uppercase">
                  Educator
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden md:block"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={isCollapsed ? item.name : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-brand-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'
                  }`}
                />
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 truncate animate-fade-in">
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badge.includes('AI')
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Educator Rating Widget */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        {!isCollapsed && (
          <div className="mb-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
            <div>
              <p className="text-[10px] text-slate-400">Educator Impact</p>
              <p className="font-bold text-sky-400">★ {teacherData.rating} / 5.0</p>
            </div>
            <span className="text-[10px] text-slate-300 bg-slate-700/80 px-2 py-0.5 rounded-full">
              {teacherData.totalStudents} Students
            </span>
          </div>
        )}

        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={teacherData.avatar}
              alt={teacherData.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-700 shadow-xs shrink-0"
            />
            {!isCollapsed && (
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white truncate">{teacherData.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{teacherData.designation}</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={logout}
              title="Log out"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
