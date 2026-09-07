import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Sparkles,
  Clock,
  Award,
  CheckCircle2,
  Users,
  Eye
} from 'lucide-react';
import { mockTeacherAssessments } from '../../data/mockData';
import { AssessmentItem } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { ProgressBar } from '../../components/common/ProgressBar';

interface AssessmentsProps {
  onNavigate: (route: string) => void;
}

export const Assessments: React.FC<AssessmentsProps> = ({ onNavigate }) => {
  const [assessments, setAssessments] = useState<AssessmentItem[]>(mockTeacherAssessments);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Assessments & Automated AI Grading</h2>
          <p className="text-xs text-slate-500">
            Create online diagnostic quizzes, mid-term examinations, and coding assignments with auto-rubric grading
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Sparkles}
          onClick={() => setCreateModalOpen(true)}
          className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          AI Assessment Generator
        </Button>
      </div>

      {/* Assessment Cards */}
      <div className="space-y-4">
        {assessments.map((item) => (
          <Card
            key={item.id}
            variant="elevated"
            padding="lg"
            className="border-slate-200/90 bg-white space-y-4 shadow-xs"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant={
                      item.status === 'grading'
                        ? 'warning'
                        : item.status === 'completed'
                        ? 'success'
                        : 'brand'
                    }
                    size="sm"
                    dot
                  >
                    {item.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-bold text-slate-800">{item.batch}</span>
                  <span className="text-xs text-slate-500">• {item.subject}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500">
                  Duration: {item.durationMinutes} Mins • Total Marks: {item.totalMarks} • Due: {item.dueDate}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center min-w-[120px]">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Submissions</p>
                  <p className="text-base font-extrabold text-slate-900 font-mono">
                    {item.submissionsCount} / {item.totalStudents}
                  </p>
                </div>

                {item.averageScorePercentage > 0 && (
                  <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-center min-w-[120px]">
                    <p className="text-[10px] uppercase font-bold text-indigo-700">Average Score</p>
                    <p className="text-base font-extrabold text-indigo-900 font-mono">
                      {item.averageScorePercentage}%
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Auto-grading telemetry synchronized</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert('Viewing student submission gradesheet...')}
                  className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  View Gradesheet
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert('Publishing finalized grades to student Skill Passports...')}
                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Publish Grades
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Assessment Generator Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="AI Assessment & Quiz Generator"
        subtitle="Generate balanced MCQs and coding exercises mapped to Bloom's Taxonomy"
        footer={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert('AI generated 15 questions and published quiz!');
                setCreateModalOpen(false);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Generate & Schedule Quiz
            </Button>
          </div>
        }
      >
        <div className="space-y-4 text-xs text-slate-800">
          <Input label="Assessment Title" placeholder="e.g. Diagnostic Quiz: Transformer Attention Matrices" className="bg-slate-50 border-slate-300 text-slate-900" />
          <Input label="Target Batch" placeholder="e.g. CSE-A (Semester 6)" className="bg-slate-50 border-slate-300 text-slate-900" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Number of Questions" type="number" defaultValue={10} className="bg-slate-50 border-slate-300 text-slate-900" />
            <Input label="Duration (Minutes)" type="number" defaultValue={30} className="bg-slate-50 border-slate-300 text-slate-900" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Focus Concepts (AI Telemetry)
            </label>
            <textarea
              rows={2}
              defaultValue="Attention Head Projections, Softmax Normalization, Residual Addition"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
