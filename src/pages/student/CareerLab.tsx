import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Award,
  Upload,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  MapPin,
  Mic,
  MicOff,
  Clock,
  Play,
  RotateCcw,
  Volume2
} from 'lucide-react';
import { mockCareerJobs, mockInterviewQuestions } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

interface CareerLabProps {
  onNavigate: (route: string) => void;
}

export const CareerLab: React.FC<CareerLabProps> = ({ onNavigate }) => {
  const { studentData } = useAuth();
  const [selectedJob, setSelectedJob] = useState(mockCareerJobs[0]);
  
  // Interactive Mock Interview State Machine
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [currentAnswerText, setCurrentAnswerText] = useState('');
  const [interviewFinished, setInterviewFinished] = useState(false);

  const currentQuestion = mockInterviewQuestions[currentQuestionIndex];

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleNextQuestion = () => {
    // Save current answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentAnswerText || 'Completed via simulated audio recording.'
    }));
    setCurrentAnswerText('');
    setIsRecording(false);

    if (currentQuestionIndex < mockInterviewQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setInterviewFinished(true);
    }
  };

  const resetInterview = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCurrentAnswerText('');
    setInterviewFinished(false);
    setIsRecording(false);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-white">AI Career Lab & Placement Engine</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/60">
              Verified Competency Match
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time job matching powered by verified competencies in your Skill Passport
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Upload}
            onClick={() => alert('Resume uploaded! AI parsed 18 technical credentials.')}
            className="text-xs bg-slate-900 border-slate-800 text-slate-300"
          >
            Upload Resume
          </Button>
          <Button
            variant="glow"
            size="sm"
            icon={Sparkles}
            onClick={() => {
              resetInterview();
              setInterviewModalOpen(true);
            }}
            className="text-xs font-bold bg-gradient-to-r from-brand-600 to-cyan-600 shadow-md shadow-cyan-500/20"
          >
            Launch AI Mock Interview
          </Button>
        </div>
      </div>

      {/* AI Resume Diagnostics Hero Banner */}
      <div className="cyber-glass rounded-3xl p-6 sm:p-8 border border-slate-800 glow-violet">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="sm" className="bg-brand-950 text-cyan-300 border-cyan-800">
                Target Role: {studentData.targetRole}
              </Badge>
              <span className="text-xs text-slate-400">NEP Tier-1 Alignment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Your Profile is in the <span className="text-cyan-400">Top 4% Candidate Pool</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              Based on your verified PyTorch and Full-Stack certifications, your profile has an average 91.3% match across 14 hiring partners this week.
            </p>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-700 text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Placement Readiness Score
            </p>
            <div className="text-4xl font-extrabold text-cyan-300 font-mono">94 / 100</div>
            <ProgressBar value={94} size="sm" variant="gradient" />
            <p className="text-[11px] text-emerald-400 font-medium">✓ Industry Interview Ready</p>
          </div>
        </div>
      </div>

      {/* Job Opportunities Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">
          High-Match Job & Internship Openings (Verified Matches)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCareerJobs.map((job) => (
            <Card
              key={job.id}
              variant="interactive"
              padding="md"
              onClick={() => setSelectedJob(job)}
              className={`cyber-glass border-slate-800 flex flex-col justify-between ${
                selectedJob.id === job.id ? 'ring-2 ring-cyan-500' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-700"
                  />
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {job.skillMatchPercentage}% Match
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium">{job.company}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{job.stipendOrSalary}</span>
                  </div>
                </div>

                {/* Matched Skills */}
                <div className="space-y-1 pt-2 border-t border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Matched Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {job.matchedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-900 border border-slate-800 text-cyan-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">Due: {job.applyDeadline}</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Application submitted to ${job.company} via CoLearn Skill Passport!`);
                  }}
                  className="text-xs"
                >
                  1-Click Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* INTERACTIVE AI MOCK INTERVIEW MODAL */}
      {interviewModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setInterviewModalOpen(false)}
          title="AI Technical Mock Interview Simulator"
          subtitle={`Target Role: ${studentData.targetRole} • Question ${currentQuestionIndex + 1} of ${mockInterviewQuestions.length}`}
          size="lg"
        >
          <div className="space-y-6 text-slate-100">
            {interviewFinished ? (
              <div className="p-6 rounded-3xl cyber-glass border border-slate-800 text-center space-y-5 animate-fade-in glow-emerald">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">Interview Round Complete! 🎉</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    AI evaluation report generated and added to your Career Lab telemetry
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Technical Depth</p>
                    <p className="text-xl font-mono font-bold text-cyan-400">92%</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Communication</p>
                    <p className="text-xl font-mono font-bold text-brand-400">88%</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-400">STAR Format</p>
                    <p className="text-xl font-mono font-bold text-emerald-400">95%</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
                  <p className="font-bold text-cyan-300">💡 AI Evaluator Feedback:</p>
                  <p className="text-slate-300 leading-relaxed">
                    "Excellent explanation of multi-head projection subspaces and PACELC trade-offs. To reach 100%, emphasize memory footprint numbers (e.g. KV cache byte calculation) during deep learning systems rounds."
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" onClick={resetInterview}>
                    Retake Interview
                  </Button>
                  <Button variant="glow" size="sm" onClick={() => setInterviewModalOpen(false)}>
                    Save Report to Passport
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Question Card */}
                <div className="p-5 rounded-3xl cyber-glass border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-full font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {currentQuestion.category}
                    </span>
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Target: {currentQuestion.targetDurationSeconds}s
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    "{currentQuestion.question}"
                  </h3>
                </div>

                {/* Speech Recording Simulation */}
                <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-4">
                  {isRecording ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-1 h-12">
                        {[40, 70, 90, 30, 80, 100, 45, 65, 85, 35, 95].map((h, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-cyan-400 rounded-full waveform-bar"
                            style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-mono font-bold text-rose-400 animate-pulse">
                        ● RECORDING LIVE SPEECH... SPEAK CLEARLY
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      Click the microphone below to simulate speaking your technical response.
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className={`p-4 rounded-full transition-all ${
                        isRecording
                          ? 'bg-rose-600 text-white shadow-xl shadow-rose-600/40 ring-4 ring-rose-500/20'
                          : 'bg-slate-900 border border-slate-700 text-cyan-400 hover:bg-slate-800'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {/* Answer Transcript or Text Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Your Response / Speech Transcript
                  </label>
                  <textarea
                    rows={3}
                    value={currentAnswerText}
                    onChange={(e) => setCurrentAnswerText(e.target.value)}
                    placeholder="Transcript will stream here or type notes..."
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-3 text-xs text-white placeholder:text-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-500">
                    Question {currentQuestionIndex + 1} of {mockInterviewQuestions.length}
                  </span>
                  <Button
                    variant="glow"
                    size="sm"
                    onClick={handleNextQuestion}
                    className="text-xs font-bold"
                  >
                    {currentQuestionIndex === mockInterviewQuestions.length - 1 ? 'Finish & Score' : 'Next Question →'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
