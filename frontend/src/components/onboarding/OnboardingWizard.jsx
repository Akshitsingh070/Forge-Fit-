import React, { useState } from 'react';
import { 
  User, 
  Ruler, 
  Target, 
  Award, 
  Calendar, 
  Dumbbell, 
  HeartPulse, 
  Sliders, 
  ShieldAlert, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { api } from '../../api/apiClient';
import { useAuth } from '../../context/AuthContext';
import { useWorkout } from '../../context/WorkoutContext';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'body', label: 'Body', icon: Ruler },
  { id: 'goal', label: 'Goal', icon: Target },
  { id: 'experience', label: 'Experience', icon: Award },
  { id: 'training', label: 'Training', icon: Calendar },
  { id: 'equipment', label: 'Equipment', icon: Dumbbell },
  { id: 'lifestyle', label: 'Lifestyle', icon: HeartPulse },
  { id: 'preferences', label: 'Preferences', icon: Sliders },
  { id: 'limitations', label: 'Limitations', icon: ShieldAlert },
];

export const OnboardingWizard = ({ isOpen, onClose, onCompleted }) => {
  const { isAuthenticated, user } = useAuth();
  const { setWorkoutPlan, loadWorkoutData } = useWorkout();
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [unitMetric, setUnitMetric] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Personal
    name: user?.name || '',
    age: 26,
    gender: 'male',

    // Body
    height: 178, // cm
    weight: 76,  // kg
    targetWeight: 80,

    // Goal
    goals: ['build_muscle'],
    primaryGoal: 'build_muscle',

    // Experience
    experienceLevel: 'intermediate',
    trainingHistoryYears: 2,
    currentDaysPerWeek: 4,

    // Training Availability
    daysPerWeekAvailable: 4,
    workoutDuration: '45-60 min',
    preferredTrainingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    preferredWorkoutTime: 'morning',

    // Equipment
    availableEquipment: ['full_gym', 'barbell', 'dumbbell', 'cable_machine', 'machines'],

    // Lifestyle
    dailyActivityLevel: 'moderate',
    averageSleepHours: 7.5,
    stressLevel: 'moderate',
    occupationType: 'desk',

    // Preferences
    preferredWorkoutStyle: 'push_pull_legs',
    targetMuscleGroups: ['Chest', 'Back', 'Shoulders', 'Legs'],
    enjoyedExercises: ['Barbell Bench Press', 'Squats'],
    dislikedExercises: ['Burpees'],

    // Limitations
    hasInjuries: false,
    injuriesDescription: '',
    movementRestrictions: [],
    exercisesToAvoid: [],
    disclaimerAcknowledged: true,
  });

  if (!isOpen) return null;

  const currentStep = STEPS[currentStepIndex];

  const handleGoalToggle = (goalKey) => {
    setFormData((prev) => {
      const exists = prev.goals.includes(goalKey);
      let newGoals = exists ? prev.goals.filter((g) => g !== goalKey) : [...prev.goals, goalKey];
      if (newGoals.length === 0) newGoals = [goalKey];
      return {
        ...prev,
        goals: newGoals,
        primaryGoal: prev.primaryGoal === goalKey && exists ? newGoals[0] : prev.primaryGoal,
      };
    });
  };

  const handleEquipmentToggle = (itemKey) => {
    setFormData((prev) => {
      const exists = prev.availableEquipment.includes(itemKey);
      const newEquip = exists
        ? prev.availableEquipment.filter((e) => e !== itemKey)
        : [...prev.availableEquipment, itemKey];
      return { ...prev, availableEquipment: newEquip.length > 0 ? newEquip : [itemKey] };
    });
  };

  const handleMuscleToggle = (muscle) => {
    setFormData((prev) => {
      const exists = prev.targetMuscleGroups.includes(muscle);
      const updated = exists
        ? prev.targetMuscleGroups.filter((m) => m !== muscle)
        : [...prev.targetMuscleGroups, muscle];
      return { ...prev, targetMuscleGroups: updated };
    });
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const exists = prev.preferredTrainingDays.includes(day);
      const updated = exists
        ? prev.preferredTrainingDays.filter((d) => d !== day)
        : [...prev.preferredTrainingDays, day];
      return { ...prev, preferredTrainingDays: updated };
    });
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleFinalSubmission();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleFinalSubmission = async () => {
    setIsGenerating(true);

    // Dynamic generation loading stages
    const stages = [
      'Ingesting biometric profile and recovery index...',
      'Mapping available gym equipment & biomechanical alternatives...',
      'Synthesizing 8-week periodized volume & intensity curves...',
      'Applying RPE-based double progression architecture...',
      'Finalizing your customized training program...',
    ];

    for (let i = 0; i < stages.length; i++) {
      setGenerationStage(stages[i]);
      await new Promise((r) => setTimeout(r, 650));
    }

    try {
      // If user not authenticated, use demo mode or register token
      if (!isAuthenticated) {
        await api.demoLogin();
      }

      const res = await api.saveAssessment(formData);
      if (res.success && res.workoutPlan) {
        setWorkoutPlan(res.workoutPlan);
        await loadWorkoutData();
      }
      setIsGenerating(false);
      onClose();
      if (onCompleted) onCompleted();
      navigate('/dashboard/plan');
    } catch (e) {
      console.error('Error generating plan', e);
      setIsGenerating(false);
      onClose();
      navigate('/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" />

      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0D121D] border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Top Header & Progress */}
        <div className="px-6 pt-5 pb-3 border-b border-white/[0.08] bg-[#0A0E17]/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
                AI Fitness Assessment
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Step {currentStepIndex + 1} of {STEPS.length}
            </span>
          </div>

          {/* Step Pills Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => idx <= currentStepIndex && setCurrentStepIndex(idx)}
                  disabled={idx > currentStepIndex}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-brand-500 text-black font-bold shadow-glow'
                      : isPast
                      ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isPast ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {isGenerating ? (
            /* AI Plan Synthesis Loader */
            <div className="py-16 text-center space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-brand-500/20 animate-ping" />
                <div className="w-24 h-24 rounded-full border-4 border-brand-400 border-t-transparent animate-spin flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-brand-400" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">Synthesizing Your 8-Week Plan</h3>
                <p className="text-sm font-medium text-brand-400 mt-2 font-mono">{generationStage}</p>
                <p className="text-xs text-slate-500 mt-4 max-w-md mx-auto">
                  Calculating volume thresholds, rest intervals, and customized progression steps based on your biomechanics.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1: PERSONAL */}
              {currentStep.id === 'personal' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Let's start with the basics</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Your biological metrics help calibrate metabolic baseline and recovery speed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Athlete Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Mercer"
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
                      <input
                        type="number"
                        min="14"
                        max="90"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-2">Biological Gender</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['male', 'female', 'non-binary'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormData({ ...formData, gender: g })}
                            className={`py-3 rounded-2xl text-xs font-bold capitalize transition-all border ${
                              formData.gender === g
                                ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                                : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: BODY */}
              {currentStep.id === 'body' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">Body Composition</h2>
                      <p className="text-xs text-slate-400 mt-1">Used to calculate target load and calorie expenditure.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUnitMetric(!unitMetric)}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-brand-400"
                    >
                      {unitMetric ? 'Metric (cm / kg)' : 'Imperial (in / lbs)'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">Height</label>
                        <span className="text-sm font-mono font-bold text-brand-400">
                          {unitMetric ? `${formData.height} cm` : `${Math.round(formData.height / 2.54)} in`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="140"
                        max="215"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                        className="w-full accent-brand-500"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">Current Weight</label>
                        <span className="text-sm font-mono font-bold text-brand-400">
                          {unitMetric ? `${formData.weight} kg` : `${Math.round(formData.weight * 2.2046)} lbs`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="160"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                        className="w-full accent-brand-500"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-300">Target Goal Weight</label>
                        <span className="text-sm font-mono font-bold text-brand-400">
                          {unitMetric ? `${formData.targetWeight} kg` : `${Math.round(formData.targetWeight * 2.2046)} lbs`}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="160"
                        value={formData.targetWeight}
                        onChange={(e) => setFormData({ ...formData, targetWeight: Number(e.target.value) })}
                        className="w-full accent-brand-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: GOAL */}
              {currentStep.id === 'goal' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">What is your primary training goal?</h2>
                    <p className="text-xs text-slate-400 mt-1">Select all that apply, then pick your primary driver.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'build_muscle', label: 'Build Muscle', desc: 'Max mechanical tension and hypertrophy' },
                      { key: 'gain_strength', label: 'Gain Strength', desc: 'Neuromuscular peak torque & 1RM capacity' },
                      { key: 'lose_fat', label: 'Lose Fat', desc: 'High caloric output and lean tissue retention' },
                      { key: 'body_recomposition', label: 'Body Recomposition', desc: 'Simultaneous fat loss and muscle gain' },
                      { key: 'improve_fitness', label: 'Improve Fitness', desc: 'Work capacity, stamina, and cardiovascular health' },
                      { key: 'improve_endurance', label: 'Improve Endurance', desc: 'Lactate threshold & mitochondrial density' },
                      { key: 'general_health', label: 'General Health', desc: 'Joint mobility, posture, and longevity' },
                    ].map((g) => {
                      const isSelected = formData.goals.includes(g.key);
                      const isPrimary = formData.primaryGoal === g.key;

                      return (
                        <div
                          key={g.key}
                          onClick={() => handleGoalToggle(g.key)}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-brand-500/10 border-brand-500/60 shadow-glow'
                              : 'bg-dark-900 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white">{g.label}</span>
                            {isSelected && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormData({ ...formData, primaryGoal: g.key });
                                }}
                                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                  isPrimary ? 'bg-brand-500 text-black' : 'bg-white/10 text-slate-400'
                                }`}
                              >
                                {isPrimary ? 'PRIMARY' : 'Set as Primary'}
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{g.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: EXPERIENCE */}
              {currentStep.id === 'experience' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Training Experience</h2>
                    <p className="text-xs text-slate-400 mt-1">Calibrates initial volume thresholds and RPE sensitivity.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { level: 'beginner', title: 'Beginner', subtitle: '< 1 Year of systematic lifting' },
                      { level: 'intermediate', title: 'Intermediate', subtitle: '1–4 Years consistent training' },
                      { level: 'advanced', title: 'Advanced', subtitle: '4+ Years specialized strength/hypertrophy' },
                    ].map((exp) => (
                      <button
                        key={exp.level}
                        type="button"
                        onClick={() => setFormData({ ...formData, experienceLevel: exp.level })}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          formData.experienceLevel === exp.level
                            ? 'bg-brand-500/15 border-brand-500 text-white shadow-glow'
                            : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <p className="font-bold text-sm text-white">{exp.title}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{exp.subtitle}</p>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        How many years have you lifted?
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="40"
                        value={formData.trainingHistoryYears}
                        onChange={(e) => setFormData({ ...formData, trainingHistoryYears: Number(e.target.value) })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Days per week you currently train
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="7"
                        value={formData.currentDaysPerWeek}
                        onChange={(e) => setFormData({ ...formData, currentDaysPerWeek: Number(e.target.value) })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: TRAINING AVAILABILITY */}
              {currentStep.id === 'training' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Availability & Schedule</h2>
                    <p className="text-xs text-slate-400 mt-1">We tailor workout splits around your real-life calendar.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Days per week available to train: <span className="text-brand-400 font-bold">{formData.daysPerWeekAvailable} Days</span>
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {[2, 3, 4, 5, 6, 7].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, daysPerWeekAvailable: num })}
                          className={`py-3 rounded-2xl text-sm font-bold border transition-all ${
                            formData.daysPerWeekAvailable === num
                              ? 'bg-brand-500 text-black border-brand-500 shadow-glow'
                              : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {num} Days
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Approximate Workout Duration</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {['20-30 min', '30-45 min', '45-60 min', '60-90 min', '90+ min'].map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setFormData({ ...formData, workoutDuration: dur })}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                            formData.workoutDuration === dur
                              ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                              : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Preferred Training Days</label>
                    <div className="grid grid-cols-7 gap-1.5">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                        const isSelected = formData.preferredTrainingDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => handleDayToggle(day)}
                            className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                              isSelected
                                ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                                : 'bg-dark-900 border-white/10 text-slate-500 hover:text-slate-200'
                            }`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: EQUIPMENT */}
              {currentStep.id === 'equipment' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Available Equipment</h2>
                    <p className="text-xs text-slate-400 mt-1">Exercises will be dynamically substituted based on what you have access to.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { key: 'full_gym', label: 'Full Gym' },
                      { key: 'barbell', label: 'Barbell' },
                      { key: 'dumbbells', label: 'Dumbbells' },
                      { key: 'machines', label: 'Machines' },
                      { key: 'cable_machine', label: 'Cable Machine' },
                      { key: 'resistance_bands', label: 'Resistance Bands' },
                      { key: 'home_gym', label: 'Home Gym' },
                      { key: 'bodyweight_only', label: 'Bodyweight Only' },
                    ].map((eq) => {
                      const isSelected = formData.availableEquipment.includes(eq.key);
                      return (
                        <button
                          key={eq.key}
                          type="button"
                          onClick={() => handleEquipmentToggle(eq.key)}
                          className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all ${
                            isSelected
                              ? 'bg-brand-500/15 border-brand-500 text-brand-400 shadow-glow'
                              : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {eq.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 7: LIFESTYLE */}
              {currentStep.id === 'lifestyle' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Lifestyle & Recovery</h2>
                    <p className="text-xs text-slate-400 mt-1">Ensures optimal work-to-rest ratios and systemic fatigue management.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Daily Activity Level</label>
                      <select
                        value={formData.dailyActivityLevel}
                        onChange={(e) => setFormData({ ...formData, dailyActivityLevel: e.target.value })}
                        className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                      >
                        <option value="sedentary">Sedentary (Desk Job)</option>
                        <option value="light">Lightly Active (Light walking)</option>
                        <option value="moderate">Moderately Active (Active day)</option>
                        <option value="very_active">Very Active (Physical job)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Average Nightly Sleep: <span className="text-brand-400 font-bold">{formData.averageSleepHours} Hours</span>
                      </label>
                      <input
                        type="range"
                        min="4"
                        max="11"
                        step="0.5"
                        value={formData.averageSleepHours}
                        onChange={(e) => setFormData({ ...formData, averageSleepHours: Number(e.target.value) })}
                        className="w-full accent-brand-500 mt-2"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Daily Stress Level</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['low', 'moderate', 'high'].map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => setFormData({ ...formData, stressLevel: lvl })}
                            className={`py-2.5 rounded-xl text-xs font-bold capitalize border ${
                              formData.stressLevel === lvl
                                ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                                : 'bg-dark-900 border-white/10 text-slate-400'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: PREFERENCES */}
              {currentStep.id === 'preferences' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Training Preferences & Split</h2>
                    <p className="text-xs text-slate-400 mt-1">Select your preferred periodization split and target muscles.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Preferred Training Split</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { key: 'push_pull_legs', label: 'Push / Pull / Legs' },
                        { key: 'upper_lower', label: 'Upper / Lower' },
                        { key: 'full_body', label: 'Full Body' },
                        { key: 'bro_split', label: 'Bro Split (Single Muscle)' },
                      ].map((split) => (
                        <button
                          key={split.key}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredWorkoutStyle: split.key })}
                          className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                            formData.preferredWorkoutStyle === split.key
                              ? 'bg-brand-500/20 border-brand-500 text-brand-400 shadow-glow'
                              : 'bg-dark-900 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {split.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Muscle Groups to Prioritize</label>
                    <div className="flex flex-wrap gap-2">
                      {['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Glutes', 'Core'].map((m) => {
                        const isChecked = formData.targetMuscleGroups.includes(m);
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => handleMuscleToggle(m)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                              isChecked
                                ? 'bg-brand-500 text-black border-brand-500'
                                : 'bg-dark-900 border-white/10 text-slate-400'
                            }`}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 9: LIMITATIONS & DISCLAIMER */}
              {currentStep.id === 'limitations' && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Injuries, Restrictions & Disclaimer</h2>
                    <p className="text-xs text-slate-400 mt-1">Safety first. We eliminate high-risk movements tailored to your joints.</p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasInjuries}
                        onChange={(e) => setFormData({ ...formData, hasInjuries: e.target.checked })}
                        className="rounded accent-brand-500 w-4 h-4"
                      />
                      <span className="text-xs font-semibold text-slate-200">
                        I have pre-existing injuries or joint pain (e.g. lower back, shoulder, knees)
                      </span>
                    </label>

                    {formData.hasInjuries && (
                      <textarea
                        rows="2"
                        value={formData.injuriesDescription}
                        onChange={(e) => setFormData({ ...formData, injuriesDescription: e.target.value })}
                        placeholder="e.g. mild lumbar disc bulge, avoid heavy overhead barbell presses"
                        className="w-full mt-3 bg-dark-900 border border-white/10 rounded-xl p-3 text-xs text-white"
                      />
                    )}
                  </div>

                  {/* Medical Disclaimer Banner */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-200/90 leading-relaxed">
                      <p className="font-bold text-amber-300 mb-1">Health & Medical Disclaimer</p>
                      ForgeFit AI is an automated fitness training tool and is NOT a medical healthcare provider. The generated training programs and nutritional estimates are for informational and general athletic conditioning purposes only. Users with any health conditions or orthopedic injuries must consult a qualified physician before participating.
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={formData.disclaimerAcknowledged}
                      onChange={(e) => setFormData({ ...formData, disclaimerAcknowledged: e.target.checked })}
                      className="rounded accent-brand-500 w-4 h-4"
                    />
                    <span className="text-xs font-medium text-slate-300">
                      I acknowledge and accept the health disclaimer and agree to train with appropriate form and safety pins.
                    </span>
                  </label>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!isGenerating && (
          <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0A0E17]/80 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black text-xs font-extrabold shadow-glow transition-all hover:scale-[1.02]"
            >
              {currentStepIndex === STEPS.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate 8-Week Plan
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
