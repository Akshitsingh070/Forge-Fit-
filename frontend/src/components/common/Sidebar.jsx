import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  CalendarDays, 
  Library, 
  TrendingUp, 
  Target, 
  Utensils, 
  User, 
  Settings,
  Flame,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';

export const Sidebar = () => {
  const { profile } = useAuth();
  const { isWorkoutActive } = useWorkout();

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/dashboard/workout', label: 'My Workout', icon: Dumbbell, highlight: isWorkoutActive },
    { to: '/dashboard/plan', label: 'Workout Plan', icon: CalendarDays },
    { to: '/dashboard/exercises', label: 'Exercises', icon: Library },
    { to: '/dashboard/progress', label: 'Progress', icon: TrendingUp },
    { to: '/dashboard/goals', label: 'Goals', icon: Target },
    { to: '/dashboard/nutrition', label: 'Nutrition', icon: Utensils },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/[0.08] bg-[#0A0E17] min-h-[calc(100vh-4rem)] p-4 select-none shrink-0">
        {/* Streak & Adherence Badge */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">{profile?.streakDays || 1} Day Streak</p>
              <p className="text-[11px] text-slate-400">Consistency Master</p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300">
            ACTIVE
          </span>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/15 text-brand-400 font-semibold border border-brand-500/30 shadow-glow'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                  } ${item.highlight ? 'ring-1 ring-brand-400/50' : ''}`
                }
              >
                <Icon className={`w-4 h-4 shrink-0 ${item.highlight ? 'text-brand-400 animate-bounce' : ''}`} />
                <span className="truncate">{item.label}</span>
                {item.highlight && (
                  <span className="ml-auto text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-brand-500 text-black">
                    LIVE
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* AI Engine Status Card */}
        <div className="mt-auto pt-4 border-t border-white/[0.06]">
          <div className="p-3 rounded-xl bg-dark-900 border border-white/5 flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse" />
            <div className="text-[11px]">
              <p className="text-slate-200 font-medium">Bio-Adaptive Engine</p>
              <p className="text-slate-400">RPE & Overload Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0E17]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 flex items-center justify-around">
        {navLinks.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-1.5 rounded-xl text-[10px] font-medium transition-colors ${
                  isActive ? 'text-brand-400 font-bold' : 'text-slate-400'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
