import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  User, 
  LogOut, 
  Activity as ActivityIcon, 
  Flame, 
  Menu, 
  X,
  Dumbbell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';

export const Navbar = ({ onOpenAuth, onOpenOnboarding }) => {
  const { user, profile, isAuthenticated, logout, demoLogin } = useAuth();
  const { isWorkoutActive } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleDemoClick = async () => {
    await demoLogin();
    navigate('/dashboard');
  };

  const navItems = [
    { label: 'Overview', to: '/dashboard' },
    { label: 'Activity', to: '/dashboard/workout' },
    { label: 'Programs', to: '/dashboard/plan' },
    { label: 'AI Coach', to: '/dashboard/exercises' },
    { label: 'Analytics', to: '/dashboard/progress' },
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/dashboard/exercises?search=${encodeURIComponent(searchQuery)}`);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-plum-900/90 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* 1. BRAND LOGO - SETORYN */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-sans font-black text-2xl tracking-wider text-white uppercase group-hover:text-brand-300 transition-colors">
            SETORYN
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 hidden sm:inline">
            AI
          </span>
        </Link>

        {/* 2. FLOATING SEGMENTED PILL NAVIGATION - Direct match to image */}
        <nav className="hidden md:flex items-center bg-[#251733]/90 p-1 rounded-full border border-white/[0.07] shadow-lg shadow-black/20 backdrop-blur-md">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT CONTROLS: Search Icon & Avatar */}
        <div className="flex items-center gap-3">
          {/* Quick Demo button when not logged in */}
          {!isAuthenticated && (
            <button
              onClick={handleDemoClick}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white transition-colors border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              Demo Athlete
            </button>
          )}

          {/* Search Button Pill */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full bg-[#251733]/90 border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-500/40 transition-all shadow-sm"
              title="Search exercises & routines"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick search popup */}
            {searchOpen && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 mt-3 w-72 p-2 rounded-2xl bg-[#171022] border border-white/10 shadow-2xl z-50 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-slate-400 ml-2" />
                <input
                  type="text"
                  placeholder="Search exercises, coach..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none flex-1 py-1"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-brand-500 text-white rounded-xl text-xs font-semibold hover:bg-brand-400"
                >
                  Go
                </button>
              </form>
            )}
          </div>

          {/* User Profile Avatar with Ring */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="relative block rounded-full p-0.5 focus:outline-none hover:ring-2 hover:ring-brand-500/50 transition-all"
            >
              <img
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                }
                alt={user?.name || "User Avatar"}
                className="w-10 h-10 rounded-full object-cover border border-white/10 ring-1 ring-purple-500/30"
              />
              {isWorkoutActive && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-brand-500 ring-2 ring-[#170E24] animate-pulse" />
              )}
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 rounded-3xl bg-[#14111a] border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-xl">
                <div className="px-3.5 py-3 border-b border-white/[0.06]">
                  <p className="text-sm font-semibold text-white">{user?.name || 'Athlete Marcus'}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email || 'marcus@setoryn.ai'}</p>
                </div>

                <div className="py-1.5 space-y-0.5">
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    <ActivityIcon className="w-4 h-4 text-brand-400" />
                    Overview
                  </Link>
                  <Link
                    to="/dashboard/workout"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    <Dumbbell className="w-4 h-4 text-brand-400" />
                    Today's Workout
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </Link>
                </div>

                <div className="pt-1.5 border-t border-white/[0.06]">
                  {isAuthenticated ? (
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
                  ) : (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenAuth?.('login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-brand-400 hover:bg-brand-500/10 transition-colors"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white bg-[#251733]/90 border border-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#170E24] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-full text-sm font-medium ${
                  active
                    ? 'bg-white text-black font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
