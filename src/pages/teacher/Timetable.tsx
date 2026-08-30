import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Play,
  AlertTriangle,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { mockTimetable } from '../../data/mockData';
import { TimetableEntry } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

interface TeacherTimetableProps {
  onNavigate: (route: string) => void;
}

export const TeacherTimetable: React.FC<TeacherTimetableProps> = ({ onNavigate }) => {
  const [timetable, setTimetable] = useState<TimetableEntry[]>(mockTimetable);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  // New Slot Form
  const [newSubject, setNewSubject] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newClassroom, setNewClassroom] = useState('Lab 402 (NVIDIA AI Center)');
  const [newStartTime, setNewStartTime] = useState('09:00 AM');
  const [newEndTime, setNewEndTime] = useState('10:30 AM');
  const [newBatch, setNewBatch] = useState('CSE-A');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const slotsForDay = timetable.filter(slot => slot.day === selectedDay);

  const handleScheduleSlot = (e: React.FormEvent) => {
    e.preventDefault();

    // Check conflict: does this classroom and day already have a session at this start time?
    const hasConflict = timetable.some(
      t => t.day === selectedDay && t.classroom === newClassroom && t.startTime === newStartTime
    );

    if (hasConflict) {
      setConflictWarning(
        `Conflict Alert: ${newClassroom} is already booked on ${selectedDay} at ${newStartTime}! Please select an alternative lab/hall or adjust slot hours.`
      );
      return;
    }

    const newSlot: TimetableEntry = {
      id: `tt_${Date.now()}`,
      subject: newSubject,
      code: newCode || 'CS609',
      instructor: 'Dr. Rajesh Verma',
      classroom: newClassroom,
      batch: newBatch,
      day: selectedDay as any,
      startTime: newStartTime,
      endTime: newEndTime,
      type: 'Lab'
    };

    setTimetable([...timetable, newSlot]);
    setScheduleModalOpen(false);
    setConflictWarning(null);
    setNewSubject('');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white">Master Teaching Schedule & Conflict Detection</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage class allocations, book laboratory hours, and prevent classroom double-booking
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert('Exporting full master timetable to PDF...')}
            className="text-xs bg-slate-900 border-slate-800 text-slate-300"
          >
            Export Schedule
          </Button>
          <Button
            variant="glow"
            size="sm"
            icon={Plus}
            onClick={() => {
              setConflictWarning(null);
              setScheduleModalOpen(true);
            }}
            className="text-xs font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-md shadow-cyan-500/25"
          >
            Schedule Class Slot
          </Button>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              selectedDay === day
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Cards */}
      <div className="space-y-4">
        {slotsForDay.length === 0 ? (
          <Card variant="default" padding="lg" className="cyber-glass border-slate-800 text-center py-12">
            <CalendarIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No scheduled sessions for {selectedDay}</p>
          </Card>
        ) : (
          slotsForDay.map((slot) => (
            <Card
              key={slot.id}
              variant={slot.isLiveNow ? 'elevated' : 'default'}
              padding="md"
              className={`cyber-glass border-slate-800 transition-all ${
                slot.isLiveNow ? 'ring-2 ring-cyan-500 glow-cyan' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 text-center min-w-[90px] shrink-0 font-mono">
                    <Clock className="w-4 h-4 mx-auto text-cyan-400 mb-1" />
                    <p className="text-xs font-bold">{slot.startTime}</p>
                    <p className="text-[10px] text-slate-500">{slot.endTime}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-cyan-300 font-mono">
                        {slot.code}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {slot.subject}
                      </h4>
                      <Badge variant={slot.type === 'Lab' ? 'purple' : 'brand'} size="sm">
                        {slot.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        Batch: {slot.batch}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {slot.classroom}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('attendance')}
                    className="text-xs bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                  >
                    Manage Attendance
                  </Button>
                  {slot.isLiveNow && (
                    <Button
                      variant="glow"
                      size="sm"
                      icon={Play}
                      onClick={() => alert('Starting live faculty lecture session in Lab 402...')}
                      className="text-xs font-bold"
                    >
                      Start Session
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Schedule Slot Modal with Conflict Detection */}
      {scheduleModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setScheduleModalOpen(false)}
          title="Schedule New Teaching / Lab Slot"
          subtitle={`Day: ${selectedDay} • Automated conflict detection across halls`}
          footer={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="glow" size="sm" onClick={handleScheduleSlot}>
                Confirm & Book Slot
              </Button>
            </div>
          }
        >
          <form onSubmit={handleScheduleSlot} className="space-y-4 text-slate-100">
            {conflictWarning && (
              <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-600 text-xs text-rose-200 flex items-start gap-2 animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{conflictWarning}</span>
              </div>
            )}

            <Input
              label="Subject Title"
              placeholder="e.g. Distributed Database Sharding Lab"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Course Code"
                placeholder="e.g. CS604"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
              <Input
                label="Cohort Batch"
                placeholder="e.g. CSE-A"
                value={newBatch}
                onChange={(e) => setNewBatch(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Laboratory / Classroom
              </label>
              <select
                value={newClassroom}
                onChange={(e) => setNewClassroom(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-xs text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="Lab 402 (NVIDIA AI Center)">Lab 402 (NVIDIA AI Center)</option>
                <option value="LH-301">LH-301 (Auditorium Hall)</option>
                <option value="LH-102">LH-102 (Seminar Room)</option>
                <option value="Computing Lab 3">Computing Lab 3</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                placeholder="09:00 AM"
              />
              <Input
                label="End Time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                placeholder="10:30 AM"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
