import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';

// Components
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { RestTimerBanner } from './components/common/RestTimerBanner';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { LiveWorkoutPlayer } from './components/workout/LiveWorkoutPlayer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkoutPlanPage } from './pages/WorkoutPlanPage';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';
import { ProgressPage } from './pages/ProgressPage';
import { NutritionPage } from './pages/NutritionPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Wrapper
const ProtectedRoute = ({ children, onOpenAuth }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080B11] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

// Dashboard Layout Shell
const DashboardLayout = ({ children, onOpenAuth, onOpenOnboarding }) => {
  return (
    <div className="min-h-screen bg-[#080B11] flex flex-col">
      <Navbar onOpenAuth={onOpenAuth} onOpenOnboarding={onOpenOnboarding} />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <RestTimerBanner />
    </div>
  );
};

function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const openOnboarding = () => {
    setOnboardingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 font-sans selection:bg-brand-500 selection:text-black">
      <Routes>
        {/* Public Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar onOpenAuth={openAuth} onOpenOnboarding={openOnboarding} />
              <LandingPage onOpenOnboarding={openOnboarding} onOpenAuth={openAuth} />
              <RestTimerBanner />
            </>
          }
        />

        {/* Dashboard Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <DashboardPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/workout"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <LiveWorkoutPlayer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/plan"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <WorkoutPlanPage onOpenOnboarding={openOnboarding} />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/exercises"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <ExerciseLibraryPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/progress"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <ProgressPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/goals"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <ProgressPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/nutrition"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <NutritionPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute onOpenAuth={openAuth}>
              <DashboardLayout onOpenAuth={openAuth} onOpenOnboarding={openOnboarding}>
                <SettingsPage onOpenOnboarding={openOnboarding} />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      <OnboardingWizard
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WorkoutProvider>
          <AppContent />
        </WorkoutProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
