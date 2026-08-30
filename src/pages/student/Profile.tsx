import React, { useState } from 'react';
import {
  User,
  Mail,
  Award,
  Building,
  Save,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Sliders
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';

interface ProfileProps {
  onNavigate: (route: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { studentData, updateStudentData } = useAuth();
  const [targetRole, setTargetRole] = useState(studentData.targetRole);
  const [learningStyle, setLearningStyle] = useState('Visual + Interactive Code');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentData({ targetRole });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Profile & Academic Settings</h2>
          <p className="text-xs text-slate-500">
            Manage your verified identity, career targets, and AI learning personalization preferences
          </p>
        </div>

        {isSaved && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Profile Updated!
          </span>
        )}
      </div>

      {/* Main Profile Info Card */}
      <Card variant="elevated" padding="lg" className="border-slate-200/80">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={studentData.avatar}
            alt={studentData.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-brand-100 shadow-md"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-slate-900">{studentData.name}</h3>
              <Badge variant="brand" size="sm">
                Semester {studentData.semester}
              </Badge>
              <Badge variant="success" size="sm" dot>
                NEP ABC Verified
              </Badge>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {studentData.department} • {studentData.institution}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-600">
              <span><strong>Roll No:</strong> {studentData.rollNumber}</span>
              <span><strong>Batch:</strong> {studentData.batch}</span>
              <span><strong>CGPA:</strong> {studentData.cgpa} / 10.0</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <Card variant="default" padding="lg" className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-brand-600" />
            <h4 className="text-sm font-bold text-slate-900">Career & Learning Objectives</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Target Employment Role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              helperText="AI Tutor calibrates interview drills toward this role"
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Preferred AI Learning Modality
              </label>
              <select
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Visual + Interactive Code">Visual + Interactive Code Snippets</option>
                <option value="Mathematical Rigor">Mathematical First-Principles & Derivations</option>
                <option value="Story Analogy">Story Analogy & Real-World Case Studies</option>
                <option value="EdScroll Micro">Bite-Sized 45s Micro-Learning Feed</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" variant="primary" size="md" icon={Save}>
              Save Profile Preferences
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};
