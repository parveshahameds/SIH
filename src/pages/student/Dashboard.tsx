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
  AlertCircle,
  Camera,
  Check,
  Building2,
  Briefcase,
  Lightbulb,
  QrCode,
  Laptop
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

  const traineeJourneySteps = [
    { step: 1, title: 'Profile & Face Enrolment', route: 'profile', icon: Camera, status: 'completed' },
    { step: 2, title: 'ERP Nomination', route: 'registration', icon: Building2, status: 'completed' },
    { step: 3, title: 'Biometric Attendance', route: 'attendance', icon: Clock, status: 'active' },
    { step: 4, title: '7-Sector LMS', route: 'my-learning', icon: BookOpen, status: 'in-progress' },
    { step: 5, title: 'Interactive Quiz', route: 'my-learning', icon: Award, status: 'in-progress' },
    { step: 6, title: 'AI Gap Detection', route: 'ai-assistant', icon: Lightbulb, status: 'in-progress' },
    { step: 7, title: 'Skill Passport', route: 'skill-passport', icon: ShieldCheck, status: 'verified' },
    { step: 8, title: 'Job Matching & Skills Gap', route: 'jobs', icon: Briefcase, status: 'ready' },
    { step: 9, title: 'Career Roadmap', route: 'career-lab', icon: Sparkles, status: 'ready' }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-900 max-w-7xl mx-auto pb-12">
      {/* 1. NCCT Trainee Identity Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {studentData.name}
            </h1>
            <Badge variant="success" size="sm" dot className="bg-emerald-50 text-emerald-700 border-emerald-200">
              Face Biometrics Registered
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <strong>{studentData.institution}</strong> • {studentData.trainingCentre} ({studentData.programmeName})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('skill-passport')}
            className="text-xs font-bold text-slate-700 border-slate-300 bg-white"
          >
            Skill Passport (DID)
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('jobs')}
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
          >
            Cooperative Job Match
          </Button>
        </div>
      </div>

      {/* 2. COMPLETE END-TO-END TRAINEE JOURNEY BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-lg border border-indigo-900/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h2 className="text-sm sm:text-base font-extrabold text-white">
              End-to-End NCCT Trainee Pathway (Live Demo Journey)
            </h2>
          </div>
          <span className="text-[11px] text-cyan-300 font-semibold">
            Click any node to test the connected ecosystem
          </span>
        </div>

        {/* Stepper Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
          {traineeJourneySteps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                onClick={() => onNavigate(s.route)}
                className="group p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer flex flex-col items-center text-center justify-between gap-1.5"
                title={`Go to ${s.title}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[9px] font-mono font-bold text-slate-400">0{s.step}</span>
                  {s.status === 'completed' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  {s.status === 'active' && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
                  {s.status === 'verified' && <ShieldCheck className="w-3 h-3 text-cyan-300" />}
                </div>

                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>

                <p className="text-[10px] font-bold text-slate-200 leading-tight line-clamp-2">
                  {s.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. THE THREE PILLARS OVERVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PILLAR 1: COLLEGE & SMART ATTENDANCE */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <Clock className="w-5 h-5" />
                <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  1. Biometric ERP & Attendance
                </h2>
              </div>
              <Badge variant="success" size="sm" dot className="bg-emerald-50 text-emerald-700 border-emerald-200">
                {studentData.attendanceRate}% Attendance
              </Badge>
            </div>

            {/* Live Class Prompt */}
            {liveClass ? (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold uppercase text-indigo-700">Live Lecture Session</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">Hall 1</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {liveClass.subject}
                </h3>
                <p className="text-xs text-slate-600">
                  {liveClass.instructor} • Code: <strong className="font-mono text-indigo-700 font-bold">NCCT-8492</strong>
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  icon={Camera}
                  onClick={() => onNavigate('attendance')}
                  className="mt-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Face Biometric Check-in (Touchless)
                </Button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
                Next scheduled session at 11:00 AM (PACS ERP Lab).
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Overall Attendance:</span>
                <span className="font-bold font-mono text-slate-900">{studentData.attendanceRate}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Hostel Allocation:</span>
                <span className="font-bold text-slate-900">Block B - Room 204</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => onNavigate('timetable')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              <span>Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('hostel')}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Hostel ERP
            </button>
          </div>
        </div>

        {/* PILLAR 2: 7-SECTOR LMS & QUIZZES */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <BookOpen className="w-5 h-5" />
                <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  2. 7-Sector LMS & Quizzes
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {studentData.nepCredits.earned}/{studentData.nepCredits.required} Credits
              </span>
            </div>

            {/* Course Progress Snapshot */}
            <div className="space-y-3">
              {activeCourses.slice(0, 2).map((course) => (
                <div key={course.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900 truncate max-w-[200px]">{course.title}</span>
                    <span className="font-mono text-indigo-600 font-bold">{course.progressPercentage}%</span>
                  </div>
                  <ProgressBar value={course.progressPercentage} size="sm" variant="brand" />
                </div>
              ))}
            </div>

            {/* EdScroll Prompt */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">EdScroll Reel #5</p>
                <p className="text-[11px] text-slate-500">Cooperative Day-Book Balancing</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('edscroll')}
                className="text-xs bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              >
                Watch
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-semibold">
            <button
              onClick={() => onNavigate('my-learning')}
              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>All 20 Courses</span>
            </button>
            <button
              onClick={() => onNavigate('skill-passport')}
              className="text-slate-600 hover:text-slate-900"
            >
              Passport
            </button>
          </div>
        </div>

        {/* PILLAR 3: AI LEARNING-GAP ENGINE & ASSISTANT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600">
                <Bot className="w-5 h-5" />
                <h2 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
                  3. AI Learning-Gap Engine
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Diagnostic
              </span>
            </div>

            {/* Inferred Learning Gap Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Concept Weakness Detected</span>
              </div>
              <p className="text-xs text-amber-950 font-bold">
                {inferredGap.topic}
              </p>
              <p className="text-[11px] text-amber-800/90 leading-relaxed">
                31.8% class difficulty detected. 12-minute interactive simulation ready.
              </p>
            </div>

            {/* Instant AI Question Starters */}
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Ask CoopMitra AI Assistant:
              </p>
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 truncate transition-colors flex items-center gap-2"
              >
                <span className="text-indigo-600 font-mono font-bold">Q:</span>
                <span>Explain PACS Statutory Reserve 25% allocation rules</span>
              </button>
              <button
                onClick={() => onNavigate('ai-assistant')}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 truncate transition-colors flex items-center gap-2"
              >
                <span className="text-indigo-600 font-mono font-bold">Q:</span>
                <span>How is KCC Prompt Repayment 3% rebate calculated?</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-between">
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              <span>Open CoopMitra AI Chatbot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
