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

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploadedResumeName, setUploadedResumeName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedResumeName(file.name);
      setTimeout(() => {
        alert(`Resume "${file.name}" uploaded successfully! AI analyzed 12 verified cooperative competencies.`);
      }, 300);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto pb-12">
      {/* Hidden file input for resume */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.docx,.doc,.txt"
        className="hidden"
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-slate-900">AI Career Lab & Placement Engine</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Verified Competency Match
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time cooperative job matching powered by verified competencies in your Skill Passport
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Upload}
            onClick={() => fileInputRef.current?.click()}
            className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {uploadedResumeName ? `Uploaded: ${uploadedResumeName.slice(0, 14)}...` : 'Upload Resume'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Sparkles}
            onClick={() => {
              resetInterview();
              setInterviewModalOpen(true);
            }}
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
          >
            Launch AI Mock Interview
          </Button>
        </div>
      </div>

      {/* AI Resume Diagnostics Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                Target Role: {studentData.targetRole}
              </Badge>
              <span className="text-xs text-slate-500">NEP Tier-1 Alignment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Your Profile is in the <span className="text-indigo-600">Top 4% Candidate Pool</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              Based on your verified PyTorch and Full-Stack certifications, your profile has an average 91.3% match across 14 hiring partners this week.
            </p>
          </div>

          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Placement Readiness Score
            </p>
            <div className="text-4xl font-extrabold text-indigo-600 font-mono">94 / 100</div>
            <ProgressBar value={94} size="sm" variant="brand" />
            <p className="text-[11px] text-emerald-700 font-medium">Verified Industry Interview Ready</p>
          </div>
        </div>
      </div>

      {/* Job Opportunities Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          High-Match Job & Internship Openings (Verified Matches)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCareerJobs.map((job) => (
            <Card
              key={job.id}
              variant="interactive"
              padding="md"
              onClick={() => setSelectedJob(job)}
              className={`bg-white border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all ${
                selectedJob.id === job.id ? 'ring-2 ring-indigo-500 border-indigo-300' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200 shadow-xs"
                  />
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {job.skillMatchPercentage}% Match
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">{job.company}</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-indigo-600">
                    <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{job.stipendOrSalary}</span>
                  </div>
                </div>

                {/* Matched Skills */}
                <div className="space-y-1 pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Matched Skills:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {job.matchedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 border border-slate-200 text-indigo-700"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Due: {job.applyDeadline}</span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Application submitted to ${job.company} via SahakarSetu Skill Passport!`);
                  }}
                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
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
          <div className="space-y-6 text-slate-900">
            {interviewFinished ? (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 text-center space-y-5 animate-fade-in shadow-xs">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Interview Round Complete!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    AI evaluation report generated and added to your Career Lab telemetry
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Technical Depth</p>
                    <p className="text-xl font-mono font-bold text-indigo-600">92%</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Communication</p>
                    <p className="text-xl font-mono font-bold text-indigo-600">88%</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-500">STAR Format</p>
                    <p className="text-xl font-mono font-bold text-emerald-700">95%</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                  <p className="font-bold text-indigo-700">AI Evaluator Feedback:</p>
                  <p className="text-slate-700 leading-relaxed">
                    "Excellent explanation of multi-head projection subspaces and PACELC trade-offs. To reach 100%, emphasize memory footprint numbers (e.g. KV cache byte calculation) during deep learning systems rounds."
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" onClick={resetInterview} className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                    Retake Interview
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setInterviewModalOpen(false)} className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white">
                    Save Report to Passport
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Question Card */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/90 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {currentQuestion.category}
                    </span>
                    <span className="text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Target: {currentQuestion.targetDurationSeconds}s
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    "{currentQuestion.question}"
                  </h3>
                </div>

                {/* Speech Recording Simulation */}
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
                  {isRecording ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-1 h-12">
                        {[40, 70, 90, 30, 80, 100, 45, 65, 85, 35, 95].map((h, i) => (
                          <div
                            key={i}
                            className="w-1.5 bg-indigo-600 rounded-full waveform-bar"
                            style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-xs font-mono font-bold text-rose-600 animate-pulse">
                        ● RECORDING LIVE SPEECH... SPEAK CLEARLY
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500">
                      Click the microphone below to simulate speaking your technical response.
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className={`p-4 rounded-full transition-all ${
                        isRecording
                          ? 'bg-rose-600 text-white shadow-md ring-4 ring-rose-500/20'
                          : 'bg-white border border-slate-300 text-indigo-600 hover:bg-slate-100 shadow-xs'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {/* Answer Transcript or Text Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Your Response / Speech Transcript
                  </label>
                  <textarea
                    rows={3}
                    value={currentAnswerText}
                    onChange={(e) => setCurrentAnswerText(e.target.value)}
                    placeholder="Transcript will stream here or type notes..."
                    className="w-full rounded-2xl border border-slate-300 bg-white p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">
                    Question {currentQuestionIndex + 1} of {mockInterviewQuestions.length}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNextQuestion}
                    className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
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
