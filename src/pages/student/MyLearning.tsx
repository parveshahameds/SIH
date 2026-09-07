import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Download,
  Sparkles,
  ChevronRight,
  ExternalLink,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Search,
  Check,
  Building2,
  Wheat,
  Banknote,
  Briefcase,
  Laptop,
  GraduationCap,
  Layers,
  Lightbulb
} from 'lucide-react';
import { mockStudentCourses } from '../../data/mockData';
import { Course, CourseCategory } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

import { exportCourseStudyKit } from '../../utils/exportUtils';

interface MyLearningProps {
  onNavigate: (route: string) => void;
}

export const MyLearning: React.FC<MyLearningProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [downloadedCourses, setDownloadedCourses] = useState<string[]>([
    'crs_coop_01',
    'crs_dairy_01',
    'crs_dig_01'
  ]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Active Tab inside Course Detail Modal
  const [modalTab, setModalTab] = useState<'overview' | 'syllabus' | 'quiz'>('overview');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoProgressSec, setVideoProgressSec] = useState(45);

  // Interactive In-Course Quiz State
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number; percentage: number } | null>(null);
  const [detectedGaps, setDetectedGaps] = useState<string[]>([]);

  const categories: { id: string; label: string; icon: any }[] = [
    { id: 'All', label: 'All Sectors', icon: Layers },
    { id: 'Cooperative', label: 'Cooperative', icon: Building2 },
    { id: 'Finance', label: 'Finance', icon: Banknote },
    { id: 'Agriculture', label: 'Agriculture', icon: Wheat },
    { id: 'Dairy', label: 'Dairy', icon: Award },
    { id: 'Entrepreneurship', label: 'Entrepreneurship', icon: Lightbulb },
    { id: 'Digital', label: 'Digital', icon: Laptop },
    { id: 'Employability', label: 'Employability', icon: Briefcase },
    { id: 'offline', label: 'Offline Ready', icon: Download }
  ];

  const handleToggleDownload = (courseId: string) => {
    const targetCourse = mockStudentCourses.find(c => c.id === courseId);
    if (!targetCourse) return;

    if (downloadedCourses.includes(courseId)) {
      setDownloadedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      setDownloadingId(courseId);
      setTimeout(() => {
        setDownloadedCourses(prev => [...prev, courseId]);
        setDownloadingId(null);
        // Real file download
        exportCourseStudyKit(targetCourse);
      }, 800);
    }
  };

  const filteredCourses = mockStudentCourses.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.tags && c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'offline') return downloadedCourses.includes(c.id);
    return c.category === selectedCategory;
  });

  const openCourseModal = (course: Course, tab: 'overview' | 'syllabus' | 'quiz' = 'overview') => {
    setSelectedCourse(course);
    setModalTab(tab);
    setUserQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setDetectedGaps([]);
  };

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleEvaluateQuiz = () => {
    if (!selectedCourse?.quiz) return;
    const questions = selectedCourse.quiz.questions;
    let correctCount = 0;
    const gaps: string[] = [];

    questions.forEach(q => {
      const selected = userQuizAnswers[q.id];
      if (selected === q.correctIndex) {
        correctCount += 1;
      } else {
        if (q.topicTag) gaps.push(q.topicTag);
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    setQuizScore({
      correct: correctCount,
      total: questions.length,
      percentage
    });
    setDetectedGaps(gaps);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setUserQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setDetectedGaps([]);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto pb-12">
      {/* Top Banner / NCCT Heading */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-indigo-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>National Council for Cooperative Training (NCCT) LMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              7 Cooperative Sectors Training & Certification
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Standardized curricula for PACS personnel, dairy societies, SHGs, and rural youth with interactive quizzes, weak-topic diagnostic tracking, and offline module access.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-2">
              <p className="text-xl sm:text-2xl font-black text-cyan-400">7</p>
              <p className="text-[10px] uppercase font-bold text-slate-300 mt-0.5">Sectors</p>
            </div>
            <div className="text-center px-2 border-x border-white/10">
              <p className="text-xl sm:text-2xl font-black text-emerald-400">20</p>
              <p className="text-[10px] uppercase font-bold text-slate-300 mt-0.5">Courses</p>
            </div>
            <div className="text-center px-2">
              <p className="text-xl sm:text-2xl font-black text-amber-400">100%</p>
              <p className="text-[10px] uppercase font-bold text-slate-300 mt-0.5">NSQF/NEP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Search Strip */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, PACS bye-laws, KCC, dairy tests..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 justify-end">
            <span>Showing: <strong className="text-slate-900">{filteredCourses.length}</strong> modules</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                <span>{cat.label}</span>
                {cat.id === 'offline' && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold ml-1">
                    {downloadedCourses.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isDownloaded = downloadedCourses.includes(course.id);
          const isDownloading = downloadingId === course.id;

          const categoryColors: Record<string, { badge: string; border: string }> = {
            Cooperative: { badge: 'bg-indigo-50 text-indigo-700 border-indigo-200', border: 'hover:border-indigo-400' },
            Finance: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', border: 'hover:border-emerald-400' },
            Agriculture: { badge: 'bg-amber-50 text-amber-700 border-amber-200', border: 'hover:border-amber-400' },
            Dairy: { badge: 'bg-blue-50 text-blue-700 border-blue-200', border: 'hover:border-blue-400' },
            Entrepreneurship: { badge: 'bg-purple-50 text-purple-700 border-purple-200', border: 'hover:border-purple-400' },
            Digital: { badge: 'bg-cyan-50 text-cyan-700 border-cyan-200', border: 'hover:border-cyan-400' },
            Employability: { badge: 'bg-rose-50 text-rose-700 border-rose-200', border: 'hover:border-rose-400' }
          };

          const colorTheme = categoryColors[course.category] || { badge: 'bg-slate-100 text-slate-700 border-slate-200', border: 'hover:border-slate-400' };

          return (
            <Card
              key={course.id}
              variant="elevated"
              padding="none"
              className={`overflow-hidden flex flex-col justify-between group border-slate-200/90 bg-white shadow-xs transition-all duration-200 ${colorTheme.border}`}
            >
              <div>
                {/* Thumbnail Image with Category Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-white/95 text-slate-900 border border-slate-200 shadow-xs backdrop-blur-xs">
                    {course.code} • {course.credits} Credits
                  </span>

                  <span className="absolute bottom-3 right-3 text-xs font-bold text-white flex items-center gap-1 drop-shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-cyan-300" />
                    {course.totalHours} Hours
                  </span>

                  {course.quiz && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/90 text-white flex items-center gap-1 shadow-xs">
                      <HelpCircle className="w-3 h-3" />
                      Quiz Checkpoint Included
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${colorTheme.badge}`}>
                      {course.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {course.completedModules}/{course.totalModules} Modules
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="pt-2">
                    <ProgressBar
                      value={course.progressPercentage}
                      showValue
                      label="Curriculum Progress"
                      size="sm"
                      variant={course.status === 'completed' ? 'success' : 'brand'}
                    />
                  </div>

                  {/* Offline Download Option */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleToggleDownload(course.id)}
                      disabled={isDownloading}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all ${
                        isDownloaded
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Download className="w-3 h-3 text-indigo-600" />
                        <span>
                          {isDownloading
                            ? 'Downloading Module Files (32 MB)...'
                            : isDownloaded
                            ? 'Saved Offline (Village Ready)'
                            : 'Download for Offline Study'}
                        </span>
                      </div>
                      {isDownloaded && (
                        <span className="text-[10px] text-emerald-700 font-bold">✓ Synced</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <span className="text-xs text-slate-700 font-medium truncate max-w-[130px]">
                    {course.instructor}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {course.quiz && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openCourseModal(course, 'quiz')}
                      className="text-xs px-2.5 py-1 text-amber-700 border-amber-300 hover:bg-amber-50"
                      title="Take Module Quiz"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>Quiz</span>
                    </Button>
                  )}
                  <Button
                    variant={course.status === 'completed' ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => openCourseModal(course, 'overview')}
                    icon={course.status === 'completed' ? CheckCircle2 : Play}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
                  >
                    {course.status === 'completed' ? 'Review' : 'Continue'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Course Detail / Learning Workspace Modal */}
      {selectedCourse && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
          title={`${selectedCourse.code}: ${selectedCourse.title}`}
          subtitle={`Faculty: ${selectedCourse.instructor} • ${selectedCourse.category} Sector • ${selectedCourse.credits} Credits`}
          size="xl"
          footer={
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
              <span className="text-xs text-slate-500 font-medium">
                Overall Progress: <strong>{selectedCourse.progressPercentage}%</strong> Completed
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedCourse(null)}>
                  Close
                </Button>
                {modalTab !== 'quiz' && selectedCourse.quiz && (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={HelpCircle}
                    onClick={() => setModalTab('quiz')}
                    className="text-amber-800 border-amber-300 bg-amber-50 hover:bg-amber-100"
                  >
                    Take Topic Quiz
                  </Button>
                )}
                {modalTab === 'quiz' && !quizSubmitted && (
                  <Button
                    variant="glow"
                    size="sm"
                    icon={Check}
                    onClick={handleEvaluateQuiz}
                    disabled={Object.keys(userQuizAnswers).length === 0}
                  >
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Modal Internal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                onClick={() => setModalTab('overview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  modalTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Video & Overview</span>
              </button>

              <button
                onClick={() => setModalTab('syllabus')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  modalTab === 'syllabus'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Modules & Study Material</span>
              </button>

              {selectedCourse.quiz && (
                <button
                  onClick={() => setModalTab('quiz')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    modalTab === 'quiz'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Interactive Quiz Test</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-100 text-amber-900 font-extrabold">
                    AI Scored
                  </span>
                </button>
              )}
            </div>

            {/* TAB 1: OVERVIEW & VIDEO PLAYER */}
            {modalTab === 'overview' && (
              <div className="space-y-5">
                {/* Video Lecture Player */}
                <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex flex-col justify-between border border-slate-800 shadow-inner p-4">
                  <img
                    src={selectedCourse.thumbnail}
                    alt="Lesson preview"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isPlayingVideo ? 'opacity-25' : 'opacity-40'
                    }`}
                  />
                  
                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600/80 text-white backdrop-blur-md border border-indigo-400/30">
                      {isPlayingVideo ? '▶ Video Streaming (1080p HD)' : 'Lesson Paused'}
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">
                      NCCT Digital Classroom Node
                    </span>
                  </div>

                  {/* Center Action */}
                  <div className="relative text-center space-y-2 z-10 max-w-lg mx-auto">
                    <button
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/50 hover:scale-110 transition-transform cursor-pointer"
                    >
                      {isPlayingVideo ? (
                        <div className="w-5 h-5 flex gap-1 justify-center items-center">
                          <span className="w-1.5 h-5 bg-white rounded-xs" />
                          <span className="w-1.5 h-5 bg-white rounded-xs" />
                        </div>
                      ) : (
                        <Play className="w-7 h-7 ml-1 fill-white" />
                      )}
                    </button>
                    <div className="space-y-0.5">
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        {selectedCourse.nextLessonTitle}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {selectedCourse.instructor} • {selectedCourse.nextLessonDuration}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Video Controls Scrubber */}
                  <div className="relative z-10 space-y-1 bg-slate-950/70 p-2 rounded-xl backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between text-[10px] text-slate-300 font-mono">
                      <span>{isPlayingVideo ? '04:12' : '00:00'}</span>
                      <span>{selectedCourse.nextLessonDuration}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full transition-all duration-300"
                        style={{ width: isPlayingVideo ? '42%' : '15%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Course Description */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Course Scope & Syllabus Context
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Learning Outcomes */}
                {selectedCourse.learningOutcomes && (
                  <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2.5">
                    <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-indigo-600" />
                      Key Competencies & Practical Skills Gained
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {selectedCourse.learningOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SYLLABUS & MODULES */}
            {modalTab === 'syllabus' && (
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">
                    Syllabus: {selectedCourse.totalModules} Units ({selectedCourse.totalHours} Hours)
                  </span>
                  <button
                    onClick={() => handleToggleDownload(selectedCourse.id)}
                    className="flex items-center gap-1 text-indigo-600 font-bold hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Offline PDF Kit</span>
                  </button>
                </div>

                {/* Module List Mockup */}
                <div className="space-y-2.5">
                  {[
                    { title: 'Unit 1: Foundational Framework & Regulatory Guidelines', dur: '4.5 Hours', completed: true },
                    { title: 'Unit 2: Operational Protocols, Bookkeeping & Ledger Maintenance', dur: '6.0 Hours', completed: true },
                    { title: 'Unit 3: Case Studies in Village Cooperatives & PACS Realities', dur: '5.5 Hours', completed: selectedCourse.completedModules >= 3 },
                    { title: 'Unit 4: Digital Tools, ERP Integration & Audit Defense', dur: '6.0 Hours', completed: selectedCourse.completedModules >= 4 },
                    { title: 'Unit 5: Field Demonstration & Certification Assessment', dur: '6.0 Hours', completed: selectedCourse.completedModules >= 5 }
                  ].map((unit, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        unit.completed
                          ? 'bg-white border-slate-200'
                          : 'bg-slate-50/70 border-slate-200/60 opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            unit.completed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {unit.completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{unit.title}</p>
                          <p className="text-[11px] text-slate-500">Estimated Duration: {unit.dur}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          unit.completed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {unit.completed ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: INTERACTIVE QUIZ & WEAK-TOPIC DIAGNOSTICS */}
            {modalTab === 'quiz' && selectedCourse.quiz && (
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-700" />
                      {selectedCourse.quiz.title}
                    </h4>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Passing Threshold: <strong>{selectedCourse.quiz.passingScore}%</strong> • Instant AI Feedback & Weak-Topic Detection
                    </p>
                  </div>

                  {quizSubmitted && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={RotateCcw}
                      onClick={handleResetQuiz}
                      className="text-xs text-slate-700 bg-white"
                    >
                      Retake Quiz
                    </Button>
                  )}
                </div>

                {/* Score Alert */}
                {quizSubmitted && quizScore && (
                  <div
                    className={`p-4 rounded-2xl border ${
                      quizScore.percentage >= (selectedCourse.quiz.passingScore || 70)
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-extrabold flex items-center gap-1.5">
                          {quizScore.percentage >= (selectedCourse.quiz.passingScore || 70) ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Assessment Passed! Score: {quizScore.percentage}% ({quizScore.correct}/{quizScore.total})
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-rose-600" />
                              Attention Needed: Score: {quizScore.percentage}% ({quizScore.correct}/{quizScore.total})
                            </>
                          )}
                        </h4>
                        <p className="text-xs mt-1 opacity-90">
                          {quizScore.percentage >= (selectedCourse.quiz.passingScore || 70)
                            ? 'Great job! This competency has been verified and added to your Skill Passport.'
                            : 'AI detected concept gaps in your answers. Review the recommended remedial modules below.'}
                        </p>
                      </div>

                      <Badge
                        variant={quizScore.percentage >= 70 ? 'success' : 'danger'}
                        size="md"
                      >
                        {quizScore.percentage}%
                      </Badge>
                    </div>

                    {/* Detected Gaps Warning */}
                    {detectedGaps.length > 0 && (
                      <div className="mt-3 p-3 bg-white/80 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          AI Weak-Topic Detected:
                        </p>
                        <p className="text-[11px] text-slate-700">
                          {detectedGaps.join(', ')}
                        </p>
                        <div className="pt-2">
                          <Button
                            variant="glow"
                            size="sm"
                            onClick={() => {
                              setSelectedCourse(null);
                              onNavigate('ai-assistant');
                            }}
                            className="text-[11px] py-1 px-2.5"
                          >
                            Open AI Tutor Remedial Walkthrough →
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Questions List */}
                <div className="space-y-4">
                  {selectedCourse.quiz.questions.map((q, qIndex) => {
                    const selectedOpt = userQuizAnswers[q.id];
                    const isCorrect = selectedOpt === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs sm:text-sm font-bold text-slate-900">
                            Q{qIndex + 1}. {q.question}
                          </p>
                          {q.topicTag && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 shrink-0">
                              {q.topicTag}
                            </span>
                          )}
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedOpt === optIdx;
                            let optionClass =
                              'border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300';

                            if (isSelected) {
                              optionClass = 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold';
                            }

                            if (quizSubmitted) {
                              if (optIdx === q.correctIndex) {
                                optionClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                              } else if (isSelected && !isCorrect) {
                                optionClass = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                              } else {
                                optionClass = 'border-slate-200 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectQuizOption(q.id, optIdx)}
                                disabled={quizSubmitted}
                                className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${optionClass}`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                                    {String.fromCharCode(65 + optIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                                {quizSubmitted && optIdx === q.correctIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation on submit */}
                        {quizSubmitted && (
                          <div
                            className={`p-3 rounded-xl text-xs ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                                : 'bg-amber-50 text-amber-900 border border-amber-200'
                            }`}
                          >
                            <p className="font-bold">Explanation:</p>
                            <p className="mt-0.5 text-[11px] leading-relaxed">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
