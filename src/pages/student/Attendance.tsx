import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Sparkles,
  TrendingUp,
  Download,
  ShieldCheck,
  Camera,
  MapPin,
  Wifi,
  KeyRound,
  ArrowRight,
  RefreshCw,
  XCircle,
  Award,
  ChevronLeft
} from 'lucide-react';
import { mockAttendanceRecords, mockSmartAttendanceSession } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

interface AttendanceProps {
  onNavigate: (route: string) => void;
}

export const Attendance: React.FC<AttendanceProps> = ({ onNavigate }) => {
  const { studentData, updateStudentData } = useAuth();
  const [records, setRecords] = useState(mockAttendanceRecords);

  // Dedicated Verification Mode: 'idle' | 'verifying' | 'success'
  const [verificationMode, setVerificationMode] = useState<'idle' | 'verifying' | 'success'>('idle');
  
  // Step in verification: 1: Location -> 2: Wi-Fi -> 3: Face Scan -> 4: Unique Code
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  // Dynamic step states
  const [isProcessingStep, setIsProcessingStep] = useState(false);
  const [faceScanProgress, setFaceScanProgress] = useState(0);
  const [enteredCode, setEnteredCode] = useState('');
  const [codeError, setCodeError] = useState<string | null>(null);

  const totalClassesSum = records.reduce((acc, s) => acc + s.totalClasses, 0);
  const attendedClassesSum = records.reduce((acc, s) => acc + s.attendedClasses, 0);
  const aggregatePercentage = ((attendedClassesSum / totalClassesSum) * 100).toFixed(1);

  // Reset and start flow
  const startVerificationFlow = () => {
    setVerificationMode('verifying');
    setActiveStep(1);
    setCompletedSteps([]);
    setIsProcessingStep(false);
    setFaceScanProgress(0);
    setEnteredCode('');
    setCodeError(null);
  };

  // Step 1: Run Location Scan
  const handleLocationScan = () => {
    setIsProcessingStep(true);
    setTimeout(() => {
      setIsProcessingStep(false);
      setCompletedSteps(prev => [...prev, 1]);
      setActiveStep(2);
    }, 1600);
  };

  // Step 2: Run Authorized Wi-Fi Check
  const handleWifiCheck = () => {
    setIsProcessingStep(true);
    setTimeout(() => {
      setIsProcessingStep(false);
      setCompletedSteps(prev => [...prev, 2]);
      setActiveStep(3);
    }, 1400);
  };

  // Step 3: Run Face Biometric Scan
  const handleFaceScan = () => {
    setIsProcessingStep(true);
    setFaceScanProgress(0);
    const interval = setInterval(() => {
      setFaceScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessingStep(false);
          setCompletedSteps(prevDone => [...prevDone, 3]);
          setActiveStep(4);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  // Step 4: Validate Unique 6-Digit Code
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = enteredCode.replace(/\s+/g, '');
    if (cleanCode !== '849201' && cleanCode !== '849 201') {
      setCodeError('Invalid code. Please enter active code broadcasted by teacher (849 201).');
      return;
    }

    setCodeError(null);
    setCompletedSteps(prev => [...prev, 4]);

    // Update Attendance Record
    setRecords(prev =>
      prev.map(r => {
        if (r.subjectCode === 'CS602') {
          return {
            ...r,
            attendedClasses: r.attendedClasses + 1,
            percentage: 97.2,
            lastClassDate: 'Today, Just Now (Verified)'
          };
        }
        return r;
      })
    );

    updateStudentData({
      attendanceRate: 92.4,
      xpPoints: studentData.xpPoints + 100
    });

    setVerificationMode('success');
  };

  // View: Dedicated Verification Flow
  if (verificationMode === 'verifying' || verificationMode === 'success') {
    return (
      <div className="max-w-3xl mx-auto py-4 space-y-6 animate-fade-in text-slate-100">
        {/* Navigation back */}
        <button
          onClick={() => setVerificationMode('idle')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Attendance Overview</span>
        </button>

        {/* Dedicated Verification Container */}
        <div className="institutional-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Institutional Security Protocol
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Multi-Factor Attendance Verification
              </h2>
              <p className="text-xs text-slate-400">
                Session: <strong className="text-slate-200">CS602 Deep Learning (Lab 402)</strong> • Dr. Rajesh Verma
              </p>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Step {verificationMode === 'success' ? 4 : activeStep} of 4</span>
            </div>
          </div>

          {/* Sequential 4-Step Indicator Bar */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Location' },
              { num: 2, label: 'Campus Wi-Fi' },
              { num: 3, label: 'Face Biometrics' },
              { num: 4, label: 'Session Code' }
            ].map(step => {
              const isDone = completedSteps.includes(step.num);
              const isCurrent = activeStep === step.num && verificationMode !== 'success';

              return (
                <div
                  key={step.num}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isDone
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                      : isCurrent
                      ? 'bg-indigo-950/80 border-indigo-500 text-white font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-mono">{step.num}.</span>
                    )}
                    <span className="truncate">{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SUCCESS SCREEN */}
          {verificationMode === 'success' ? (
            <div className="py-8 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Attendance Marked Successfully</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                  All 4 verification checks authenticated. Your verified presence for <strong>CS602: Deep Learning & Neural Networks</strong> has been cryptographically recorded into the institutional ledger.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950 border border-amber-700 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4" /> +100 Attendance XP Awarded!
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Student ID:</span>
                  <span className="text-slate-200">{studentData.rollNumber}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Timestamp:</span>
                  <span className="text-slate-200">Today, 09:14:22 AM</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Ledger Hash:</span>
                  <span className="text-indigo-400">0x7c9a...3e198b</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setVerificationMode('idle')}
                className="text-xs font-bold"
              >
                Return to Attendance Dashboard
              </Button>
            </div>
          ) : (
            /* ACTIVE STEP VIEW */
            <div className="space-y-6">
              {/* STEP 1: Location Scan */}
              {activeStep === 1 && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-5">
                  <div className="relative w-28 h-28 mx-auto rounded-full bg-slate-950 border border-indigo-500/40 flex items-center justify-center">
                    <div className="radar-ring absolute w-20 h-20 rounded-full border border-indigo-400" />
                    <MapPin className="w-7 h-7 text-indigo-400 z-10" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Step 1: Geofence Location Verification</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Verifying proximity to <strong>NVIDIA AI Center Lab 402</strong> beacon (Allowed radius: 15 meters).
                    </p>
                  </div>

                  {isProcessingStep ? (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 animate-pulse">
                      Acquiring GPS coordinates & validating beacon distance...
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                      ✓ Coordinate Beacon Detected: 4.8 meters from Lab 402
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleLocationScan}
                    isLoading={isProcessingStep}
                    className="text-xs font-bold"
                  >
                    Authenticate Location Check
                  </Button>
                </div>
              )}

              {/* STEP 2: Authorized Wi-Fi Verification */}
              {activeStep === 2 && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
                    <Wifi className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Step 2: Authorized Campus Wi-Fi Network Check</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Verifying cryptographic BSSID handshake with institutional access point <strong>Campus-Secure-5G</strong>.
                    </p>
                  </div>

                  {isProcessingStep ? (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 animate-pulse">
                      Verifying Wi-Fi gateway hardware signature...
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                      SSID: <span className="text-indigo-400">Campus-Secure-5G</span> (BSSID: 04:d2:92:ef:21:aa)
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleWifiCheck}
                    isLoading={isProcessingStep}
                    className="text-xs font-bold"
                  >
                    Authenticate Wi-Fi Handshake
                  </Button>
                </div>
              )}

              {/* STEP 3: Face Scan (Camera-Style Viewport with Frame) */}
              {activeStep === 3 && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-5">
                  {/* Camera Viewport */}
                  <div className="relative w-56 h-56 mx-auto rounded-3xl bg-slate-950 border-2 border-indigo-500 overflow-hidden flex items-center justify-center shadow-xl">
                    <img
                      src={studentData.avatar}
                      alt={studentData.name}
                      className="w-full h-full object-cover opacity-80"
                    />

                    {/* Camera Viewport Framing Brackets */}
                    <div className="absolute inset-3 border border-indigo-400/40 rounded-2xl pointer-events-none" />
                    <div className="camera-sweep absolute top-0 left-0" />

                    <div className="absolute bottom-2 inset-x-2 flex justify-between items-center text-[10px] font-mono text-white bg-slate-950/80 px-2 py-1 rounded-lg">
                      <span>LIVENESS: PASS</span>
                      <span className="text-indigo-300">{isProcessingStep ? `${faceScanProgress}%` : 'READY'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Step 3: Biometric Face Recognition</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Align your face within the optical frame to authenticate against institutional records.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    icon={Camera}
                    onClick={handleFaceScan}
                    isLoading={isProcessingStep}
                    className="text-xs font-bold"
                  >
                    {isProcessingStep ? `Scanning Facial Landmarks (${faceScanProgress}%)...` : 'Start Face Biometric Scan'}
                  </Button>
                </div>
              )}

              {/* STEP 4: Unique Code Prompt */}
              {activeStep === 4 && (
                <form onSubmit={handleCodeSubmit} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-indigo-500/40 flex items-center justify-center mx-auto text-indigo-400">
                    <KeyRound className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">Step 4: Enter Faculty Dynamic Session Code</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Enter the 6-digit code displayed on the lab instructor screen. (Hint: <strong>849 201</strong>)
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <input
                      type="text"
                      maxLength={7}
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      placeholder="849 201"
                      className="w-full text-center tracking-widest text-2xl font-mono font-bold bg-slate-950 border border-slate-700 rounded-2xl py-3 text-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      autoFocus
                    />
                  </div>

                  {codeError && (
                    <p className="text-xs text-rose-400 font-semibold">{codeError}</p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={!enteredCode.trim()}
                    className="text-xs font-bold"
                  >
                    Verify Token & Finalize Attendance
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // View: Standard Attendance Overview & Subject Breakdown
  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">College Attendance Ledger</h2>
            <Badge variant="success" size="sm" dot>
              Eligibility Safe (&gt;75%)
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified academic presence and institutional examination eligibility criteria
          </p>
        </div>

        {/* Primary Action Button */}
        <Button
          variant="primary"
          size="md"
          icon={ShieldCheck}
          onClick={startVerificationFlow}
          className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
        >
          Mark Attendance (CS602 Lab 402)
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Overall Attendance Rate"
          value={`${aggregatePercentage}%`}
          subtitle={`${attendedClassesSum} of ${totalClassesSum} Total Classes`}
          icon={CheckCircle2}
          iconBgColor="bg-emerald-950"
          iconColor="text-emerald-400"
          trend={{ value: 'Exam Safe', isPositive: true }}
          className="institutional-card border-slate-800"
        />

        <StatCard
          title="Active Live Session"
          value="CS602 Lab 402"
          subtitle="Verification Open (Expires in 4 mins)"
          icon={Clock}
          iconBgColor="bg-indigo-950"
          iconColor="text-indigo-400"
          badge="Live Check-in"
          className="institutional-card border-slate-800"
        />

        <StatCard
          title="Subjects At Risk"
          value="1 Subject"
          subtitle="ENV201 (72.2%) Needs 2 Classes"
          icon={AlertTriangle}
          iconBgColor="bg-amber-950"
          iconColor="text-amber-400"
          trend={{ value: 'Warning Alert', isPositive: false }}
          className="institutional-card border-slate-800"
        />
      </div>

      {/* Subject-Wise Attendance Breakdown Table */}
      <div className="institutional-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Subject-Wise Attendance Breakdown</h3>
          <span className="text-xs text-slate-400 font-mono">Academic Session 2026-27</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject & Code</th>
                <th className="py-3 px-4">Faculty In-Charge</th>
                <th className="py-3 px-4 text-center">Attended / Total</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Last Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {records.map((item) => {
                const isWarning = item.percentage < 75;

                return (
                  <tr key={item.subjectCode} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-400 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                          {item.subjectCode}
                        </span>
                        <span className="font-semibold text-white">{item.subjectName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {item.facultyName}
                    </td>

                    <td className="py-3.5 px-4 text-center font-bold text-white font-mono">
                      {item.attendedClasses} / {item.totalClasses}
                    </td>

                    <td className="py-3.5 px-4 w-44">
                      <div className="space-y-1">
                        <div className="flex justify-between font-mono text-xs">
                          <span className={isWarning ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {item.percentage}%
                          </span>
                        </div>
                        <ProgressBar
                          value={item.percentage}
                          size="sm"
                          variant={isWarning ? 'danger' : 'success'}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <Badge variant={isWarning ? 'danger' : 'success'} size="sm" dot>
                        {isWarning ? 'Warning (<75%)' : 'Eligible'}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-400 font-medium">
                      {item.lastClassDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
