import React, { useState } from 'react';
import { GraduationCap, Sparkles, ArrowLeft, Lock, Mail, CheckCircle2, Flame, Award, Users } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { mockStudentUser } from '../../data/mockData';

interface StudentLoginProps {
  onNavigate: (path: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onNavigate }) => {
  const { loginAsStudent } = useAuth();
  const [email, setEmail] = useState(mockStudentUser.email);
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAsStudent();
      setIsLoading(false);
      onNavigate('/student/dashboard');
    }, 400);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsStudent();
      setIsLoading(false);
      onNavigate('/student/dashboard');
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-brand-600 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to SahakarSetu Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          Trainee & Student Sign In
        </h2>
        <p className="mt-1.5 text-center text-xs sm:text-sm text-slate-500">
          Access your NCCT cooperative courses, EdScroll micro-feed, and CoopMitra AI
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <Card variant="elevated" padding="lg" className="border-slate-200/80 shadow-card-hover">
          {/* Quick 1-Click Demo Login Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-brand-50 via-indigo-50 to-sky-50 border border-brand-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-900">
                <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
                <span>Instant Hackathon Jury Demo</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded-full text-brand-700 shadow-2xs">
                Pre-Filled
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Test student features immediately as <strong>Ananya Sharma</strong> (6th Sem CSE, 91.8% Attendance, 8.94 CGPA).
            </p>
            <Button
              variant="glow"
              size="sm"
              fullWidth
              isLoading={isLoading}
              onClick={handleDemoLogin}
              className="text-xs font-bold py-2.5"
            >
              1-Click Demo Student Sign In
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">
                Or Sign In with Credentials
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Institutional Email / Roll Number"
              type="email"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. ananya.s@sahakarsetu.gov.in"
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <span>Remember this device</span>
              </label>
              <a href="#" className="font-semibold text-brand-600 hover:text-brand-700">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isLoading}
              className="mt-2"
            >
              Sign In to Student Account
            </Button>
          </form>

          {/* Switch to Teacher Login */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            <span>Are you a faculty member or mentor? </span>
            <button
              onClick={() => onNavigate('/login/teacher')}
              className="font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 hover:underline"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Sign In as Teacher</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
