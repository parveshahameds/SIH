import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Users,
  Check,
  X,
  Clock,
  Save,
  Download,
  KeyRound,
  ShieldCheck,
  MapPin,
  Wifi,
  Camera,
  RotateCcw,
  Radio,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { mockTeacherStudents, mockBatches, mockSmartAttendanceSession } from '../../data/mockData';
import { SmartAttendanceSession } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface TeacherAttendanceProps {
  onNavigate: (route: string) => void;
}

export const TeacherAttendance: React.FC<TeacherAttendanceProps> = ({ onNavigate }) => {
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0].id);
  const [selectedSession, setSelectedSession] = useState('CS602: Deep Learning Lab (Lab 402)');
  const [session, setSession] = useState<SmartAttendanceSession>(mockSmartAttendanceSession);
  const [secondsLeft, setSecondsLeft] = useState(session.expiresInSeconds);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const [hasGeneratedCode, setHasGeneratedCode] = useState(true);

  // Student statuses
  const [statuses, setStatuses] = useState<Record<string, 'present' | 'absent' | 'late'>>(() => {
    const init: Record<string, 'present' | 'absent' | 'late'> = {};
    mockTeacherStudents.forEach((s, i) => {
      init[s.id] = i === 2 ? 'absent' : 'present';
    });
    return init;
  });

  // Countdown timer for 6-digit code
  useEffect(() => {
    if (!isSessionActive || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev: number) => {
        if (prev <= 1) {
          setIsSessionActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSessionActive, secondsLeft]);

  // Generate unique temporary attendance code
  const handleGenerateNewCode = () => {
    const randomCode = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
    setSession((prev: SmartAttendanceSession) => ({ ...prev, code: randomCode }));
    setSecondsLeft(300);
    setIsSessionActive(true);
    setHasGeneratedCode(true);
  };

  const markAllPresent = () => {
    const next: Record<string, 'present' | 'absent' | 'late'> = {};
    mockTeacherStudents.forEach(s => { next[s.id] = 'present'; });
    setStatuses(next);
  };

  const toggleStatus = (studentId: string, newStatus: 'present' | 'absent' | 'late') => {
    setStatuses((prev: Record<string, 'present' | 'absent' | 'late'>) => ({ ...prev, [studentId]: newStatus }));
  };

  const presentCount = Object.values(statuses).filter(s => s === 'present').length;
  const absentCount = Object.values(statuses).filter(s => s === 'absent').length;
  const lateCount = Object.values(statuses).filter(s => s === 'late').length;

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white">Dynamic Session Code & Real-Time Roster</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Broadcast temporary verification tokens and monitor multi-factor check-in telemetry
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => alert('Exporting batch attendance log to CSV dossier...')}
            className="text-xs bg-slate-900 border-slate-800 text-slate-300"
          >
            Export Attendance CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={() => alert('Session attendance published to institutional Academic Bank of Credits (ABC)!')}
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500"
          >
            Commit Attendance Ledger
          </Button>
        </div>
      </div>

      {/* 1. SELECTION & CODE GENERATOR PANEL */}
      <div className="institutional-card rounded-3xl p-6 border border-slate-800 space-y-6 shadow-xl">
        {/* Selection Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              1. Select Batch Cohort
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {mockBatches.map(b => (
                <option key={b.id} value={b.id}>{b.name} ({b.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              2. Select Scheduled Class Session
            </label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="CS602: Deep Learning Lab (Lab 402)">CS602: Deep Learning Lab (NVIDIA AI Center Lab 402)</option>
              <option value="CS604: Distributed Systems Lecture (LH-301)">CS604: Distributed Systems Lecture (LH-301)</option>
              <option value="CS601: Graph Algorithms Tutorial (LH-102)">CS601: Graph Algorithms Tutorial (LH-102)</option>
            </select>
          </div>
        </div>

        {/* 2. Prominent Temporary Code Display with Countdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                Active Session Token
              </span>
              <span className="text-xs text-slate-400 font-mono">Validity: 5 Minutes</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-6 py-4 rounded-2xl bg-slate-950 border-2 border-indigo-500 font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-widest shadow-2xl">
                {isSessionActive ? session.code : 'EXPIRED'}
              </div>

              <Button
                variant="primary"
                size="md"
                icon={RotateCcw}
                onClick={handleGenerateNewCode}
                className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500"
              >
                Generate Code
              </Button>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Remaining: <strong className="text-white">{Math.floor(secondsLeft / 60)}:{('0' + (secondsLeft % 60)).slice(-2)}</strong>
              </span>
              <span className="text-emerald-400 font-bold">
                ✓ {session.verifiedCount} of {session.totalEnrolled} Checked In
              </span>
            </div>
          </div>

          {/* Enforced Security Rules */}
          <div className="lg:col-span-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Enforced Verification Criteria:
            </p>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                <MapPin className="w-4 h-4 text-indigo-400 mx-auto" />
                <p className="font-bold text-slate-200">15m Geofence</p>
                <span className="text-[9px] text-emerald-400">Enforced</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                <Wifi className="w-4 h-4 text-indigo-400 mx-auto" />
                <p className="font-bold text-slate-200">Campus Wi-Fi</p>
                <span className="text-[9px] text-emerald-400">Enforced</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                <Camera className="w-4 h-4 text-indigo-400 mx-auto" />
                <p className="font-bold text-slate-200">Face Biometrics</p>
                <span className="text-[9px] text-emerald-400">Enforced</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real-Time Attendee Roster & Manual Overrides */}
      <div className="institutional-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-white">Live Student Roster ({mockTeacherStudents.length})</span>
            <span className="text-emerald-400">✓ Present: {presentCount}</span>
            <span className="text-rose-400">✗ Absent: {absentCount}</span>
            <span className="text-amber-400">⏰ Late: {lateCount}</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Check}
            onClick={markAllPresent}
            className="text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
          >
            Mark All Present (Override)
          </Button>
        </div>

        <div className="divide-y divide-slate-800">
          {mockTeacherStudents.map((student) => {
            const current = statuses[student.id] || 'present';

            return (
              <div
                key={student.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{student.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {student.rollNumber} • Aggregate Attendance: {student.attendancePercentage}%
                    </p>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => toggleStatus(student.id, 'present')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      current === 'present'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    Present
                  </button>

                  <button
                    onClick={() => toggleStatus(student.id, 'absent')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      current === 'absent'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    Absent
                  </button>

                  <button
                    onClick={() => toggleStatus(student.id, 'late')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      current === 'late'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    Late
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
