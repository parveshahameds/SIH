import React, { useState } from 'react';
import {
  Search,
  Bot,
  Bell,
  Sparkles,
  Award,
  Menu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/mockData';

interface StudentHeaderProps {
  onNavigate: (route: string) => void;
  onOpenMobileMenu: () => void;
  title?: string;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  onNavigate,
  onOpenMobileMenu,
  title,
}) => {
  const { studentData } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-20 h-18 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile trigger & Page Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 capitalize font-sans">
            {title || 'Student Dashboard'}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            Academic Year 2026-27 • Semester {studentData.semester} • {studentData.department}
          </p>
        </div>
      </div>

      {/* Middle: Quick Search Input */}
      <div className="hidden lg:flex items-center max-w-md w-full mx-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, skills, micro-lessons, concepts... (Ctrl+K)"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-12 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Quick Action Pill & Notifications */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Quick Ask AI button */}
        <button
          onClick={() => onNavigate('ai-assistant')}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200/80 text-xs font-semibold transition-all shadow-2xs group"
        >
          <Bot className="w-4 h-4 text-brand-600 group-hover:scale-110 transition-transform" />
          <span>Ask AI Tutor</span>
        </button>

        {/* Streak Indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold shadow-2xs">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{studentData.streakDays}d</span>
        </div>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 animate-slide-down z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-700">
                    {unreadCount} New
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('notifications');
                  }}
                  className="text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2 space-y-1">
                {mockNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setShowNotifications(false);
                      if (notif.actionUrl) {
                        const target = notif.actionUrl.replace('/student/', '');
                        onNavigate(target);
                      }
                    }}
                    className="py-2.5 px-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0">{notif.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2.5 pl-2 cursor-pointer group"
        >
          <img
            src={studentData.avatar}
            alt={studentData.name}
            className="w-8 h-8 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-brand-400 transition-all"
          />
        </div>
      </div>
    </header>
  );
};
