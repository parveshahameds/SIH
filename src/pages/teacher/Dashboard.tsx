import React from 'react';
import {
  Clock,
  BookOpen,
  Bot,
  Calendar,
  Users,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Sparkles,
  Radio,
  FileCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockBatches, mockLearningGaps, mockTeacherStudents, mockSmartAttendanceSession } from '../../data/mockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface TeacherDashboardProps {
  onNavigate: (route: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const { teacherData } = useAuth();
  const topGap = mockLearningGaps[0];

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 max-w-7xl mx-auto">
      {/* 1. Faculty Identity & Quick Inquiries Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Faculty Console: {teacherData.name}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {teacherData.institution} • {teacherData.department} • {teacherData.employeeId}
          </p>
        </div>

        {/* The 3 Core Question Anchors */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('attendance')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            👥 Who is attending?
          </button>
          <button
            onClick={() => onNavigate('timetable')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            🏫 What is happening in my classes?
          </button>
          <button
            onClick={() => onNavigate('learning-gaps')}
            className="px-3 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-800 text-xs font-semibold text-rose-300 transition-colors"
          >
            ⚠️ What are students struggling with?
          </button>
        </div>
      </div>

      {/* 2. THE THREE PILLARS OVERVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PILLAR 1: COLLEGE */}
        <div className="institutional-card rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400">
                <Clock className="w-5 h-5" />
                <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">
                  1. College & Attendance
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 text-rose-500 animate-pulse" /> Live Key
              </span>
            </div>

            {/* Active Attendance Session Banner */}
            <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/80 space-y-2">
              <p className="text-[10px] uppercase font-bold text-indigo-300">
                Active Code for CS602 (Lab 402):
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-white tracking-widest">
                  {mockSmartAttendanceSession.code}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {mockSmartAttendanceSession.verifiedCount}/{mockSmartAttendanceSession.totalEnrolled} In Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Enforcing: GPS (15m) • Wi-Fi • Face Scan
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Next Scheduled Class:</span>
                <span className="font-bold text-white">02:00 PM (CS601)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Classroom Booking:</span>
                <span className="font-bold text-slate-200">LH-102 (Confirmed)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Manage Live Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs text-slate-400 hover:text-white font-semibold"
            >
              Timetable
            </button>
          </div>
        </div>

        {/* PILLAR 2: LEARNING */}
        <div className="institutional-card rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400">
                <BookOpen className="w-5 h-5" />
                <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">
                  2. Learning & Cohorts
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {teacherData.totalStudents} Students
              </span>
            </div>

            {/* Batches Snapshot */}
            <div className="space-y-2.5">
              {mockBatches.slice(0, 2).map((b) => (
                <div key={b.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white truncate">{b.name}</span>
                    <span className="font-mono text-emerald-400">{b.averageAttendance}% Attn</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>{b.totalStudents} Enrolled</span>
                    <span>Avg GPA: {b.averageGpa}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white">Curriculum & Grading</p>
                <p className="text-[11px] text-slate-400">12 Pending Mid-Term Submissions</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('assessments')}
                className="text-xs bg-slate-800 text-slate-200"
              >
                Grade
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-semibold">
            <button
              onClick={() => onNavigate('batches')}
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Batches</span>
            </button>
            <button
              onClick={() => onNavigate('students')}
              className="text-slate-300 hover:text-white"
            >
              Directory
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className="text-slate-400 hover:text-white"
            >
              OBE Dossier
            </button>
          </div>
        </div>

        {/* PILLAR 3: AI ASSISTANT & LEARNING GAP TELEMETRY */}
        <div className="institutional-card rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400">
                <Bot className="w-5 h-5" />
                <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">
                  3. AI Gap Intelligence
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase text-rose-400 bg-rose-950 px-2 py-0.5 rounded-full border border-rose-800">
                Anomaly Detected
              </span>
            </div>

            {/* Aggregated Topic Learning Gap */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-300 uppercase text-[10px]">Critical Failure Topic</span>
                <span className="font-mono text-rose-400 font-bold">{topGap.failureRatePercentage}% Failed</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                {topGap.topic}
              </h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Anonymous question clustering indicates 26 of 64 students have confusion regarding backprop derivations.
              </p>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => onNavigate('learning-gaps')}
                className="mt-1 text-xs font-bold bg-rose-600 hover:bg-rose-500"
              >
                Inspect Drill-Down & Dispatch Remedial
              </Button>
            </div>

            <p className="text-[11px] text-slate-400">
              Aggregating student queries across 3 courses into anonymized syllabus telemetry.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => onNavigate('learning-gaps')}
              className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View Full Gap Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
