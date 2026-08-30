import React, { useState } from 'react';
import {
  Search,
  Menu,
  CheckSquare,
  Sparkles,
  AlertOctagon,
  ChevronDown,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockBatches } from '../../data/mockData';

interface TeacherHeaderProps {
  onNavigate: (route: string) => void;
  onOpenMobileMenu: () => void;
  title?: string;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({
  onNavigate,
  onOpenMobileMenu,
  title,
}) => {
  const { teacherData } = useAuth();
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0].id);

  return (
    <header className="sticky top-0 z-20 h-18 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between shadow-xs">
      {/* Left: Mobile trigger & Page Context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label="Open educator navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 capitalize font-sans">
            {title || 'Educator Portal'}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            {teacherData.department} • {teacherData.employeeId}
          </p>
        </div>
      </div>

      {/* Middle: Active Batch Selector */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Batch:</span>
        <div className="relative">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {mockBatches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.totalStudents} Students)
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {/* Right: Quick Action Shortcuts */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Log Attendance Action */}
        <button
          onClick={() => onNavigate('attendance')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 text-xs font-semibold transition-all shadow-2xs group"
        >
          <CheckSquare className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Log Attendance</span>
        </button>

        {/* AI Learning Gaps Alert Button */}
        <button
          onClick={() => onNavigate('learning-gaps')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-semibold transition-all shadow-2xs"
        >
          <AlertOctagon className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="hidden sm:inline">Learning Gaps (3)</span>
        </button>

        {/* Teacher Avatar */}
        <div className="flex items-center gap-2.5 pl-2">
          <img
            src={teacherData.avatar}
            alt={teacherData.name}
            className="w-8 h-8 rounded-xl object-cover ring-2 ring-indigo-200"
          />
        </div>
      </div>
    </header>
  );
};
