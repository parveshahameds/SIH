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
    <div className="space-y-8 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* 1. Faculty Identity & Quick Inquiries Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Faculty Console: {teacherData.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {teacherData.institution} • {teacherData.department} • {teacherData.employeeId}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('attendance')}
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
          >
            Start Attendance Session
          </Button>
        </div>
      </div>

      {/* 2. THE THREE PILLARS OVERVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PILLAR 1: COLLEGE */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <Clock className="w-5 h-5" />
                <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  1. College & Attendance
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 text-rose-500 animate-pulse" /> Live Key
              </span>
            </div>

            {/* Active Attendance Session Banner */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
              <p className="text-[10px] uppercase font-bold text-indigo-700">
                Active Code for CS602 (Lab 402):
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-extrabold text-slate-900 tracking-widest">
                  {mockSmartAttendanceSession.code}
                </span>
                <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  {mockSmartAttendanceSession.verifiedCount}/{mockSmartAttendanceSession.totalEnrolled} In Lab
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Enforcing: GPS (15m) • Wi-Fi • Face Scan
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Next Scheduled Class:</span>
                <span className="font-bold text-slate-900">02:00 PM (CS601)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Classroom Booking:</span>
                <span className="font-bold text-slate-700">LH-102 (Confirmed)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              <span>Manage Live Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Timetable
            </button>
          </div>
        </div>

        {/* PILLAR 2: LEARNING */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <BookOpen className="w-5 h-5" />
                <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  2. Learning & Cohorts
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {teacherData.totalStudents} Students
              </span>
            </div>

            {/* Batches Snapshot */}
            <div className="space-y-2.5">
              {mockBatches.slice(0, 2).map((b) => (
                <div key={b.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900 truncate">{b.name}</span>
                    <span className="font-mono text-emerald-700 font-bold">{b.averageAttendance}% Attn</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>{b.totalStudents} Enrolled</span>
                    <span>Avg GPA: {b.averageGpa}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">Curriculum & Grading</p>
                <p className="text-[11px] text-slate-500">12 Pending Mid-Term Submissions</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('assessments')}
                className="text-xs bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              >
                Grade
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-semibold">
            <button
              onClick={() => onNavigate('batches')}
              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Batches</span>
            </button>
            <button
              onClick={() => onNavigate('students')}
              className="text-slate-600 hover:text-slate-900"
            >
              Directory
            </button>
            <button
              onClick={() => onNavigate('reports')}
              className="text-slate-600 hover:text-slate-900"
            >
              OBE Dossier
            </button>
          </div>
        </div>

        {/* PILLAR 3: AI ASSISTANT & LEARNING GAP TELEMETRY */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <Bot className="w-5 h-5" />
                <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  3. AI Gap Intelligence
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Anomaly Detected
              </span>
            </div>

            {/* Aggregated Topic Learning Gap */}
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-800 uppercase text-[10px]">Critical Failure Topic</span>
                <span className="font-mono text-rose-700 font-bold">{topGap.failureRatePercentage}% Failed</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-rose-950 leading-snug">
                {topGap.topic}
              </h3>
              <p className="text-[11px] text-rose-800/90 leading-relaxed">
                Anonymous question clustering indicates 26 of 64 students have confusion regarding backprop derivations.
              </p>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                onClick={() => onNavigate('learning-gaps')}
                className="mt-1 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white"
              >
                Inspect Drill-Down & Dispatch Remedial
              </Button>
            </div>

            <p className="text-[11px] text-slate-500">
              Aggregating student queries across 3 courses into anonymized syllabus telemetry.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => onNavigate('learning-gaps')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
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
