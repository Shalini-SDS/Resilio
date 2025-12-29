import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { StudentLogin } from './components/StudentLogin';
import { TeacherLogin } from './components/TeacherLogin';
import { AdminLogin } from './components/AdminLogin';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { GlitterEffect } from './components/GlitterEffect';
import { clearAuthToken } from './api';

type View = 'landing' | 'login' | 'student-login' | 'teacher-login' | 'admin-login' | 'student' | 'teacher' | 'admin';
type Role = 'student' | 'teacher' | 'admin' | null;

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [userRole, setUserRole] = useState<Role>(null);

  const handleGetStarted = () => {
    setCurrentView('login');
  };

  const handleRoleSelect = (role: Role) => {
    setUserRole(role);
    if (role === 'student') setCurrentView('student-login');
    if (role === 'teacher') setCurrentView('teacher-login');
    if (role === 'admin') setCurrentView('admin-login');
  };

  const handleLoginSuccess = () => {
    if (userRole === 'student') setCurrentView('student');
    if (userRole === 'teacher') setCurrentView('teacher');
    if (userRole === 'admin') setCurrentView('admin');
  };

  const handleBackToRoleSelect = () => {
    setCurrentView('login');
    setUserRole(null);
  };

  const handleLogout = () => {
    clearAuthToken();
    setCurrentView('landing');
    setUserRole(null);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GlitterEffect />
      
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <LandingPage onGetStarted={handleGetStarted} />
          </motion.div>
        )}

        {currentView === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <LoginPage onRoleSelect={handleRoleSelect} />
          </motion.div>
        )}

        {currentView === 'student-login' && (
          <motion.div
            key="student-login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <StudentLogin onLogin={handleLoginSuccess} onBack={handleBackToRoleSelect} />
          </motion.div>
        )}

        {currentView === 'teacher-login' && (
          <motion.div
            key="teacher-login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <TeacherLogin onLogin={handleLoginSuccess} onBack={handleBackToRoleSelect} />
          </motion.div>
        )}

        {currentView === 'admin-login' && (
          <motion.div
            key="admin-login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <AdminLogin onLogin={handleLoginSuccess} onBack={handleBackToRoleSelect} />
          </motion.div>
        )}

        {currentView === 'student' && (
          <motion.div
            key="student"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <StudentDashboard onLogout={handleLogout} />
          </motion.div>
        )}

        {currentView === 'teacher' && (
          <motion.div
            key="teacher"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <TeacherDashboard onLogout={handleLogout} />
          </motion.div>
        )}

        {currentView === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <AdminDashboard onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
