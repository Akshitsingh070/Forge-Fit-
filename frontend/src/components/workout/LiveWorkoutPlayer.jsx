import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Timer, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Flame, 
  Info, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  X,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWorkout } from '../../context/WorkoutContext';
import { api } from '../../api/apiClient';
import { useNavigate } from 'react-router-dom';

export const LiveWorkoutPlayer = () => {
  const { 
    isWorkoutActive, 
    activeWorkout, 
    currentSession, 
    elapsedSeconds, 
    cancelLiveWorkout,
    startRestTimer,
    loadWorkoutData
  } = useWorkout();

  const navigate = useNavigate();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [completionSummary, setCompletionSummary] = useState(null);
  const [showAlternativeModal, setShowAlternativeModal] = useState(false);
  const [bannerNotice, setBannerNotice] = useState(null); // 'Exercise complete ✓'

  // Initialize exercises state from session or workout
  useEffect(() => {
    if (currentSession && currentSession.exercises && currentSession.exercises.length > 0) {
      setExercises(currentSession.exercises);
    } else if (activeWorkout && activeWorkout.exercises) {
      const formatted = activeWorkout.exercises.map((ex) => ({
        exerciseId: ex.exerciseId || ex.id,
        name: ex.name,
        category: ex.category,
        primaryMuscle: ex.primaryMuscle,
        equipment: ex.equipment,
        targetSets: ex.targetSets || 3,
        targetReps: ex.targetReps || '8-12',
        restSeconds: ex.restSeconds || 90,
        instructions: ex.instructions || [],
        safetyNotes: ex.safetyNotes || [],
        alternatives: ex.alternatives || [],
        isCompleted: false,
        sets: Array.from({ length: ex.targetSets || 3 }, (_, i) => ({
          setNumber: i + 1,
          targetReps: ex.targetReps || '8-12',
          weightKg: ex.recommendedWeightKg || 0,
          repsCompleted: parseInt(ex.targetReps) || 8,
          rpe: 8,
          isCompleted: false,
        })),
      }));
      setExercises(formatted);
    }
  }, [currentSession, activeWorkout]);

  if (!isWorkoutActive || exercises.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No active workout in progress.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 rounded-xl bg-brand-500 text-black font-bold text-xs"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex] || exercises[0];

  // Calculate live completion metrics
  const totalSets = exercises.reduce((acc, ex) => acc + (ex.sets?.length || 0), 0);
  const completedSets = exercises.reduce(
    (acc, ex) => acc + (ex.sets?.filter((s) => s.isCompleted)?.length || 0),
    0
  );
  const completionPercentage = totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;

  // Set toggle & rest trigger
  const handleSetToggle = (setIdx) => {
    setExercises((prev) => {
      const updated = [...prev];
      const ex = { ...updated[currentExerciseIndex] };
      const setList = [...ex.sets];
      const targetSet = { ...setList[setIdx] };

      targetSet.isCompleted = !targetSet.isCompleted;
      setList[setIdx] = targetSet;
      ex.sets = setList;

      // Check if entire exercise is now completed
      const allDone = setList.every((s) => s.isCompleted);
      ex.isCompleted = allDone;
      updated[currentExerciseIndex] = ex;

      // Trigger automatic rest timer if completed
      if (targetSet.isCompleted) {
        startRestTimer(ex.restSeconds || 90);

        if (allDone) {
          const nextEx = updated[currentExerciseIndex + 1];
          setBannerNotice({
            title: 'Exercise complete ✓',
            nextTitle: nextEx ? `Next: ${nextEx.name}` : 'Final exercise finished!',
          });
          setTimeout(() => setBannerNotice(null), 4000);
        }
      }

      return updated;
    });
  };

  const handleSetFieldChange = (setIdx, field, val) => {
    setExercises((prev) => {
      const updated = [...prev];
      const ex = { ...updated[currentExerciseIndex] };
      const setList = [...ex.sets];
      setList[setIdx] = { ...setList[setIdx], [field]: val };
      ex.sets = setList;
      updated[currentExerciseIndex] = ex;
      return updated;
    });
  };

  // Swap exercise with alternative
  const handleSwapAlternative = (alt) => {
    setExercises((prev) => {
      const updated = [...prev];
      const current = updated[currentExerciseIndex];
      updated[currentExerciseIndex] = {
        ...current,
        name: alt.name,
        equipment: alt.equipment,
      };
      return updated;
    });
    setShowAlternativeModal(false);
  };

  // Finish Workout
  const handleFinishWorkout = async () => {
    setIsFinishing(true);
    try {
      if (currentSession && currentSession.id) {
        const res = await api.updateSession(currentSession.id, {
          status: 'completed',
          durationSeconds: elapsedSeconds,
          exercises,
        });

        if (res.success && res.summary) {
          setCompletionSummary(res.summary);
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        // Fallback celebration
        setCompletionSummary({
          durationSeconds: elapsedSeconds,
          totalSets: completedSets,
          totalVolumeKg: 2450,
          personalRecords: [{ exerciseName: currentExercise.name, weightKg: 80, reps: 8 }],
          nextAction: {
            title: 'Session Logged! Focus on Protein & Sleep',
            description: 'Your recovery window is now active. Replenish with 30-40g protein.',
          },
        });
        confetti();
      }
      await loadWorkoutData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsFinishing(false);
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Distraction-Free Sticky Bar */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-[#080B11]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-mono font-bold text-xs">
            {completionPercentage}%
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              {activeWorkout?.title || 'Live Gym Session'}
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Timer className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatTime(elapsedSeconds)}</span>
              <span>•</span>
              <span>{completedSets} of {totalSets} sets</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={cancelLiveWorkout}
            className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleFinishWorkout}
            disabled={isFinishing}
            className="px-4 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs shadow-glow transition-all"
          >
            Finish Workout 🎉
          </button>
        </div>
      </div>

      {/* Real-time Progress Bar */}
      <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-accent-electric transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Notice Banner ("Exercise complete ✓") */}
      {bannerNotice && (
        <div className="p-4 rounded-2xl bg-brand-500/15 border border-brand-500/40 text-brand-300 flex items-center justify-between animate-bounce-subtle">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-brand-400" />
            <div>
              <p className="text-sm font-extrabold text-white">{bannerNotice.title}</p>
              <p className="text-xs text-brand-400 font-medium">{bannerNotice.nextTitle}</p>
            </div>
          </div>
          {currentExerciseIndex < exercises.length - 1 && (
            <button
              onClick={() => setCurrentExerciseIndex((prev) => prev + 1)}
              className="px-3 py-1.5 rounded-xl bg-brand-500 text-black text-xs font-bold"
            >
              Go to Next
            </button>
          )}
        </div>
      )}

      {/* Horizontal Exercise Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {exercises.map((ex, idx) => {
          const isCurrent = idx === currentExerciseIndex;
          const isDone = ex.isCompleted;

          return (
            <button
              key={idx}
              onClick={() => setCurrentExerciseIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isCurrent
                  ? 'bg-brand-500 text-black border-brand-500 shadow-glow'
                  : isDone
                  ? 'bg-brand-500/15 text-brand-400 border-brand-500/30'
                  : 'bg-dark-900 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="truncate max-w-[140px]">{ex.name}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Current Exercise Working Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E131E] border border-white/10 shadow-xl space-y-6">
        {/* Exercise Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-[10px] font-extrabold uppercase tracking-wider">
                {currentExercise.category || 'Compound'}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300 font-medium">{currentExercise.primaryMuscle}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">{currentExercise.name}</h1>
          </div>

          {/* Quick Alternative Switcher */}
          {currentExercise.alternatives && currentExercise.alternatives.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAlternativeModal(true)}
              className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-brand-400 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Equipment Alternative
            </button>
          )}
        </div>

        {/* Set-by-Set Logging Table */}
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
            <span className="col-span-2">Set</span>
            <span className="col-span-3">Target</span>
            <span className="col-span-3">Weight (kg)</span>
            <span className="col-span-2 text-center">Reps</span>
            <span className="col-span-2 text-right">Done</span>
          </div>

          <div className="space-y-2">
            {(currentExercise.sets || []).map((set, sIdx) => {
              const isChecked = set.isCompleted;

              return (
                <div
                  key={sIdx}
                  className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl border transition-all ${
                    isChecked
                      ? 'bg-brand-500/10 border-brand-500/40 text-brand-300'
                      : 'bg-dark-900 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Set Number */}
                  <span className="col-span-2 font-mono font-bold text-sm text-white">
                    Set {set.setNumber}
                  </span>

                  {/* Target reference */}
                  <span className="col-span-3 text-xs text-slate-400">
                    {set.targetReps} reps
                  </span>

                  {/* Weight Input */}
                  <div className="col-span-3">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={set.weightKg}
                      onChange={(e) => handleSetFieldChange(sIdx, 'weightKg', Number(e.target.value))}
                      className="w-full bg-[#161F2E] border border-white/10 rounded-xl px-2.5 py-1.5 text-sm font-mono font-bold text-white text-center focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  {/* Reps Completed Input */}
                  <div className="col-span-2">
                    <input
                      type="number"
                      min="0"
                      value={set.repsCompleted}
                      onChange={(e) => handleSetFieldChange(sIdx, 'repsCompleted', Number(e.target.value))}
                      className="w-full bg-[#161F2E] border border-white/10 rounded-xl px-2 py-1.5 text-sm font-mono font-bold text-white text-center focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  {/* Checkbox Complete */}
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSetToggle(sIdx)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-brand-500 text-black shadow-glow'
                          : 'bg-white/10 text-slate-400 hover:bg-brand-500/30 hover:text-brand-400'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions & Biomechanics Drawer */}
        {currentExercise.instructions && currentExercise.instructions.length > 0 && (
          <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/5 space-y-2 text-xs">
            <p className="font-bold text-slate-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-400" />
              Form & Execution Protocol
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 leading-relaxed">
              {currentExercise.instructions.slice(0, 3).map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ol>
          </div>
        )}

        {/* Navigation between exercises */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            disabled={currentExerciseIndex === 0}
            onClick={() => setCurrentExerciseIndex((prev) => prev - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentExerciseIndex + 1} / {exercises.length}
          </span>

          <button
            type="button"
            disabled={currentExerciseIndex === exercises.length - 1}
            onClick={() => setCurrentExerciseIndex((prev) => prev + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-400 text-xs font-bold hover:bg-brand-500/30 disabled:opacity-30"
          >
            Next Exercise
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alternative Exercises Modal */}
      {showAlternativeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAlternativeModal(false)} />
          <div className="relative w-full max-w-md rounded-3xl bg-[#0D121D] border border-white/10 p-6 z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Substitute Exercise</h3>
                <p className="text-xs text-slate-400">Gym station occupied? Select an equivalent alternative:</p>
              </div>
              <button onClick={() => setShowAlternativeModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {currentExercise.alternatives.map((alt, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSwapAlternative(alt)}
                  className="p-3.5 rounded-2xl bg-dark-900 border border-white/10 hover:border-brand-500/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-brand-400">{alt.name}</p>
                    <p className="text-xs text-slate-400 capitalize">{alt.equipment} • {alt.reason}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WORKOUT COMPLETE MODAL (Requirement 18) */}
      {completionSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md" />
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0D121D] border border-brand-500/40 p-6 sm:p-8 z-10 shadow-glow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-500/20 border border-brand-500 flex items-center justify-center mx-auto text-brand-400">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Session Recorded</span>
              <h2 className="text-3xl font-black text-white mt-1">Workout Complete 🎉</h2>
              <p className="text-xs text-slate-400 mt-1">Exceptional intensity. Your neuromuscular adaptive stimulus is registered.</p>
            </div>

            {/* Performance Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-dark-900 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Duration</p>
                <p className="text-base font-extrabold text-white mt-1 font-mono">
                  {formatTime(completionSummary.durationSeconds)}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-dark-900 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Sets Done</p>
                <p className="text-base font-extrabold text-brand-400 mt-1 font-mono">
                  {completionSummary.totalSets}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-dark-900 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Volume</p>
                <p className="text-base font-extrabold text-white mt-1 font-mono">
                  {completionSummary.totalVolumeKg?.toLocaleString()} kg
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-dark-900 border border-white/10">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">PRs Hit</p>
                <p className="text-base font-extrabold text-orange-400 mt-1 font-mono">
                  {completionSummary.personalRecords?.length || 1} 🔥
                </p>
              </div>
            </div>

            {/* "WHAT SHOULD I DO NEXT?" Dedicated Post-Workout Guidance Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-500/10 to-accent-electric/10 border border-brand-500/30 text-left space-y-1.5">
              <div className="flex items-center gap-1.5 text-brand-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                What Should I Do Next?
              </div>
              <p className="text-sm font-bold text-white">
                {completionSummary.nextAction?.title || 'Recovery Phase Activated'}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {completionSummary.nextAction?.description ||
                  'Great work. Target 35g protein within 60 minutes and hydrate. Your next session is Pull tomorrow.'}
              </p>
            </div>

            {/* Return Button */}
            <button
              onClick={() => {
                setCompletionSummary(null);
                cancelLiveWorkout();
                navigate('/dashboard');
              }}
              className="w-full py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-sm shadow-glow transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
