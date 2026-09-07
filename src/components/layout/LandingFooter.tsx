import React from 'react';
import { Sparkles, Heart, Shield, Award, Github, ExternalLink } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-sky-400 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">SahakarSetu</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An intelligent, NCCT & NEP-2020 aligned platform uniting cooperative training, touchless biometric attendance, AI topic gap diagnostics, verifiable skill passports, and employment pathways under the Ministry of Cooperation.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Smart India Hackathon 2026</span>
            </div>
          </div>

          {/* Col 2: Student Ecosystem */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Student Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">EdScroll Micro-Feed</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">CoopMitra AI Advisor</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Verifiable Skill Passport</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Cooperative Job Matching</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Touchless Face Attendance</a></li>
            </ul>
          </div>

          {/* Col 3: Teacher Ecosystem */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Educator Suite
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">AI Learning Gap Diagnostic</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">1-Click Batch Attendance</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Student Risk Analysis Matrix</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Automated Remedial Generator</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Classroom Analytics & Reports</a></li>
            </ul>
          </div>

          {/* Col 4: Hackathon Vision */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Architecture & Compliance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Built with modular micro-frontend architecture, role-based security boundaries, and ready for REST/GraphQL API integration.
            </p>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-brand-300 font-semibold">
                <Award className="w-4 h-4" />
                <span>NCCT & NCrF Credit Framework</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Supports Academic Bank of Credits (ABC) integration & continuous skill telemetry.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SahakarSetu Ecosystem. Smart India Hackathon Prototype.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Framework</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">API Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
