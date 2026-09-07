import React, { useState } from 'react';
import {
  Briefcase,
  Compass,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Mic,
  Search,
  Building2,
  DollarSign,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

interface JobsProps {
  onNavigate: (route: string) => void;
}

interface Opportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Internship' | 'Full-time';
  stipendOrSalary: string;
  eligibilityStatus: 'Eligible' | 'Almost Eligible' | 'Missing Skills';
  matchScore: number;
  deadline: string;
  description: string;
  matchedSkills: string[];
  missingSkills: string[];
  roadmap: {
    skillsAndModules: { title: string; moduleCode: string; status: 'completed' | 'pending' }[];
    certifications: { name: string; issuer: string; recognized: boolean }[];
    mockInterviewFocus: { topic: string; questionsCount: number }[];
    gdDebatePractice: { topic: string; recommendedCategory: string };
  };
}

const mockOpportunities: Opportunity[] = [
  {
    id: 'opp_01',
    title: 'PACS Secretary & Multi-Service Business Manager',
    company: 'District Cooperative Central Union (Kolar / Bengaluru Rural)',
    logo: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&auto=format&fit=crop&q=80',
    location: 'Karnataka (Multiple Districts) • Full-time',
    type: 'Full-time',
    stipendOrSalary: '₹32,000 - ₹45,000 / month + Incentives',
    eligibilityStatus: 'Eligible',
    matchScore: 94,
    deadline: 'Sept 25, 2026',
    description: 'Lead the modernization of a Tier-1 Primary Agricultural Credit Society. Manage the national ERP bookkeeping, disburse seasonal KCC crop loans, operate the CSC citizen service counter, and manage fertiliser distribution.',
    matchedSkills: ['PACS Computerization & ERP', 'Cooperative Accounting & Audit', 'Model Bye-Laws', 'Gram Sabha Public Communication'],
    missingSkills: ['WDRA Warehouse E-Receipt Trading'],
    roadmap: {
      skillsAndModules: [
        { title: 'Cooperative Management & PACS Governance', moduleCode: 'COOP-101', status: 'completed' },
        { title: 'PACS Accounting, Audit & ERP Compliance', moduleCode: 'COOP-102', status: 'completed' },
        { title: 'WDRA Village Warehousing & E-Pledge Loans', moduleCode: 'AGRI-304', status: 'pending' }
      ],
      certifications: [
        { name: 'Certified PACS Secretary & Rural ERP Specialist', issuer: 'NCCT & Ministry of Cooperation', recognized: true },
        { name: 'National Cooperative Audit Certification', issuer: 'VAMNICOM Pune', recognized: true }
      ],
      mockInterviewFocus: [
        { topic: 'PACS Model Bye-Laws & Statutory Reserve Allocations', questionsCount: 4 },
        { topic: 'KCC Scale of Finance & Prompt Repayment Rebate', questionsCount: 3 }
      ],
      gdDebatePractice: {
        topic: 'Can Multi-Purpose PACS Solve Rural Youth Unemployment?',
        recommendedCategory: 'Cooperative Governance'
      }
    }
  },
  {
    id: 'opp_02',
    title: 'Dairy Cooperative Plant Supervisor & Milk Procurement Head',
    company: 'Karnataka Milk Federation (KMF - Nandini / Amul Network)',
    logo: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=80&auto=format&fit=crop&q=80',
    location: 'Mandya & Mysuru Dairy Union (On-site)',
    type: 'Full-time',
    stipendOrSalary: '₹38,000 - ₹52,000 / month',
    eligibilityStatus: 'Almost Eligible',
    matchScore: 88,
    deadline: 'Oct 10, 2026',
    description: 'Oversee milk collection centers across 28 village dairy societies, ensure Bulk Milk Cooler (BMC) uptime at 4°C, conduct daily Gerber fat testing, and disburse producer bonus payments.',
    matchedSkills: ['Dairy Cold-Chain Management', 'AMCU Automation', 'Milk Quality & Hygiene'],
    missingSkills: ['Automated CIP Cleaning Protocols', 'Somatic Cell Count Quality Testing'],
    roadmap: {
      skillsAndModules: [
        { title: 'Dairy Cooperative Management (Anand Model)', moduleCode: 'DAIRY-401', status: 'completed' },
        { title: 'Milk Quality Testing, Somatic Cell Count & Cold Chain', moduleCode: 'DAIRY-402', status: 'completed' },
        { title: 'Industrial CIP Sanitization & Milk Value Addition', moduleCode: 'DAIRY-403', status: 'pending' }
      ],
      certifications: [
        { name: 'Dairy Cooperative Quality & Cold-Chain Supervisor', issuer: 'NCCT x NDDB', recognized: true }
      ],
      mockInterviewFocus: [
        { topic: 'Adulteration Detection: Starch, Urea & MBRT Assay', questionsCount: 5 },
        { topic: 'Bulk Milk Cooler Maintenance & 4°C Chilling Protocol', questionsCount: 4 }
      ],
      gdDebatePractice: {
        topic: 'Cooperative Dairy vs Private Commercial Dairies in Producer Welfare',
        recommendedCategory: 'Dairy Economics'
      }
    }
  },
  {
    id: 'opp_03',
    title: 'Rural Credit Appraisal Officer & Banking Correspondent Lead',
    company: 'Apex State Cooperative Bank (Apex Bank)',
    logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=80&auto=format&fit=crop&q=80',
    location: 'Bengaluru / Hassan • Full-time',
    type: 'Full-time',
    stipendOrSalary: '₹42,000 - ₹60,000 / month',
    eligibilityStatus: 'Eligible',
    matchScore: 91,
    deadline: 'Oct 05, 2026',
    description: 'Evaluate agricultural credit proposals, monitor Joint Liability Group (JLG) repayment cycles, audit rural branch cash books, and facilitate PMFBY crop insurance claims.',
    matchedSkills: ['Microfinance & SHG Banking', 'KCC Subvention Calculation', 'Cyber Hygiene & AePS Payments'],
    missingSkills: ['Mortgage Title Deed Search'],
    roadmap: {
      skillsAndModules: [
        { title: 'Financial Literacy & SHG Banking Linkage', moduleCode: 'FIN-201', status: 'completed' },
        { title: 'Credit Management & NPA Recovery', moduleCode: 'FIN-203', status: 'completed' },
        { title: 'Land Revenue Records & Legal Title Search', moduleCode: 'FIN-302', status: 'pending' }
      ],
      certifications: [
        { name: 'Rural Micro-Banking & AePS Financial Inclusion Lead', issuer: 'VAMNICOM x NABARD', recognized: true }
      ],
      mockInterviewFocus: [
        { topic: 'Joint Liability Group (JLG) Social Collateral Evaluation', questionsCount: 4 },
        { topic: 'Cyber Hygiene & AePS Biometric Cloning Prevention', questionsCount: 3 }
      ],
      gdDebatePractice: {
        topic: 'Digital Currency & UPI in Transforming Rural Credit Inflows',
        recommendedCategory: 'Rural Banking'
      }
    }
  },
  {
    id: 'opp_04',
    title: 'FPO Marketing & Value Chain Coordinator',
    company: 'National Agricultural Cooperative Marketing Federation (NAFED Cluster)',
    logo: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=80&auto=format&fit=crop&q=80',
    location: 'Pan-India (Regional Hubs) • Full-time',
    type: 'Full-time',
    stipendOrSalary: '₹35,000 - ₹48,000 / month',
    eligibilityStatus: 'Almost Eligible',
    matchScore: 82,
    deadline: 'Oct 15, 2026',
    description: 'Drive market linkage for Farmer Producer Organisations, onboard collective farm harvest onto e-NAM and ONDC, negotiate bulk input supplies with IFFCO and KRIBHCO.',
    matchedSkills: ['Agricultural Marketing & e-NAM', 'Rural Entrepreneurship & SHG Models'],
    missingSkills: ['FPO DPR Formulation', 'Export Quality Certification'],
    roadmap: {
      skillsAndModules: [
        { title: 'Agricultural Marketing & e-NAM Trading', moduleCode: 'AGRI-301', status: 'completed' },
        { title: 'Farm Business Management & FPO Strategy', moduleCode: 'AGRI-302', status: 'completed' },
        { title: 'Detailed Project Report (DPR) Formulation for FPOs', moduleCode: 'ENTR-502', status: 'pending' }
      ],
      certifications: [
        { name: 'Agri-Business Planning & FPO Executive Certification', issuer: 'RICM Bengaluru', recognized: true }
      ],
      mockInterviewFocus: [
        { topic: 'e-NAM Quality Assaying & Direct Farm Gate Bidding', questionsCount: 4 },
        { topic: 'SFAC Equity Grant & Credit Guarantee Requirements', questionsCount: 3 }
      ],
      gdDebatePractice: {
        topic: 'Can FPOs Empower Marginal Farmers to Negotiate Fair Produce Pricing?',
        recommendedCategory: 'Agri-Economics'
      }
    }
  },
  {
    id: 'opp_05',
    title: 'Village Digital Services & Common Service Center (CSC) Lead',
    company: 'Cooperative e-Services Portal (Ministry of Cooperation Network)',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80&auto=format&fit=crop&q=80',
    location: 'Rural Districts • Full-time',
    type: 'Full-time',
    stipendOrSalary: '₹28,000 - ₹38,000 / month',
    eligibilityStatus: 'Eligible',
    matchScore: 92,
    deadline: 'Oct 28, 2026',
    description: 'Manage 50+ digital citizen services at upgraded PACS CSC counters, including PM-KISAN KYC, land revenue extracts, DigiLocker issuance, and digital payments.',
    matchedSkills: ['Cyber Hygiene & AePS Payments', 'Computer Basics & Office Productivity', 'Gram Sabha Public Communication'],
    missingSkills: ['State Land Record Portal API Sync'],
    roadmap: {
      skillsAndModules: [
        { title: 'Internet, e-Governance & Citizen G2C Services', moduleCode: 'DIG-602', status: 'completed' },
        { title: 'Cybersecurity for Cooperative Outlets', moduleCode: 'DIG-603', status: 'completed' }
      ],
      certifications: [
        { name: 'Certified PACS CSC Digital Lead', issuer: 'NCCT & CSC e-Governance', recognized: true }
      ],
      mockInterviewFocus: [
        { topic: 'Delivering G2C Services in Low-Bandwidth Rural Areas', questionsCount: 3 }
      ],
      gdDebatePractice: {
        topic: 'Digital India in Rural Villages: Literacy vs Infrastructure Barriers',
        recommendedCategory: 'e-Governance'
      }
    }
  }
];

export const Jobs: React.FC<JobsProps> = ({ onNavigate }) => {
  const { studentData } = useAuth();
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity>(mockOpportunities[0]);
  const [filterType, setFilterType] = useState<'All' | 'Internship' | 'Full-time' | 'Eligible'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('ncct_applied_jobs');
    return saved ? JSON.parse(saved) : ['opp_01'];
  });
  const [applyModalSuccess, setApplyModalSuccess] = useState(false);

  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'Internship') return opp.type === 'Internship';
    if (filterType === 'Full-time') return opp.type === 'Full-time';
    if (filterType === 'Eligible') return opp.eligibilityStatus === 'Eligible';
    return true;
  });

  const handleApply = (oppId: string) => {
    setAppliedJobs((prev) => {
      const updated = [...prev, oppId];
      localStorage.setItem('ncct_applied_jobs', JSON.stringify(updated));
      return updated;
    });
    setApplyModalSuccess(true);
    setTimeout(() => setApplyModalSuccess(false), 4000);
  };

  const getStatusBadge = (status: Opportunity['eligibilityStatus']) => {
    switch (status) {
      case 'Eligible':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Eligible
          </span>
        );
      case 'Almost Eligible':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-400 border border-amber-800 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Almost Eligible
          </span>
        );
      case 'Missing Skills':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-400 border border-rose-800 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Missing Skills
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Jobs & Internships Gateway</h2>
            <Badge variant="brand" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              Skill Passport Matched
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified opportunities benchmarked against your active competencies, course credits, and NEP skill ledger
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={Award}
            onClick={() => onNavigate('skill-passport')}
            className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            View Skill Passport ({studentData.skills.length} Skills)
          </Button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {applyModalSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between animate-fade-in shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-slate-900">Application Dispatched with Verified Skill Passport!</p>
              <p className="text-[11px] text-emerald-700">
                Your cryptographically verified credentials, PyTorch scores, and project transcripts have been sent directly to {selectedOpp.company}.
              </p>
            </div>
          </div>
          <button
            onClick={() => setApplyModalSuccess(false)}
            className="text-xs text-emerald-700 hover:underline font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role title, hiring company, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['All', 'Internship', 'Full-time', 'Eligible'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
              }`}
            >
              {tab === 'Eligible' ? 'Eligible Only' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Split View: Left List (40%) and Right Detail Roadmap (60%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Opportunity Cards */}
        <div className="lg:col-span-5 space-y-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Open Opportunities ({filteredOpps.length})
          </p>

          <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredOpps.map((opp) => {
              const isSelected = selectedOpp.id === opp.id;
              const hasApplied = appliedJobs.includes(opp.id);

              return (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpp(opp)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-400 shadow-sm ring-1 ring-indigo-400/30'
                      : 'bg-white hover:bg-slate-50 border-slate-200/90 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={opp.logo}
                        alt={opp.company}
                        className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                          {opp.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">{opp.company}</p>
                      </div>
                    </div>

                    <div className="shrink-0">{getStatusBadge(opp.eligibilityStatus)}</div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
                    <span>{opp.stipendOrSalary}</span>
                    <span className="text-indigo-600 font-bold">{opp.matchScore}% Match</span>
                  </div>

                  {hasApplied && (
                    <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Application Submitted
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Opportunity & Personalized Roadmap */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-200/90 shadow-xs">
            {/* Header of Selected Opportunity */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <img
                  src={selectedOpp.logo}
                  alt={selectedOpp.company}
                  className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                      {selectedOpp.type}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {selectedOpp.location}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
                    {selectedOpp.title}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5">{selectedOpp.company}</p>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                {getStatusBadge(selectedOpp.eligibilityStatus)}
                <span className="text-xs font-mono font-bold text-slate-700">
                  {selectedOpp.stipendOrSalary}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Deadline: {selectedOpp.deadline}
                </span>
              </div>
            </div>

            {/* Opportunity Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                About the Role
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedOpp.description}
              </p>
            </div>

            {/* Skill Passport Comparison Matrix */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Skill Passport Compatibility Matrix
                </span>
                <span className="text-xs font-mono font-bold text-indigo-600">
                  {selectedOpp.matchScore}% Qualification Match
                </span>
              </div>

              <ProgressBar value={selectedOpp.matchScore} size="sm" variant="brand" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Matched Verified Skills:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOpp.matchedSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-rose-700 mb-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Missing / Target Prerequisites:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedOpp.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PERSONALIZED ROADMAP */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Personalized Preparation Roadmap
                </h4>
              </div>

              <div className="space-y-3">
                {/* 1. Skills & Modules */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      1. Required Course Modules & Syllabi
                    </span>
                    <button
                      onClick={() => onNavigate('my-learning')}
                      className="text-indigo-600 hover:underline text-[11px] font-semibold flex items-center gap-0.5"
                    >
                      <span>Open Modules</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {selectedOpp.roadmap.skillsAndModules.map((mod) => (
                      <div
                        key={mod.moduleCode}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs"
                      >
                        <span className="text-slate-800 font-medium">{mod.title} ({mod.moduleCode})</span>
                        {mod.status === 'completed' ? (
                          <span className="text-emerald-700 text-[10px] font-bold font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Completed</span>
                        ) : (
                          <span className="text-amber-700 text-[10px] font-bold font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Recommended</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Recommended Certifications */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      2. Recommended Industry Certifications
                    </span>
                    <button
                      onClick={() => onNavigate('skill-passport')}
                      className="text-indigo-600 hover:underline text-[11px] font-semibold flex items-center gap-0.5"
                    >
                      <span>Passport Ledger</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {selectedOpp.roadmap.certifications.map((cert) => (
                      <div
                        key={cert.name}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs"
                      >
                        <div>
                          <p className="text-slate-900 font-medium">{cert.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{cert.issuer}</p>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          NEP Recognized
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. AI Mock Interview Practice */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-indigo-600" />
                      3. AI Mock Interview Preparation Focus
                    </span>
                    <button
                      onClick={() => onNavigate('career-lab')}
                      className="text-indigo-600 hover:underline text-[11px] font-semibold flex items-center gap-0.5"
                    >
                      <span>Launch Interview</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedOpp.roadmap.mockInterviewFocus.map((f) => (
                      <div
                        key={f.topic}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs"
                      >
                        <p className="text-slate-800 font-medium leading-snug">{f.topic}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{f.questionsCount} AI Rubric Questions</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Group Discussion (GD) Debate Practice */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      4. Group Discussion (GD) Topic Practice
                    </span>
                    <button
                      onClick={() => onNavigate('gd')}
                      className="text-indigo-600 hover:underline text-[11px] font-semibold flex items-center gap-0.5"
                    >
                      <span>Enter GD Arena</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-0.5">
                      {selectedOpp.roadmap.gdDebatePractice.recommendedCategory}
                    </span>
                    <p className="text-slate-800 font-semibold">
                      "{selectedOpp.roadmap.gdDebatePractice.topic}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Status:{' '}
                <strong className="text-slate-900">
                  {appliedJobs.includes(selectedOpp.id) ? 'Application Submitted' : 'Application Open'}
                </strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => onNavigate('career-lab')}
                  className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50 flex-1 sm:flex-initial"
                >
                  Simulate Mock Interview
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={ShieldCheck}
                  disabled={appliedJobs.includes(selectedOpp.id)}
                  onClick={() => handleApply(selectedOpp.id)}
                  className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm flex-1 sm:flex-initial"
                >
                  {appliedJobs.includes(selectedOpp.id)
                    ? 'Applied with Skill Passport'
                    : 'Apply with Skill Passport'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
