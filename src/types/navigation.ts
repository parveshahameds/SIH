import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  iconName: string;
  badge?: string | number;
  description?: string;
}

export type StudentNavRoute =
  | 'dashboard'
  | 'edscroll'
  | 'ai-assistant'
  | 'my-learning'
  | 'timetable'
  | 'attendance'
  | 'career-lab'
  | 'skill-passport'
  | 'notifications'
  | 'profile';

export type TeacherNavRoute =
  | 'dashboard'
  | 'batches'
  | 'students'
  | 'timetable'
  | 'attendance'
  | 'learning-gaps'
  | 'courses'
  | 'assessments'
  | 'reports';
