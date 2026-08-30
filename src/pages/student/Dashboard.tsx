import React from 'react';
import {
  Clock,
  BookOpen,
  Bot,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Flame,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockStudentCourses, mockTimetable, mockLearningGaps } from '../../data/mockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';

interface StudentDashboardProps {
  onNavigate: (route: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { studentData } = useAuth();
  const liveClass = mockTimetable.find(t => t.isLiveNow);
  const activeCourses = mockStudentCourses.filter(c => c.status === 'in-progress');
  const inferredGap = mockLearningGaps[0];

  return (
    <div className="space-y-8 animate-fade-in text-slate-100 max-w-7xl mx-auto">
      {/* 1. Student Identity & Quick Inquiries Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {studentData.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {studentData.institution} • {studentData.department} (Semester {studentData.semester})
          </p>
        </div>

        {/* The 3 Core Question Anchors */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('timetable')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            📅 What do I need to attend today?
          </button>
          <button
            onClick={() => onNavigate('edscroll')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            🎯 What should I learn next?
          </button>
          <button
            onClick={() => onNavigate('ai-assistant')}
            className="px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-xs font-semibold text-indigo-300 transition-colors"
          >
            💡 What should I improve?
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
              <Badge variant="success" size="sm" dot>
                {studentData.attendanceRate}% Safe
              </Badge>
            </div>

            {/* Live Class Prompt */}
            {liveClass ? (
              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold uppercase text-indigo-300">Live Session Now</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Lab 402</span>
                </div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {liveClass.subject}
                </h3>
                <p className="text-xs text-slate-300">
                  {liveClass.instructor} • Token: <strong className="font-mono text-white">849 201</strong>
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  icon={ShieldCheck}
                  onClick={() => onNavigate('attendance')}
                  className="mt-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500"
                >
                  Verify Attendance (4 Checks)
                </Button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                No active lectures right now. Next class at 02:00 PM.
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Semester Attendance:</span>
                <span className="font-bold font-mono text-white">{studentData.attendanceRate}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">At-Risk Subjects:</span>
                <span className="font-bold text-amber-400">1 Subject (ENV201)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>View Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs text-slate-400 hover:text-white font-semibold"
            >
              Records
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
                  2. Learning & Skills
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {studentData.nepCredits.earned}/{studentData.nepCredits.required} Credits
              </span>
            </div>

            {/* Course Progress Snapshot */}
            <div className="space-y-3">
              {activeCourses.slice(0, 2).map((course) => (
                <div key={course.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white truncate max-w-[200px]">{course.title}</span>
                    <span className="font-mono text-indigo-400">{course.progressPercentage}%</span>
                  </div>
                  <ProgressBar value={course.progressPercentage} size="sm" variant="brand" />
                </div>
              ))}
            </div>

            {/* EdScroll Prompt */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white">EdScroll Track</p>
                <p className="text-[11px] text-slate-400">Lesson 5 of 6 (Checkpoint Pending)</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('edscroll')}
                className="text-xs bg-slate-800 text-slate-200"
              >
                Continue
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-xs font-semibold">
            <button
              onClick={() => onNavigate('gd')}
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Users className="w-3.5 h-3.5" />
              <span>GD Arena</span>
            </button>
            <button
              onClick={() => onNavigate('career-lab')}
              className="text-slate-300 hover:text-white"
            >
              Mock Interview
            </button>
            <button
              onClick={() => onNavigate('skill-passport')}
              className="text-slate-400 hover:text-white"
            >
              Passport
            </button>
          </div>
        </div>

        {/* PILLAR 3: AI ASSISTANT */}
        <div className="institutional-card rounded-3xl p-6 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400">
                <Bot className="w-5 h-5" />
                <h2 className="text-base font-bold text-white uppercase tracking-wider text-xs">
                  3. AI Academic Assistant
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                Personalized
              </span>
            </div>

            {/* Inferred Learning Gap Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-950/50 border border-amber-800/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <AlertCircle className="w-4 h-4" />
                <span>Weak Area Diagnostic</span>
              </div>
              <p className="text-xs text-slate-200 font-semibold">
                {inferredGap.topic}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                40.6% quiz difficulty detected. 45-second remedial video ready in EdScroll.
              </p>
            </div>

            {/* Instant AI Question Starters */}
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Ask Your AI Tutor:
              </p>
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 truncate transition-colors"
              >
                💬 "Explain Multi-Head Attention simply"
              </button>
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="w-full text-left p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 truncate transition-colors"
              >
                💬 "How do I fix PyTorch DataLoader OOM?"
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between">
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Open AI Tutor Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
