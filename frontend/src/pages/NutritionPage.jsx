import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Flame, 
  Droplet, 
  Clock, 
  ShieldAlert, 
  Sparkles, 
  Info,
  PieChart,
  Check
} from 'lucide-react';
import { api } from '../api/apiClient';

export const NutritionPage = () => {
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNutrition();
  }, []);

  const fetchNutrition = async () => {
    setLoading(true);
    try {
      const res = await api.getNutritionGuidance();
      if (res.success && res.nutrition) {
        setNutrition(res.nutrition);
      }
    } catch (e) {
      console.warn('Nutrition fetch failed', e);
    } finally {
      setLoading(false);
    }
  };

  const data = nutrition || {
    bmr: 1750,
    tdee: 2550,
    targetCalories: 2850,
    strategy: 'Hypertrophic Surplus (+300 kcal) for muscle protein synthesis and low adiposity.',
    primaryGoal: 'build_muscle',
    hydrationLiters: '3.4',
    macros: {
      protein: { grams: 160, calories: 640, percentage: 22 },
      carbs: { grams: 370, calories: 1480, percentage: 52 },
      fats: { grams: 80, calories: 720, percentage: 26 },
    },
    mealTimingTips: [
      'Pre-Workout: 30-45g complex/simple carbs + 20g protein 1-2 hours before lifting.',
      'Intra-Workout: 500-750ml water with electrolytes to maintain intracellular hydration.',
      'Post-Workout: 30-40g fast-digesting protein within 60 minutes to maximize muscle protein synthesis trigger.',
      'Bedtime: 25-30g slow-digesting casein or curd to provide steady amino acid availability during nocturnal recovery.',
    ],
    disclaimer: 'General fitness estimate only. Nutritional requirements vary based on genetics, medical conditions, and daily training intensity. Always consult a qualified physician or registered dietitian before undertaking dietary modifications.',
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
          Metabolic Architecture & Fueling
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
          Personalized Nutrition & Macro Guidance
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Derived from the Mifflin-St Jeor formula and calibrated specifically to your training frequency and body composition targets.
        </p>
      </div>

      {/* Target Calorie Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              Daily Caloric Baseline
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl sm:text-5xl font-mono font-black text-white">
                {data.targetCalories?.toLocaleString()}
              </span>
              <span className="text-base font-semibold text-slate-400">kcal / day</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-mono">TDEE Maintenance: {data.tdee} kcal</span>
            <span className="text-xs text-slate-500 block font-mono">BMR: {data.bmr} kcal</span>
          </div>
        </div>

        {/* Strategy explanation */}
        <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-xs text-brand-300 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white mb-0.5">Metabolic Strategy</p>
            <p className="leading-relaxed">{data.strategy}</p>
          </div>
        </div>

        {/* 3 Macro Cards: Protein, Carbs, Fats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Protein */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Protein (MPS)</span>
              <span className="text-[10px] font-mono font-bold text-slate-400">{data.macros.protein.percentage}%</span>
            </div>
            <p className="text-3xl font-mono font-black text-white">{data.macros.protein.grams}g</p>
            <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
              <div className="h-full bg-rose-400 rounded-full" style={{ width: `${data.macros.protein.percentage * 2}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{data.macros.protein.calories} kcal • 2.0g/kg bodyweight</p>
          </div>

          {/* Carbs */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-accent-electric uppercase tracking-wider">Carbohydrates</span>
              <span className="text-[10px] font-mono font-bold text-slate-400">{data.macros.carbs.percentage}%</span>
            </div>
            <p className="text-3xl font-mono font-black text-white">{data.macros.carbs.grams}g</p>
            <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
              <div className="h-full bg-accent-electric rounded-full" style={{ width: `${data.macros.carbs.percentage * 1.5}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{data.macros.carbs.calories} kcal • Glycogen fuel</p>
          </div>

          {/* Fats */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Healthy Fats</span>
              <span className="text-[10px] font-mono font-bold text-slate-400">{data.macros.fats.percentage}%</span>
            </div>
            <p className="text-3xl font-mono font-black text-white">{data.macros.fats.grams}g</p>
            <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${data.macros.fats.percentage * 2.5}%` }} />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{data.macros.fats.calories} kcal • Hormonal synthesis</p>
          </div>
        </div>
      </div>

      {/* Hydration & Meal Timing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hydration */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Droplet className="w-4 h-4 text-accent-electric" />
              Target Hydration
            </h3>
            <span className="text-xs font-mono font-bold text-accent-electric">Intracellular Fluid</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent-electric/15 flex items-center justify-center font-mono text-2xl font-black text-accent-electric">
              {data.hydrationLiters}L
            </div>
            <div>
              <p className="text-sm font-bold text-white">Daily Water Target</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Drink an additional 500ml per hour of intense gym activity to avoid neuromuscular power drops.
              </p>
            </div>
          </div>
        </div>

        {/* Nutrient Timing */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-400" />
              Nutrient Timing Strategy
            </h3>
          </div>

          <div className="space-y-2">
            {(data.mealTimingTips || []).map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <Check className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MANDATORY MEDICAL / NUTRITIONAL DISCLAIMER (Requirement 9) */}
      <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200/90 leading-relaxed">
          <p className="font-bold text-amber-300 mb-1">Nutritional & Medical Disclaimer</p>
          {data.disclaimer}
        </div>
      </div>
    </div>
  );
};
