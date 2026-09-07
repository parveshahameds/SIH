import React, { useState } from 'react';
import {
  AlertOctagon,
  Sparkles,
  Zap,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Send,
  Users,
  Eye
} from 'lucide-react';
import { mockLearningGaps } from '../../data/mockData';
import { LearningGapDiagnostic } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

interface LearningGapsProps {
  onNavigate: (route: string) => void;
}

export const LearningGaps: React.FC<LearningGapsProps> = ({ onNavigate }) => {
  const [gaps, setGaps] = useState<LearningGapDiagnostic[]>(mockLearningGaps);
  const [dispatchedIds, setDispatchedIds] = useState<Set<string>>(new Set(['gap_02']));
  const [drillDownGap, setDrillDownGap] = useState<LearningGapDiagnostic | null>(null);

  const handleDispatchRemedial = (id: string) => {
    setDispatchedIds(prev => new Set(prev).add(id));
    setGaps(prev =>
      prev.map(g => (g.id === id ? { ...g, status: 'remedial-assigned' } : g))
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-slate-900">AI Learning Gap Diagnostics & Drill-Down</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Automated Root Cause Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pinpoints curriculum topics where &gt;40% of students struggle and dispatches 1-click remediations
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => alert('Full institutional diagnostic matrix exported!')}
          className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Export Diagnostic Dossier
        </Button>
      </div>

      {/* Flagged Gaps Cards */}
      <div className="space-y-4">
        {gaps.map((gap) => {
          const isDispatched = dispatchedIds.has(gap.id);

          return (
            <Card
              key={gap.id}
              variant="elevated"
              padding="lg"
              className="bg-white border-slate-200/90 space-y-4 shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={gap.status === 'flagged' ? 'danger' : 'brand'} size="sm" dot>
                      {gap.status === 'flagged' ? 'Critical Attention' : 'Remedial Dispatched'}
                    </Badge>
                    <span className="text-xs font-bold text-slate-900">{gap.batch}</span>
                    <span className="text-xs text-slate-500">• {gap.subject}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {gap.topic}
                  </h3>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center min-w-[130px] shrink-0 font-mono">
                  <p className="text-[10px] font-bold uppercase text-rose-700">Failure Rate</p>
                  <p className="text-xl font-extrabold text-rose-600">{gap.failureRatePercentage}%</p>
                  <p className="text-[10px] text-slate-500 font-sans">{gap.strugglingStudentsCount} of {gap.totalStudents} Students</p>
                </div>
              </div>

              {/* Recommended AI Remedial Action */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>AI Recommended Intervention Plan:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {gap.recommendedRemedialAction}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {gap.suggestedResources.map((res, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-semibold text-indigo-700"
                    >
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  icon={Users}
                  onClick={() => setDrillDownGap(gap)}
                  className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  View Struggling Students ({gap.strugglingStudentsCount})
                </Button>

                {isDispatched ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Remedial Material Dispatched to Batch
                  </span>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Send}
                    onClick={() => handleDispatchRemedial(gap.id)}
                    className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                  >
                    Dispatch AI Remedial Lesson
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Struggling Students Drill-Down Modal */}
      {drillDownGap && (
        <Modal
          isOpen={true}
          onClose={() => setDrillDownGap(null)}
          title={`Drill-Down: ${drillDownGap.topic}`}
          subtitle={`${drillDownGap.batch} • ${drillDownGap.strugglingStudentsCount} Students flagged below benchmark`}
          footer={
            <Button variant="outline" size="sm" onClick={() => setDrillDownGap(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-slate-900">
            <p className="text-xs text-slate-500">
              Students identified through failed MCQ questions on this topic:
            </p>

            <div className="divide-y divide-slate-100">
              {drillDownGap.strugglingStudentList && drillDownGap.strugglingStudentList.length > 0 ? (
                drillDownGap.strugglingStudentList.map(st => (
                  <div key={st.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200" />
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{st.name}</h5>
                        <p className="text-[10px] text-slate-500 font-mono">Student ID: {st.id}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-rose-600">Quiz Score: {st.score}%</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-xs text-slate-500">
                  Telemetry aggregating submission logs for this section...
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
