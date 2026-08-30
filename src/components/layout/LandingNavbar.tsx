import React, { useState } from 'react';
import { Sparkles, GraduationCap, Users, ArrowRight, Menu, X, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../common/Button';

interface LandingNavbarProps {
  onNavigate: (path: string) => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  Co<span className="text-brand-600">Learn</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-50 text-brand-700 border border-brand-200/60 uppercase tracking-wide">
                  SIH 2026
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block -mt-0.5">
                AI-Enabled Learning & Employment Ecosystem
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-brand-600 transition-colors">
              Ecosystem Pillars
            </a>
            <a href="#edscroll-preview" className="hover:text-brand-600 transition-colors">
              EdScroll Micro-Learning
            </a>
            <a href="#ai-tutor" className="hover:text-brand-600 transition-colors">
              AI Tutor & Diagnostic
            </a>
            <a href="#credentials" className="hover:text-brand-600 transition-colors">
              Skill Passport
            </a>
          </nav>

          {/* Role CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={Users}
              onClick={() => onNavigate('/login/teacher')}
              className="text-xs"
            >
              Teacher Portal
            </Button>
            <Button
              variant="glow"
              size="sm"
              icon={GraduationCap}
              onClick={() => onNavigate('/login/student')}
              className="text-xs"
            >
              Student Portal
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-4 animate-slide-down">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Ecosystem Pillars
            </a>
            <a
              href="#edscroll-preview"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              EdScroll Micro-Learning
            </a>
            <a
              href="#ai-tutor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              AI Tutor & Diagnostic
            </a>
            <a
              href="#credentials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Skill Passport
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Button
              variant="glow"
              size="md"
              fullWidth
              icon={GraduationCap}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/login/student');
              }}
            >
              Student Portal Login
            </Button>
            <Button
              variant="outline"
              size="md"
              fullWidth
              icon={Users}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('/login/teacher');
              }}
            >
              Teacher Portal Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
