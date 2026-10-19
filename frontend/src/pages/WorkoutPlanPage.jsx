import React, { useState } from 'react';
import { 
  CalendarDays, 
  Sparkles, 
  RotateCw, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Dumbbell, 
  Target, 
  Activity, 
  CheckCircle2, 
  Info,
  Play
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { api } from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export const WorkoutPlanPage = ({ onOpenOnboarding }) => {
  const { workoutPlan, setWorkoutPlan, startLiveWorkout, loadWorkoutData } = useWorkout();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const navigate = useNavigate();

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await api.generateWorkoutPlan();
      if (res.success && res.workoutPlan) {
        setWorkoutPlan(res.workoutPlan);
        await loadWorkoutData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const plan = workoutPlan || {
    programName: 'Hypertrophy Surge: 8-Week Progressive Muscle & Density Architecture',
    goal: 'build_muscle',
    weeklyFrequency: 4,
    estimatedSessionDurationMinutes: 55,
    durationWeeks: 8,
    splitType: 'push_pull_legs',
    schedule: [
      { dayOfWeek: 'Monday', isRestDay: false, workoutTitle: 'Push Day A — Chest, Delts & Triceps', workoutIndex: 0 },
      { dayOfWeek: 'Tuesday', isRestDay: false, workoutTitle: 'Pull Day A — Lat Width & Spinal Thickness', workoutIndex: 1 },
      { dayOfWeek: 'Wednesday', isRestDay: true, workoutTitle: 'Active Recovery & Mobility', workoutIndex: -1 },
      { dayOfWeek: 'Thursday', isRestDay: false, workoutTitle: 'Leg Day — Quad & Glute Hypertrophy', workoutIndex: 2 },
      { dayOfWeek: 'Friday', isRestDay: false, workoutTitle: 'Upper Body Density & Weak Point Overload', workoutIndex: 3 },
      { dayOfWeek: 'Saturday', isRestDay: true, workoutTitle: 'Cardio & Recovery Protocol', workoutIndex: -1 },
      { dayOfWeek: 'Sunday', isRestDay: true, workoutTitle: 'Full Rest & Micronutrient Reset', workoutIndex: -1 },
    ],
    workouts: [],
    progressionStrategy: 'Double Progression Protocol: increase load by +2.5kg once top reps achieved across all sets at RPE <= 8.',
  };

  const workoutsList = plan.workouts || [];
  const selectedWorkout = workoutsList[activeDayIdx] || workoutsList[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header with Title and Regenerate Action */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider">
              {plan.durationWeeks || 8}-Week Program
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-300 font-semibold capitalize">
              Split: {plan.splitType?.replace(/_/g, ' ')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {plan.programName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {plan.description ||
              'A dynamically periodized training program engineered for optimal hypertrophy and strength output.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenOnboarding}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
          >
            Edit Assessment
          </button>
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Synthesizing...' : 'Regenerate Plan'}</span>
          </button>
        </div>
      </div>

      {/* Program Summary Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <p className="text-[11px] text-slate-400 uppercase font-semibold">Frequency</p>
          <p className="text-lg font-mono font-bold text-white mt-1">
            {plan.weeklyFrequency} Days / Week
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <p className="text-[11px] text-slate-400 uppercase font-semibold">Session Time</p>
          <p className="text-lg font-mono font-bold text-white mt-1">
            ~{plan.estimatedSessionDurationMinutes || 50} min
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <p className="text-[11px] text-slate-400 uppercase font-semibold">Progression Model</p>
          <p className="text-sm font-semibold text-brand-400 mt-1 truncate">Double Progression</p>
        </div>
        <div className="p-4 rounded-2xl bg-dark-900 border border-white/10">
          <p className="text-[11px] text-slate-400 uppercase font-semibold">Current Phase</p>
          <p className="text-sm font-bold text-accent-electric mt-1">Week 1–4: Volume Accumulation</p>
        </div>
      </div>

      {/* 7-Day Interactive Weekly Architecture Matrix */}
      <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Weekly Training Architecture</h2>
          <p className="text-xs text-slate-400 mt-0.5">Click any day to inspect exercise breakdowns and warm-up protocols.</p>
        </div>

        {/* Schedule Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {(plan.schedule || []).map((sc, idx) => {
            const isRest = sc.isRestDay;
            const wIdx = sc.workoutIndex !== undefined ? sc.workoutIndex : idx;
            const isSelected = wIdx === activeDayIdx && !isRest;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => !isRest && wIdx >= 0 && setActiveDayIdx(wIdx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-brand-500/20 border-brand-500 text-brand-400 shadow-glow'
                    : isRest
                    ? 'bg-dark-950 border-white/5 text-slate-500 cursor-default'
                    : 'bg-dark-900 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <p className="text-[10px] font-mono font-bold uppercase">{sc.dayOfWeek.slice(0, 3)}</p>
                <p className="text-xs font-bold mt-1 text-white truncate">
                  {isRest ? 'Rest' : sc.workoutTitle?.split('—')[0] || 'Workout'}
                </p>
                <span className={`inline-block text-[9px] mt-2 px-1.5 py-0.5 rounded ${
                  isRest ? 'bg-white/5 text-slate-500' : 'bg-brand-500/20 text-brand-400 font-extrabold'
                }`}>
                  {isRest ? 'Recovery' : 'Training'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Workout Inspector Card */}
        {selectedWorkout && (
          <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                  Day Focus
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">{selectedWorkout.title}</h3>
                <p className="text-xs text-slate-400">{selectedWorkout.focus}</p>
              </div>

              <button
                onClick={() => {
                  startLiveWorkout(selectedWorkout);
                  navigate('/dashboard/workout');
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Start This Session</span>
              </button>
            </div>

            {/* Warm-Up Protocols */}
            {selectedWorkout.warmUp && selectedWorkout.warmUp.length > 0 && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-400" />
                  Prescribed Dynamic Warm-Up
                </p>
                <ul className="text-xs text-slate-400 list-disc list-inside space-y-0.5">
                  {selectedWorkout.warmUp.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prescribed Exercises Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Prescribed Exercises</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {(selectedWorkout.exercises || []).map((ex, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#121824] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-400">{i + 1}.</span>
                        <p className="text-sm font-bold text-white">{ex.name}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 capitalize">
                          {ex.equipment}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Primary: <span className="text-slate-300 font-medium">{ex.primaryMuscle}</span> • Tempo: <span className="font-mono text-slate-300">{ex.tempo || '3-0-1-0'}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="text-center px-3 py-1.5 rounded-xl bg-dark-900 border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase">Sets</span>
                        <span className="font-bold text-white">{ex.targetSets}</span>
                      </div>
                      <div className="text-center px-3 py-1.5 rounded-xl bg-dark-900 border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase">Reps</span>
                        <span className="font-bold text-white">{ex.targetReps}</span>
                      </div>
                      <div className="text-center px-3 py-1.5 rounded-xl bg-dark-900 border border-white/5">
                        <span className="text-[10px] text-slate-500 block uppercase">Rest</span>
                        <span className="font-bold text-brand-400">{ex.restSeconds}s</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
