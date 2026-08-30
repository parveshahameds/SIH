import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  CheckCircle2,
  QrCode,
  Sparkles,
  Lock,
  Layers,
  FileCheck
} from 'lucide-react';
import { mockSkillPassportData } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';

interface SkillPassportProps {
  onNavigate: (route: string) => void;
}

export const SkillPassport: React.FC<SkillPassportProps> = ({ onNavigate }) => {
  const { studentData } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white">Verifiable Digital Skill Passport</h2>
            <Badge variant="success" size="sm" dot className="bg-emerald-950 text-emerald-300 border-emerald-700">
              NEP 2020 ABC Connected
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographically signed academic & industry competency ledger recognized by recruiters & accreditation councils
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Share2}
            onClick={handleShare}
            className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
          >
            {copied ? 'DID URL Copied!' : 'Share Public Link'}
          </Button>
          <Button
            variant="glow"
            size="sm"
            icon={Download}
            onClick={() => alert('Generating cryptographic Skill Passport PDF with verified QR code...')}
            className="text-xs font-bold bg-gradient-to-r from-brand-600 to-cyan-600 shadow-md shadow-cyan-500/20"
          >
            Export Passport PDF
          </Button>
        </div>
      </div>

      {/* NEP 2020 Academic Bank of Credits (ABC) Breakdown Card */}
      <div className="cyber-glass rounded-3xl p-6 sm:p-8 border border-slate-800 glow-violet">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>National Credit Framework (NCrF) Level 7 Compliance</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Cumulative NEP Credits: <span className="text-cyan-400">{studentData.nepCredits.earned}</span> / {studentData.nepCredits.required}
            </h3>

            {/* Credit Category Split */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Major Discipline</p>
                <p className="text-lg font-mono font-bold text-white mt-1">{studentData.nepCredits.major} Credits</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Minor Track</p>
                <p className="text-lg font-mono font-bold text-white mt-1">{studentData.nepCredits.minor} Credits</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Skill Enhancement</p>
                <p className="text-lg font-mono font-bold text-emerald-400 mt-1">{studentData.nepCredits.skillEnhancement} Credits</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <p className="text-[10px] uppercase text-slate-400 font-bold">Industry Internship</p>
                <p className="text-lg font-mono font-bold text-cyan-300 mt-1">{studentData.nepCredits.internship} Credits</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-3 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-500 flex items-center justify-center mx-auto text-white shadow-lg shadow-cyan-500/20">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Instant Verifier QR</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Recruiters scan to verify tamper-proof signature</p>
            </div>
            <span className="inline-block text-[10px] font-mono bg-slate-900 px-3 py-1 rounded-xl text-cyan-300 border border-slate-800">
              DID: 0x8f7d...4a12ec9
            </span>
          </div>
        </div>
      </div>

      {/* Verifiable Credential Badges List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">
          Cryptographically Verified Badges & Competencies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSkillPassportData.map((cred) => (
            <Card
              key={cred.id}
              variant="elevated"
              padding="md"
              className="cyber-glass border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={cred.badgeUrl}
                      alt={cred.title}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-cyan-500/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug">
                        {cred.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{cred.issuer}</p>
                    </div>
                  </div>

                  <Badge
                    variant={cred.status === 'verified' ? 'success' : 'warning'}
                    size="sm"
                    dot
                    className={cred.status === 'verified' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' : 'bg-amber-950 text-amber-300 border-amber-700'}
                  >
                    {cred.status === 'verified' ? 'Verified' : 'In Progress'}
                  </Badge>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Evaluation Score</span>
                    <span className="font-bold text-white font-mono">{cred.score}%</span>
                  </div>
                  <ProgressBar value={cred.score} size="sm" variant={cred.score > 85 ? 'success' : 'brand'} />
                </div>

                {/* Sub-skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cred.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-900 border border-slate-800 text-cyan-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Hash: {cred.verificationHash}</span>
                <span className="text-cyan-400 font-sans font-bold">
                  +{cred.creditsAllocated} Credits
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
