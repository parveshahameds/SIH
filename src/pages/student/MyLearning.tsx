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
  ExternalLink
} from 'lucide-react';
import { mockStudentCourses } from '../../data/mockData';
import { Course } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

interface MyLearningProps {
  onNavigate: (route: string) => void;
}

export const MyLearning: React.FC<MyLearningProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = mockStudentCourses.filter(c => {
    if (filter === 'in-progress') return c.status === 'in-progress';
    if (filter === 'completed') return c.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Enrolled Courses & Curricula</h2>
          <p className="text-xs text-slate-500">
            Track module completions, watch video lectures, and access verified NEP course notes
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          {(['all', 'in-progress', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === tab
                  ? 'bg-white text-brand-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            variant="elevated"
            padding="none"
            className="overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-xs shadow-xs">
                  {course.code} • {course.credits} Credits
                </span>
                <span className="absolute bottom-3 right-3 text-xs font-bold text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-300" />
                  {course.totalHours} Hours
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant={course.status === 'completed' ? 'success' : 'brand'} size="sm">
                    {course.category}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">
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
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="text-xs text-slate-600 font-medium truncate max-w-[120px]">
                  {course.instructor}
                </span>
              </div>

              <Button
                variant={course.status === 'completed' ? 'outline' : 'primary'}
                size="sm"
                onClick={() => setSelectedCourse(course)}
                icon={course.status === 'completed' ? CheckCircle2 : Play}
                className="text-xs"
              >
                {course.status === 'completed' ? 'Review' : 'Continue'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Course Detail Modal Workspace Mockup */}
      {selectedCourse && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
          title={`${selectedCourse.code}: ${selectedCourse.title}`}
          subtitle={`Instructor: ${selectedCourse.instructor} • ${selectedCourse.credits} NEP Credits`}
          size="xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">
                Progress: {selectedCourse.progressPercentage}% Completed
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedCourse(null)}>
                  Close
                </Button>
                <Button
                  variant="glow"
                  size="sm"
                  icon={Play}
                  onClick={() => alert('Launching interactive video lecture player...')}
                >
                  Resume Next Lesson
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Mock Video Player */}
            <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
              <img
                src={selectedCourse.thumbnail}
                alt="Lesson player preview"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative text-center space-y-3 z-10 p-4">
                <div className="w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-brand-500/40 hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-7 h-7 ml-1" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Next: {selectedCourse.nextLessonTitle}
                </h4>
                <p className="text-xs text-slate-300">
                  Duration: {selectedCourse.nextLessonDuration} • Auto-Sync with Attendance
                </p>
              </div>
            </div>

            {/* Learning Outcomes */}
            {selectedCourse.learningOutcomes && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Course Learning Outcomes (NEP Competencies)
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedCourse.learningOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
