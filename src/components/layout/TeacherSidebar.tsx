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
      className={`fixed top-0 left-0 z-30 h-screen bg-white text-slate-800 border-r border-slate-200 shadow-xs transition-all duration-300 ease-in-out flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-18 flex items-center justify-between px-4 border-b border-slate-200">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <span className="text-lg font-bold text-slate-900 font-sans tracking-tight">
                  Co<span className="text-indigo-600">Learn</span>
                </span>
                <span className="ml-2 text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-full border border-purple-200 uppercase">
                  Educator
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden md:block"
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
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'
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
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-600'
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
      <div className="p-3 border-t border-slate-200 bg-slate-50/70">
        {!isCollapsed && (
          <div className="mb-3 p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs">
            <div>
              <p className="text-[10px] text-slate-500">Educator Impact</p>
              <p className="font-bold text-indigo-600">Rating: {teacherData.rating} / 5.0</p>
            </div>
            <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
              {teacherData.totalStudents} Students
            </span>
          </div>
        )}

        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={teacherData.avatar}
              alt={teacherData.name}
              className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-300 shadow-xs shrink-0"
            />
            {!isCollapsed && (
              <div className="truncate text-left">
                <p className="text-xs font-bold text-slate-900 truncate">{teacherData.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{teacherData.designation}</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={logout}
              title="Log out"
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
