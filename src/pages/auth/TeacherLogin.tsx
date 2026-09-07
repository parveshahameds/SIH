import React, { useState } from 'react';
import { Users, Sparkles, ArrowLeft, Lock, Mail, GraduationCap, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import { mockTeacherUser } from '../../data/mockData';

interface TeacherLoginProps {
  onNavigate: (path: string) => void;
}

export const TeacherLogin: React.FC<TeacherLoginProps> = ({ onNavigate }) => {
  const { loginAsTeacher } = useAuth();
  const [email, setEmail] = useState(mockTeacherUser.email);
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAsTeacher();
      setIsLoading(false);
      onNavigate('/teacher/dashboard');
    }, 400);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsTeacher();
      setIsLoading(false);
      onNavigate('/teacher/dashboard');
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-slate-100">
      {/* Decorative Dark Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-700 shadow-2xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to SahakarSetu Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
          Faculty Suite Sign In
        </h2>
        <p className="mt-1.5 text-center text-xs sm:text-sm text-slate-400">
          Manage batches, learning gaps, syllabus, and assessments
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Quick 1-Click Demo Login Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-indigo-950/80 border border-indigo-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>Instant Hackathon Jury Demo</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-900/80 text-sky-200 px-2 py-0.5 rounded-full border border-sky-700">
                Pre-Filled
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Test faculty features immediately as <strong>Dr. Rajesh Verma</strong> (Lead AI Mentor, 194 Students, 3 Active Batches).
            </p>
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 shadow-md shadow-indigo-500/25 transition-all active:scale-[0.98]"
            >
              {isLoading ? 'Signing In...' : '1-Click Demo Faculty Sign In'}
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800 px-3 text-slate-400 font-semibold tracking-wider">
                Or Sign In with Employee ID
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Faculty Email / Employee ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember session</span>
              </label>
              <a href="#" className="font-semibold text-sky-400 hover:text-sky-300">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="glow"
              size="md"
              fullWidth
              isLoading={isLoading}
              className="mt-2"
            >
              Sign In to Faculty Suite
            </Button>
          </form>

          {/* Switch to Student Login */}
          <div className="mt-6 pt-4 border-t border-slate-700/80 text-center text-xs text-slate-400">
            <span>Are you an enrolled student? </span>
            <button
              onClick={() => onNavigate('/login/student')}
              className="font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 hover:underline"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Sign In as Student</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
