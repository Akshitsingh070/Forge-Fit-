<<<<<<< HEAD
# ForgeFit AI — Autonomous Gym Training & Adaptive Performance Platform

A modern, production-ready, AI-powered gym training web application engineered for lifters, athletes, and fitness enthusiasts.

![ForgeFit AI](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80)

---

## ⚡ Quick Start & Live Access

The application is running live and accessible:
- **Frontend Web Application**: [http://localhost:5173/](http://localhost:5173/)
- **Backend API & Health**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Demo Athlete Credentials
For instant reviewer evaluation with preloaded workouts, strength curves, and 8-week cycle:
- **One-Click Demo Button**: Available on the top right navigation bar ("Demo Athlete") or inside the Sign In modal
- **Email**: `demo@forgefit.ai`
- **Password**: `password123`

---

## 🌟 Core Highlights & Architectural Features

### 1. "What Should I Do Next?" Feature (Central Experience)
The user will never open the dashboard and wonder *"What workout should I do today?"*. The dynamic recommendation engine continuously presents contextual, prioritized guidance:
- **Before training**: *"Today's Push workout is ready. Start with chest and deltoids."*
- **Post-workout**: *"Session complete. Next priority: post-workout nutrition and recovery. Your next session is Pull tomorrow."*
- **Progressive Overload Triggers**: *"Your Bench Press has improved across 3 consecutive sessions at RPE 8. Recommended +2.5kg load increase."*
- **Fatigue & Recovery Alerts**: High RPE or exhaustion triggers rest day recommendations and sleep reminders.
- **Missed Workout Auto-Shift**: Automatically rebalances the upcoming schedule without overtraining.

### 2. Distraction-Free Gym Workout Player (Execution Mode)
Engineered for mobile gym use and desktop lifters:
- **Exercise → Sets → Reps → Rest Timer → Next Exercise** workflow.
- **Set-by-set logging**: Set number, target reps, recommended load, weight lifted input, actual reps completed, and RPE rating.
- **Automated Rest Countdown**: Launches automatically when a set is completed, with visual progress, +30s button, skip button, and an **audible Web Audio chime** when rest finishes.
- **Equipment Alternative Switcher**: If a bench or barbell station is occupied, lifters can swap to dumbbell or machine variations with 1 tap.
- **Personal Record (PR) Detection & Celebration**: Confetti modal upon completion detailing total volume moved, duration, sets completed, and next recovery steps.

### 3. Multi-Step Onboarding Questionnaire
A 9-step wizard with progress indicator:
`Personal` → `Body` → `Goal` → `Experience` → `Training` → `Equipment` → `Lifestyle` → `Preferences` → `Limitations & Disclaimer`

### 4. Dynamic 8-Week AI Training Plan Generation
- Supports **Push/Pull/Legs**, **Upper/Lower**, **Full Body**, and **Bro Splits**.
- Calculates optimal weekly volume per muscle group.
- Pluggable AI service (`AIWorkoutService`) supporting Google Gemini API with fallback to ForgeFit's bio-adaptive heuristic engine.

### 5. Movement & Biomechanics Library
- 70+ exercises categorized across: Chest, Back, Shoulders, Biceps, Triceps, Legs, Glutes, Core, Calves, Full Body, and Cardio.
- Filterable by equipment (Barbell, Dumbbell, Machine, Cable, Bands, Bodyweight).
- Complete step-by-step instructions, tempo guides (e.g. `3-1-1-0`), safety notes, and substitution alternatives.

### 6. Progress Analytics & Strength Curves
- Tracks compound lifts (Bench Press, Squat, Deadlift, Overhead Press, Lat Pulldown) with estimated 1RM calculations via the Epley formula: `Weight × (1 + Reps/30)`.
- Body metrics tracking (Weight, BMI, body fat %, chest, waist, arms).
- Milestone and adherence progress bars.

### 7. Nutrition Guidance & TDEE Calculations
- Basal Metabolic Rate (BMR) via Mifflin-St Jeor formula.
- Total Daily Energy Expenditure (TDEE) with activity multipliers.
- Goal-based caloric adjustments (+300 kcal surplus for Hypertrophy, -450 kcal deficit for Fat Loss).
- Protein (g), Carbohydrate (g), and Healthy Fat (g) target distribution.
- Pre/Post-workout fueling advice and mandatory health disclaimer.

---

## 🛠️ Tech Stack & Directory Structure

```text
forgefit-ai/
├── backend/
│   ├── server.js                    # Express application entry point
│   ├── .env                         # Port, JWT secret, AI provider configuration
│   └── src/
│       ├── config/db.js             # Mongoose connection with resilient fallback store
│       ├── data/seedExercises.js    # Biomechanical exercise database with alternatives
│       ├── models/                  # Mongoose models: User, UserProfile, Assessment,
│       │                            # WorkoutPlan, Workout, Exercise, Session,
│       │                            # ExercisePerformance, ProgressMeasurement, Goal
│       ├── controllers/             # REST controllers for auth, workouts, sessions, etc.
│       ├── services/
│       │   ├── aiWorkoutService.js  # Pluggable AI synthesis engine (Gemini & heuristics)
│       │   ├── adaptiveTrainingService.js # Progressive overload & fatigue modeling
│       │   └── storageService.js    # In-memory & local cache persistence
│       ├── routes/                  # Express API routers
│       └── middleware/              # JWT auth and error handling
│
└── frontend/
    ├── index.html                   # HTML5 template with Plus Jakarta Sans & Inter
    ├── tailwind.config.js           # Dark theme colors, neon accents, glow effects
    ├── vite.config.js               # Dev server & /api proxy to localhost:5000
    └── src/
        ├── api/apiClient.js         # Unified HTTP API client with bearer token
        ├── context/
        │   ├── AuthContext.jsx      # Authentication & user profile state
        │   └── WorkoutContext.jsx   # Live session, plan, and rest timer chime engine
        ├── components/
        │   ├── common/              # Navbar, Sidebar, RestTimerBanner, Modal
        │   ├── auth/AuthModal.jsx   # Sign up, Login, Demo login, Google placeholder
        │   ├── onboarding/          # 9-step assessment wizard & AI generation HUD
        │   └── workout/             # Distraction-free gym execution mode
        └── pages/                   # LandingPage, Dashboard, Plan, Exercises,
                                     # Progress, Nutrition, Settings
```

---

## 🔒 Security & Quality Standards
- Passwords hashed with `bcryptjs`.
- Stateless token verification with `jsonwebtoken`.
- Zero client-side API secrets.
- Mobile-first responsive layouts with bottom navigation and touch-friendly controls.
=======
# Forge-Fit-
>>>>>>> 23687ee67477f99da271a63a91b6f03be10dad51
