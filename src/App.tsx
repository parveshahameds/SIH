import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/landing/LandingPage';
import { StudentLogin } from './pages/auth/StudentLogin';
import { TeacherLogin } from './pages/auth/TeacherLogin';

// Layouts
import { StudentLayout } from './components/layout/StudentLayout';
import { TeacherLayout } from './components/layout/TeacherLayout';

// Student Pages (11 Routes including GD Arena)
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

// Quick Role Switcher Toolbar Icons
import { GraduationCap, Users, Home } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const { loginAsStudent, loginAsTeacher, logout } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    let target = path;
    if (!target.startsWith('/')) {
      if (currentPath.startsWith('/student/')) {
        target = `/student/${path}`;
      } else if (currentPath.startsWith('/teacher/')) {
        target = `/teacher/${path}`;
      } else {
        target = `/${path}`;
      }
    }

    window.history.pushState({}, '', target);
    setCurrentPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Landing Page
    if (currentPath === '/' || currentPath === '') {
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
          case 'skill-passport': return <SkillPassport onNavigate={navigate} />;
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      {renderRoute()}

      {/* SIH Hackathon Jury Quick-Switch Floater */}
      <div className="fixed bottom-4 right-4 z-50 hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl cyber-glass border border-slate-700 shadow-2xl text-xs font-semibold text-white animate-fade-in glow-cyan">
        <span className="px-2 py-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          SIH Jury:
        </span>
        <button
          onClick={() => {
            loginAsStudent();
            navigate('/student/dashboard');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            currentPath.startsWith('/student')
              ? 'bg-gradient-to-r from-brand-600 to-cyan-600 text-white shadow-xs'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
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
              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-xs'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Teacher</span>
        </button>

        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
            currentPath === '/'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Landing</span>
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
