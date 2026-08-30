import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentProfile, TeacherProfile, UserRole } from '../types';
import { mockStudentUser, mockTeacherUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  studentData: StudentProfile;
  teacherData: TeacherProfile;
  isAuthenticated: boolean;
  loginAsStudent: () => void;
  loginAsTeacher: () => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateStudentData: (updater: Partial<StudentProfile>) => void;
  updateTeacherData: (updater: Partial<TeacherProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'colearn_auth_state_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentData, setStudentData] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(`${AUTH_STORAGE_KEY}_student`);
    return saved ? JSON.parse(saved) : mockStudentUser;
  });

  const [teacherData, setTeacherData] = useState<TeacherProfile>(() => {
    const saved = localStorage.getItem(`${AUTH_STORAGE_KEY}_teacher`);
    return saved ? JSON.parse(saved) : mockTeacherUser;
  });

  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem(`${AUTH_STORAGE_KEY}_role`);
    return (savedRole as UserRole) || 'student';
  });

  const [user, setUser] = useState<User | null>(() => {
    return role === 'teacher' ? teacherData : studentData;
  });

  useEffect(() => {
    if (role === 'student') {
      setUser(studentData);
      localStorage.setItem(`${AUTH_STORAGE_KEY}_role`, 'student');
    } else if (role === 'teacher') {
      setUser(teacherData);
      localStorage.setItem(`${AUTH_STORAGE_KEY}_role`, 'teacher');
    } else {
      setUser(null);
      localStorage.setItem(`${AUTH_STORAGE_KEY}_role`, 'guest');
    }
  }, [role, studentData, teacherData]);

  const loginAsStudent = () => {
    setRole('student');
    setUser(studentData);
  };

  const loginAsTeacher = () => {
    setRole('teacher');
    setUser(teacherData);
  };

  const logout = () => {
    setRole('guest');
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'student') setUser(studentData);
    else if (newRole === 'teacher') setUser(teacherData);
    else setUser(null);
  };

  const updateStudentData = (updater: Partial<StudentProfile>) => {
    setStudentData((prev) => {
      const updated = { ...prev, ...updater };
      localStorage.setItem(`${AUTH_STORAGE_KEY}_student`, JSON.stringify(updated));
      return updated;
    });
  };

  const updateTeacherData = (updater: Partial<TeacherProfile>) => {
    setTeacherData((prev) => {
      const updated = { ...prev, ...updater };
      localStorage.setItem(`${AUTH_STORAGE_KEY}_teacher`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        studentData,
        teacherData,
        isAuthenticated: role !== 'guest' && user !== null,
        loginAsStudent,
        loginAsTeacher,
        logout,
        switchRole,
        updateStudentData,
        updateTeacherData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
