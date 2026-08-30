import React, { useState } from 'react';
import { StudentSidebar } from './StudentSidebar';
import { StudentHeader } from './StudentHeader';

interface StudentLayoutProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({
  currentRoute,
  onNavigate,
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map route to clean human-readable title
  const getPageTitle = (route: string) => {
    switch (route) {
      case 'dashboard': return 'Student Dashboard';
      case 'edscroll': return 'EdScroll — Bite-Sized Learning Feed';
      case 'ai-assistant': return 'Conversational AI Tutor & Doubt Solver';
      case 'my-learning': return 'My Learning & Course Progression';
      case 'timetable': return 'Master Timetable & Schedule';
      case 'attendance': return 'Smart Attendance Verification';
      case 'gd': return 'Group Discussion & AI Debate Arena';
      case 'career-lab': return 'AI Career Lab & Mock Interviews';
      case 'skill-passport': return 'Verifiable Skill Passport & NEP Bank';
      case 'notifications': return 'Student Notifications & Alerts';
      case 'profile': return 'Student Academic Profile';
      default: return 'Student Portal';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block">
        <StudentSidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl">
            <StudentSidebar
              currentRoute={currentRoute}
              onNavigate={(route) => {
                setMobileMenuOpen(false);
                onNavigate(route);
              }}
              isCollapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Layout Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <StudentHeader
          title={getPageTitle(currentRoute)}
          onNavigate={onNavigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* Workspace Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>

        {/* Clean Minimal Institutional Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 CoLearn • AI-Powered Education & Employment Ecosystem</p>
          <p className="text-[11px] text-slate-500">NEP 2020 & ABC Credit Compliant</p>
        </footer>
      </div>
    </div>
  );
};
