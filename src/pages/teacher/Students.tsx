import React, { useState } from 'react';
import {
  Users,
  Search,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Eye,
  Mail,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { mockTeacherStudents } from '../../data/mockData';
import { StudentRecord } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ProgressBar } from '../../components/common/ProgressBar';

interface StudentsProps {
  onNavigate: (route: string) => void;
}

export const Students: React.FC<StudentsProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [inspectedStudent, setInspectedStudent] = useState<StudentRecord | null>(null);

  const filteredStudents = mockTeacherStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk =
      selectedRiskFilter === 'all' || student.aiRiskLevel.toLowerCase() === selectedRiskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Directory & AI Risk Matrix</h2>
          <p className="text-xs text-slate-500">
            Monitor individual student performance, attendance threshold compliance, and AI risk alerts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            icon={Search}
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 text-xs bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400"
          />

          <select
            value={selectedRiskFilter}
            onChange={(e) => setSelectedRiskFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Risk Levels</option>
            <option value="high">High Risk Only</option>
            <option value="moderate">Moderate Risk</option>
            <option value="low">Low Risk (Safe)</option>
          </select>
        </div>
      </div>

      {/* Student Records Table */}
      <Card variant="default" padding="none" className="overflow-hidden border-slate-200/90 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Student Name & Roll No</th>
                <th className="py-3.5 px-4">Batch</th>
                <th className="py-3.5 px-4 text-center">CGPA</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4 text-center">AI Risk Status</th>
                <th className="py-3.5 px-4 text-center">Assignments</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const isHighRisk = student.aiRiskLevel === 'High';
                const isModerateRisk = student.aiRiskLevel === 'Moderate';

                return (
                  <tr
                    key={student.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isHighRisk ? 'bg-rose-50/60' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shadow-xs"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{student.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{student.rollNumber}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium">{student.batch}</td>

                    <td className="py-3.5 px-4 text-center font-bold text-slate-900 font-mono">
                      {student.cgpa}
                    </td>

                    <td className="py-3.5 px-4 w-36">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-900 font-mono">{student.attendancePercentage}%</span>
                        <ProgressBar
                          value={student.attendancePercentage}
                          size="sm"
                          variant={student.attendancePercentage < 75 ? 'danger' : 'success'}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <Badge
                        variant={isHighRisk ? 'danger' : isModerateRisk ? 'warning' : 'success'}
                        size="sm"
                        dot
                      >
                        {student.aiRiskLevel} Risk
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-center font-medium text-slate-700 font-mono">
                      {student.completedAssignments} / {student.totalAssignments}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={() => setInspectedStudent(student)}
                        className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Detail Inspection Modal */}
      {inspectedStudent && (
        <Modal
          isOpen={true}
          onClose={() => setInspectedStudent(null)}
          title={`Student Telemetry: ${inspectedStudent.name}`}
          subtitle={`${inspectedStudent.rollNumber} • ${inspectedStudent.batch}`}
          footer={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setInspectedStudent(null)}>
                Close
              </Button>
              <Button
                variant="glow"
                size="sm"
                icon={Mail}
                onClick={() => alert(`Email advisory sent to ${inspectedStudent.email}`)}
                className="bg-indigo-600 hover:bg-indigo-500"
              >
                Send Academic Advisory
              </Button>
            </div>
          }
        >
          <div className="space-y-5 text-slate-100">
            <div className="flex items-center gap-4">
              <img
                src={inspectedStudent.avatar}
                alt={inspectedStudent.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
              />
              <div>
                <h4 className="text-base font-bold text-white">{inspectedStudent.name}</h4>
                <p className="text-xs text-slate-400">{inspectedStudent.email}</p>
                <div className="flex gap-2 mt-1">
                  <Badge
                    variant={inspectedStudent.aiRiskLevel === 'High' ? 'danger' : 'success'}
                    size="sm"
                  >
                    AI Risk: {inspectedStudent.aiRiskLevel}
                  </Badge>
                  <span className="text-xs text-slate-400">Last active: {inspectedStudent.lastActive}</span>
                </div>
              </div>
            </div>

            {inspectedStudent.riskFactors && inspectedStudent.riskFactors.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-xs space-y-2">
                <h5 className="font-bold text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Detected AI Risk Indicators:
                </h5>
                <ul className="list-disc list-inside text-rose-200 space-y-1">
                  {inspectedStudent.riskFactors.map((rf, idx) => (
                    <li key={idx}>{rf}</li>
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
