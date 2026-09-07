import React, { useState } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { mockBatches } from '../../data/mockData';
import { BatchInfo } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';

interface BatchesProps {
  onNavigate: (route: string) => void;
}

export const Batches: React.FC<BatchesProps> = ({ onNavigate }) => {
  const [batches, setBatches] = useState<BatchInfo[]>(mockBatches);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditingBatch, setCurrentEditingBatch] = useState<BatchInfo | null>(null);

  // Form State
  const [batchName, setBatchName] = useState('');
  const [batchCode, setBatchCode] = useState('');
  const [representative, setRepresentative] = useState('');
  const [totalStudents, setTotalStudents] = useState(60);

  const openCreateModal = () => {
    setBatchName('');
    setBatchCode('');
    setRepresentative('');
    setTotalStudents(60);
    setCreateModalOpen(true);
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchName || !batchCode) return;

    const newBatch: BatchInfo = {
      id: `batch_${Date.now()}`,
      name: batchName,
      code: batchCode,
      department: 'Computer Science & Engineering',
      semester: 6,
      totalStudents: totalStudents,
      averageAttendance: 90.0,
      averageGpa: 8.4,
      healthStatus: 'Good',
      representative: representative || 'Appointed Delegate',
      nextSessionTime: 'Upcoming Session'
    };

    setBatches([newBatch, ...batches]);
    setCreateModalOpen(false);
  };

  const openEditModal = (batch: BatchInfo) => {
    setCurrentEditingBatch(batch);
    setBatchName(batch.name);
    setBatchCode(batch.code);
    setRepresentative(batch.representative);
    setTotalStudents(batch.totalStudents);
    setEditModalOpen(true);
  };

  const handleUpdateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditingBatch) return;

    setBatches(prev =>
      prev.map(b =>
        b.id === currentEditingBatch.id
          ? {
              ...b,
              name: batchName,
              code: batchCode,
              representative: representative,
              totalStudents: totalStudents
            }
          : b
      )
    );
    setEditModalOpen(false);
    setCurrentEditingBatch(null);
  };

  const handleDeleteBatch = (id: string) => {
    if (confirm('Are you sure you want to decommission this batch cohort?')) {
      setBatches(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Academic Cohorts & Batch Management (CRUD)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student enrollments, edit section parameters, and monitor real-time cohort health
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={openCreateModal}
          className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
        >
          Create New Batch
        </Button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <Card
            key={batch.id}
            variant="elevated"
            padding="lg"
            className="bg-white border-slate-200/90 hover:border-slate-300 transition-all flex flex-col justify-between shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {batch.name}
                  </h3>
                  <p className="text-xs text-indigo-600 font-mono mt-0.5">{batch.code}</p>
                </div>
                <Badge
                  variant={
                    batch.healthStatus === 'Excellent'
                      ? 'success'
                      : batch.healthStatus === 'Good'
                      ? 'brand'
                      : 'warning'
                  }
                  size="sm"
                  dot
                >
                  {batch.healthStatus}
                </Badge>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Enrollments</span>
                  <p className="text-base font-extrabold text-slate-900 font-mono mt-0.5">{batch.totalStudents}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold uppercase text-[10px]">Average GPA</span>
                  <p className="text-base font-extrabold text-indigo-600 font-mono mt-0.5">{batch.averageGpa}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Attendance Health</span>
                  <span className="text-slate-900 font-mono">{batch.averageAttendance}%</span>
                </div>
                <ProgressBar
                  value={batch.averageAttendance}
                  size="sm"
                  variant={batch.averageAttendance > 80 ? 'success' : 'warning'}
                />
              </div>

              <div className="pt-2 text-xs text-slate-500 space-y-1 border-t border-slate-100">
                <p><strong>Representative:</strong> {batch.representative}</p>
                <p className="text-indigo-600 font-medium"><strong>Next:</strong> {batch.nextSessionTime}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(batch)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Edit Batch"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteBatch(batch.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Decommission Batch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('students')}
                className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                Inspect Cohort
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create / Edit Batch Modal */}
      {(createModalOpen || editModalOpen) && (
        <Modal
          isOpen={true}
          onClose={() => {
            setCreateModalOpen(false);
            setEditModalOpen(false);
          }}
          title={createModalOpen ? 'Create New Teaching Batch' : `Edit Cohort: ${currentEditingBatch?.name}`}
          subtitle="Configure cohort code, enrollment ceiling, and appointed student delegate"
          footer={
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCreateModalOpen(false);
                  setEditModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={createModalOpen ? handleCreateBatch : handleUpdateBatch}
                className="bg-indigo-600 text-white hover:bg-indigo-500"
              >
                {createModalOpen ? 'Create Batch' : 'Save Changes'}
              </Button>
            </div>
          }
        >
          <form onSubmit={createModalOpen ? handleCreateBatch : handleUpdateBatch} className="space-y-4 text-slate-900">
            <Input
              label="Batch Cohort Name"
              placeholder="e.g. AI-ML Specialization 2026 (Section B)"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
            />
            <Input
              label="Official Course/Section Code"
              placeholder="e.g. BTECH-CSE-2026-B"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Total Enrolled Students"
                type="number"
                value={totalStudents}
                onChange={(e) => setTotalStudents(Number(e.target.value))}
                required
              />
              <Input
                label="Student Representative"
                placeholder="e.g. Ananya Sharma"
                value={representative}
                onChange={(e) => setRepresentative(e.target.value)}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
