import React, { useState } from 'react';
import {
  ClipboardList,
  Building2,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  QrCode,
  MapPin,
  Utensils,
  Truck,
  FileText,
  AlertCircle,
  Building,
  Award,
  Send,
  Download
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface CollegeServicesProps {
  initialTab?: 'registration' | 'hostel';
  onNavigate: (route: string) => void;
}

export const CollegeServices: React.FC<CollegeServicesProps> = ({
  initialTab = 'registration',
  onNavigate
}) => {
  const { studentData } = useAuth();
  const [activeTab, setActiveTab] = useState<'registration' | 'hostel'>(initialTab);

  // Registration State
  const [selectedElectives, setSelectedElectives] = useState<string[]>(['COOP-101', 'DAIRY-401']);
  const [isRegistered, setIsRegistered] = useState(false);
  const [nominationNumber, setNominationNumber] = useState('NOM-COOP-2026-894');
  const [nominatingBody, setNominatingBody] = useState('Kolar District Cooperative Central Bank & PACS Union');

  // Gate Pass State
  const [gatePassReason, setGatePassReason] = useState('PACS Field Study & AMCU Demonstration Visit');
  const [gatePassGenerated, setGatePassGenerated] = useState(false);

  const trainingProgrammes = [
    {
      code: 'COOP-101',
      name: 'Cooperative Management, Principles & PACS Workflow',
      credits: 4,
      faculty: 'Dr. Meenakshi Sundaram (VAMNICOM)',
      type: 'Core Mandatory',
      seatsRemaining: 12
    },
    {
      code: 'DAIRY-401',
      name: 'Dairy Cooperative Management & Village Procurement Models',
      credits: 3,
      faculty: 'Dr. Anand Kurien (NDDB Panel)',
      type: 'Domain Specialization',
      seatsRemaining: 8
    },
    {
      code: 'FIN-201',
      name: 'Financial Literacy, SHG Banking & Micro-Credit',
      credits: 3,
      faculty: 'Shri Arvind Joshi (NABARD)',
      type: 'Financial Elective',
      seatsRemaining: 15
    },
    {
      code: 'AGRI-302',
      name: 'Farm Business Management & Farmer Producer Organisations (FPO)',
      credits: 4,
      faculty: 'Dr. B. K. Sharma (ICM Chandigarh)',
      type: 'Agri-Business Track',
      seatsRemaining: 10
    }
  ];

  const totalSelectedCredits = trainingProgrammes
    .filter((e) => selectedElectives.includes(e.code))
    .reduce((acc, e) => acc + e.credits, 12);

  const toggleElective = (code: string) => {
    if (selectedElectives.includes(code)) {
      setSelectedElectives((prev) => prev.filter((c) => c !== code));
    } else {
      setSelectedElectives((prev) => [...prev, code]);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">NCCT Training ERP & Institutional Services</h2>
            <Badge variant="brand" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              VAMNICOM / RICM ERP
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Programme nomination, semester course registration, hostel room allocation and logistics management
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('registration')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'registration'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Programme & Nomination</span>
          </button>
          <button
            onClick={() => setActiveTab('hostel')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'hostel'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Hostel & Mess ERP</span>
          </button>
        </div>
      </div>

      {/* TAB 1: REGISTRATION */}
      {activeTab === 'registration' && (
        <div className="space-y-6">
          {/* Institutional Status Card */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                  NCCT Higher Diploma in Cooperative Management (HDCM)
                </span>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Nomination Approved
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {studentData.institution} • {studentData.trainingCentre}
              </h3>
              <p className="text-xs text-slate-500">
                Nominating Entity: <strong>{nominatingBody}</strong> (Nomination No: {nominationNumber})
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center shrink-0">
              <p className="text-[10px] uppercase font-bold text-slate-500">Total Credits Configured</p>
              <p className="text-2xl font-black text-indigo-600 mt-0.5">{totalSelectedCredits} Credits</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Aligned with NCrF Level 7</p>
            </div>
          </div>

          {/* Course Selection Table */}
          <Card variant="elevated" padding="none" className="overflow-hidden border-slate-200/90 bg-white shadow-xs">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Semester Course Enrolment & Elective Tracks</h3>
                <p className="text-xs text-slate-500">
                  Select core and optional modules approved under the National Cooperative Training Curriculum
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {trainingProgrammes.map((prog) => {
                const isSelected = selectedElectives.includes(prog.code);
                return (
                  <div
                    key={prog.code}
                    onClick={() => toggleElective(prog.code)}
                    className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected ? 'bg-indigo-50/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-indigo-600">{prog.code}</span>
                          <span className="text-xs font-bold text-slate-900">{prog.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Faculty: {prog.faculty} • {prog.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-mono font-bold text-slate-700">{prog.credits} Credits</span>
                      <span className="text-[11px] text-slate-400">({prog.seatsRemaining} seats left)</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-600">
                {selectedElectives.length} programmes selected
              </span>
              <Button
                variant="glow"
                size="sm"
                icon={Send}
                onClick={handleRegister}
                disabled={isRegistered}
              >
                {isRegistered ? 'Registration Confirmed (ERP Synced)' : 'Confirm Programme Registration'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: HOSTEL & RESIDENTIAL SERVICES */}
      {activeTab === 'hostel' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hostel Room Info Card */}
          <Card variant="elevated" padding="lg" className="border-slate-200/90 bg-white shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Residential Hostel Allotment</h3>
              </div>
              <Badge variant="success" size="sm" dot className="bg-emerald-50 text-emerald-700 border-emerald-200">
                Active Resident
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Hostel Block</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Kaveri Executive Block B</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Room Number</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Room 204 (Twin Occupancy)</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Warden In-Charge</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">Shri Ramakrishna Rao</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Contact Helpline</p>
                <p className="text-sm font-bold text-indigo-600 mt-0.5">+91 80 2345 8900</p>
              </div>
            </div>

            <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100 text-xs text-indigo-950 flex items-center gap-3">
              <Utensils className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                <strong>Mess Dining Schedule:</strong> Breakfast 07:30 - 09:00 AM • Lunch 12:30 - 02:00 PM • Dinner 07:30 - 09:30 PM (Vegetarian / Nutritious Diet)
              </span>
            </div>
          </Card>

          {/* Digital Field Visit & Gate Pass Card */}
          <Card variant="elevated" padding="lg" className="border-slate-200/90 bg-white shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Digital Field Visit & Gate Pass</h3>
              </div>
              <span className="text-xs text-slate-500 font-mono">ERP-GP-8942</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Purpose of Campus Departure / Field Study
                </label>
                <input
                  type="text"
                  value={gatePassReason}
                  onChange={(e) => setGatePassReason(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {gatePassGenerated ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto shadow-xs border border-emerald-200">
                    <QrCode className="w-8 h-8 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-950">Gate Pass Approved & Signed by Warden</p>
                    <p className="text-[10px] text-emerald-800 font-mono">Valid Till: Today, 08:00 PM • Token: ERP-GP-8942</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Download}
                    onClick={() => {
                      const text = `NATIONAL COUNCIL FOR COOPERATIVE TRAINING (NCCT)\nRESIDENTIAL HOSTEL OFFICIAL GATE PASS\n\nPass ID: ERP-GP-8942\nTrainee: ${studentData.name} (${studentData.rollNumber})\nRoom: Kaveri Block B - Room 204\nPurpose: ${gatePassReason}\nAuthorized By: Shri Ramakrishna Rao (Warden In-Charge)\nStatus: APPROVED\nValid Until: Today, 08:00 PM`;
                      const blob = new Blob([text], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `NCCT_Hostel_Gate_Pass_${Date.now()}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="text-xs bg-white text-emerald-900 border-emerald-300 hover:bg-emerald-100 w-full"
                  >
                    Download Digital Pass Copy
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                  onClick={() => setGatePassGenerated(true)}
                >
                  Generate Digital Out-Pass QR
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
