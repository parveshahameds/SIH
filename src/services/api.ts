/**
 * CoLearn Ecosystem API Service Client Blueprint
 * 
 * This module acts as the unified contract for all backend service interactions:
 * - Authentication & Role authorization
 * - Course management & syllabus tracking
 * - AI Tutor conversational engine (LLM inference stream)
 * - Attendance sync & IoT biometric/QR integration
 * - Learning gap diagnostics & automated remedial task generation
 * - Career placement readiness & skill passport ledger verification
 */

import {
  StudentProfile,
  TeacherProfile,
  Course,
  EdScrollItem,
  TimetableEntry,
  AttendanceSubject,
  SkillCredential,
  JobOpportunity,
  LearningGapDiagnostic,
  BatchInfo,
  StudentRecord,
  AssessmentItem,
  NotificationItem
} from '../types';

import {
  mockStudentUser,
  mockTeacherUser,
  mockStudentCourses,
  mockEdScrollFeed,
  mockTimetable,
  mockAttendanceRecords,
  mockSkillPassportData,
  mockCareerJobs,
  mockNotifications,
  mockBatches,
  mockTeacherStudents,
  mockLearningGaps,
  mockTeacherAssessments
} from '../data/mockData';

// Configurable API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.colearn.sih.internal/v1';

export class CoLearnService {
  // === AUTHENTICATION ===
  static async getStudentProfile(): Promise<StudentProfile> {
    // In production: return (await fetch(`${API_BASE_URL}/student/profile`)).json();
    return Promise.resolve(mockStudentUser);
  }

  static async getTeacherProfile(): Promise<TeacherProfile> {
    return Promise.resolve(mockTeacherUser);
  }

  // === COURSES & LEARNING ===
  static async getEnrolledCourses(): Promise<Course[]> {
    return Promise.resolve(mockStudentCourses);
  }

  static async getCourseDetails(courseId: string): Promise<Course | undefined> {
    return Promise.resolve(mockStudentCourses.find(c => c.id === courseId));
  }

  // === EDSCROLL MICRO-LEARNING ===
  static async getEdScrollFeed(): Promise<EdScrollItem[]> {
    return Promise.resolve(mockEdScrollFeed);
  }

  // === SCHEDULE & ATTENDANCE ===
  static async getTimetable(role: 'student' | 'teacher'): Promise<TimetableEntry[]> {
    return Promise.resolve(mockTimetable);
  }

  static async getStudentAttendance(): Promise<AttendanceSubject[]> {
    return Promise.resolve(mockAttendanceRecords);
  }

  // === CAREER & SKILL PASSPORT ===
  static async getSkillPassportCredentials(): Promise<SkillCredential[]> {
    return Promise.resolve(mockSkillPassportData);
  }

  static async getJobMatches(): Promise<JobOpportunity[]> {
    return Promise.resolve(mockCareerJobs);
  }

  static async getNotifications(): Promise<NotificationItem[]> {
    return Promise.resolve(mockNotifications);
  }

  // === TEACHER SPECIFIC ENDPOINTS ===
  static async getTeacherBatches(): Promise<BatchInfo[]> {
    return Promise.resolve(mockBatches);
  }

  static async getBatchStudents(batchId: string): Promise<StudentRecord[]> {
    return Promise.resolve(mockTeacherStudents);
  }

  static async getLearningGaps(): Promise<LearningGapDiagnostic[]> {
    return Promise.resolve(mockLearningGaps);
  }

  static async getAssessments(): Promise<AssessmentItem[]> {
    return Promise.resolve(mockTeacherAssessments);
  }
}
