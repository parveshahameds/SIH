import React, { useState } from 'react';
import {
  Sparkles,
  GraduationCap,
  Users,
  ArrowRight,
  Brain,
  Smartphone,
  Award,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Zap,
  Play,
  Flame,
  Check
} from 'lucide-react';
import { LandingNavbar } from '../../components/layout/LandingNavbar';
import { LandingFooter } from '../../components/layout/LandingFooter';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<'student' | 'teacher'>('student');
  const [activeQuizSelected, setActiveQuizSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-brand-500 selection:text-white">
      <LandingNavbar onNavigate={onNavigate} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-white via-brand-50/30 to-slate-50">
        {/* Decorative Background Blur Circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-brand-400/15 blur-3xl" />
          <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-sky-400/15 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold shadow-xs animate-fade-in">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Smart India Hackathon 2026 Initiative</span>
              <span className="w-1 h-1 rounded-full bg-brand-400" />
              <span className="text-brand-900 font-bold">NEP 2020 Aligned</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              The AI-Enabled Learning, Mentorship &{' '}
              <span className="text-gradient">Employment Ecosystem</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Bridging classroom education and real-world employment with bite-sized vertical EdScroll learning, conversational 24/7 AI tutoring, automated teacher gap diagnostics, and verifiable skill passports.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="glow"
                size="lg"
                icon={GraduationCap}
                onClick={() => onNavigate('/login/student')}
                className="w-full sm:w-auto text-sm sm:text-base font-bold shadow-xl shadow-brand-500/20"
              >
                Launch Student Portal
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={Users}
                onClick={() => onNavigate('/login/teacher')}
                className="w-full sm:w-auto text-sm sm:text-base font-bold border-slate-300 hover:bg-slate-100"
              >
                Faculty / Teacher Suite
              </Button>
            </div>

            {/* Live Metrics Strip */}
            <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-slate-200/60">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">96.4%</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Skill Verification Rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-brand-600 font-sans">&lt;45s</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Micro-Learning Retention</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">100%</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">NEP Credit Alignment</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-sans">3.4x</p>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Placement Readiness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL ROLE INTERACTIVE SHOWCASE */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Two Tailored Experiences in One Unified Ecosystem
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Select your role to preview the customized workflows and intelligence layers designed for your success.
            </p>

            {/* Role Switcher Pill */}
            <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setSelectedRoleTab('student')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedRoleTab === 'student'
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Experience (10 Routes)</span>
              </button>
              <button
                onClick={() => setSelectedRoleTab('teacher')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedRoleTab === 'teacher'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Teacher Suite (9 Routes)</span>
              </button>
            </div>
          </div>

          {/* Role Feature Grid Display */}
          {selectedRoleTab === 'student' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <Card variant="elevated" padding="md" className="border-brand-100 hover:border-brand-300">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">EdScroll Micro-Learning</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Vertical bite-sized cards and interactive quiz reels that turn social feed scrolling into high-yield academic retention.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-600 font-semibold">
                  <span>Interactive In-Feed Quizzes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>

              <Card variant="elevated" padding="md" className="border-brand-100 hover:border-brand-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Conversational AI Tutor</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  24/7 personalized tutor that breaks down code, formulates analogies, and generates practice questions tailored to your syllabus.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                  <span>Context-Aware Explanations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>

              <Card variant="elevated" padding="md" className="border-brand-100 hover:border-brand-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Verifiable Skill Passport</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Cryptographically verified skill credentials and NEP credit bank that connects directly to top-tier internship openings.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                  <span>Direct Job Matching</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              <Card variant="elevated" padding="md" className="border-indigo-100 hover:border-indigo-300">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">AI Learning Gap Diagnostic</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Automated telemetry detects concepts where &gt;40% of students struggle, recommending instant remedial modules and assignments.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-semibold">
                  <span>1-Click Remedial Lessons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>

              <Card variant="elevated" padding="md" className="border-indigo-100 hover:border-indigo-300">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Rapid Attendance Engine</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Mark complete batches in under 5 seconds with 'Mark All Present' shortcuts, threshold warnings, and one-click export.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-semibold">
                  <span>Biometric/QR Ready</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>

              <Card variant="elevated" padding="md" className="border-indigo-100 hover:border-indigo-300">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Batch Health & Risk Matrix</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Live risk scoring alerts you to students falling behind in GPA or attendance before end-semester examinations.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-sky-600 font-semibold">
                  <span>Proactive Intervention</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* INTERACTIVE EDSCROLL TEASER */}
      <section id="edscroll-preview" className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-6 space-y-6">
              <Badge variant="brand" size="md" className="bg-brand-900/80 text-brand-300 border-brand-700">
                Feature Highlight: EdScroll
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Turn Short Attention Spans into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-brand-300">
                  Deep Mastery
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                College students spend 2+ hours daily on vertical social media feeds. EdScroll replaces passive scrolling with algorithmically sequenced micro-lessons, interactive instant-response quizzes, and verified skill badges.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Bite-sized 45-second high-yield academic concepts',
                  'Inline interactive MCQ quizzes with instant explanations',
                  'AI-curated based on upcoming lecture schedules',
                  'Seamless export of notes directly to Course workspace'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  variant="glow"
                  size="md"
                  icon={Play}
                  onClick={() => onNavigate('/login/student')}
                >
                  Experience EdScroll Demo
                </Button>
              </div>
            </div>

            {/* Right: Live Interactive Card Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-slate-800 border border-slate-700 p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
                      AI
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">AI Micro-Tutor</p>
                      <p className="text-[10px] text-slate-400">Deep Learning • CS602</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-950 text-brand-300 border border-brand-800">
                    45s Reel
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white leading-snug">
                    Why Self-Attention scales as O(N²)?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Multiplying Query (N x d) by Key^T (d x N) creates an N x N similarity matrix. When sequence length N doubles from 2,000 to 4,000 tokens, memory quadruples!
                  </p>
                </div>

                {/* Interactive Quiz Mini Card */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2.5">
                  <p className="text-xs font-semibold text-brand-300">
                    ⚡ Quick Check: For 4,000 tokens, what is the attention matrix size?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {['4,000 elements', '16 Million elements', '8,000 elements', '64,000 elements'].map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveQuizSelected(idx)}
                        className={`text-[11px] p-2 rounded-xl text-left font-medium transition-all ${
                          activeQuizSelected === idx
                            ? idx === 1
                              ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400'
                              : 'bg-rose-600 text-white font-bold'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {activeQuizSelected !== null && (
                    <p className="text-[10px] text-emerald-400 font-medium animate-fade-in pt-1">
                      {activeQuizSelected === 1
                        ? '✓ Correct! 4,000 x 4,000 = 16M matrix elements.'
                        : '❌ Incorrect. N x N = 4,000 x 4,000 = 16,000,000.'}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Flame className="w-4 h-4 fill-amber-400" /> 1,420 Mastered
                  </span>
                  <span>Swipe up for next lesson →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-brand-50/50 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <Badge variant="brand" size="md">
            Ready for Demo & Evaluation
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Experience the Future of Indian Higher Education Today
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Test the live student learning journeys and teacher management flows with pre-populated realistic mock data.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="glow"
              size="lg"
              icon={GraduationCap}
              onClick={() => onNavigate('/login/student')}
              className="w-full sm:w-auto"
            >
              Sign In as Demo Student (Ananya Sharma)
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={Users}
              onClick={() => onNavigate('/login/teacher')}
              className="w-full sm:w-auto"
            >
              Sign In as Demo Faculty (Dr. Rajesh Verma)
            </Button>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};
