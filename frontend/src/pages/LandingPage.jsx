import React, { useState } from 'react';
import { 
  Dumbbell, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Cpu, 
  Timer, 
  TrendingUp, 
  Zap, 
  Star,
  Users
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LandingPage = ({ onOpenOnboarding, onOpenAuth }) => {
  const { isAuthenticated, demoLogin } = useAuth();
  const navigate = useNavigate();

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handlePrimaryCTA = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      onOpenOnboarding();
    }
  };

  const handleDemoLaunch = async () => {
    await demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="relative overflow-hidden bg-[#080B11] text-slate-100 selection:bg-brand-500 selection:text-black">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-accent-electric/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wide animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Autonomous Gym Intelligence & Bio-Adaptive Training</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08]">
            Your Workout. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-accent-electric bg-clip-text text-transparent">
              Your Goal. Your Plan.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            An AI-powered training platform that engineers periodized workout routines calibrated to your body, goals, schedule, and equipment. Eliminating gym guesswork forever.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={handlePrimaryCTA}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-base shadow-glow-lg transition-all hover:scale-105 flex items-center justify-center gap-2.5"
            >
              <span>Build My Workout Plan</span>
              <ArrowRight className="w-5 h-5 font-bold" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore How It Works</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </a>

            <button
              onClick={handleDemoLaunch}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-dark-900 hover:bg-dark-850 border border-brand-500/30 text-brand-400 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4 text-brand-400" />
              <span>Instant Athlete Demo</span>
            </button>
          </div>

          {/* Trust stats pill bar */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/5 backdrop-blur-sm">
              <p className="font-mono text-2xl font-black text-white">8-Week</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Periodized Splits</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/5 backdrop-blur-sm">
              <p className="font-mono text-2xl font-black text-brand-400">100%</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Dynamic Overload</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/5 backdrop-blur-sm">
              <p className="font-mono text-2xl font-black text-white">70+</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Exercises & Swaps</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-dark-900/60 border border-white/5 backdrop-blur-sm">
              <p className="font-mono text-2xl font-black text-accent-electric">Zero</p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">Static PDF Routines</p>
            </div>
          </div>
        </div>

        {/* Hero Interactive App Preview Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-3xl p-2 bg-gradient-to-b from-white/15 to-transparent shadow-2xl">
          <div className="rounded-[22px] bg-[#0C1017] border border-white/10 overflow-hidden shadow-2xl">
            {/* Window bar */}
            <div className="px-4 py-3 bg-[#080B11] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">forgefit-engine.v2.4 // active-session</span>
              </div>
              <span className="text-[11px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
                LIVE GYM HUD
              </span>
            </div>

            {/* Inner preview card */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: What Should I Do Next Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121927] to-[#0D121D] border border-brand-500/30 space-y-3">
                <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  What Should I Do Next?
                </div>
                <h4 className="text-lg font-bold text-white">Today's Push Session Ready</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your Barbell Bench Press improved 3x consecutive workouts at RPE 8. Recommended load progressed by +2.5 kg today.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={handlePrimaryCTA}
                    className="w-full py-2.5 rounded-xl bg-brand-500 text-black text-xs font-extrabold shadow-glow flex items-center justify-center gap-2"
                  >
                    Start Push Workout
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Middle: Live Exercise Tracker */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Current Exercise</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-brand-400">Set 2 of 4</span>
                </div>
                <h4 className="text-base font-bold text-white">Barbell Flat Bench Press</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-[#161F2E]">
                    <p className="text-[10px] text-slate-400">Load</p>
                    <p className="font-mono font-bold text-white">77.5 kg</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#161F2E]">
                    <p className="text-[10px] text-slate-400">Reps</p>
                    <p className="font-mono font-bold text-white">8 Reps</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#161F2E]">
                    <p className="text-[10px] text-slate-400">Target RPE</p>
                    <p className="font-mono font-bold text-brand-400">8.0</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-[11px] text-brand-300 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-brand-400" />
                  <span>Rest Countdown: 01:24 remaining</span>
                </div>
              </div>

              {/* Right: Adaptive Strength Progression */}
              <div className="p-5 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Strength Progression</span>
                  <span className="text-[10px] font-bold text-emerald-400">+12% this cycle</span>
                </div>
                <h4 className="text-base font-bold text-white">Estimated 1RM Trends</h4>
                <div className="space-y-2 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Bench Press</span>
                      <span className="font-mono font-bold text-brand-400">95 kg (PR)</span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-400 w-[88%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                      <span>Back Squat</span>
                      <span className="font-mono font-bold text-accent-electric">114 kg</span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-electric w-[78%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION (Requirement 1 & 2) */}
      <section id="how-it-works" className="py-20 border-t border-white/[0.08] bg-[#0A0D15] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              Frictionless 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Assessment to Peak Performance
            </h2>
            <p className="text-sm text-slate-400">
              No generic cookie-cutter spreadsheets. ForgeFit AI analyzes your biomechanics and adapts every week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Biometric Intake',
                desc: 'Input your experience, goals, days available, workout duration, and available equipment.',
                icon: Activity,
              },
              {
                step: '02',
                title: 'AI Synthesis',
                desc: 'Our engine generates an 8-week periodized split with tailored volume, rest intervals, and substitutions.',
                icon: Cpu,
              },
              {
                step: '03',
                title: 'Distraction-Free Gym Player',
                desc: 'Follow today’s workout set-by-set with automatic rest countdowns, weight tracking, and audio cues.',
                icon: Timer,
              },
              {
                step: '04',
                title: 'Adaptive Progression',
                desc: 'RPE feedback continuously calibrates your weight jumps, volume, and recovery schedules.',
                icon: TrendingUp,
              },
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/40 transition-all space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-brand-400">{st.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-brand-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">{st.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION (Requirement 1, 4, 6, 8) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-accent-electric uppercase tracking-widest">
            Engineering Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Serious Lifters
          </h2>
          <p className="text-sm text-slate-400">
            Every feature is designed to keep you focused in the gym and steadily progressing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-dark-900 border border-white/10 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">"What Should I Do Next?"</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never open your dashboard wondering what to do. Our proactive AI engine constantly presents your next high-impact action—from pre-workout warmup to rest day recovery.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-dark-900 border border-white/10 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-accent-electric/15 border border-accent-electric/30 flex items-center justify-center text-accent-electric">
              <Dumbbell className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Dynamic Equipment Alternatives</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flat barbell bench taken? Swap to dumbbell press or machine chest press with a single tap. The system automatically adjusts load mechanics and target rep thresholds.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-dark-900 border border-white/10 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">RPE & Conservative Overload</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No reckless weight jumps. Our double-progression model increments load conservatively (+2.5kg upper, +5kg lower) only after clean, controlled sets at RPE ≤ 8.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <section className="py-20 border-t border-white/[0.08] bg-[#0A0D15] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              Athlete Experiences
            </span>
            <h2 className="text-3xl font-extrabold text-white">Tested in the Squat Rack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Marcus Vance',
                role: 'Competitive Powerlifter',
                quote: 'The live gym player with auto rest timer is what every fitness app should feel like. Added 15kg to my squat in 8 weeks without blowing out my recovery.',
                rating: 5,
              },
              {
                name: 'Elena Rostova',
                role: 'CrossFit & Hypertrophy Athlete',
                quote: 'The equipment alternative switcher is a game changer during 6 PM rush hours. If the cables are swamped, it swaps to dumbbell moves instantly.',
                rating: 5,
              },
              {
                name: 'David Kim',
                role: 'Software Engineer & Lifter',
                quote: 'I love that it tells me exactly what to do next every morning. No decision fatigue, no second guessing. Just walk in, execute, and progress.',
                rating: 5,
              },
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-dark-900 border border-white/10 space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Questions & Answers</span>
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does ForgeFit AI generate my workout plan?',
              a: 'Our engine ingests your age, biological metrics, primary goal (Hypertrophy, Strength, Fat Loss), training frequency, session duration, and equipment. It synthesizes a periodized 8-week cycle with optimal weekly set volume per muscle group.',
            },
            {
              q: 'What happens if I miss a workout?',
              a: 'ForgeFit’s adaptive logic automatically rotates your upcoming days forward without cramming double sessions into one day, preventing overtraining and keeping your progression curve intact.',
            },
            {
              q: 'Can I use ForgeFit if I only have dumbbells or bodyweight at home?',
              a: 'Yes. In the equipment selector, choose "Dumbbells" or "Bodyweight Only". Every prescribed exercise and substitution will match your available equipment.',
            },
            {
              q: 'How does the rest timer and sound cues work in the gym?',
              a: 'When you check off a set during a workout, ForgeFit immediately launches a floating rest countdown with an audible Web Audio chime when your rest interval completes, so you do not need to look at your phone constantly.',
            },
            {
              q: 'Is this medical or rehabilitation advice?',
              a: 'No. ForgeFit AI is for general fitness conditioning. Users with injuries or medical restrictions should consult a licensed physical therapist or physician before beginning any training regimen.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl bg-dark-900 border border-white/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                {activeFaq === i ? (
                  <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-500/20 via-emerald-500/10 to-accent-electric/20 border border-brand-500/40 text-center space-y-6 shadow-glow-lg">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Take the Guesswork Out of Training?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Answer a few quick questions about your body, goals, and equipment. ForgeFit AI generates your custom 8-week program in seconds.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handlePrimaryCTA}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-400 text-black font-extrabold text-sm shadow-glow transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Build My Workout Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleDemoLaunch}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
            >
              Explore With Demo Account
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#06080D] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center text-black font-black">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="font-display font-extrabold text-lg text-white">
              FORGE<span className="text-brand-400">FIT</span> AI
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <button onClick={() => onOpenAuth?.('login')} className="hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={handlePrimaryCTA} className="hover:text-white transition-colors">
              Onboarding
            </button>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it Works
            </a>
          </div>

          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} ForgeFit AI. Engineered for athletic longevity & progressive overload.
          </p>
        </div>
      </footer>
    </div>
  );
};
