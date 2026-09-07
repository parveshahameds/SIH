import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Video,
  CheckCircle2,
  Share2,
  Sparkles,
  Play,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { mockTimetable } from '../../data/mockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface TimetableProps {
  onNavigate: (route: string) => void;
}

export const Timetable: React.FC<TimetableProps> = ({ onNavigate }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [reminders, setReminders] = useState<Record<string, boolean>>({ tt_02: true, tt_03: true });
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const slotsForDay = mockTimetable.filter(slot => slot.day === selectedDay);

  const toggleReminder = (id: string) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-slate-900">Academic Schedule & Live Laboratory Telemetry</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Live Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized semester schedule with 4-point smart attendance triggers and virtual studio links
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Share2}
          onClick={() => alert('Timetable synced to Google Calendar / Apple iCal!')}
          className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Sync to Calendar
        </Button>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Live Class Highlight Banner if on Monday */}
      {selectedDay === 'Monday' && (
        <div className="p-5 rounded-3xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 shrink-0">
              <Video className="w-6 h-6 animate-pulse text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white uppercase tracking-wider animate-pulse">
                  Live Now
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  CS602: Deep Learning & Neural Networks (Lab 402)
                </h3>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Instructor: Dr. Rajesh Verma • 4-Point Smart Attendance Open (Session Key: 849 201)
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={ShieldCheck}
            onClick={() => onNavigate('attendance')}
            className="text-xs font-bold whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
          >
            Verify Attendance (Code: 849 201)
          </Button>
        </div>
      )}

      {/* Schedule Slots Timeline */}
      <div className="space-y-4">
        {slotsForDay.length === 0 ? (
          <Card variant="default" padding="lg" className="bg-white border-slate-200/90 text-center py-12 shadow-xs">
            <CalendarIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No scheduled classes for {selectedDay}</p>
            <p className="text-xs text-slate-500 mt-1">Use this self-study block for EdScroll micro-learning or Career Lab projects.</p>
          </Card>
        ) : (
          slotsForDay.map((slot) => (
            <Card
              key={slot.id}
              variant={slot.isLiveNow ? 'elevated' : 'default'}
              padding="md"
              className={`bg-white border-slate-200/90 transition-all shadow-xs ${
                slot.isLiveNow ? 'ring-2 ring-indigo-500 border-indigo-400' : 'hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Time and Subject */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-indigo-700 text-center min-w-[90px] shrink-0 font-mono">
                    <Clock className="w-4 h-4 mx-auto text-indigo-600 mb-1" />
                    <p className="text-xs font-bold leading-tight">{slot.startTime}</p>
                    <p className="text-[10px] text-slate-500">{slot.endTime}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                        {slot.code}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {slot.subject}
                      </h4>
                      <Badge
                        variant={slot.type === 'Lab' ? 'purple' : slot.type === 'Assessment' ? 'danger' : 'brand'}
                        size="sm"
                      >
                        {slot.type}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {slot.instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {slot.classroom}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions / Status */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleReminder(slot.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      reminders[slot.id]
                        ? 'text-indigo-700 bg-indigo-50 border border-indigo-200'
                        : 'text-slate-400 hover:text-slate-700 bg-slate-50 border border-slate-200'
                    }`}
                    title={reminders[slot.id] ? 'Reminder Set' : 'Set Reminder'}
                  >
                    <Bell className="w-4 h-4" />
                  </button>

                  {slot.isLiveNow ? (
                    <Button
                      variant="primary"
                      size="sm"
                      icon={ShieldCheck}
                      onClick={() => onNavigate('attendance')}
                      className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs"
                    >
                      Smart Attendance
                    </Button>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
