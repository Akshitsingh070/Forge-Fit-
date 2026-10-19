import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Dumbbell, 
  Flame, 
  User, 
  LogOut, 
  Play, 
  Sparkles, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';

export const Navbar = ({ onOpenAuth, onOpenOnboarding }) => {
  const { user, profile, isAuthenticated, logout, demoLogin } = useAuth();
  const { isWorkoutActive } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDemoClick = async () => {
    await demoLogin();
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#080B11]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-electric flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Dumbbell className="w-5 h-5 text-black font-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              FORGE<span className="text-brand-400">FIT</span>
              <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-500/15 text-brand-400 border border-brand-500/30">AI</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                Dashboard
              </Link>
              <Link to="/dashboard/workout" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Today's Workout
              </Link>
              <Link to="/dashboard/plan" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                My Plan
              </Link>
              <Link to="/dashboard/exercises" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Exercise Library
              </Link>
              <Link to="/dashboard/progress" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Progress
              </Link>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Active Workout Pill */}
          {isWorkoutActive && (
            <Link
              to="/dashboard/workout"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 text-xs font-semibold animate-pulse"
            >
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
              Live Gym Session
            </Link>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Streak Pill */}
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                <span>{profile?.streakDays || 1} Day Streak</span>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-dark-900 transition-colors"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={user?.name || "User"}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <span className="hidden lg:inline text-xs font-medium text-slate-200 pr-1">{user?.name?.split(' ')[0] || 'Athlete'}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0D121D] border border-white/10 shadow-2xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-white/5">
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                      >
                        <Activity className="w-4 h-4 text-brand-400" />
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        Profile & Settings
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-white/5">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDemoClick}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                Demo Athlete
              </button>
              <button
                onClick={() => onOpenAuth?.('login')}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenOnboarding?.()}
                className="text-xs font-bold px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-black shadow-glow transition-all hover:scale-[1.02] flex items-center gap-1"
              >
                Build Plan
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#080B11] px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard/workout"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Today's Workout
              </Link>
              <Link
                to="/dashboard/plan"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Workout Plan
              </Link>
              <Link
                to="/dashboard/exercises"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Exercise Library
              </Link>
              <Link
                to="/dashboard/progress"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Progress Tracking
              </Link>
              <Link
                to="/dashboard/nutrition"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                Nutrition
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDemoClick();
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm"
              >
                Instant Demo Access
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOnboarding?.();
                }}
                className="w-full py-2.5 rounded-xl bg-brand-500 text-black font-bold text-sm shadow-glow"
              >
                Build My Workout Plan
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
