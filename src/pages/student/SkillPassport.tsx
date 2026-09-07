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
  FileCheck,
  Printer,
  ExternalLink,
  Building2,
  Check
} from 'lucide-react';
import { mockSkillPassportData } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { SkillCredential } from '../../types';
import { copyToClipboard } from '../../utils/exportUtils';

interface SkillPassportProps {
  onNavigate: (route: string) => void;
}

export const SkillPassport: React.FC<SkillPassportProps> = ({ onNavigate }) => {
  const { studentData } = useAuth();
  const [copied, setCopied] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<SkillCredential | null>(null);

  const handleShare = async () => {
    const verificationUrl = `https://ncct.gov.in/verify/${studentData.rollNumber || 'RICM-2026-HDCM-042'}`;
    const success = await copyToClipboard(verificationUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Verifiable NCCT Digital Skill Passport</h2>
            <Badge variant="success" size="sm" dot className="bg-emerald-50 text-emerald-700 border-emerald-200">
              National Credit Framework (NCrF) Verified
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically signed academic & industry competency ledger issued under Ministry of Cooperation, Govt. of India
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Share2}
            onClick={handleShare}
            className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {copied ? 'DID URL Copied!' : 'Share Verification Link'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Award}
            onClick={() => setSelectedCertificate(mockSkillPassportData[0])}
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
          >
            View Official Certificate
          </Button>
        </div>
      </div>

      {/* NEP 2020 & NCCT Credit Framework Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>National Council for Cooperative Training (NCCT) Accredited</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Cumulative Cooperative Credits: <span className="text-indigo-600">{studentData.nepCredits.earned}</span> / {studentData.nepCredits.required}
            </h3>

            {/* Credit Category Split */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] uppercase text-slate-500 font-bold">Cooperative Discipline</p>
                <p className="text-lg font-mono font-bold text-slate-900 mt-1">{studentData.nepCredits.major} Credits</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] uppercase text-slate-500 font-bold">Finance & Banking Track</p>
                <p className="text-lg font-mono font-bold text-slate-900 mt-1">{studentData.nepCredits.minor} Credits</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] uppercase text-slate-500 font-bold">Agri-Dairy Skills</p>
                <p className="text-lg font-mono font-bold text-emerald-700 mt-1">{studentData.nepCredits.skillEnhancement} Credits</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] uppercase text-slate-500 font-bold">PACS Field Attachment</p>
                <p className="text-lg font-mono font-bold text-indigo-600 mt-1">{studentData.nepCredits.internship} Credits</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto text-white shadow-xs">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Instant Verifier QR</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Recruiters scan to verify tamper-proof signature</p>
            </div>
            <span className="inline-block text-[10px] font-mono bg-white px-3 py-1 rounded-xl text-indigo-700 border border-slate-200 shadow-xs">
              DID: 0xNCCT-8942-B8E9
            </span>
          </div>
        </div>
      </div>

      {/* Verifiable Credential Badges List */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Cryptographically Verified Badges & Competencies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockSkillPassportData.map((cred) => (
            <Card
              key={cred.id}
              variant="elevated"
              padding="md"
              className="bg-white border-slate-200/90 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={cred.badgeUrl}
                      alt={cred.title}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-200 shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {cred.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">{cred.issuer}</p>
                    </div>
                  </div>

                  <Badge
                    variant={cred.status === 'verified' ? 'success' : 'warning'}
                    size="sm"
                    dot
                    className={cred.status === 'verified' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
                  >
                    {cred.status === 'verified' ? 'Verified' : 'In Progress'}
                  </Badge>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Evaluation Score</span>
                    <span className="font-bold text-slate-900 font-mono">{cred.score}%</span>
                  </div>
                  <ProgressBar value={cred.score} size="sm" variant={cred.score > 85 ? 'success' : 'brand'} />
                </div>

                {/* Sub-skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cred.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-100 border border-slate-200 text-indigo-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px] truncate max-w-[160px]">Hash: {cred.verificationHash}</span>
                <button
                  onClick={() => setSelectedCertificate(cred)}
                  className="text-indigo-600 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Certificate</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Official Certificate Viewer Modal */}
      {selectedCertificate && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCertificate(null)}
          title="National Council for Cooperative Training (NCCT)"
          subtitle="Ministry of Cooperation, Government of India • Official Certificate of Competency"
          size="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500 font-mono">
                Verification Hash: {selectedCertificate.verificationHash}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedCertificate(null)}>
                  Close
                </Button>
                <Button
                  variant="glow"
                  size="sm"
                  icon={Printer}
                  onClick={() => window.print()}
                >
                  Print / Save PDF
                </Button>
              </div>
            </div>
          }
        >
          <div className="p-6 sm:p-8 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border-4 border-amber-600/30 rounded-3xl text-center space-y-6 shadow-inner relative overflow-hidden">
            {/* Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-80 h-80 text-amber-900" />
            </div>

            {/* Header Logos */}
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-4">
              <div className="text-left">
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900">Ministry of Cooperation</p>
                <p className="text-xs font-extrabold text-slate-900">Government of India</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                NCCT
              </div>
              <div className="text-right">
                <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-900">VAMNICOM / RICM</p>
                <p className="text-xs font-semibold text-slate-700">Bengaluru Campus</p>
              </div>
            </div>

            {/* Main Text */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-amber-800 font-bold">
                Certificate of Professional Competency
              </p>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-slate-900">
                {studentData.name}
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                has successfully demonstrated verified mastery and practical proficiency in
              </p>
              <h4 className="text-base sm:text-lg font-extrabold text-indigo-900 bg-indigo-50/80 py-2 px-4 rounded-xl border border-indigo-100 max-w-lg mx-auto">
                {selectedCertificate.title}
              </h4>
              <p className="text-xs text-slate-500">
                Evaluation Score: <strong className="text-slate-900">{selectedCertificate.score}%</strong> • {selectedCertificate.creditsAllocated} Academic/NSQF Credits Awarded
              </p>
            </div>

            {/* Competency Tags */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {selectedCertificate.skills.map((sk, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  ✓ {sk}
                </span>
              ))}
            </div>

            {/* Signatures and QR Code */}
            <div className="grid grid-cols-3 items-end pt-6 border-t border-amber-200/80 text-center">
              <div>
                <p className="text-[11px] font-bold text-slate-900">Dr. Meenakshi Sundaram</p>
                <p className="text-[9px] text-slate-500">Director / Lead Mentor (NCCT)</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-900" />
                <span className="text-[8px] font-mono text-slate-500 mt-0.5">Scan to Verify</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900">{selectedCertificate.issueDate}</p>
                <p className="text-[9px] text-slate-500">Date of Accreditation</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
