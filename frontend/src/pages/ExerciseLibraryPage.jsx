import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Dumbbell, 
  ShieldCheck, 
  RefreshCw, 
  ChevronRight, 
  X,
  Info,
  Clock,
  Zap
} from 'lucide-react';
import { api } from '../api/apiClient';

const CATEGORIES = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Glutes',
  'Core',
  'Calves',
  'Full Body',
  'Cardio',
];

const EQUIPMENTS = [
  'All',
  'barbell',
  'dumbbell',
  'machine',
  'cable',
  'bodyweight',
  'resistance_bands',
];

export const ExerciseLibraryPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [equipment, setEquipment] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    fetchExercises();
  }, [category, equipment]);

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const res = await api.getExercises({ category, equipment, search });
      if (res.success && res.exercises) {
        setExercises(res.exercises);
      }
    } catch (e) {
      console.warn('Exercise fetch failed', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchExercises();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
          Comprehensive Movement Anatomy
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
          Exercise & Biomechanics Database
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Search over 70+ compound and isolation movements with form cues, safety considerations, and direct equipment substitutions.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercise by name or muscle (e.g. Bench Press, Lat, Quadriceps)..."
            className="w-full bg-dark-900 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-500"
          />
        </form>

        {/* Categories Bar */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Target Muscle Group
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  category === cat
                    ? 'bg-brand-500 text-black border-brand-500 shadow-glow'
                    : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Selector */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Available Equipment
          </span>
          <div className="flex flex-wrap gap-1.5">
            {EQUIPMENTS.map((eq) => (
              <button
                key={eq}
                type="button"
                onClick={() => setEquipment(eq)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all border ${
                  equipment === eq
                    ? 'bg-accent-electric/20 text-accent-electric border-accent-electric/50'
                    : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {eq.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercises Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-400 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-slate-400 mt-3 font-mono">Filtering movements...</p>
        </div>
      ) : exercises.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-dark-900 border border-white/10">
          <p className="text-slate-300 font-bold">No exercises matched your filters.</p>
          <button
            onClick={() => {
              setCategory('All');
              setEquipment('All');
              setSearch('');
            }}
            className="mt-3 text-xs text-brand-400 font-semibold underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((ex) => (
            <div
              key={ex.id || ex._id}
              onClick={() => setSelectedExercise(ex)}
              className="p-5 rounded-3xl bg-[#0D121D] border border-white/10 hover:border-brand-500/40 hover:shadow-glow cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-400 text-[10px] font-extrabold uppercase">
                    {ex.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 capitalize">
                    {ex.equipment}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors">
                    {ex.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Primary: <span className="text-slate-300 font-medium">{ex.primaryMuscle}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>{ex.defaultSets} sets × {ex.defaultReps}</span>
                <span className="text-brand-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center">
                  Form Details <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILED EXERCISE MODAL */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setSelectedExercise(null)} />
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0D121D] border border-white/10 p-6 sm:p-8 z-10 shadow-2xl max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 text-[10px] font-extrabold uppercase">
                    {selectedExercise.category}
                  </span>
                  <span className="text-xs text-slate-400 capitalize">• {selectedExercise.difficulty}</span>
                </div>
                <h2 className="text-2xl font-black text-white">{selectedExercise.name}</h2>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Muscle Breakdown */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-dark-900 border border-white/5">
                <span className="text-slate-400 block font-semibold">Primary Target</span>
                <span className="text-sm font-bold text-brand-400 mt-0.5 block">
                  {selectedExercise.primaryMuscle}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-dark-900 border border-white/5">
                <span className="text-slate-400 block font-semibold">Secondary Movers</span>
                <span className="text-xs font-medium text-slate-200 mt-0.5 block">
                  {selectedExercise.secondaryMuscles?.join(', ') || 'Synergists & Stabilizers'}
                </span>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Step-by-Step Execution</h4>
              <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed bg-dark-900/60 p-4 rounded-2xl border border-white/5">
                {(selectedExercise.instructions || []).map((inst, i) => (
                  <li key={i} className="pl-1">{inst}</li>
                ))}
              </ol>
            </div>

            {/* Safety & Form Notes */}
            {selectedExercise.safetyNotes && selectedExercise.safetyNotes.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1.5">
                <p className="font-bold text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Biomechanical Safety Guidelines
                </p>
                <ul className="list-disc list-inside space-y-1 text-amber-200/90">
                  {selectedExercise.safetyNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Substitutions & Alternatives */}
            {selectedExercise.alternatives && selectedExercise.alternatives.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-brand-400" />
                  Prescribed Substitutions & Alternatives
                </h4>
                <div className="space-y-2">
                  {selectedExercise.alternatives.map((alt, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-dark-900 border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white">{alt.name}</p>
                        <p className="text-slate-400 text-[11px] capitalize">{alt.equipment} • {alt.reason}</p>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        ALTERNATIVE
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
