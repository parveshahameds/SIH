import React from 'react';
import {
  LayoutDashboard,
  Smartphone,
  Bot,
  BookOpen,
  Calendar,
  Clock,
  Briefcase,
  Award,
  Bell,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  Flame,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface StudentSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  currentRoute,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { studentData, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, badge: undefined },
    { id: 'edscroll', name: 'EdScroll', icon: Smartphone, badge: 'Checkpoint' },
    { id: 'ai-assistant', name: 'AI Assistant', icon: Bot, badge: 'Active' },
    { id: 'my-learning', name: 'My Learning', icon: BookOpen, badge: '4' },
    { id: 'timetable', name: 'Timetable', icon: Calendar, badge: 'Live' },
    { id: 'attendance', name: 'Smart Attendance', icon: Clock, badge: '849 201' },
    { id: 'gd', name: 'GD Arena', icon: Users, badge: 'Live' },
    { id: 'career-lab', name: 'Career Lab', icon: Briefcase, badge: 'Interview' },
    { id: 'skill-passport', name: 'Skill Passport', icon: Award, badge: 'Verified' },
    { id: 'notifications', name: 'Notifications', icon: Bell, badge: '2' },
    { id: 'profile', name: 'Profile', icon: User, badge: undefined },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-30 h-screen cyber-glass border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col justify-between ${
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in">
                <span className="text-lg font-bold text-white font-sans tracking-tight">
                  Co<span className="text-cyan-400">Learn</span>
                </span>
                <span className="ml-2 text-[10px] font-bold text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded-full border border-cyan-800 uppercase">
                  Student
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

        {/* Navigation Item List */}
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
                    ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'
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
                            : item.badge === 'Live'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse'
                            : item.badge === 'Checkpoint'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
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

      {/* Footer Profile & Streak Widget */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60">
        {!isCollapsed && (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-950/60 border border-amber-700/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <div>
                <p className="font-bold text-amber-200 leading-none">{studentData.streakDays} Days Streak!</p>
                <p className="text-[10px] text-amber-400 mt-0.5">+150 XP today</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold bg-amber-900 text-amber-200 px-2 py-0.5 rounded-full">
              Lvl {studentData.level}
            </span>
          </div>
        )}

        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2.5 cursor-pointer overflow-hidden group"
          >
            <img
              src={studentData.avatar}
              alt={studentData.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-700 shrink-0"
            />
            {!isCollapsed && (
              <div className="truncate text-left">
                <p className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">
                  {studentData.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">{studentData.batch}</p>
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
