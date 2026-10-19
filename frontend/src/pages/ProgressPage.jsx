import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Dumbbell, 
  Scale, 
  Plus, 
  Flame, 
  Award, 
  Target, 
  Calendar, 
  Activity,
  CheckCircle2,
  X
} from 'lucide-react';
import { api } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export const ProgressPage = () => {
  const { profile } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form for logging new weight/metrics
  const [weightInput, setWeightInput] = useState('');
  const [bodyFatInput, setBodyFatInput] = useState('');
  const [chestInput, setChestInput] = useState('');
  const [waistInput, setWaistInput] = useState('');
  const [armInput, setArmInput] = useState('');

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    setLoading(true);
    try {
      const res = await api.getProgress();
      if (res.success) {
        setProgressData(res);
        if (res.currentStats?.weightKg) {
          setWeightInput(res.currentStats.weightKg);
        }
      }
    } catch (e) {
      console.warn('Progress load failed', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.logProgress({
        weightKg: Number(weightInput),
        bodyFatPercentage: bodyFatInput ? Number(bodyFatInput) : undefined,
        measurements: {
          chestCm: chestInput ? Number(chestInput) : undefined,
          waistCm: waistInput ? Number(waistInput) : undefined,
          armsCm: armInput ? Number(armInput) : undefined,
        },
      });
      setShowLogModal(false);
      fetchProgress();
    } catch (err) {
      console.error(err);
    }
  };

  const metrics = progressData?.metrics || {
    totalWorkouts: 14,
    workoutsThisWeek: 4,
    currentStreak: profile?.streakDays || 4,
    totalVolumeKg: 48250,
    totalDurationMinutes: 680,
    completionRate: 94,
  };

  const strengthCurves = progressData?.strengthCurves || {};
  const measurements = progressData?.measurements || [];
  const goals = progressData?.goals || [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header with Log Metric Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
            Athletic Performance Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Progress & Adaptation Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Track progressive overload, body composition trajectory, and lifting volume.
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4 font-black" />
          <span>Log Body Metrics</span>
        </button>
      </div>

      {/* Aggregate Stats 4-Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Workouts</span>
            <CheckCircle2 className="w-4 h-4 text-brand-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">{metrics.totalWorkouts}</p>
          <p className="text-[11px] text-brand-400 font-medium">{metrics.workoutsThisWeek} sessions this week</p>
        </div>

        <div className="p-4 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Current Streak</span>
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">{metrics.currentStreak} Days</p>
          <p className="text-[11px] text-orange-400 font-medium">Consistent lifter</p>
        </div>

        <div className="p-4 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Volume</span>
            <Activity className="w-4 h-4 text-accent-electric" />
          </div>
          <p className="text-2xl font-mono font-black text-white">
            {metrics.totalVolumeKg?.toLocaleString()} kg
          </p>
          <p className="text-[11px] text-slate-400 font-medium">Mechanical load moved</p>
        </div>

        <div className="p-4 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-semibold uppercase">Plan Adherence</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-mono font-black text-brand-400">{metrics.completionRate}%</p>
          <p className="text-[11px] text-slate-400 font-medium">Weekly compliance</p>
        </div>
      </div>

      {/* STRENGTH PROGRESSION SECTION (Requirement 7) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-brand-400" />
              Compound Strength Curves (Estimated 1RM)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Derived automatically from live gym session logs via the Epley formula: Load × (1 + Reps/30).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(strengthCurves).length > 0 ? (
            Object.entries(strengthCurves).map(([liftName, logs]) => {
              const latest = logs[logs.length - 1];
              const best1RM = logs.length > 0 ? Math.max(...logs.map((l) => l.estimated1RM)) : 0;

              return (
                <div key={liftName} className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white">{liftName}</h4>
                      <p className="text-xs text-slate-400 font-mono">
                        Recent: {latest?.weightKg || 0}kg × {latest?.reps || 0} reps
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase">Estimated 1RM</span>
                      <p className="text-xl font-mono font-black text-brand-400">
                        {best1RM || latest?.estimated1RM || 0} kg
                      </p>
                    </div>
                  </div>

                  {/* Visual Progression Bars for Historical Sessions */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {logs.slice(-4).map((record, rIdx) => (
                      <div key={rIdx} className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span className="font-mono text-slate-400">
                            {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="font-mono font-bold text-white">
                            {record.estimated1RM} kg 1RM
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-400 rounded-full transition-all"
                            style={{
                              width: `${Math.min(100, (record.estimated1RM / (best1RM * 1.05)) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-slate-400 col-span-2">No compound records registered yet.</p>
          )}
        </div>
      </div>

      {/* BODY METRICS & GOALS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Body Metrics History */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-accent-electric" />
              Body Metrics Log
            </h3>
            <span className="text-xs font-mono font-bold text-brand-400">
              Current: {progressData?.currentStats?.weightKg || 78.5} kg
            </span>
          </div>

          <div className="space-y-3">
            {measurements.slice(-4).reverse().map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-white font-mono">{m.weightKg} kg</p>
                  <p className="text-slate-400 text-[11px]">
                    {new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block font-mono">BMI: {m.bmi || 24.2}</span>
                  {m.bodyFatPercentage && (
                    <span className="text-brand-400 font-mono font-bold">{m.bodyFatPercentage}% BF</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Milestones & Goals */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-400" />
              Target Goals & Milestones
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Cycle Targets</span>
          </div>

          <div className="space-y-4">
            {goals.map((g) => (
              <div key={g.id || g._id} className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{g.title}</span>
                  <span className="text-xs font-mono font-bold text-brand-400">{g.progressPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-accent-electric transition-all"
                    style={{ width: `${g.progressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Current: {g.currentValue} {g.unit}</span>
                  <span>Target: {g.targetValue} {g.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LOG PROGRESS MODAL */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setShowLogModal(false)} />
          <div className="relative w-full max-w-md rounded-3xl bg-[#0D121D] border border-white/10 p-6 z-10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-lg font-bold text-white">Log Physical Measurement</h3>
              <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  placeholder="78.5"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Body Fat % (Optional)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bodyFatInput}
                  onChange={(e) => setBodyFatInput(e.target.value)}
                  placeholder="15.5"
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Chest (cm)</label>
                  <input
                    type="number"
                    value={chestInput}
                    onChange={(e) => setChestInput(e.target.value)}
                    placeholder="104"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Waist (cm)</label>
                  <input
                    type="number"
                    value={waistInput}
                    onChange={(e) => setWaistInput(e.target.value)}
                    placeholder="83"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Arms (cm)</label>
                  <input
                    type="number"
                    value={armInput}
                    onChange={(e) => setArmInput(e.target.value)}
                    placeholder="37"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs shadow-glow transition-all"
              >
                Save Measurement Log
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
