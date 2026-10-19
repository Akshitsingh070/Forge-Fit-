import React from 'react';
import { Timer, Plus, FastForward, Volume2, VolumeX } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';

export const RestTimerBanner = () => {
  const {
    isRestTimerActive,
    restSecondsRemaining,
    totalRestSeconds,
    skipRestTimer,
    addRestSeconds,
    soundEnabled,
    setSoundEnabled,
  } = useWorkout();

  if (!isRestTimerActive || restSecondsRemaining <= 0) return null;

  const minutes = Math.floor(restSecondsRemaining / 60);
  const seconds = restSecondsRemaining % 60;
  const progressPercent = Math.max(0, Math.min(100, ((totalRestSeconds - restSecondsRemaining) / totalRestSeconds) * 100));

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 animate-bounce-subtle">
      <div className="w-80 sm:w-96 rounded-2xl bg-[#0F1420]/95 backdrop-blur-xl border border-brand-500/40 shadow-glow-lg p-4 text-white overflow-hidden relative">
        {/* Progress bar line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-brand-400 transition-all duration-1000 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
              <Timer className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-400 uppercase tracking-wider">Rest Interval</p>
              <p className="text-[11px] text-slate-400">Recovery & ATP replenishment</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title={soundEnabled ? 'Mute Rest Chime' : 'Enable Rest Chime'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-brand-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Big Time Display */}
        <div className="text-center py-1">
          <span className="font-mono text-4xl font-extrabold tracking-tight text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            onClick={() => addRestSeconds(30)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            +30 Sec
          </button>
          <button
            onClick={skipRestTimer}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-black text-xs font-bold transition-all shadow-glow"
          >
            <FastForward className="w-3.5 h-3.5" />
            Skip Rest
          </button>
        </div>
      </div>
    </div>
  );
};
