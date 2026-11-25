import React, { useState } from 'react';
import { 
  Play, 
  Flame, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Clock, 
  Award,
  ArrowUpRight,
  TrendingUp,
  Dumbbell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const { user, profile } = useAuth();
  const { 
    workoutPlan, 
    todayWorkoutData, 
    startLiveWorkout, 
    isWorkoutActive 
  } = useWorkout();
  const navigate = useNavigate();

  // Selected calendar day in November's Plan
  const [selectedDay, setSelectedDay] = useState(15);

  const daysList = [
    { dayNumber: 14, dayName: 'Sat' },
    { dayNumber: 15, dayName: 'Sun', active: true },
    { dayNumber: 16, dayName: 'Mon' },
    { dayNumber: 17, dayName: 'Tue' },
    { dayNumber: 18, dayName: 'Wed' },
  ];

  const planRoutines = [
    {
      id: 1,
      title: 'Morning Mobility & Stretch',
      time: '08:00 am',
      duration: '30 min',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 2,
      title: 'HIIT Cardio Blast',
      time: '12:30 pm',
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 3,
      title: 'Upper Body Hypertrophy',
      time: '06:00 pm',
      duration: '60 min',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const weeklySteps = [
    { day: 'Mon', height: 45 },
    { day: 'Tue', height: 60 },
    { day: 'Wed', height: 50 },
    { day: 'Thu', height: 75 },
    { day: 'Fri', height: 95 },
    { day: 'Sat', height: 80 },
    { day: 'Sun', height: 70, isCurrent: true },
  ];

  const handleStartWorkout = () => {
    if (todayWorkoutData?.workout) {
      startLiveWorkout(todayWorkoutData.workout);
    }
    navigate('/dashboard/workout');
  };

  return (
    <div className="w-full max-w-[1360px] mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-6">
      {/* MAIN TOP GRID: 3 COLUMNS MATCHING THE REFERENCE IMAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ========================================================
            CARD 1: November's Plan (Col Span 4)
            ======================================================== */}
        <div className="lg:col-span-4 kinetic-card p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-5">
              November's Plan
            </h2>

            {/* Horizontal Day Selector Pills */}
            <div className="flex items-center justify-between gap-2 mb-6">
              {daysList.map((d) => {
                const isSelected = selectedDay === d.dayNumber;
                return (
                  <button
                    key={d.dayNumber}
                    onClick={() => setSelectedDay(d.dayNumber)}
                    className={`flex flex-col items-center justify-center w-12 h-14 rounded-2xl transition-all duration-200 ${
                      isSelected
                        ? 'bg-brand-500 text-white shadow-glow-purple scale-105 ring-2 ring-purple-400/30'
                        : 'bg-[#1b1722] text-slate-400 hover:text-white hover:bg-[#231d2e]'
                    }`}
                  >
                    <span className="text-sm font-bold leading-none">{d.dayNumber}</span>
                    <span className="text-[11px] font-medium mt-1 leading-none opacity-80">{d.dayName}</span>
                  </button>
                );
              })}
            </div>

            {/* Scheduled Workout Items List */}
            <div className="space-y-4">
              {planRoutines.map((routine) => (
                <div
                  key={routine.id}
                  onClick={handleStartWorkout}
                  className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-white/[0.04] transition-colors cursor-pointer group"
                >
                  <img
                    src={routine.image}
                    alt={routine.title}
                    className="w-11 h-11 rounded-full object-cover border border-white/10 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors truncate">
                      {routine.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {routine.time} • {routine.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action: Full-width pure white pill button */}
          <div className="mt-6 pt-2">
            <button
              onClick={() => navigate('/dashboard/plan')}
              className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-100 text-black font-bold text-sm tracking-wide shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              View all
            </button>
          </div>
        </div>

        {/* ========================================================
            CARD 2: Daily Steps & Active Burn (Col Span 4)
            ======================================================== */}
        <div className="lg:col-span-4 kinetic-card p-6 flex flex-col justify-between">
          <div>
            {/* Header: Steps and Circular Progress Ring */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400">Daily Steps</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  10,432 <span className="text-lg font-normal text-slate-400">today</span>
                </h3>
              </div>

              {/* Radial Progress Ring (80%) */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                  {/* Background Track */}
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    className="stroke-[#251e30]"
                    strokeWidth="4"
                    fill="none"
                  />
                  {/* 80% Animated Ring */}
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    className="stroke-brand-500"
                    strokeWidth="4"
                    strokeDasharray="119.38"
                    strokeDashoffset="23.87"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white">80%</span>
              </div>
            </div>

            {/* Weekly Bar Chart: Mon - Sun */}
            <div className="mt-8 mb-4">
              <div className="h-40 flex items-end justify-between gap-2.5 px-1">
                {weeklySteps.map((col) => (
                  <div key={col.day} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div
                      style={{ height: `${col.height}%` }}
                      className={`w-full rounded-2xl transition-all duration-300 ${
                        col.isCurrent
                          ? 'bg-brand-500 shadow-glow-purple'
                          : 'bg-[#221c2c] hover:bg-[#2c2438]'
                      }`}
                    />
                    <span className="text-[11px] font-medium text-slate-400 mt-2.5">
                      {col.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Active Burn */}
          <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Active Burn</p>
              <p className="text-xl font-bold text-white tracking-tight mt-0.5">
                640 <span className="text-sm font-normal text-slate-400">kcal burned</span>
              </p>
            </div>

            {/* Orange Calorie Badge (🍗 x2) */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a1a17] text-[#ff7947] border border-[#ff7947]/20 text-xs font-bold">
              <span>🍗</span>
              <span>x2</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 3: Strength & Conditioning (Col Span 4)
            ======================================================== */}
        <div className="lg:col-span-4 kinetic-card p-6 flex flex-col justify-between relative overflow-hidden group">
          {/* Athlete Workout Background with Purple Ambient Lighting */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
              alt="Strength & Conditioning Athlete"
              className="w-full h-full object-cover object-center opacity-40 group-hover:scale-105 group-hover:opacity-45 transition-all duration-500"
            />
            {/* Deep rich plum/black gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131118] via-[#131118]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#131118] via-transparent to-[#131118]/70" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Top content */}
          <div className="relative z-10 space-y-3 pt-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Strength &amp;<br />Conditioning
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              A demanding functional strength routine focused on heavy compound deadlifts, explosive kettlebell swings, and high-tempo metabolic conditioning.
            </p>
          </div>

          {/* Bottom Trainer & 'Let's Start!' Button */}
          <div className="relative z-10 pt-6 mt-12 flex items-center justify-between gap-3">
            {/* Trainer Profile */}
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Marcus Vance Trainer"
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <p className="text-xs font-bold text-white leading-tight">Marcus Vance</p>
                <p className="text-[11px] text-slate-400">Trainer • Pro</p>
              </div>
            </div>

            {/* Neon Purple Pill Button */}
            <button
              onClick={handleStartWorkout}
              className="px-5 py-2.5 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs tracking-wide shadow-glow-purple transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Let's Start!
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================
          BOTTOM ROW: 3 CARDS MATCHING REFERENCE IMAGE
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ========================================================
            CARD 4: Weekly Performance (Col Span 4)
            ======================================================== */}
        <div className="lg:col-span-4 kinetic-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Weekly Performance
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              92% of target achieved
            </p>

            {/* Glowing Linear Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#251e30] mt-4 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-brand-500 to-brand-400 shadow-glow"
                style={{ width: '92%' }}
              />
            </div>
          </div>

          {/* Circular Multi-Donut & Metric */}
          <div className="flex items-center justify-between pt-6 mt-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-lg font-bold text-white">95%</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Cardio Volume</p>
            </div>

            {/* Concentric Donut SVG Graphic */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 64 64">
                {/* Outer Cyan Arc */}
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  className="stroke-[#06B6D4]"
                  strokeWidth="4"
                  strokeDasharray="163"
                  strokeDashoffset="45"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Middle Magenta Arc */}
                <circle
                  cx="32"
                  cy="32"
                  r="19"
                  className="stroke-[#D946EF]"
                  strokeWidth="4"
                  strokeDasharray="119"
                  strokeDashoffset="35"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Inner Purple Arc */}
                <circle
                  cx="32"
                  cy="32"
                  r="12"
                  className="stroke-brand-500"
                  strokeWidth="3.5"
                  strokeDasharray="75"
                  strokeDashoffset="20"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 5: Boxing & Core Shred (Col Span 4)
            ======================================================== */}
        <div 
          onClick={handleStartWorkout}
          className="lg:col-span-4 rounded-[28px] p-6 bg-gradient-to-br from-[#851ed8] via-[#9d26f2] to-[#b335fc] flex flex-col justify-between shadow-glow-purple relative overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.01]"
        >
          {/* Boxing Glove Visual Overlay */}
          <div className="absolute right-0 bottom-0 w-44 h-44 pointer-events-none select-none opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            <img
              src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=400&q=80"
              alt="Boxing Gloves Athlete"
              className="w-full h-full object-cover object-center rounded-tl-[36px] mix-blend-luminosity opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#9d26f2]/40 to-[#9d26f2]" />
          </div>

          <div className="relative z-10 space-y-2 max-w-[70%]">
            <h3 className="text-2xl font-black text-white tracking-tight">
              Boxing &amp; Core Shred
            </h3>
            <p className="text-xs text-purple-100/90 leading-relaxed">
              High-intensity striking combinations and core stability drills designed to torch body fat and build raw functional power.
            </p>
          </div>

          <div className="relative z-10 pt-4 flex items-center justify-between">
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest flex items-center gap-1.5">
              Quick Protocol
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Play className="w-3.5 h-3.5 fill-white" />
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 6: 4-day streak (Col Span 4)
            ======================================================== */}
        <div className="lg:col-span-4 kinetic-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>{profile?.streakDays || 4}-day streak</span>
                <span className="text-orange-400">🔥</span>
              </h3>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                Consistency
              </span>
            </div>

            {/* Streak Circles Indicator Row - 7 Days matching reference */}
            <div className="grid grid-cols-7 gap-2.5 mt-8 mb-4">
              {/* Day 1: Patterned purple stripes */}
              <div className="aspect-square rounded-full stripe-pattern border border-brand-500/40 shadow-sm" title="Day 1" />
              {/* Day 2: Patterned purple stripes */}
              <div className="aspect-square rounded-full stripe-pattern border border-brand-500/40 shadow-sm" title="Day 2" />
              {/* Day 3: Patterned purple stripes */}
              <div className="aspect-square rounded-full stripe-pattern border border-brand-500/40 shadow-sm" title="Day 3" />
              {/* Day 4: Patterned purple stripes */}
              <div className="aspect-square rounded-full stripe-pattern border border-brand-500/40 shadow-sm" title="Day 4" />
              {/* Day 5: Solid Vibrant Neon Purple */}
              <div className="aspect-square rounded-full bg-brand-500 shadow-glow-purple" title="Day 5" />
              {/* Day 6: Solid Vibrant Neon Purple */}
              <div className="aspect-square rounded-full bg-brand-500 shadow-glow-purple" title="Day 6" />
              {/* Day 7: Solid Vibrant Neon Purple */}
              <div className="aspect-square rounded-full bg-brand-500 shadow-glow-purple" title="Day 7" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between">
            <p className="text-xs text-slate-400">Next milestone: 7-day streak</p>
            <span className="text-xs font-bold text-slate-300">3 days to go</span>
          </div>
        </div>

      </div>
    </div>
  );
};
