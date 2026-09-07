import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  FileText,
  Upload,
  CheckCircle2,
  Sparkles,
  Layers,
  Clock,
  Award
} from 'lucide-react';
import { mockStudentCourses } from '../../data/mockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

interface TeacherCoursesProps {
  onNavigate: (route: string) => void;
}

export const TeacherCourses: React.FC<TeacherCoursesProps> = ({ onNavigate }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Curriculum & Course Content Builder</h2>
          <p className="text-xs text-slate-500">
            Publish lecture modules, attach EdScroll micro-learning cards, and map NEP 2020 course competencies
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setUploadModalOpen(true)}
          className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Create New Module
        </Button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockStudentCourses.slice(0, 2).map((course) => (
          <Card
            key={course.id}
            variant="elevated"
            padding="lg"
            className="border-slate-200/90 bg-white space-y-4 shadow-xs"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {course.code}
                </span>
                <h3 className="text-base font-bold text-slate-900">{course.title}</h3>
                <p className="text-xs text-slate-500">{course.category} • {course.credits} NEP Credits</p>
              </div>

              <Badge variant="brand" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                {course.totalModules} Modules
              </Badge>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {course.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900">Mapped NEP Competencies:</span>
              <ul className="space-y-1 text-slate-700">
                {course.learningOutcomes?.map((outcome, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                icon={Upload}
                onClick={() => setUploadModalOpen(true)}
                className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Upload Resource
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => alert('Opening curriculum syllabus editor...')}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Edit Syllabus
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Resource Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Course Resource or Lecture Material"
        subtitle="Files will be automatically converted to searchable notes and EdScroll flashcard candidates"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Upload}
              onClick={() => {
                setUploadModalOpen(false);
                alert('Course material uploaded! Generating micro-learning summaries.');
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Upload & Process
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs text-slate-800">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Module Title</label>
            <Input placeholder="e.g. Multi-Head Attention Implementations" className="bg-slate-50 border-slate-300 text-slate-900" />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Upload PDF Syllabus / Slides / Video</label>
            <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-center space-y-2">
              <Upload className="w-8 h-8 text-indigo-600 mx-auto" />
              <p className="text-slate-700 font-medium">Drag and drop slides or syllabus documents here</p>
              <p className="text-[10px] text-slate-500 font-mono">Supported formats: PDF, PPTX, MP4 (Max 100MB)</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
