import React from 'react';
import { 
  Play, 
  Flame, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Dumbbell, 
  ChevronRight, 
  Activity, 
  ArrowRight,
  AlertTriangle,
  HeartPulse,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const { user, profile } = useAuth();
  const { 
    workoutPlan, 
    todayWorkoutData, 
    recommendations, 
    startLiveWorkout, 
    isWorkoutActive 
  } = useWorkout();

  const navigate = useNavigate();

  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const todayWorkout = todayWorkoutData?.workout;
  const isRestDay = todayWorkoutData?.isRestDay;
  const restDayGuidance = todayWorkoutData?.restDayGuidance;

  // Primary "What Should I Do Next?" card from recommendations
  const primaryRecommendation = recommendations?.[0] || {
    title: "Today's Training is Prepared",
    description: todayWorkout
      ? `Today's session is ${todayWorkout.title}. Hydrate and begin your dynamic warmup.`
      : 'Review your 8-week periodized plan and prepare for upcoming workouts.',
    actionLabel: 'Launch Workout',
    actionRoute: '/dashboard/workout',
    priority: 'high',
  };

  const handleStartWorkout = () => {
    if (todayWorkout) {
      startLiveWorkout(todayWorkout);
      navigate('/dashboard/workout');
    }
  };

  // Schedule week days
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDayName = weekDays[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* 1. TOP GREETING & STREAK INDICATOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
            Athlete Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'Athlete'}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {workoutPlan?.programName || '8-Week Personalized Training Program'} • Week {workoutPlan?.currentWeek || 1}
          </p>
        </div>

        {/* Badges Bar */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-bold">
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span>{profile?.streakDays || 1} Day Streak</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{profile?.totalWorkoutsCompleted || 14} Workouts Done</span>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED "WHAT SHOULD I DO NEXT?" FEATURE CARD (Requirement 6) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#121B2B] via-[#0E1522] to-[#121B2B] border border-brand-500/40 shadow-glow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-brand-400 text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>What Should I Do Next?</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              <span className="text-[10px] text-brand-300 font-mono">ADAPTIVE PRIORITY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {primaryRecommendation.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {primaryRecommendation.description}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {todayWorkout && !isRestDay ? (
              <button
                onClick={handleStartWorkout}
                className="px-6 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-sm shadow-glow transition-all hover:scale-105 flex items-center gap-2.5"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Start Today's Workout</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/dashboard/progress')}
                className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors flex items-center gap-2"
              >
                <span>View Recovery Metrics</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. TODAY'S WORKOUT SECTION (Requirement 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Workout Card */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {currentDayName}'s Protocol
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {isRestDay ? 'Scheduled Rest & Recovery Day' : todayWorkout?.title || 'Push Day A'}
              </h3>
            </div>

            {!isRestDay && todayWorkout && (
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-400" />
                  {todayWorkout.estimatedDurationMinutes || 50} min
                </span>
                <span>•</span>
                <span>{todayWorkout.exercises?.length || 4} Exercises</span>
              </div>
            )}
          </div>

          {isRestDay ? (
            /* Rest Day State */
            <div className="p-6 rounded-2xl bg-dark-900 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-electric/15 flex items-center justify-center text-accent-electric">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Systemic Recovery in Progress</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {restDayGuidance?.message ||
                  'No intense lifting scheduled today. Focus on meeting your daily protein targets, gentle joint mobility, and at least 8 hours of sleep.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-brand-400 font-medium">
                <span>Next Workout Day:</span>
                <span className="font-bold text-white">Tomorrow</span>
              </div>
            </div>
          ) : (
            /* Workout Routine Overview */
            <div className="space-y-4">
              {/* Muscle Targets */}
              <div className="flex flex-wrap gap-1.5">
                {(todayWorkout?.muscleGroups || ['Chest', 'Shoulders', 'Triceps']).map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Exercise Items List */}
              <div className="space-y-2.5">
                {(todayWorkout?.exercises || []).map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 hover:border-white/15 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-brand-400 w-5">{idx + 1}.</span>
                      <div>
                        <p className="text-sm font-bold text-white">{ex.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {ex.targetSets} sets × {ex.targetReps} reps • {ex.restSeconds}s rest
                        </p>
                      </div>
                    </div>

                    {ex.previousPerformance && (
                      <div className="hidden sm:block text-right text-xs">
                        <span className="text-[10px] text-slate-500 uppercase">Last Session</span>
                        <p className="font-mono text-slate-300">
                          {ex.previousPerformance.weightKg}kg × {ex.previousPerformance.reps}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Start Workout Primary CTA */}
              <div className="pt-2">
                <button
                  onClick={handleStartWorkout}
                  className="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-sm shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Enter Distraction-Free Gym Player</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Weekly Schedule & Consistency Calendar */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-400" />
              Weekly Split
            </h3>
            <span className="text-[10px] font-bold text-slate-400">Week {workoutPlan?.currentWeek || 1}/8</span>
          </div>

          <div className="space-y-2">
            {(workoutPlan?.schedule || [
              { dayOfWeek: 'Monday', isRestDay: false, workoutTitle: 'Push Day A' },
              { dayOfWeek: 'Tuesday', isRestDay: false, workoutTitle: 'Pull Day A' },
              { dayOfWeek: 'Wednesday', isRestDay: true, workoutTitle: 'Rest & Mobility' },
              { dayOfWeek: 'Thursday', isRestDay: false, workoutTitle: 'Leg Day' },
              { dayOfWeek: 'Friday', isRestDay: false, workoutTitle: 'Upper Density' },
              { dayOfWeek: 'Saturday', isRestDay: true, workoutTitle: 'Cardio Base' },
              { dayOfWeek: 'Sunday', isRestDay: true, workoutTitle: 'Full Rest' },
            ]).map((sc, i) => {
              const isToday = sc.dayOfWeek === currentDayName;
              return (
                <div
                  key={i}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between text-xs transition-colors ${
                    isToday
                      ? 'bg-brand-500/15 border-brand-500/40 text-brand-300 font-bold'
                      : 'bg-dark-900 border-white/5 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono w-7">{sc.dayOfWeek.slice(0, 3)}</span>
                    <span className={isToday ? 'text-white' : 'text-slate-300'}>
                      {sc.isRestDay ? 'Recovery Day' : sc.workoutTitle?.split('—')[0] || sc.workoutTitle}
                    </span>
                  </div>

                  {sc.isRestDay ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400">Rest</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-bold">
                      Lift
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick link to full plan */}
          <div className="pt-2">
            <button
              onClick={() => navigate('/dashboard/plan')}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore 8-Week Architecture</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY & METRIC SNAPSHOTS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/15 flex items-center justify-center text-brand-400 font-black">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Total Volume Moved</p>
            <p className="text-xl font-mono font-black text-white">48,250 kg</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-electric/15 flex items-center justify-center text-accent-electric font-black">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Adherence Score</p>
            <p className="text-xl font-mono font-black text-white">96% On Track</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/15 flex items-center justify-center text-orange-400 font-black">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Active PRs</p>
            <p className="text-xl font-mono font-black text-white">95 kg Bench</p>
          </div>
        </div>
      </div>
    </div>
  );
};
