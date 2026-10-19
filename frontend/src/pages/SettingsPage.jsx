import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Volume2, 
  Scale, 
  Cpu, 
  Save, 
  Shield, 
  CheckCircle2, 
  Key,
  LogOut,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { useNavigate } from 'react-router-dom';

export const SettingsPage = ({ onOpenOnboarding }) => {
  const { user, profile, updateProfile, logout } = useAuth();
  const { soundEnabled, setSoundEnabled } = useWorkout();
  const navigate = useNavigate();

  const [unitMetric, setUnitMetric] = useState(profile?.unitPreference !== 'imperial');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Profile fields
  const [age, setAge] = useState(profile?.age || 28);
  const [weight, setWeight] = useState(profile?.weight || 78.5);
  const [height, setHeight] = useState(profile?.height || 180);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile({
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      unitPreference: unitMetric ? 'metric' : 'imperial',
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div>
        <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
          Preferences & Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
          Profile & Application Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure measurement units, gym rest timers, and bio-adaptive AI parameters.
        </p>
      </div>

      {isSaved && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings successfully updated.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Physical Biometrics Section */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-brand-400" />
            Athlete Physical Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Workout & Gym Experience Settings */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-accent-electric" />
            Gym Mode & Audio Cues
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-900 border border-white/5">
              <div>
                <p className="text-sm font-bold text-white">Audible Rest Timer Chime</p>
                <p className="text-xs text-slate-400">Plays synthesized sound when your prescribed rest interval expires.</p>
              </div>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  soundEnabled ? 'bg-brand-500' : 'bg-dark-800'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-black transition-transform ${
                    soundEnabled ? 'translate-x-6 bg-white' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-dark-900 border border-white/5">
              <div>
                <p className="text-sm font-bold text-white">Measurement Standard</p>
                <p className="text-xs text-slate-400">Toggle between Metric (kg / cm) and Imperial (lbs / in).</p>
              </div>
              <button
                type="button"
                onClick={() => setUnitMetric(!unitMetric)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-bold text-brand-400"
              >
                {unitMetric ? 'Metric (kg)' : 'Imperial (lbs)'}
              </button>
            </div>
          </div>
        </div>

        {/* AI Integration Provider Settings (Requirement 13) */}
        <div className="p-6 rounded-3xl bg-[#0D121D] border border-white/10 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-400" />
            AI Workout Engine Configuration
          </h3>
          <p className="text-xs text-slate-400">
            ForgeFit uses a built-in neural biomechanical engine. You can optionally connect a custom Google Gemini API key below.
          </p>

          <div className="relative">
            <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy... (Optional Custom Gemini API Key)"
              className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-xs shadow-glow transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>

          <button
            type="button"
            onClick={onOpenOnboarding}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retake Assessment
          </button>
        </div>
      </form>
    </div>
  );
};
