import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/landing/LandingPage';
import { StudentLogin } from './pages/auth/StudentLogin';
import { TeacherLogin } from './pages/auth/TeacherLogin';

// Layouts
import { StudentLayout } from './components/layout/StudentLayout';
import { TeacherLayout } from './components/layout/TeacherLayout';

// Student Pages (11 Routes)
import { StudentDashboard } from './pages/student/Dashboard';
import { EdScroll } from './pages/student/EdScroll';
import { AIAssistant } from './pages/student/AIAssistant';
import { MyLearning } from './pages/student/MyLearning';
import { Timetable as StudentTimetable } from './pages/student/Timetable';
import { Attendance as StudentAttendance } from './pages/student/Attendance';
import { GroupDiscussion } from './pages/student/GroupDiscussion';
import { CareerLab } from './pages/student/CareerLab';
import { SkillPassport } from './pages/student/SkillPassport';
import { Notifications } from './pages/student/Notifications';
import { Profile as StudentProfilePage } from './pages/student/Profile';
import { Jobs } from './pages/student/Jobs';
import { CollegeServices } from './pages/student/CollegeServices';

// Teacher Pages (9 Routes)
import { TeacherDashboard } from './pages/teacher/Dashboard';
import { Batches } from './pages/teacher/Batches';
import { Students } from './pages/teacher/Students';
import { TeacherTimetable } from './pages/teacher/Timetable';
import { TeacherAttendance } from './pages/teacher/Attendance';
import { LearningGaps } from './pages/teacher/LearningGaps';
import { TeacherCourses } from './pages/teacher/Courses';
import { Assessments } from './pages/teacher/Assessments';
import { Reports } from './pages/teacher/Reports';

// Icons
import { GraduationCap, Users, Home, Sparkles } from 'lucide-react';

const getNormalizedRoute = (): string => {
  // 1. First prioritize Hash (best for GitHub Pages: https://perrarish.github.io/SIH/#/student/dashboard)
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (hash) {
    return hash.startsWith('/') ? hash : `/${hash}`;
  }

  // 2. Fallback to pathname (strip base URL e.g. /SIH/)
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  let path = window.location.pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  return path || '/';
};

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(getNormalizedRoute);
  const { loginAsStudent, loginAsTeacher, logout } = useAuth();

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(getNormalizedRoute());
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navigate = (path: string) => {
    let target = path;
    if (!target.startsWith('/')) {
      if (currentPath.startsWith('/student')) {
        target = `/student/${path}`;
      } else if (currentPath.startsWith('/teacher')) {
        target = `/teacher/${path}`;
      } else {
        target = `/${path}`;
      }
    }

    // Set hash so GitHub Pages and direct browser reloads always work seamlessly
    window.location.hash = target;
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Landing Page
    if (currentPath === '/' || currentPath === '' || currentPath === '/landing') {
      return <LandingPage onNavigate={navigate} />;
    }

    // 2. Auth Routes
    if (currentPath === '/login/student') {
      return <StudentLogin onNavigate={navigate} />;
    }
    if (currentPath === '/login/teacher') {
      return <TeacherLogin onNavigate={navigate} />;
    }

    // 3. Student Routes
    if (currentPath.startsWith('/student')) {
      const studentSubRoute = currentPath.replace('/student/', '').replace('/student', '') || 'dashboard';

      const renderStudentPage = () => {
        switch (studentSubRoute) {
          case 'dashboard': return <StudentDashboard onNavigate={navigate} />;
          case 'edscroll': return <EdScroll onNavigate={navigate} />;
          case 'ai-assistant': return <AIAssistant onNavigate={navigate} />;
          case 'my-learning': return <MyLearning onNavigate={navigate} />;
          case 'timetable': return <StudentTimetable onNavigate={navigate} />;
          case 'attendance': return <StudentAttendance onNavigate={navigate} />;
          case 'gd': return <GroupDiscussion onNavigate={navigate} />;
          case 'career-lab': return <CareerLab onNavigate={navigate} />;
          case 'jobs': return <Jobs onNavigate={navigate} />;
          case 'skill-passport': return <SkillPassport onNavigate={navigate} />;
          case 'registration': return <CollegeServices initialTab="registration" onNavigate={navigate} />;
          case 'hostel': return <CollegeServices initialTab="hostel" onNavigate={navigate} />;
          case 'notifications': return <Notifications onNavigate={navigate} />;
          case 'profile': return <StudentProfilePage onNavigate={navigate} />;
          default: return <StudentDashboard onNavigate={navigate} />;
        }
      };

      return (
        <StudentLayout currentRoute={studentSubRoute} onNavigate={navigate}>
          {renderStudentPage()}
        </StudentLayout>
      );
    }

    // 4. Teacher Routes
    if (currentPath.startsWith('/teacher')) {
      const teacherSubRoute = currentPath.replace('/teacher/', '').replace('/teacher', '') || 'dashboard';

      const renderTeacherPage = () => {
        switch (teacherSubRoute) {
          case 'dashboard': return <TeacherDashboard onNavigate={navigate} />;
          case 'batches': return <Batches onNavigate={navigate} />;
          case 'students': return <Students onNavigate={navigate} />;
          case 'timetable': return <TeacherTimetable onNavigate={navigate} />;
          case 'attendance': return <TeacherAttendance onNavigate={navigate} />;
          case 'learning-gaps': return <LearningGaps onNavigate={navigate} />;
          case 'courses': return <TeacherCourses onNavigate={navigate} />;
          case 'assessments': return <Assessments onNavigate={navigate} />;
          case 'reports': return <Reports onNavigate={navigate} />;
          default: return <TeacherDashboard onNavigate={navigate} />;
        }
      };

      return (
        <TeacherLayout currentRoute={teacherSubRoute} onNavigate={navigate}>
          {renderTeacherPage()}
        </TeacherLayout>
      );
    }

    // Fallback to Landing
    return <LandingPage onNavigate={navigate} />;
  };

  return (
    <div className="relative min-h-screen font-sans">
      {renderRoute()}

      {/* Floating Demo Role Switcher Dock (Clean, Minimal, Non-Intrusive) */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-2xl text-xs font-semibold text-white animate-fade-in">
        <div className="flex items-center gap-1 pl-2 pr-1 text-[11px] text-slate-400 font-bold tracking-wide border-r border-slate-700">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Demo:</span>
        </div>

        <button
          onClick={() => {
            loginAsStudent();
            navigate('/student/dashboard');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            currentPath.startsWith('/student')
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Switch to Student Portal"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student</span>
        </button>

        <button
          onClick={() => {
            loginAsTeacher();
            navigate('/teacher/dashboard');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            currentPath.startsWith('/teacher')
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Switch to Faculty Suite"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Educator</span>
        </button>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all ${
            currentPath === '/' || currentPath === '/landing'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Back to Landing Page"
        >
          <Home className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
