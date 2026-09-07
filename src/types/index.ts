export type UserRole = 'student' | 'teacher' | 'employer' | 'guest';

export type CourseCategory =
  | 'Cooperative'
  | 'Finance'
  | 'Agriculture'
  | 'Dairy'
  | 'Entrepreneurship'
  | 'Digital'
  | 'Employability'
  | 'Artificial Intelligence'
  | 'General';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  institution: string;
  department?: string;
  rollNumber?: string;
  employeeId?: string;
}

export interface StudentProfile extends User {
  role: 'student';
  semester: number;
  batch: string;
  trainingCentre: string; // e.g., RICM Bengaluru / VAMNICOM Pune / ICM Lucknow
  programmeName: string; // e.g., HDCM (Higher Diploma in Cooperative Management)
  cgpa: number;
  attendanceRate: number;
  streakDays: number;
  xpPoints: number;
  level: number;
  targetRole: string;
  faceRegistered: boolean;
  faceBiometricTemplate?: string;
  skills: {
    name: string;
    level: number; // 1 to 100
    verified: boolean;
    category: 'technical' | 'soft' | 'domain' | 'cooperative';
  }[];
  nepCredits: {
    earned: number;
    required: number;
    major: number;
    minor: number;
    skillEnhancement: number;
    internship: number;
  };
}

export interface TeacherProfile extends User {
  role: 'teacher';
  designation: string;
  batches: string[];
  subjects: string[];
  totalStudents: number;
  rating: number;
  pendingReviewsCount: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'interactive';
  completed?: boolean;
  videoUrl?: string;
  summary?: string;
}

export interface CourseQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail: string;
  category: CourseCategory;
  progressPercentage: number;
  totalModules: number;
  completedModules: number;
  totalHours: number;
  credits: number;
  nextLessonTitle: string;
  nextLessonDuration: string;
  status: 'in-progress' | 'completed' | 'upcoming';
  description?: string;
  tags?: string[];
  learningOutcomes?: string[];
  modulesList?: {
    id: string;
    title: string;
    lessons: CourseLesson[];
  }[];
  quiz?: {
    id: string;
    title: string;
    questions: CourseQuizQuestion[];
    passingScore: number;
  };
  offlineAvailable?: boolean;
}

export interface CheckpointQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizCheckpoint {
  id: string;
  title: string;
  requiredAfterLessonOrder: number;
  unlocked: boolean;
  passed: boolean;
  score?: number;
  questions: CheckpointQuestion[];
}

export interface EdScrollItem {
  id: string;
  order: number;
  creatorName: string;
  creatorRole: string;
  creatorAvatar: string;
  title: string;
  description: string;
  tag: string;
  category: CourseCategory | 'AI/ML' | 'Web3' | 'System Design' | 'Algorithms' | 'Career Hacks' | 'Soft Skills';
  readTime: string;
  likesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  sharesCount: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  checkpointRequired?: boolean;
  interactiveQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  keyTakeaway: string;
  codeSnippet?: string;
  relatedCourseId?: string;
}

export interface TimetableEntry {
  id: string;
  subject: string;
  code: string;
  instructor: string;
  classroom: string;
  batch: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Seminar' | 'Assessment';
  isLiveNow?: boolean;
  meetingLink?: string;
  attendanceMarked?: boolean;
  hasConflict?: boolean;
  conflictDetails?: string;
}

export interface AttendanceSubject {
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: 'safe' | 'warning' | 'critical';
  lastClassDate: string;
}

export interface SmartAttendanceSession {
  code: string;
  subject: string;
  batch: string;
  classroom: string;
  expiresInSeconds: number;
  isActive: boolean;
  securityRequirements: {
    gpsGeofence: boolean;
    campusWifi: boolean;
    faceScanBiometrics: boolean;
  };
  verifiedCount: number;
  totalEnrolled: number;
}

export interface StudentVerificationState {
  codeEntered: string;
  isCodeValid: boolean;
  isFaceVerified: boolean;
  isGpsVerified: boolean;
  isWifiVerified: boolean;
  currentStep: 'idle' | 'code' | 'face' | 'gps' | 'wifi' | 'confirmed' | 'failed';
  biometricConfidence?: number;
  distanceMeters?: number;
  wifiSSID?: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  targetDurationSeconds: number;
  sampleAnswerSummary: string;
  rubric: {
    technicalAccuracy: number;
    communicationClarity: number;
    problemSolvingStructure: number;
  };
}

export interface GDParticipant {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'ai-peer' | 'moderator';
  isSpeaking: boolean;
  speakingTimeSeconds: number;
  contributionScore: number;
}

export interface GDMessage {
  id: string;
  participantId: string;
  participantName: string;
  text: string;
  timestamp: string;
  type: 'speech' | 'rebuttal' | 'summary' | 'ai-prompt';
  sentiment?: 'constructive' | 'challenging' | 'insightful';
}

export interface GDRoom {
  id: string;
  topic: string;
  category: string;
  description: string;
  status: 'waiting' | 'in-progress' | 'concluded';
  timeRemainingSeconds: number;
  participants: GDParticipant[];
  messages: GDMessage[];
  moderatorScore?: {
    articulation: number;
    factualBacking: number;
    collaborativeListening: number;
    overallGrade: string;
  };
}

export interface SkillCredential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  verificationHash: string;
  badgeUrl: string;
  score: number;
  skills: string[];
  creditsAllocated: number;
  status: 'verified' | 'in-progress' | 'pending-review';
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Apprenticeship';
  stipendOrSalary: string;
  skillMatchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  applyDeadline: string;
  description: string;
}

export interface LearningGapDiagnostic {
  id: string;
  subject: string;
  batch: string;
  topic: string;
  difficultyRating: 'High' | 'Medium' | 'Low';
  strugglingStudentsCount: number;
  totalStudents: number;
  failureRatePercentage: number;
  recommendedRemedialAction: string;
  suggestedResources: string[];
  status: 'flagged' | 'remedial-assigned' | 'resolved';
  strugglingStudentList?: { id: string; name: string; score: number; avatar: string }[];
}

export interface BatchInfo {
  id: string;
  name: string;
  code: string;
  department: string;
  semester: number;
  totalStudents: number;
  averageAttendance: number;
  averageGpa: number;
  healthStatus: 'Excellent' | 'Good' | 'Attention Needed';
  representative: string;
  nextSessionTime: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  avatar: string;
  batch: string;
  attendancePercentage: number;
  cgpa: number;
  aiRiskLevel: 'Low' | 'Moderate' | 'High';
  riskFactors?: string[];
  lastActive: string;
  completedAssignments: number;
  totalAssignments: number;
}

export interface AssessmentItem {
  id: string;
  title: string;
  batch: string;
  subject: string;
  dueDate: string;
  durationMinutes: number;
  totalMarks: number;
  submissionsCount: number;
  totalStudents: number;
  averageScorePercentage: number;
  status: 'active' | 'scheduled' | 'grading' | 'completed';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'academic' | 'ai-alert' | 'career' | 'system';
  isRead: boolean;
  actionUrl?: string;
  priority?: 'normal' | 'high' | 'urgent';
}
