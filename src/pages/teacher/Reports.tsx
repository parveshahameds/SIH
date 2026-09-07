import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  CheckCircle2,
  Award,
  Users,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatCard } from '../../components/common/StatCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';

interface ReportsProps {
  onNavigate: (route: string) => void;
}

export const Reports: React.FC<ReportsProps> = ({ onNavigate }) => {
  const [selectedBatch, setSelectedBatch] = useState('CSE-A (Semester 6)');

  const monthlyAttendanceTrends = [
    { month: 'May', attendance: 84.2 },
    { month: 'Jun', attendance: 86.8 },
    { month: 'Jul', attendance: 89.1 },
    { month: 'Aug', attendance: 91.8 },
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Classroom Attendance Analytics & OBE Reports</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            NAAC, NBA, and NEP 2020 continuous outcome attainment and attendance trend telemetry
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Download}
          onClick={() => alert('Generating official institutional NBA/NAAC Outcome Attainment Dossier PDF...')}
          className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
        >
          Export OBE Attainment Dossier
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Program Outcome Attainment"
          value="91.4%"
          subtitle="Direct & Indirect Assessments"
          icon={Award}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
          trend={{ value: '+4.2% YoY', isPositive: true }}
          className="bg-white border-slate-200/90 shadow-xs"
        />

        <StatCard
          title="Learning Gap Resolution Rate"
          value="84.6%"
          subtitle="Remedials Successfully Mastered"
          icon={TrendingUp}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-700"
          trend={{ value: 'Above 80% Benchmark', isPositive: true }}
          className="bg-white border-slate-200/90 shadow-xs"
        />

        <StatCard
          title="Course Completion Rate"
          value="96.2%"
          subtitle="187 of 194 Students"
          icon={CheckCircle2}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-700"
          badge="High Performance"
          className="bg-white border-slate-200/90 shadow-xs"
        />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Attendance Trends Chart Visualization */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Monthly Attendance Trend Curve
            </h3>
            <span className="text-xs text-indigo-700 font-mono font-bold">+7.6% Increase</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-4 pt-6 px-4 pb-2 bg-slate-50 rounded-2xl border border-slate-200">
            {monthlyAttendanceTrends.map((t, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-mono text-indigo-700 font-bold">{t.attendance}%</span>
                <div
                  className="w-full max-w-[40px] rounded-t-xl bg-indigo-600 transition-all duration-500 hover:brightness-110"
                  style={{ height: `${(t.attendance / 100) * 100}%` }}
                />
                <span className="text-xs font-semibold text-slate-500 mt-1">{t.month}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            Smart Attendance 6-digit code implementation in July correlated with +5.0% verified presence.
          </p>
        </div>

        {/* Grade & Score Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Grade & Score Distribution (CSE-A)</h3>
            <span className="text-xs text-slate-500">Total: 64 Students</span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              { grade: 'O / Outstanding (>90%)', count: 18, pct: 28, color: 'success' as const },
              { grade: 'A+ / Excellent (80-89%)', count: 26, pct: 40, color: 'brand' as const },
              { grade: 'A / Very Good (70-79%)', count: 14, pct: 22, color: 'brand' as const },
              { grade: 'B / Average (60-69%)', count: 4, pct: 6, color: 'warning' as const },
              { grade: 'Underperforming (<60%)', count: 2, pct: 4, color: 'danger' as const },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.grade}</span>
                  <span className="font-bold text-slate-900 font-mono">{item.count} Students ({item.pct}%)</span>
                </div>
                <ProgressBar value={item.pct} size="sm" variant={item.color} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
